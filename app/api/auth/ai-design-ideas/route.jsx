
import { AiDesignIdea } from "@/configs/aimodel"
import { NextResponse } from "next/server"

// Fallback ideas when AI is unavailable
const FALLBACK_IDEAS = [
    { idea: "Abstract geometric symbol" },
    { idea: "Modern typography focus" },
    { idea: "Minimalist icon design" },
    { idea: "Creative wordmark style" },
    { idea: "Dynamic swoosh element" }
];

export async function POST(req) {
    const { prompt } = await req.json()

    try {
        const resp = await AiDesignIdea.sendMessage(prompt)
        const text = resp.response.text();

        // Clean up markdown code blocks if present
        const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
        const parsed = JSON.parse(cleanedText);

        // Ensure we have logo_ideas array
        if (!parsed.logo_ideas || parsed.logo_ideas.length === 0) {
            return NextResponse.json({ logo_ideas: FALLBACK_IDEAS });
        }

        return NextResponse.json(parsed);
    } catch (e) {
        console.error("AI Design Ideas Error:", e.message || e);
        // Return fallback ideas instead of error
        return NextResponse.json({ logo_ideas: FALLBACK_IDEAS });
    }
}