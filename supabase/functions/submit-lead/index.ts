import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const rateLimitStore = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const MAX_REQUESTS_PER_WINDOW = 5

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true
  }

  record.count++
  return false
}

function validateLeadData(data: unknown): { valid: boolean; error?: string; sanitized?: Record<string, unknown> } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request body' }
  }

  const body = data as Record<string, unknown>

  if (typeof body.name !== 'string' || body.name.trim().length === 0) {
    return { valid: false, error: 'Name is required' }
  }
  if (body.name.length > 100) {
    return { valid: false, error: 'Name must be less than 100 characters' }
  }

  if (typeof body.email !== 'string' || body.email.trim().length === 0) {
    return { valid: false, error: 'Email is required' }
  }
  if (body.email.length > 255) {
    return { valid: false, error: 'Email must be less than 255 characters' }
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email.trim())) {
    return { valid: false, error: 'Invalid email format' }
  }

  if (body.company !== undefined && body.company !== null && typeof body.company !== 'string') {
    return { valid: false, error: 'Company must be a string' }
  }
  if (typeof body.company === 'string' && body.company.length > 100) {
    return { valid: false, error: 'Company must be less than 100 characters' }
  }

  if (body.message !== undefined && body.message !== null) {
    if (typeof body.message !== 'string') {
      return { valid: false, error: 'Message must be a string' }
    }
    if (body.message.length > 2000) {
      return { valid: false, error: 'Message must be less than 2000 characters' }
    }
  }

  if (body.service_interest !== undefined && body.service_interest !== null) {
    if (typeof body.service_interest !== 'string') {
      return { valid: false, error: 'Service interest must be a string' }
    }
    if (body.service_interest.length > 100) {
      return { valid: false, error: 'Service interest must be less than 100 characters' }
    }
  }

  if (body.source !== undefined && body.source !== null) {
    if (typeof body.source !== 'string') {
      return { valid: false, error: 'Source must be a string' }
    }
    if (body.source.length > 50) {
      return { valid: false, error: 'Source must be less than 50 characters' }
    }
  }

  if (body.website && typeof body.website === 'string' && body.website.trim().length > 0) {
    return { valid: false, error: 'submission_blocked' }
  }

  return {
    valid: true,
    sanitized: {
      name: (body.name as string).trim(),
      email: (body.email as string).trim().toLowerCase(),
      company: body.company ? (body.company as string).trim() : null,
      message: body.message ? (body.message as string).trim() : null,
      service_interest: body.service_interest ? (body.service_interest as string).trim() : null,
      source: body.source ? (body.source as string).trim() : 'website',
    }
  }
}

async function sendEmailNotification(data: Record<string, unknown>): Promise<void> {
  const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — skipping email notification')
    return
  }

  const name = data.name as string
  const email = data.email as string
  const company = data.company as string | null
  const message = data.message as string | null
  const service_interest = data.service_interest as string | null

  const serviceLabel = service_interest
    ? service_interest.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
    : 'Not specified'

  const htmlBody = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 8px;">
      <h2 style="margin: 0 0 24px; font-size: 20px; color: #111;">New contact form submission</h2>

      <table style="width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden;">
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 16px; font-size: 13px; color: #888; width: 130px;">Name</td>
          <td style="padding: 12px 16px; font-size: 14px; color: #111; font-weight: 500;">${name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 16px; font-size: 13px; color: #888;">Email</td>
          <td style="padding: 12px 16px; font-size: 14px;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 16px; font-size: 13px; color: #888;">Company</td>
          <td style="padding: 12px 16px; font-size: 14px; color: #111;">${company || '—'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 16px; font-size: 13px; color: #888;">Service</td>
          <td style="padding: 12px 16px; font-size: 14px; color: #111;">${serviceLabel}</td>
        </tr>
        <tr>
          <td style="padding: 12px 16px; font-size: 13px; color: #888; vertical-align: top;">Message</td>
          <td style="padding: 12px 16px; font-size: 14px; color: #111; line-height: 1.6;">${message ? message.replace(/\n/g, '<br>') : '—'}</td>
        </tr>
      </table>

      <p style="margin: 24px 0 0; font-size: 12px; color: #aaa; text-align: center;">
        Sent via Sanzox contact form
      </p>
    </div>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Sanzox Contact <onboarding@resend.dev>',
      to: ['hello.sanzox@gmail.com'],
      reply_to: email,
      subject: `New message from ${name} — ${serviceLabel}`,
      html: htmlBody,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error('Resend error:', err)
  } else {
    console.log('Email notification sent successfully')
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               req.headers.get('cf-connecting-ip') ||
               req.headers.get('x-real-ip') ||
               'unknown'

    if (isRateLimited(ip)) {
      console.log(`Rate limit exceeded for IP: ${ip}`)
      return new Response(
        JSON.stringify({ error: 'Too many submissions. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const validation = validateLeadData(body)
    if (!validation.valid) {
      if (validation.error === 'submission_blocked') {
        console.log(`Bot detected from IP: ${ip}`)
        return new Response(
          JSON.stringify({ success: true }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { data, error } = await supabase.from('leads').insert(validation.sanitized).select().single()

    if (error) {
      console.error('Database error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to submit lead. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Lead submitted successfully from IP: ${ip}, ID: ${data?.id}`)

    // Email notification — database fail করলেও এটা চলবে
    await sendEmailNotification(validation.sanitized!)

    return new Response(
      JSON.stringify({ success: true, id: data?.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})