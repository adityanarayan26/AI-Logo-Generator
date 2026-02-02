
import cloudinary from "@/configs/cloudinary"
import { saveLogoToUser, getUserByEmail } from "@/lib/firestore";
import axios from "axios";
import { NextResponse } from "next/server"

export async function POST(req) {
    const reqBody = await req.json()
    const { logoUrl, email, uid, title, desc } = reqBody

    if (!logoUrl) {
        return NextResponse.json({ error: 'Missing logo URL' }, { status: 400 })
    }

    try {
        let base64DataUri = logoUrl;

        // If it's NOT a data URI, fetch it (legacy/compatibility)
        if (!logoUrl.startsWith('data:')) {
            // Fetch the image from URL
            const response = await axios.get(logoUrl, {
                responseType: 'arraybuffer'
            });

            // Convert to base64 for Cloudinary upload
            const buffer = Buffer.from(response.data, 'binary');
            const base64Image = buffer.toString('base64');
            base64DataUri = `data:image/png;base64,${base64Image}`;
        }

        // Upload to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(base64DataUri, {
            folder: 'ai-logos',
        });

        const secureUrl = cloudinaryResponse.secure_url;

        // Store URL in Firestore
        const logoData = {
            image: secureUrl,
            title: reqBody.title || 'Untitled Logo',
            desc: reqBody.desc || ''
        };

        if (uid) {
            await saveLogoToUser(uid, logoData);
        } else if (email) {
            const user = await getUserByEmail(email);
            if (user) {
                await saveLogoToUser(user.id, logoData);
            }
        }

        return NextResponse.json({
            success: true,
            image: secureUrl
        })
    } catch (e) {
        console.error('Error saving logo:', e);
        return NextResponse.json({ error: e.message || 'Failed to save logo' }, { status: 500 })
    }
}
