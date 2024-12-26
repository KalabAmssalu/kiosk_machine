"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { ReusableDatePickerField } from "@/components/shared/Form/ReusableDateField";
import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import ReusableTeaxtAreaField from "@/components/shared/Form/ReusableTextAreaField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
	type DocumentFormValues,
	createDocumentSchema,
} from "@/validation/LedgerValidation";

import DocumentMetadataForm from "./DocumentMetadataForm";

interface DocumentInfoFormProps {
	onFormComplete: (data: DocumentFormValues) => void;
}

export default function DocumentInfoForm({
	onFormComplete,
}: DocumentInfoFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("LedgerForm");

	const addressInfoSchema = createDocumentSchema(t);

	const form = useForm<DocumentFormValues>({
		resolver: zodResolver(addressInfoSchema),
		defaultValues: {
			document_type: "Letter",
			document_date: "",
			document_owner: "",
			additional_message: "",
			external_reference_id: "",
			metadata: {
				keywords: [],
			},
		},
	});

	function onSubmit(data: DocumentFormValues) {
		onFormComplete(data);
		setVisible(false);
		console.log("data to submit", data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<fieldset className="border p-4 rounded-md bg-background pb-6">
					<legend className="text-lg font-semibold">{t("DocumentInfo")}</legend>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
						<ReusableFormField
							control={form.control}
							name="document_owner"
							type="text"
							local="LedgerForm"
							labelKey="fields.document_owner.label"
							placeholderKey="fields.document_owner.placeholder"
							descriptionKey="fields.document_owner.description"
						/>
						<ReusableSelectField
							control={form.control}
							name="document_type"
							labelKey="fields.document_type.label"
							local="LedgerForm"
							placeholderKey="fields.document_type.placeholder"
							descriptionKey="fields.document_type.description"
							options={["Letter", "Invoice", "Receipt", "Report", "Other"]}
							onValueChange={(value) =>
								form.setValue(
									"document_type",
									value as "Letter" | "Invoice" | "Receipt" | "Report" | "Other"
								)
							}
							required
						/>

						<ReusableDatePickerField
							control={form.control}
							name="document_date"
							labelKey="fields.document_date.label"
							placeholderKey="fields.document_date.placeholder"
							descriptionKey="fields.document_date.description"
							buttonClassName="custom-button-class"
							local="LedgerForm"
						/>

						<ReusableFormField
							control={form.control}
							name="external_reference_id"
							type="text"
							local="LedgerForm"
							labelKey="fields.external_reference_id.label"
							placeholderKey="fields.external_reference_id.placeholder"
							descriptionKey="fields.external_reference_id.description"
						/>

						<ReusableTeaxtAreaField
							control={form.control}
							name="additional_message"
							type="text"
							local="LedgerForm"
							labelKey="fields.additional_message.label"
							placeholderKey="fields.additional_message.placeholder"
							descriptionKey="fields.additional_message.description"
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
