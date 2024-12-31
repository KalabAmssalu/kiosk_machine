"use server";

import axiosInstance from "@/actions/axiosInstance";

import getErrorMessage from "../getErrorMessage";

export async function getDepartment() {
	try {
		const response = await axiosInstance.get("departments/");

		return { ok: true, message: "የመምሪያዎች ተገኝቷል!", data: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}
export async function getOneDepartment(id: string) {
	try {
		const response = await axiosInstance.get(`departments/${id}`);
		return { ok: true, message: "የመምሪያዎች ተገኝቷል!", data: response.data };
	} catch (error: any) {
		return { ok: false, message: getErrorMessage(error) };
	}
}

export async function getJobTitle() {
	try {
		const response = await axiosInstance.get("departments/job_titles/");

		return { ok: true, message: "የስራ መደብዎች ተገኝቷል!", data: response.data };
	} catch (error: any) {
		console.log("newwww", error);
		return { ok: false, message: getErrorMessage(error) };
	}
}
