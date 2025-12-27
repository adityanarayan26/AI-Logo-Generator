import { createOrGetUser } from "@/lib/firestore";

export async function POST(req) {
  try {
    const { uid, email, fullname } = await req.json();

    // Validate required fields
    if (!uid || !email) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "UID and email are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create or get user from Firestore
    const user = await createOrGetUser(uid, email, fullname || 'User');

    return new Response(
      JSON.stringify({
        success: true,
        message: "User synced successfully",
        user: {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          createdAt: user.createdAt,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error syncing user:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Server error while syncing user",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}