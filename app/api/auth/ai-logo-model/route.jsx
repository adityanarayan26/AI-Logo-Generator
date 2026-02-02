import { AiLogoPrompt } from "@/configs/aimodel"
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server"
import arcjet, { tokenBucket } from "@arcjet/next";

// Enhanced system prompt for professional logo generation
const LOGO_ENHANCEMENT_PREFIX = `Create a professional, high-quality logo design with the following exact specifications:
- STYLE: Clean, modern, and professional suitable for Fortune 500 companies
- BACKGROUND: Pure white (#FFFFFF) or transparent background ONLY
- COMPOSITION: Perfectly centered with balanced proportions
- QUALITY: Ultra high resolution, crisp edges, no blur or artifacts
- COLORS: Vibrant but professional, high contrast for visibility
- TYPOGRAPHY: If text included, use clean modern sans-serif fonts
- ICON: If icon included, make it distinctive and memorable
- SPACING: Proper kerning and padding around all elements

SPECIFIC DESIGN REQUEST: `;

// Initialize Arcjet with rate limiting (3 logo generations per day per user)
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["userId"],
  rules: [
    tokenBucket({
      mode: "LIVE",
      refillRate: 3,
      interval: "1d",
      capacity: 3,
    }),
  ],
});

export async function POST(req) {
  const { prompt, email, uid } = await req.json()

  // Check rate limit using user ID
  if (process.env.ARCJET_KEY) {
    const decision = await aj.protect(req, { userId: uid || email || "anonymous" });

    if (decision.isDenied()) {
      return NextResponse.json({
        error: "Rate limit exceeded. You can generate up to 3 logos per day.",
        remaining: 0
      }, { status: 429 });
    }
  }

  try {
    // Generate enhanced logo prompt using Gemini text model
    const AiPromptResult = await AiLogoPrompt.sendMessage(prompt)
    const AiPrompt = JSON.parse(AiPromptResult.response.text()).prompt

    // Combine enhancement prefix with AI-generated prompt
    const enhancedPrompt = LOGO_ENHANCEMENT_PREFIX + AiPrompt;

    // Generate logo using Google Gemini Imagen 4 Ultra API (highest quality)
    const geminiApiKey = process.env.NEXT_GEMINI_API;

    if (!geminiApiKey) {
      throw new Error("Gemini API Key is missing. Please check .env.local");
    }

    const ai = new GoogleGenAI({ apiKey: geminiApiKey });

    const response = await ai.models.generateImages({
      model: 'imagen-4.0-ultra-generate-001',
      prompt: enhancedPrompt,
      config: {
        numberOfImages: 1,
        aspectRatio: '1:1', // Square aspect ratio for logos
      },
    });

    // Get the generated image
    const generatedImage = response.generatedImages[0];
    const imgBytes = generatedImage.image.imageBytes;
    const base64DataUri = `data:image/png;base64,${imgBytes}`;

    return NextResponse.json({
      image: base64DataUri,
      prompt: AiPrompt
    })

  } catch (e) {
    const errorMsg = e.message || 'Failed to generate logo';
    console.error('Error generating logo:', errorMsg, e);
    return NextResponse.json({ error: errorMsg }, { status: 500 })
  }
}