import { NextRequest, NextResponse } from "next/server"
import db from '@/libs/db'
import bcrypt from 'bcryptjs'

interface UserData {
    id: number,
    username: string;
    email: string;
    password: string;
}

export async function POST(request: NextRequest) {
    try {
        const data: UserData = await request.json()
        const { username, email, password } = data

        console.log({ data })

        const userFound = await db.user.findUnique({
            where: {
                username
            }
        })
        const emailFound = await db.user.findUnique({
            where: {
                email: email
            }
        })

        if (userFound) {
            return NextResponse.json({
                message: 'Username already exists'
            }, {
                status: 400
            })
        }
        if (emailFound) {
            return NextResponse.json({
                message: 'Email already exists'
            }, {
                status: 400
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await db.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        // const { password: _, ...user } = newUser
        return NextResponse.json(newUser)
    } catch (error: unknown) {
        console.log({ error })
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message,
            }, { status: 500 });
        }

        return NextResponse.json({
            message: "An unknown error occurred",
        }, { status: 500 });

    }
}