import { setLedger } from "@/actions/ledger/action";
import useToastMutation from "@/hooks/useToastMutation";

export const useAddLedger = () => {
	return useToastMutation<any>(
		"addLedger",
		setLedger,
		"Sending ledger, please wait...",
		{
			onSuccess: (data, variables) => {
				console.log("Ledger created successfully:", data.message);
				console.log("New Ledger Data:", variables);
			},
			onError: (error) => {
				console.error("Error creating ledger:", error);
			},
		}
	);
};
