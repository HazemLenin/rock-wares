"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function editProfile(data: FormData) {
	const session = await getServerSession();

	await db
		.update(users)
		.set({
			firstName: data.get("firstname") as string,
			lastName: data.get("lastName") as string,
		})
		.where(eq(users.email, session?.user?.email ?? ""));
}

export async function deleteProfile(req: NextRequest) {
	const session = await getServerSession();

	await db.delete(users).where(eq(users.email, session?.user?.email ?? ""));
}
