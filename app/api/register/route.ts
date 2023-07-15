import bcrypt from "bcrypt"
import { db } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {

	try {
		const body = await request.json()
		const { name, email, password } = body

		if (!name || !email || !password) {
			return new NextResponse("Missing required fields", { status: 400 })
		}

		const userExists = await db.user.findUnique({
			where: {
				email,
			},
		})

		if (userExists) {
			return new NextResponse("User already exists", { status: 400 })
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		const user = await db.user.create({
			data: {
				name,
				email,
				hashedPassword,
			},
		})

		return NextResponse.json(user)
	} catch (error) {
		console.error(error, "REGISTRATION_ERROR")
		return new NextResponse("Something went wrong", { status: 500 })
	}
}