
import { AiStyleSelector } from "@/configs/aimodel"
import { NextResponse } from "next/server"

export async function POST(req) {
    const { prompt } = await req.json()
    try {
        const resp = await AiStyleSelector.sendMessage(prompt)
        const text = resp.response.text();

        // Clean up markdown code blocks
        const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();

        return NextResponse.json(JSON.parse(cleanedText))
    } catch (e) {
        console.error("AI Style Selector Error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}
