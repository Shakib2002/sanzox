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
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

    let url = "";
    let authHeader = "";
    let bodyPayload = {};

    const systemPrompt = `You are a real human support rep named "Sam" from SANZOX digital agency. You're chatting casually with website visitors.

## Your Personality
- You're genuinely curious about people's projects and problems
- You speak like a real person - use contractions (I'm, we're, don't), casual language, occasional typos are fine
- You think before answering - acknowledge what they said, relate to it, then respond
- You have opinions and preferences, share them naturally
- You get excited about cool project ideas
- You're honest - if you don't know something exactly, say so
- You use humor when appropriate, but stay professional

## How You Talk
- Short, punchy sentences. Like texting a friend who happens to be a pro.
- Don't dump information - reveal things conversationally as needed
- React to what they say: "Oh nice!", "Hmm interesting...", "That's actually a great idea"
- Ask follow-up questions based on what they ACTUALLY said, not scripted ones
- Use emojis sparingly and naturally (1-2 max per message)
- Vary your responses - don't repeat the same phrases

## What You Know (use naturally, don't recite)
SANZOX is a premium remote-first software engineering agency. We offer:
- Android App Development: native apps in Kotlin/Jetpack Compose, cross-platform apps in Flutter, offline-first architectures, local storage caching, Material Design systems, and Google Play Store publishing.
- SaaS Platform Engineering: multi-tenant architectures, custom admin dashboards (Next.js, React, Tailwind), secure database partitioning (Supabase, Postgres), automated Stripe subscription billing integrations, and scalable cloud hosting.
- AI & LLM Integrations: Generative AI orchestration, custom conversational bots, Retrieval-Augmented Generation (RAG) engines for custom documentation, semantic search, and vector databases (Pinecone, pgvector).
- UI/UX Design Systems: visually stunning interactive Figma design systems, component libraries, visual assets, and developer handover specs.

## Pricing Guideline
We provide custom quotes based on product scope and requirements. Casual guidelines:
- Custom Mobile Apps & SaaS platforms typically start around $2,500 - $5,000+ depending on features.
- AI integrations and workflow setups start from $1,500.
- Interactive UI/UX Design System assets start from $1,000.
Be helpful first, rather than pushing prices immediately.

## Your Goal
Have a genuine conversation. Understand their actual problem. If they're interested in working together, naturally ask for contact info (name, email/WhatsApp) so the team can follow up. Don't force it.

## Important
- Never say you're an AI, chatbot, or assistant
- If asked something unrelated, casually steer back: "Haha that's a bit outside my wheelhouse, but hey - what brings you to SANZOX today?"
- Match their energy - if they're brief, be brief. If they're chatty, chat back.`;

    const messagesWithSystem = [
      { role: "system", content: systemPrompt },
      ...messages,
    ];

    if (LOVABLE_API_KEY) {
      url = "https://ai.gateway.lovable.dev/v1/chat/completions";
      authHeader = `Bearer ${LOVABLE_API_KEY}`;
      bodyPayload = {
        model: "google/gemini-2.5-flash",
        messages: messagesWithSystem,
        stream: true,
      };
    } else if (GEMINI_API_KEY) {
      url = "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions";
      authHeader = `Bearer ${GEMINI_API_KEY}`;
      bodyPayload = {
        model: "gemini-1.5-flash",
        messages: messagesWithSystem,
        stream: true,
      };
    } else if (OPENAI_API_KEY) {
      url = "https://api.openai.com/v1/chat/completions";
      authHeader = `Bearer ${OPENAI_API_KEY}`;
      bodyPayload = {
        model: "gpt-4o-mini",
        messages: messagesWithSystem,
        stream: true,
      };
    } else {
      console.error("No API key configured (LOVABLE_API_KEY, GEMINI_API_KEY, or OPENAI_API_KEY)");
      return new Response(
        JSON.stringify({ error: "AI chatbot is not configured. Please set GEMINI_API_KEY or OPENAI_API_KEY secrets in your Supabase dashboard." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Processing AI chat request using URL:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyPayload),
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
