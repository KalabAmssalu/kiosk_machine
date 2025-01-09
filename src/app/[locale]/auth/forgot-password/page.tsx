"use client";

import { toast } from "sonner";

import { forgotPassword } from "@/actions/auth/action";
import ForgotPasswordForm from "@/components/screen/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
	const handleSubmit = async (email: string) => {
		try {
			const result = await forgotPassword(email);
			if (result.ok) {
				toast.success(result.message);
			} else {
				toast.error(result.message);
			}
		} catch (error) {
			toast.error("An error occurred. Please try again.");
		}
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-2xl font-bold mb-6">Forgot Password</h1>
			<ForgotPasswordForm onSubmit={handleSubmit} />
		</div>
	);
}
