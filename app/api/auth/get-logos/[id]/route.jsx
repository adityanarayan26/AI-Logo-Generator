import { getUserLogos } from "@/lib/firestore";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
        const { id } = await params;

        // Validate id
        if (!id) {
            return NextResponse.json(
                { error: "id is required" },
                { status: 400 }
            );
        }

        // Get logos from Firestore
        const logos = await getUserLogos(id);

        return NextResponse.json({ logos });
    } catch (e) {
        console.error("Error in GET /api/auth/get-logos/[id]:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}