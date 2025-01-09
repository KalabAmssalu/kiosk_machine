"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ForgotPasswordFormProps {
	onSubmit: (email: string) => Promise<void>;
}

export default function ForgotPasswordForm({
	onSubmit,
}: ForgotPasswordFormProps) {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			await onSubmit(email);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
			<div className="space-y-2">
				<label htmlFor="email" className="block text-sm font-medium">
					Email Address
				</label>
				<Input
					id="email"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter your email"
					required
					className="w-full"
				/>
			</div>
			<Button type="submit" className="w-full" disabled={isLoading}>
				{isLoading ? "Sending..." : "Reset Password"}
			</Button>
		</form>
	);
}
