"use client";

import { Button } from "@/components/ui/button";
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
	firstName: z.string().min(1, { message: "First name is required." }),
	lastName: z.string().min(1, { message: "Last name is required." }),
	email: z
		.string()
		.email()
		.min(1, { message: "Email is required." })
		.readonly(),
});

export default function EditProfile() {
	const { data: session, status } = useSession();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: session?.user?.name?.split(" ")[0] ?? "",
			lastName: session?.user?.name?.split(" ")[1] ?? "",
			email: session?.user?.email ?? "",
		},
	});
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		form.setValue("firstName", session?.user?.name?.split(" ")[0] ?? "");
		form.setValue("lastName", session?.user?.name?.split(" ")[1] ?? "");
		form.setValue("email", session?.user?.email ?? "");
	}, [status]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		fetch("/api/user/editProfile", {
			method: "post",
			body: JSON.stringify({
				firstName: values.firstName,
				lastName: values.lastName,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				toast.success(data.message);
				router.push("/");
			})
			.catch((err) => {
				console.error(err);
				toast.error("Something went wrong!");
			})
			.finally(() => setLoading(false));
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="pt-10 px-2 flex flex-col items-center gap-5"
				>
					<h1 className="text-4xl font-bold text-center">Edit Profile</h1>
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem className="md:w-full">
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input placeholder="John" {...field} />
								</FormControl>
								<FormDescription></FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem className="md:w-full">
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder="Smith" {...field} />
								</FormControl>
								<FormDescription></FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="md:w-full">
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormDescription>You can't change your email.</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full mx-8">
						{loading ? <FontAwesomeIcon icon={faCircleNotch} spin /> : "Save"}
					</Button>
				</form>
			</Form>
		</>
	);
}
