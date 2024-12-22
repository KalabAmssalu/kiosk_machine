"use client";

import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Import the useSignIn hook

export function LoginForm() {
	const t = useTranslations("Login");
	const router = useRouter();
	// const { mutate: signIn } = useSignIn(); // Use the signIn mutation

	const handleSubmit = async (event: any) => {
		event.preventDefault();
		router.push("/dashboard/home" as `/${string}`);
		console.log("signIn");
		const username = event.target.email.value;
		const password = event.target.password.value;

		const data = {
			username,
			password,
		};

		// signIn(data);
	};

	return (
		<Card className="mx-auto w-96 h-80">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl">{t("loginTitle")}</CardTitle>
				<CardDescription>{t("loginPrompt")}</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="grid gap-2">
					<div className="grid gap-2">
						<Label htmlFor="email">{t("email")}</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="m@example.com"
							required
						/>
					</div>
					<div className="grid gap-2">
						<div className="flex items-center">
							<Label htmlFor="password">{t("password")}</Label>
							<Button
								variant={"link"}
								size={"sm"}
								// onClick={() => router.push("/auth/forgot-password")}
								className="ml-auto p-0 inline-block text-sm underline"
							>
								{t("forgotPassword")}
							</Button>
						</div>
						<Input id="password" name="password" type="password" required />
					</div>
					<Button type="submit" className="w-full">
						{t("login")}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
