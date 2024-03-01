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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	firstName: z.string().min(1, { message: "First name is required." }),
	lastName: z.string().min(1, { message: "Last name is required." }),
	email: z.string().email().min(1, { message: "Email is required." }),
	password: z.string().min(8, {
		message: "The password should be equal to or more than 8 characters.",
	}),
	confirmPassword: z
		.string()
		.min(1, { message: "Password confirmation is required." }),
});

export default function Signup() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<div className="flex justify-center pt-5 px-2">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col items-center justify-around gap-5 py-5 px-4 w-full md:w-1/3 border rounded-lg"
				>
					<h1 className="text-4xl font-bold">Signup</h1>
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem className="md:w-full">
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input placeholder="John" {...field} />
								</FormControl>
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
									<Input placeholder="user@example.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="md:w-full">
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem className="md:w-full">
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input type="password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className="w-full mx-4">
						Singup
					</Button>
				</form>
			</Form>
		</div>
	);
}
