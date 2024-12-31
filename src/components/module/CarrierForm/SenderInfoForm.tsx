"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import ReusableFormField from "@/components/shared/Form/ReusableFormField";
import ReusablePhoneInputField from "@/components/shared/Form/ReusablePhoneInput";
import ReusableSelectField from "@/components/shared/Form/ReusableSelectField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
	type SenderInfoFormValues,
	createSenderInfoSchema,
} from "@/validation/LedgerValidation";

interface SenderInfoFormProps {
	onFormComplete: (data: SenderInfoFormValues) => void;
}

export default function SenderInfoForm({
	onFormComplete,
}: SenderInfoFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("LedgerForm");
	const senderSchema = createSenderInfoSchema(t);
	const form = useForm<SenderInfoFormValues>({
		resolver: zodResolver(senderSchema),
		defaultValues: {
			sender_name: "",
			sender_phone_number: "",
			sender_email: "",
			sender_address: "",
			sender_type: "INDIVIDUAL",
		},
	});

	function onSubmit(data: SenderInfoFormValues) {
		onFormComplete(data);
		setVisible(false);
		console.log("data to submit", data);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<fieldset className="border p-4 rounded-md bg-background">
					<legend className="text-lg font-semibold">{t("sender_info")}</legend>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-1">
						<ReusableFormField
							control={form.control}
							name="sender_name"
							type="text"
							local="LedgerForm"
							labelKey="fields.sender_name.label"
							placeholderKey="fields.sender_name.placeholder"
							descriptionKey="fields.sender_name.description"
						/>
						<ReusablePhoneInputField
							control={form.control}
							name="sender_phone_number"
							labelKey="fields.sender_phone_number.label"
							placeholderKey="fields.sender_phone_number.placeholder"
							descriptionKey="fields.sender_phone_number.description"
							local="LedgerForm"
						/>
						<ReusableFormField
							control={form.control}
							name="sender_email"
							type="email"
							local="LedgerForm"
							labelKey="fields.sender_email.label"
							placeholderKey="fields.sender_email.placeholder"
							descriptionKey="fields.sender_email.description"
						/>
						<ReusableFormField
							control={form.control}
							name="sender_address"
							type="text"
							local="LedgerForm"
							labelKey="fields.sender_address.label"
							placeholderKey="fields.sender_address.placeholder"
							descriptionKey="fields.sender_address.description"
						/>
						<ReusableSelectField
							control={form.control}
							name="sender_type"
							labelKey="fields.sender_type.label"
							local="LedgerForm"
							placeholderKey="fields.sender_type.placeholder"
							descriptionKey="fields.sender_type.description"
							options={[
								{
									label: t("fields.sender_type.options.INDIVIDUAL"),
									value: "INDIVIDUAL",
								},
								{
									label: t("fields.sender_type.options.ORGANIZATION"),
									value: "ORGANIZATION",
								},
							]}
							onValueChange={(value) => {
								form.setValue(
									"sender_type",
									value as "INDIVIDUAL" | "ORGANIZATION"
								);
							}}
							required
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
