
import { AiLogoDescription } from "@/configs/aimodel"
import { NextResponse } from "next/server"

export async function POST(req) {
    const { prompt } = await req.json()

    // Check if Gemini API key is configured
    if (!process.env.NEXT_GEMINI_API) {
        console.error("AI Description Error: NEXT_GEMINI_API key is missing");
        return NextResponse.json({
            description: "A modern, innovative brand focused on quality and excellence."
        });
    }

    try {
        const resp = await AiLogoDescription.sendMessage(prompt)
        const text = resp.response.text();

        // Clean up markdown code blocks if present (Gemini often returns ```json ... ```)
        const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();

        const parsed = JSON.parse(cleanedText);

        if (!parsed.description) {
            return NextResponse.json({
                description: "A professional, forward-thinking brand committed to delivering value and innovation."
            });
        }

        return NextResponse.json(parsed)
    } catch (e) {
        console.error("AI Description Error:", e.message || e);
        // Return a fallback description instead of an error
        return NextResponse.json({
            description: "A dynamic and creative brand built on trust, innovation, and passion for excellence."
        });
    }
}
