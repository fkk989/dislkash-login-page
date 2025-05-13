import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB()

    // Fetch all users
    const users = await User.find()

    return NextResponse.json({ 
      success: true, 
      data: users 
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json(
      { success: false, message: "Error fetching users" },
      { status: 500 }
    )
  }
} 