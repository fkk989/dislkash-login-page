import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

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
