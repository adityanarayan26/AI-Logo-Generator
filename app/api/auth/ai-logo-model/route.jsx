import { AiLogoPrompt } from "@/configs/aimodel"
import User from "@/configs/usermodel";
import axios from "axios";
import { NextResponse } from "next/server"

export async function POST(req) {
  const { prompt, email } = await req.json()
  try {
    const AiPromptResult = await AiLogoPrompt.sendMessage(prompt)

    const AiPrompt = JSON.parse(AiPromptResult.response.text()).prompt


    //generate logo from ai model
    const response = await axios.post('https://router.huggingface.co/hf-inference/models/strangerzonehf/Flux-Midjourney-Mix2-LoRA', AiPrompt, {
      headers: {
        Authorization: "Bearer " + process.env.NEXT_HUGGING_FACE_API_KEY,
        "Content-Type": "application/json",
      },
      responseType: 'arraybuffer'
    })
    //convert  to base64 image


    const buffer = Buffer.from(response.data, 'binary');
    const Base64Image = buffer.toString('base64');
    const base64ImagewithMime = `data:image/png;base64,${Base64Image}`;
 

    // Store it in the database
    let user = await User.findOne({ email });
    if (user) {
      user.logo.push({ base64Image: base64ImagewithMime });
      await user.save();
    } else {
      // Create a new user if no user exists
      user = await User.create({
        email, // Required field
        logo: [{ base64Image: base64ImagewithMime }],
        // Add fullname if required by schema, or make it optional
        // fullname: "Default Full Name" // Uncomment if needed
      });
    }

    return NextResponse.json({ image: base64ImagewithMime })
  } catch (e) {
    return NextResponse.json({ error: e })
  }

}