
import { AiDesignIdea } from "@/configs/aimodel"
import { NextResponse } from "next/server"

export async function POST(req) {
    const { prompt } = await req.json()
    try {
        const resp = await AiDesignIdea.sendMessage(prompt)
        return NextResponse.json(JSON.parse(resp.response.text()))
    } catch (e) {
        return NextResponse.json({ error: e })
    }
}