import { AiLogoPrompt } from "@/configs/aimodel"
import { saveLogoToUser, getUserByEmail } from "@/lib/firestore";
import axios from "axios";
import { NextResponse } from "next/server"

export async function POST(req) {
  const { prompt, email, uid } = await req.json()

  try {
    const AiPromptResult = await AiLogoPrompt.sendMessage(prompt)
    const AiPrompt = JSON.parse(AiPromptResult.response.text()).prompt

    // Generate logo from AI model
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell',
      { inputs: AiPrompt },
      {
        headers: {
          Authorization: "Bearer " + process.env.NEXT_HUGGING_FACE_API_KEY,
          "Content-Type": "application/json",
        },
        responseType: 'arraybuffer'
      }
    )

    // Convert to base64 image
    const buffer = Buffer.from(response.data, 'binary');
    const Base64Image = buffer.toString('base64');
    const base64ImagewithMime = `data:image/png;base64,${Base64Image}`;

    // Store it in Firestore
    if (uid) {
      await saveLogoToUser(uid, base64ImagewithMime);
    } else if (email) {
      // Fallback: find user by email
      const user = await getUserByEmail(email);
      if (user) {
        await saveLogoToUser(user.id, base64ImagewithMime);
      }
    }

    return NextResponse.json({
      image: { base64Image: base64ImagewithMime }
    })
  } catch (e) {
    console.error('Error generating logo:', e);
    return NextResponse.json({ error: e.message || 'Failed to generate logo' }, { status: 500 })
  }
}