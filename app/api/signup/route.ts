import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { collection } from '../../../src/mongodb'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        
        // Check if user exists
        const existingUser = await collection.findOne({ name: body.name })
        if (existingUser) {
            return NextResponse.json(
                { error: "This user already exists" },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(body.password, 15)

        // Create new user
        const data = {
            name: body.name,
            password: hashedPassword
        }

        await collection.create(data)
        
        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        )
    } catch (error) {
        console.error("SIGNUP ERROR:", error)
        return NextResponse.json(
            { error: "Unfortunately an error has occurred during the Sign Up process" },
            { status: 500 }
        )
    }
}