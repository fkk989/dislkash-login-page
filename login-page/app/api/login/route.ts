import { NextResponse, NextRequest } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"


// Handle OPTIONS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    // Connect to MongoDB
    await connectDB()

    // Create new user
    const user = new User({
      email,
      password // Note: In a production environment, you should hash the password
    })

    // Save user to database
    await user.save()

    return NextResponse.json({
      success: true,
      message: "User registered successfully"
    }, {
      status: 200, headers: {
        "Access-Control-Allow-Origin": "*",
      }
    })
  } catch (error: any) {
    console.error("Login error:", error)

    // Handle duplicate email error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 }
    )
  }
}
