"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { useFetchDepartments } from "@/actions/Query/organization_query/departmentQuery";
import { useFetchJobtitles } from "@/actions/Query/organization_query/jobTitleQuery";
import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import ReusablePhoneInputField from "@/components/shared/Form/ReusablePhoneInput";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
	type RecipientInfoFormValues,
	createRecipientInfoSchema,
} from "@/validation/LedgerValidation";

interface RecipientInfoFormProps {
	onFormComplete: (data: RecipientInfoFormValues) => void;
}

export default function RecipientInfoForm({
	onFormComplete,
}: RecipientInfoFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("LedgerForm");
	const contactPersonSchema = createRecipientInfoSchema(t);

	// React Query hooks for departments and job titles
	const { data: departments, isSuccess: departmentsLoaded } =
		useFetchDepartments();
	const { data: jobTitles, isSuccess: jobTitlesLoaded } = useFetchJobtitles();

	// Form setup
	const form = useForm<RecipientInfoFormValues>({
		resolver: zodResolver(contactPersonSchema),
		defaultValues: {
			recipient_name: "",
			recipient_phone_number: "",
			job_title: "",
			department: "",
			sector: "",
		},
	});

	// Submit handler
	function onSubmit(data: RecipientInfoFormValues) {
		onFormComplete(data);
		setVisible(false);
		console.log("data to submit", data);
	}

	// Transform data for dropdown options
	const departmentOptions =
		departmentsLoaded && departments
			? departments.map((dept) => ({
					label: dept.department_name_en,
					value: dept.id,
				}))
			: [];

	const jobTitleOptions =
		jobTitlesLoaded && jobTitles
			? jobTitles.map((job) => ({
					label: job.title_en,
					value: job.id, // Ensure this is unique
				}))
			: [];
	// console.log("Job title options:", jobTitleOptions);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<fieldset className="border p-4 rounded-md bg-background">
					<legend className="text-lg font-semibold">
						{t("recipient_info")}
					</legend>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-1">
						<ReusableFormField
							control={form.control}
							name="recipient_name"
							type="text"
							local="LedgerForm"
							labelKey="fields.recipient_name.label"
							placeholderKey="fields.recipient_name.placeholder"
							descriptionKey="fields.recipient_name.description"
						/>
						<ReusablePhoneInputField
							control={form.control}
							name="recipient_phone_number"
							labelKey="fields.recipient_phone_number.label"
							placeholderKey="fields.recipient_phone_number.placeholder"
							descriptionKey="fields.recipient_phone_number.description"
							local="LedgerForm"
						/>
						<ReusableSelectField
							control={form.control}
							name="job_title"
							options={jobTitleOptions}
							local="LedgerForm"
							labelKey="fields.job_title.label"
							placeholderKey="fields.job_title.placeholder"
							descriptionKey="fields.job_title.description"
							onValueChange={(value) => {
								form.setValue("job_title", value); // Update the form value
								console.log("Selected job title value:", value);
							}}
							required
						/>

						<ReusableSelectField
							control={form.control}
							name="department"
							options={departmentOptions}
							local="LedgerForm"
							labelKey="fields.department.label"
							placeholderKey="fields.department.placeholder"
							descriptionKey="fields.department.description"
							onValueChange={(value) => {
								form.setValue("department", value); // Update the form value
							}}
							required
						/>

						<ReusableFormField
							control={form.control}
							name="sector"
							type="text"
							local="LedgerForm"
							labelKey="fields.sector.label"
							placeholderKey="fields.sector.placeholder"
							descriptionKey="fields.sector.description"
						/>
					</div>
				</fieldset>

				{visible && (
					<div className="flex w-full justify-end items-end">
						<Button type="submit" className="bg-green-500 flex items">
							Save and Continue
						</Button>
					</div>
				)}
			</form>
		</Form>
	);
}
