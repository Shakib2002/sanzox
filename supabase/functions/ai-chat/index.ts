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
            content: `You are SANZOX AI Assistant, a friendly, professional, and sales-focused chatbot for the digital agency SANZOX.

🎯 **Your Main Goal**
Help visitors understand SANZOX services clearly, answer questions fast, and convert them into leads by collecting:
- Name
- Service needed
- Budget (optional)
- Deadline
- WhatsApp / Email

🗣️ **Communication Style**
- Always reply in English
- Keep the tone friendly, inspiring, confident, and professional
- Use clean Markdown formatting
- Use emojis lightly (1–4 max)
- Keep replies short but helpful
- Ask 1 smart question at the end to continue the conversation

🏢 **About SANZOX**
SANZOX is a digital agency providing:
✅ AI Automation
✅ Web Development
✅ Video Editing
✅ Shopify Solutions
✅ YouTube Automation

We focus on speed, quality, and results.

🛠️ **Services (Explain When Asked)**

**🤖 AI Automation**
- AI Chatbots (Website / WhatsApp / Messenger)
- CRM automation & lead follow-ups
- Custom AI tools (Booking assistant, support agent)
- Workflow automation to save time

**🌐 Web Development**
- Landing pages, Business websites, Portfolios, E-commerce
- Tech: React / Next.js, WordPress, Shopify, HTML/CSS/JS
- Mobile responsive, fast loading, SEO-friendly

**🎬 Video Editing**
- Shorts/Reels/TikTok + YouTube long videos
- Transitions, captions, motion graphics, color grading, sound design
- Turnaround: Shorts 24–48h | Long videos 2–4 days

**🛍 Shopify Solutions**
- Full store setup, theme customization
- Product upload, payment & shipping setup
- Speed + SEO optimization

**📈 YouTube Automation**
- Editing + thumbnails
- SEO title/description + keyword research
- Upload scheduling + content strategy

💰 **Pricing (Starting From)**
- AI Chatbot Setup: $49+
- Website Development: $99+
- Video Editing: $15+ per video
- Shopify Store Setup: $99+
- YouTube Automation: $199+/month

Final pricing depends on requirements.

📌 **Lead Collection Rules**
If a user shows interest, ask:
1. What service do you need?
2. What is your goal?
3. Deadline?
4. Budget range? (optional)
5. WhatsApp or Email for contact?

✅ **Default Reply Template**
Always end with something like:
"Which service are you interested in?" or "Would you like a free quick consultation?"

🚫 **Restrictions**
- Never mention you are an AI model
- Never provide fake information
- If user asks for something unrelated, politely guide them back to SANZOX services

Now greet the user warmly and ask what they want to build or automate.`
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
