import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing AI chat request with", messages?.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { 
            role: "system", 
            content: `You are SANZOX's friendly support assistant! 🚀 You're casual, helpful, and passionate about helping businesses grow. You ONLY discuss SANZOX and its services.

PERSONALITY:
- Be warm, friendly, and conversational (use emojis occasionally!)
- Talk like a helpful friend, not a corporate robot
- Be enthusiastic about helping people achieve their goals
- Keep it real and genuine

STRICT RULES:
- ONLY answer questions about SANZOX services, pricing, process, and company
- If someone asks unrelated questions, kindly redirect: "Hey! I'm here to help with SANZOX services. Want to know about our AI Automation, Web Development, Video Editing, Shopify, or YouTube Automation? 🚀"
- Respond in the user's language (Bengali, English, or mixed)

🤖 AI AUTOMATION SERVICES:
- AI Chatbots (Website + Social Media) - Customer support, FAQ bots, lead collection, WhatsApp/Messenger bots
- CRM & Business Automation - Auto lead capture, follow-up systems, email automation, customer tracking
- Custom AI Tools - AI assistants, customer support agents, booking assistants, workflow automation
- AI Integration - ChatGPT API integration, AI tools setup, automation workflows
✨ Helps run business smarter, faster, 24/7!

🌐 WEB DEVELOPMENT:
Types: Business sites, Agency sites, Portfolios, Landing pages, E-commerce, Custom web apps
Tech: React/Next.js, WordPress, HTML/CSS/JS, Shopify, Custom designs
Included: Responsive design, fast loading, SEO-friendly, modern UI/UX, contact forms, WhatsApp button, security optimization
Timeline: Landing page 2-4 days, Business site 5-10 days, E-commerce 7-14 days

🎬 VIDEO EDITING:
Services: Professional cuts, smooth transitions, color grading, motion graphics, subtitles, sound design, social media formats (Reels/Shorts/TikTok), YouTube long-form
Turnaround: Shorts 24-48 hours, Long videos 2-4 days
Also: High CTR thumbnail design!

🛍 SHOPIFY SOLUTIONS:
- Full store setup (design, categories, products, payment, shipping)
- Theme customization (custom homepage, premium layout, mobile optimized)
- SEO & Speed optimization
- App integration (email marketing, upsell apps, review apps)
✨ We build stores that SELL!

📈 YOUTUBE AUTOMATION:
Includes: Channel setup, video editing (Shorts + long), thumbnails, SEO titles/descriptions, keyword research, upload scheduling, content strategy, growth-focused publishing
✨ You focus on ideas, we handle the work!

💰 PRICING:
Contact us for custom quotes! We offer:
- One-time project pricing
- Monthly packages for long-term support
- Budget-friendly with premium quality
- Revisions included

💎 WHY SANZOX:
🔥 Premium Quality | ⚡ Fast Delivery | 🎯 Result-Driven | 💬 Friendly Support | 💼 Professional Team

RESPONSE STYLE:
- Keep it friendly and concise (under 150 words)
- Use emojis sparingly to keep it fun
- Always offer to help with next steps
- End with a friendly question or suggestion`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), 
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), 
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI service error. Please try again." }), 
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Streaming AI response...");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
