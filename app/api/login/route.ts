import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { collection } from '../../../src/mongodb'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        
        // Find user
        const user = await collection.findOne({ name: body.name })
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 400 }
            )
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(body.password, user.password)
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { message: "Login successful" },
            { status: 200 }
        )
    } catch (error) {
        console.error("LOGIN ERROR:", error)
        return NextResponse.json(
            { error: "An error occurred during login" },
            { status: 500 }
        )
    }
} 