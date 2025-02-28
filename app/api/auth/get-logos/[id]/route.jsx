import User from "@/configs/usermodel";
import { NextResponse } from "next/server";

export async function GET(req,{ params }) {
    try {
   

        // Destructure id from params, with a fallback
        const { id } = await params 


        // Validate id
        if (!id) {
            return NextResponse.json(
                { error: "id is required" },
                { status: 400 }
            );
        }

        // Find the user by ID and select only the logo field
        const user = await User.findById(id).select("logo");
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Return the logos (or an empty array if no logos exist)
        return NextResponse.json({ logos: user.logo || [] });
    } catch (e) {
        console.error("Error in GET /api/auth/get-logos/[id]:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}