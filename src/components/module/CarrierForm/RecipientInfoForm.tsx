"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import ReusablePhoneInputField from "@/components/shared/Form/ReusablePhoneInput";
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

	function onSubmit(data: RecipientInfoFormValues) {
		onFormComplete(data);
		setVisible(false);
		console.log("data to submit", data);
	}

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
						<ReusableFormField
							control={form.control}
							name="job_title"
							type="text"
							local="LedgerForm"
							labelKey="fields.job_title.label"
							placeholderKey="fields.job_title.placeholder"
							descriptionKey="fields.job_title.description"
						/>
						<ReusableFormField
							control={form.control}
							name="department"
							type="text"
							local="LedgerForm"
							labelKey="fields.department.label"
							placeholderKey="fields.department.placeholder"
							descriptionKey="fields.department.description"
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
