import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const session = await getServerSession();
	const data = await req.json();

	const result = await db
		.update(users)
		.set({ firstName: data.firstName, lastName: data.lastName })
		.where(eq(users.email, session?.user?.email ?? ""));

	return NextResponse.json({
		succeed: true,
		message: "Profile updated successfully! Please login again!",
	});
}
