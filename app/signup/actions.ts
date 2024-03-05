"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData) {
	const saltRounds = 10;
	const salt = bcrypt.genSaltSync(saltRounds);

	const hashedPassword = bcrypt.hashSync(
		formData.get("password") as string,
		salt
	);

	await db.insert(users).values({
		firstName: formData.get("firstName") as string,
		lastName: formData.get("lastName") as string,
		email: formData.get("email") as string,
		isAdmin: false,
		passwordHash: hashedPassword,
	});
	redirect("/");
}

export async function checkEmailDuplicated(email: string) {
	const oldUsersResult = await db
		.select({ id: users.id })
		.from(users)
		.where(eq(users.email, email));

	return oldUsersResult.length > 0;
}
