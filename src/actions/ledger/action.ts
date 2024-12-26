"use server";

import axiosInstance from "@/actions/axiosInstance";
import { type ledgerType } from "@/types/CarrierType";

import getErrorMessage from "../getErrorMessage";

export async function setLedger(data: ledgerType) {
	try {
		const response = await axiosInstance.post("ledgers/incoming/create/", data);

		return {
			ok: true,
			message: "አዲስ መዝገብ በተሳካ ሁኔታ ፈጥረዋል!",
			data: response.data,
		};
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
