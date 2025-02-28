import LogoDesc from "@/app/create/_components/LogoDesc";
import { ConnectDb } from "@/configs/db"; // Ensure this path is correct (e.g., "@/utils/ConnectDb")
import User from "@/configs/usermodel"; // Ensure this path matches your User model location

export async function POST(req) {
  try {
    // Connect to MongoDB
    await ConnectDb();

    // Parse the request body as JSON
    const { email, fullname } = await req.json();

    // Validate required fields
    if (!email || !fullname) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email and fullname are required",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if user already exists (to prevent duplicate emails)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User with this email already exists",
          user: {
            id: existingUser._id,
            fullname: existingUser.fullname,
            email: existingUser.email,
            credit: existingUser.credit,
            createdAt: existingUser.createdAt,
          },
        }),
        {
          status: 200, // Use 200 for existing user (informative response)
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create a new user with fullname, email, and default credit (5)
    const user = await User.create({
      fullname,
      email,
      credit: 5,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "User created successfully",
        user: {
          id: user._id,
          fullname: user.fullname,
          email: user.email,
          credit: user.credit,
          createdAt: user.createdAt,
        },
      }),
      {
        status: 201, // Use 201 for resource creation
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating user:", error);

    // Handle specific MongoDB duplicate key error (E11000)
    if (error.name === "MongoServerError" && error.code === 11000) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User with this email already exists",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "Server error while creating user",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

}