"use client";
import { toast } from "react-toastify";
import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@/components/ui/input";
import { checkEmailDuplicated, createUser } from "./actions";
import { FormEvent, FormEventHandler, useRef, useState } from "react";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export default function Signup() {
	const [checkingEmail, setCheckingEmail] = useState(false);
	const form = useRef<HTMLFormElement>(null);
	const [fields, setFields] = useState({
		firstName: {
			ref: useRef<HTMLInputElement>(null),
			errors: Array<string>(),
		},
		lastName: {
			ref: useRef<HTMLInputElement>(null),
			errors: Array<string>(),
		},
		email: {
			ref: useRef<HTMLInputElement>(null),
			errors: Array<string>(),
		},
		password: {
			ref: useRef<HTMLInputElement>(null),
			errors: Array<string>(),
		},
		confirmPassword: {
			ref: useRef<HTMLInputElement>(null),
			errors: Array<string>(),
		},
	});
	const [loading, setLoading] = useState(false);

	function isValid() {
		return (
			fields.firstName.errors.length == 0 &&
			fields.lastName.errors.length == 0 &&
			fields.email.errors.length == 0 &&
			fields.password.errors.length == 0 &&
			fields.confirmPassword.errors.length == 0
		);
	}

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		setLoading(true);

		if (checkingEmail) {
			setLoading(false);
			return;
		}

		fields.firstName.errors = [];
		fields.lastName.errors = [];
		fields.email.errors = [];
		fields.password.errors = [];
		fields.confirmPassword.errors = [];

		await handleCheckEmail(fields.email.ref.current?.value ?? "");

		console.log("check validation");
		if (fields.firstName.ref.current?.value === "")
			fields.firstName.errors = ["First name is required"];

		if (fields.lastName.ref.current?.value === "")
			fields.lastName.errors = ["Last name is required"];

		if (fields.email.ref.current?.value === "")
			fields.email.errors = ["Email is required"];

		if (fields.password.ref.current?.value === "")
			fields.password.errors = ["Password is required"];

		if (fields.confirmPassword.ref.current?.value === "")
			fields.confirmPassword.errors = ["Confirm password is required"];

		if (!isValid()) {
			setLoading(false);
			return;
		}

		form.current?.submit();
	}

	async function handleCheckEmail(email: string) {
		setCheckingEmail(true);
		const isDuplicated = await checkEmailDuplicated(email);
		fields.email.errors = [];
		if (isDuplicated)
			fields.email.errors = [
				...fields.email.errors,
				"There is already an account with the same email.",
			];
		setCheckingEmail(false);
	}

	return (
		<div className="flex justify-center pt-5 px-2">
			<form
				action={createUser}
				onSubmit={handleSubmit}
				noValidate
				ref={form}
				className="flex flex-col items-center justify-around gap-5 py-5 px-4 w-full md:w-1/3 border rounded-lg"
			>
				<h1 className="text-4xl font-bold">Signup</h1>
				<div className="md:w-full">
					<label htmlFor="firstName" className="mb-2 block">
						First Name
					</label>
					<Input
						className="mb-2"
						name="firstName"
						ref={fields.firstName.ref}
						placeholder="John"
					/>
					{fields.firstName.errors.length > 0 &&
						fields.firstName.errors.map((err) => (
							<p className="text-destructive">{err}</p>
						))}
				</div>

				<div className="md:w-full">
					<label htmlFor="lastName" className="mb-2 block">
						Last Name
					</label>
					<Input
						className="mb-2"
						name="lastName"
						ref={fields.lastName.ref}
						placeholder="Smith"
					/>
					{fields.lastName.errors.length > 0 &&
						fields.lastName.errors.map((err) => (
							<p className="text-destructive">{err}</p>
						))}
				</div>

				<div className="md:w-full">
					<label htmlFor="email" className="mb-2 block">
						Email
					</label>
					<Input
						className="mb-2"
						type="email"
						name="email"
						ref={fields.email.ref}
						onChange={() =>
							handleCheckEmail(fields.email.ref.current?.value ?? "")
						}
						placeholder="user@example.com"
					/>
					{checkingEmail && <p className="text-muted">Checking email...</p>}
					{fields.email.errors.length > 0 &&
						fields.email.errors.map((err) => (
							<p className="text-destructive">{err}</p>
						))}
				</div>

				<div className="md:w-full">
					<label htmlFor="password" className="mb-2 block">
						Password
					</label>
					<Input
						className="mb-2"
						name="password"
						ref={fields.password.ref}
						type="password"
					/>
					{fields.password.errors.length > 0 &&
						fields.password.errors.map((err) => (
							<p className="text-destructive">{err}</p>
						))}
				</div>

				<div className="md:w-full">
					<label htmlFor="confirmPassword" className="mb-2 block">
						Confirm Password
					</label>
					<Input
						className="mb-2"
						name="confirmPassword"
						ref={fields.confirmPassword.ref}
						type="password"
					/>
					{fields.confirmPassword.errors.length > 0 &&
						fields.confirmPassword.errors.map((err) => (
							<p className="text-destructive">{err}</p>
						))}
				</div>

				<Button type="submit" className="w-full mx-4">
					{loading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : "Signup"}
				</Button>
			</form>
		</div>
	);
}
