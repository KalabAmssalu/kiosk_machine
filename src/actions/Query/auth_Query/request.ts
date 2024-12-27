"use client";

import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { type ICredentials, signIn, signOut } from "@/actions/auth/action";
import { useAppDispatch } from "@/hooks/storehooks";
import useToastMutation from "@/hooks/useToastMutation";

export const useLogout = () => {
	const router = useRouter(); // Initialize the router
	const dispatch = useAppDispatch();
	return useMutation({
		mutationKey: ["signOut"],
		mutationFn: signOut,
		onMutate: () => {
			toast.dismiss();
			toast.loading("በመውጣት ላይ፣ እባክዎን ትንሽ ይጠብቁ...");
		},
		onSuccess: () => {
			toast.dismiss();
			toast.success("Logout... 👋🏾BYE!");

			// dispatch(ClearCurrentUser());
			router.push("/auth/sign-in" as `/${string}`);
		},
		onError: (errorMessage: string) => {
			toast.dismiss();
			toast.error(errorMessage);
		},
	});
};
export const useSignIn = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	return useToastMutation<ICredentials>(
		"signIn",
		signIn,
		"ኢሜልዎን እና የይለፍ ቃልዎን በማረጋገጥ ላይ፣ እባክዎ ይጠብቁ...",
		{
			onSuccess: (variables) => {
				router.push("/dashboard/home" as `/${string}`);
			},
		}
	);
};
