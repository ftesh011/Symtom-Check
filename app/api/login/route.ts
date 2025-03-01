import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { collection } from '../../../src/mongodb'
import { sign } from 'jsonwebtoken'

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

        // Creation of the token when user is signedup/loggedin
        const token = sign( 
            {userid: user._id.toString()},
            process.env.JWT_SECRET || 'your-fallback-secret',
        )
        const response=NextResponse.json(
            { message: "Login successful", token },
            { status: 200 }
        )
        // Session token 
        response.cookies.set('session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 365*24*60*60 // for the token activation to last for a year which is an appropriate time
        })
        return response
    } catch (error) {
        console.error("LOGIN ERROR:", error)
        return NextResponse.json(
            { error: "An error occurred during login" },
            { status: 500 }
        )
    }
} 