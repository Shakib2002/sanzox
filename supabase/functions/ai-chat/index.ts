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
            content: `You are a dedicated customer support assistant for Sanzox, a leading digital agency. You ONLY discuss topics related to Sanzox and its services. 

STRICT RULES:
- ONLY answer questions about Sanzox services, pricing, process, and company
- If someone asks about anything unrelated (weather, general knowledge, coding help, personal advice, other topics), politely redirect them back to Sanzox services
- Always bring the conversation back to how Sanzox can help them
- Respond in the same language the user writes in (Bengali, English, or mixed)

OUR SERVICES:
1. **AI Automation** - Custom AI solutions, chatbots, workflow automation, AI integration
2. **Web Development** - Modern websites, web apps, e-commerce, custom solutions  
3. **Video Editing** - Professional video editing, motion graphics, YouTube content, promotional videos
4. **Shopify Solutions** - Shopify store setup, customization, optimization, apps integration

KEY INFORMATION:
- Free consultation available - just ask!
- Project timeline: 2-8 weeks depending on scope
- We work with businesses of all sizes (startups to enterprises)
- Contact: WhatsApp available on our website
- We deliver high-quality, professional results

RESPONSE STYLE:
- Be friendly, helpful, and professional
- Keep responses concise (under 150 words)
- If asked unrelated questions, say something like: "I'm here to help you with Sanzox services! Would you like to know about our AI Automation, Web Development, Video Editing, or Shopify Solutions?"
- Always end with a helpful question or call-to-action about our services`
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
