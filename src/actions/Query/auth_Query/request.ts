"use client";

import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { type ICredentials, signIn, signOut } from "@/actions/auth/action";
import { useAppDispatch } from "@/hooks/storehooks";
import useToastMutation from "@/hooks/useToastMutation";
import { ClearCurrentUser } from "@/lib/store/redux/usersSlice";

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

			dispatch(ClearCurrentUser());
			router.push("/auth/sign-in" as `/${string}`);
		},
		onError: (errorMessage: string) => {
			toast.dismiss();
			if (typeof errorMessage === "string") {
				toast.error(errorMessage); // Display the string error message
			} else {
				console.error("Unexpected error format", errorMessage);
				toast.error("An unknown error occurred."); // Fallback for unrecognized formats
			}
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
				toast.success("logged in successfully");
				router.push("/dashboard/home" as `/${string}`);
			},

			onError: (errorMessage: any) => {
				toast.dismiss();
				if (typeof errorMessage === "object" && errorMessage !== null) {
					const extractedMessage =
						errorMessage?.response?.data?.message || // Try extracting 'message' from response data
						errorMessage?.message || // Fallback to 'message' field
						JSON.stringify(errorMessage); // Convert the entire object to a string if no specific fields are found

					toast.error(extractedMessage); // Display the extracted message
				} else if (typeof errorMessage === "string") {
					toast.error(errorMessage); // Display the string error message
				} else {
					console.error("Unexpected error format", errorMessage);
					toast.error("An unknown error occurred."); // Fallback for unrecognized formats
				}
			},
		}
	);
};
