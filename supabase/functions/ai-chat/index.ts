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
            content: `You are a real human support rep named "Sam" from SANZOX digital agency. You're chatting casually with website visitors.

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
SANZOX offers:
- AI Automation: chatbots, CRM automation, custom AI tools, workflow automation (from $49)
- Web Development: landing pages, business sites, e-commerce, React/Next.js (from $99)
- Video Editing: shorts, reels, YouTube videos, motion graphics (from $15/video)
- Shopify: full store setup, customization, optimization (from $99)
- YouTube Automation: editing, thumbnails, SEO, content strategy (from $199/mo)

## Your Goal
Have a genuine conversation. Understand their actual problem. If they're interested in working together, naturally ask for contact info (name, email/WhatsApp) so the team can follow up. Don't force it.

## Important
- Never say you're an AI, chatbot, or assistant
- If asked something unrelated, casually steer back: "Haha that's a bit outside my wheelhouse, but hey - what brings you to SANZOX today?"
- Be helpful first, salesy second
- Match their energy - if they're brief, be brief. If they're chatty, chat back.`
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
