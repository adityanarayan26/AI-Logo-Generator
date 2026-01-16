import { AiLogoPrompt } from "@/configs/aimodel"
import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server"
import arcjet, { tokenBucket } from "@arcjet/next";

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
    const AiPromptResult = await AiLogoPrompt.sendMessage(prompt)
    const AiPrompt = JSON.parse(AiPromptResult.response.text()).prompt

    // Generate logo using Hugging Face Inference API via Library
    const hfApiKey = process.env.NEXT_HUGGING_FACE_API_KEY;

    if (!hfApiKey) {
      throw new Error("Hugging Face API Key is missing. Please check .env.local");
    }

    const hf = new HfInference(hfApiKey);
    const MODEL_ID = "stabilityai/stable-diffusion-xl-base-1.0";

    const imageBlob = await hf.textToImage({
      model: MODEL_ID,
      inputs: AiPrompt,
      parameters: {
        negative_prompt: "blurry, low quality, watermark, text",
      }
    });

    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');
    const base64DataUri = `data:image/png;base64,${base64Image}`;

    return NextResponse.json({
      image: base64DataUri,
      prompt: AiPrompt
    })

  } catch (e) {
    const errorMsg = e.message || 'Failed to generate logo';
    console.error('Error generating logo:', errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 500 })
  }
}