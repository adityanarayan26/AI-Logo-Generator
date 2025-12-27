import { AiLogoPrompt } from "@/configs/aimodel"
import cloudinary from "@/configs/cloudinary"
import { saveLogoToUser, getUserByEmail } from "@/lib/firestore";
import axios from "axios";
import { NextResponse } from "next/server"

export async function POST(req) {
  const { prompt, email, uid } = await req.json()

  try {
    const AiPromptResult = await AiLogoPrompt.sendMessage(prompt)
    const AiPrompt = JSON.parse(AiPromptResult.response.text()).prompt

    // Generate logo using Pollinations.ai (Reliable free alternative)
    // We encode the prompt to ensure it's URL safe
    const encodedPrompt = encodeURIComponent(AiPrompt);
    const response = await axios.get(
      `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`,
      {
        responseType: 'arraybuffer'
      }
    )

    // Upload to Cloudinary
    // Pollinations returns binary buffer which we can upload directly or via base64
    // Cloudinary upload_stream supports buffer
    // Or uploading base64 data URI

    // Convert to base64 for Cloudinary upload
    const buffer = Buffer.from(response.data, 'binary');
    const base64Image = buffer.toString('base64');
    const base64DataUri = `data:image/png;base64,${base64Image}`;

    // Upload to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(base64DataUri, {
      folder: 'ai-logos',
    });

    const logoUrl = cloudinaryResponse.secure_url;

    // Store URL in Firestore
    if (uid) {
      await saveLogoToUser(uid, logoUrl);
    } else if (email) {
      // Fallback: find user by email
      const user = await getUserByEmail(email);
      if (user) {
        await saveLogoToUser(user.id, logoUrl);
      }
    }

    return NextResponse.json({
      image: logoUrl
    })
  } catch (e) {
    console.error('Error generating logo:', e);
    return NextResponse.json({ error: e.message || 'Failed to generate logo' }, { status: 500 })
  }
}