import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/Users";

export async function POST(request:NextRequest) {
  try {
    const {email, password} = await request.json()
    if(!email || !password){
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 404 }
      )
    }

    await connectToDatabase()
    const existingUser = await User.findOne({email})
    if(existingUser){
      return NextResponse.json(
        { error: 'Email is already registered' },
        { status: 404 }
      )
    }

    await User.create({
      email,
      password
    })

    return NextResponse.json(
      { Message: 'User registered successfully' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { Message: 'Failed to register user' },
      { status: 500 }
    )
  }
}