"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { getDepartment, getOneDepartment } from "@/actions/organization/action";
import useToastMutation from "@/hooks/useToastMutation";
import {
	type DepartmentListType,
	type DepartmentType,
	type DepartmentTypeToUpdate,
} from "@/types/DepartmentType";

export const useFetchDepartments = () => {
	return useQuery<DepartmentListType[]>({
		queryKey: ["departments"],
		queryFn: async () => {
			try {
				const data = await getDepartment();
				// console.log("data",data);
				return data.data.departments;
			} catch (error: any) {
				// console.log("error",error);
				toast.error(error.message);
				throw error;
			}
		},
		enabled: true,
	});
};
export const useFetchOneDepartments = (id: string, enabled: boolean = true) => {
	return useQuery<DepartmentTypeToUpdate>({
		queryKey: ["Onedepartments"],
		queryFn: async () => {
			try {
				const data = await getOneDepartment(id);
				return data.data.department;
			} catch (error: any) {
				toast.error(error.message);
				throw error;
			}
		},
		enabled: enabled,
	});
};
