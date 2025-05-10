"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getJobTitle } from "@/actions/organization/action";
import useToastMutation from "@/hooks/useToastMutation";
import { type JobTitleListType } from "@/types/DepartmentType";

export const useFetchJobtitles = () => {
	return useQuery<JobTitleListType[]>({
		queryKey: ["alljobtitles"],
		queryFn: async () => {
			try {
				const data = await getJobTitle();
				// console.log("datajob",data)
				return data.data.job_titles;
			} catch (error: any) {
				// console.log("error",error);
				toast.error(error.message);
				throw error; // Rethrow the error to allow React Query to handle it
			}
		},
		enabled: true,
	});
};
