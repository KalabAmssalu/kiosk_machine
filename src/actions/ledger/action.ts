"use server";

import axiosInstance from "@/actions/axiosInstance";
import { type APIResponseType } from "@/hooks/useToastMutation";

import getErrorMessage from "../getErrorMessage";

// export async function setLedger(data: ledgerType) {
// 	try {
// 		const response = await axiosInstance.post("ledgers/incoming/create/", data);

// 		return {
// 			ok: true,
// 			message: "አዲስ መዝገብ በተሳካ ሁኔታ ፈጥረዋል!",
// 			data: response.data,
// 		};
// 	} catch (error: any) {
// 		return { ok: false, message: getErrorMessage(error) };
// 	}
// }

export const setLedger = async (
	formData: FormData
): Promise<APIResponseType> => {
	try {
		formData.forEach((value, key) => {
			console.log("key, value", key, value);
		});

		const response = await axiosInstance.post("ledgers/create", formData, {
			headers: {
				"Content-Type": "multipart/form-data", // Ensure the correct content type
			},
		});
		console.log("response", response);

		return {
			ok: response.status >= 200 && response.status < 300,
			message: response.data?.message || "አዲስ መዝገብ በተሳካ ሁኔታ ፈጥረዋል!",
			data: response.data?.data,
		};
	} catch (error: any) {
		console.log("error", error);
		return { ok: false, message: getErrorMessage(error) };
	}
};
