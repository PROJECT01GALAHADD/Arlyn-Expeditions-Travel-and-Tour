"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
	username: z.string().min(1, "Username is required"),
	password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
	const router = useRouter();
	const [error, setError] = useState("");

	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginFormData) => {
		try {
			setError("");
			const result = await signIn("credentials", {
				username: data.username,
				password: data.password,
				redirect: false,
			});

			if (result?.error) {
				setError("Invalid username or password");
			} else {
				router.push("/admin");
				router.refresh();
			}
		} catch (err) {
			setError("An error occurred. Please try again.");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4">
			<Card className="w-full max-w-md p-8">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold mb-2">Operator Login</h1>
					<p className="text-muted-foreground">
						Access the tour operator dashboard
					</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="operator" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="••••••••" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{error && <p className="text-sm text-destructive">{error}</p>}

						<Button type="submit" className="w-full" size="lg">
							Sign In
						</Button>
					</form>
				</Form>
			</Card>
		</div>
	);
}
