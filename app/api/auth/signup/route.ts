import { db } from "@/db";
import { users } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
	const data = await req.json();

	const saltRounds = 10;
	const salt = bcrypt.genSaltSync(saltRounds);

	const hashedPassword = bcrypt.hashSync(data.password, salt);

	await db.insert(users).values({
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email,
		isAdmin: false,
		passwordHash: hashedPassword,
	});

	return NextResponse.json({ message: "Your've registered successfully!" });
}
