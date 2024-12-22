"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import {
	type MemberInfoFormValues,
	createMemeberInfoSchema,
} from "@/validation/LedgerValidation";

import KioskFileUploadField from "./KioskFileUploadField";
import KioskFormField from "./KioskFormField";
import KioskPhoneInputField from "./KioskPhoneInputField";
import KioskSelectField from "./KioskSelectField";

export default function KioskMemberForm() {
	const t = useTranslations("LedgerForm");
	const memberInfoSchema = createMemeberInfoSchema(t);
	const [step, setStep] = useState(0);
	const [progress, setProgress] = useState(0);

	const form = useForm<MemberInfoFormValues>({
		resolver: zodResolver(memberInfoSchema),
		defaultValues: {
			id_number: "",
			organization_name: "",
			organization_type: "",
			first_name: "",
			middle_name: "",
			last_name: "",
			gender: "male",
			phone_number: "",
			letter: null,
		},
	});

	const steps = [
		{
			title: t("personal_information"),
			fields: [
				"first_name",
				"middle_name",
				"last_name",
				"id_number",
				"gender",
			] as const,
		},
		{
			title: t("organization_information"),
			fields: ["organization_type", "organization_name"] as const,
		},
		{
			title: t("contact_information"),
			fields: ["phone_number"] as const,
		},
		{ title: t("document_upload"), fields: ["letter"] as const },
	];

	const onSubmit = (data: MemberInfoFormValues) => {
		console.log("Submitted data:", data);
		// Handle form submission
	};

	const nextStep = () => {
		const fields = steps[step].fields;
		const isStepValid = fields.every(
			(field) =>
				form.getFieldState(field).isDirty && !form.getFieldState(field).error
		);

		if (isStepValid) {
			setStep((prev) => Math.min(prev + 1, steps.length - 1));
			setProgress((prev) => Math.min(prev + 100 / steps.length, 100));
		} else {
			form.trigger(fields as any);
		}
	};

	const prevStep = () => {
		setStep((prev) => Math.max(prev - 1, 0));
		setProgress((prev) => Math.max(prev - 100 / steps.length, 0));
	};

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle className="text-3xl font-bold text-center">
					{steps[step].title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Progress value={progress} className="w-full mb-6" />
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						{step === 0 && (
							<>
								<KioskFormField
									control={form.control}
									name="first_name"
									labelKey="fields.first_name.label"
									placeholderKey="fields.first_name.placeholder"
								/>
								<KioskFormField
									control={form.control}
									name="middle_name"
									labelKey="fields.middle_name.label"
									placeholderKey="fields.middle_name.placeholder"
								/>
								<KioskFormField
									control={form.control}
									name="last_name"
									labelKey="fields.last_name.label"
									placeholderKey="fields.last_name.placeholder"
								/>
								<KioskFormField
									control={form.control}
									name="id_number"
									labelKey="fields.id_number.label"
									placeholderKey="fields.id_number.placeholder"
								/>
								<KioskSelectField
									control={form.control}
									name="gender"
									labelKey="fields.gender.label"
									options={[
										{ label: t("fields.gender.options.male"), value: "male" },
										{
											label: t("fields.gender.options.female"),
											value: "female",
										},
										{
											label: t("fields.gender.options.not_prefer_to_say"),
											value: "not_prefer_to_say",
										},
									]}
								/>
							</>
						)}
						{step === 1 && (
							<>
								<KioskSelectField
									control={form.control}
									name="organization_type"
									labelKey="fields.organization_type.label"
									options={[
										{
											label: t("fields.organization_type.options.private"),
											value: "private",
										},
										{
											label: t("fields.organization_type.options.EthioPosta"),
											value: "EthioPosta",
										},
										{
											label: t("fields.organization_type.options.DHL"),
											value: "DHL",
										},
										{
											label: t("fields.organization_type.options.other"),
											value: "Other",
										},
									]}
								/>
								<KioskFormField
									control={form.control}
									name="organization_name"
									labelKey="fields.organization_name.label"
									placeholderKey="fields.organization_name.placeholder"
								/>
							</>
						)}
						{step === 2 && (
							<>
								<KioskPhoneInputField
									control={form.control}
									name="phone_number"
									labelKey="fields.phone_number.label"
									placeholderKey="fields.phone_number.placeholder"
								/>
							</>
						)}
						{step === 3 && (
							<KioskFileUploadField
								control={form.control}
								name="letter"
								labelKey="fields.letter.label"
								descriptionKey="fields.letter.description"
							/>
						)}
						<div className="flex justify-between mt-8">
							<Button
								type="button"
								onClick={prevStep}
								disabled={step === 0}
								className="text-2xl py-6 px-8"
							>
								Previous
							</Button>
							{step < steps.length - 1 ? (
								<Button
									type="button"
									onClick={nextStep}
									className="text-2xl py-6 px-8 bg-blue-500 hover:bg-blue-600"
								>
									Next
								</Button>
							) : (
								<Button
									type="submit"
									className="text-2xl py-6 px-8 bg-green-500 hover:bg-green-600"
								>
									Submit
								</Button>
							)}
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
