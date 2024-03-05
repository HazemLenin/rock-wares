"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { editProfile } from "./actions";

export default function EditProfile() {
	const { data: session, status } = useSession();
	const [updateLoading, setUpdateLoading] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [fields, setFields] = useState({
		firstName: {
			ref: useRef<HTMLInputElement>(null),
			errors: Array<string>(),
		},
		lastName: {
			ref: useRef<HTMLInputElement>(null),
			errors: Array<string>(),
		},
	});

	useEffect(() => {
		if (
			fields.firstName.ref.current !== null &&
			fields.firstName.ref.current.value != null
		)
			fields.firstName.ref.current.value =
				session?.user?.name?.split("|")[0] ?? "";
		if (
			fields.lastName.ref.current !== null &&
			fields.lastName.ref.current.value != null
		)
			fields.lastName.ref.current.value =
				session?.user?.name?.split("|")[1] ?? "";
	}, [status]);

	function onSubmit() {
		setUpdateLoading(true);
		fetch("/api/user/editProfile", {
			method: "post",
			body: JSON.stringify({
				firstName: values.firstName,
				lastName: values.lastName,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.succeed) {
					toast.success(data.message);
					signOut();
				} else {
					toast.error("Something went wrong!");
				}
			})
			.catch((err) => {
				console.error(err);
				toast.error("Something went wrong!");
			})
			.finally(() => setUpdateLoading(false));
	}

	function deleteAccount() {
		setDeleteLoading(true);
		fetch("/api/user/deleteProfile", { method: "post" })
			.then((res) => res.json())
			.then((data) => {
				toast.success(data.message);
				signOut();
			})
			.catch((err) => {
				console.error(err);
				toast.error("Something went wrong!");
			})
			.finally(() => setDeleteLoading(false));
	}

	return (
		<>
			{status === "loading" ? (
				<div className="pt-10 px-2 md:px-20 flex flex-col items-center gap-5">
					<div className="skeleton w-48 md:w-60 h-10 mx-auto"></div>
					<div className="flex flex-col md:flex-row gap-5 w-full">
						<div className="skeleton w-full h-16 mx-auto"></div>
						<div className="skeleton w-full h-16 mx-auto"></div>
					</div>
					<div className="skeleton w-full h-16 mx-auto"></div>
					<div className="skeleton w-full md:w-20 h-10 mx-auto"></div>
				</div>
			) : (
				<form
					action={editProfile}
					onSubmit={handleSubmit}
					className="pt-10 px-2 md:px-20 flex flex-col items-center gap-5"
				>
					<h1 className="text-4xl font-bold text-center">Edit Profile</h1>
					<div className="flex flex-col md:flex-row gap-5 w-full px-4 md:px-0">
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
					<div className="flex flex-col md:flex-row justify-center gap-5 w-full mx-4 md:mx-0">
						<Button type="submit" className="w-full md:w-auto">
							{updateLoading ? (
								<FontAwesomeIcon icon={faCircleNotch} spin />
							) : (
								"Save"
							)}
						</Button>
						<Dialog>
							<DialogTrigger asChild>
								<Button
									type="button"
									variant="destructive"
									className="w-full md:w-auto"
								>
									Delete
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Delete Profile</DialogTitle>
									<DialogDescription>
										Are you sure that you want to delete your profile?
									</DialogDescription>
								</DialogHeader>
								<DialogFooter>
									<Button type="button" onClick={deleteAccount}>
										{deleteLoading ? (
											<FontAwesomeIcon icon={faCircleNotch} spin />
										) : (
											"Delete"
										)}
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</form>
			)}
		</>
	);
}
