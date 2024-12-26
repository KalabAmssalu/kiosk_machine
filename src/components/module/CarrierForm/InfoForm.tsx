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
	type CarrierInfoFormValues,
	createCarrierInfoSchema,
} from "@/validation/LedgerValidation";

interface CarrierInfoFormProps {
	onFormComplete: (data: CarrierInfoFormValues) => void;
}

export default function CarrierInfoForm({
	onFormComplete,
}: CarrierInfoFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("LedgerForm");
	const organizationInfoSchema = createCarrierInfoSchema(t);
	// const DataInfo = useAppSelector((state) => state.ledger.ledgers[0]);

	const form = useForm<CarrierInfoFormValues>({
		resolver: zodResolver(organizationInfoSchema),
		defaultValues: {
			carrier_person_first_name: "",
			carrier_person_middle_name: "",
			carrier_person_last_name: "",
			carrier_phone_number: "",
			carrier_type: "Individual",
			carrier_organization_id: "",
			carrier_plate_number: "",
			organization_type: "private",
			delivery_medium: "POSTA",
			delivery_channel: "DELIVERY",
			delivery_organization: "",
			tracking_number: "",
		},
	});

	function onSubmit(data: CarrierInfoFormValues) {
		onFormComplete(data);
		console.log("submitted data 1", data);
		setVisible(false);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<fieldset className="border p-4 rounded-md bg-background ">
					<legend className="text-lg font-semibold">
						{t("carrier_information")}
					</legend>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
						<ReusableFormField
							control={form.control}
							name="carrier_person_first_name"
							type="text"
							local="LedgerForm"
							labelKey="fields.carrier_person_first_name.label"
							placeholderKey="fields.carrier_person_first_name.placeholder"
							descriptionKey="fields.carrier_person_first_name.description"
							required
							isRequired={true}
						/>
						<ReusableFormField
							control={form.control}
							name="carrier_person_middle_name"
							type="text"
							local="LedgerForm"
							labelKey="fields.carrier_person_middle_name.label"
							placeholderKey="fields.carrier_person_middle_name.placeholder"
							descriptionKey="fields.carrier_person_middle_name.description"
							required
							isRequired={true}
						/>
						<ReusableFormField
							control={form.control}
							name="carrier_person_last_name"
							type="text"
							local="LedgerForm"
							labelKey="fields.carrier_person_last_name.label"
							placeholderKey="fields.carrier_person_last_name.placeholder"
							descriptionKey="fields.carrier_person_last_name.description"
							required
							isRequired={true}
						/>
						<ReusablePhoneInputField
							control={form.control}
							name="carrier_phone_number"
							labelKey="fields.carrier_phone_number.label"
							placeholderKey="fields.carrier_phone_number.placeholder"
							descriptionKey="fields.carrier_phone_number.description"
							local="LedgerForm"
						/>
						<ReusableSelectField
							control={form.control}
							name="delivery_channel"
							labelKey="fields.delivery_channel.label"
							local="LedgerForm"
							placeholderKey="fields.delivery_channel.placeholder"
							descriptionKey="fields.delivery_channel.description"
							options={[
								{
									label: t("fields.delivery_channel.options.INPERSON"),
									value: "INPERSON",
								},
								{
									label: t("fields.delivery_channel.options.DELIVERY"),
									value: "DELIVERY",
								},
							]}
							onValueChange={(value) => {
								form.setValue(
									"delivery_channel",
									value as "INPERSON" | "DELIVERY"
								);
							}}
							required
						/>

						<ReusableSelectField
							control={form.control}
							name="carrier_type"
							labelKey="fields.carrier_type.label"
							local="LedgerForm"
							placeholderKey="fields.carrier_type.placeholder"
							descriptionKey="fields.carrier_type.description"
							options={[
								{
									label: t("fields.carrier_type.options.Individual"),
									value: "Individual",
								},
								{
									label: t("fields.carrier_type.options.Organization"),
									value: "Organization",
								},
							]}
							onValueChange={(value) => {
								form.setValue(
									"carrier_type",
									value as "Individual" | "Organization"
								);
							}}
							required
						/>

						<ReusableSelectField
							control={form.control}
							name="organization_type"
							labelKey="fields.organization_type.label"
							local="LedgerForm"
							placeholderKey="fields.organization_type.placeholder"
							descriptionKey="fields.organization_type.description"
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
									label: t("fields.organization_type.options.Other"),
									value: "Other",
								},
							]}
							onValueChange={(value) => {
								form.setValue(
									"organization_type",
									value as "private" | "EthioPosta" | "DHL" | "Other"
								);
							}}
							required
						/>

						<ReusableSelectField
							control={form.control}
							name="delivery_medium"
							labelKey="fields.delivery_medium.label"
							local="LedgerForm"
							placeholderKey="fields.delivery_medium.placeholder"
							descriptionKey="fields.delivery_medium.description"
							options={[
								{
									label: t("fields.delivery_medium.options.RIDE"),
									value: "RIDE",
								},
								{
									label: t("fields.delivery_medium.options.POSTA"),
									value: "POSTA",
								},
								{
									label: t("fields.delivery_medium.options.PRIVATE"),
									value: "PRIVATE",
								},
								{
									label: t("fields.delivery_medium.options.MOTOR"),
									value: "MOTOR",
								},
								{
									label: t("fields.delivery_medium.options.OTHER"),
									value: "OTHER",
								},
							]}
							onValueChange={(value) => {
								form.setValue(
									"delivery_medium",
									value as "RIDE" | "POSTA" | "PRIVATE" | "MOTOR" | "OTHER"
								);
							}}
							required
						/>

						<ReusableFormField
							control={form.control}
							name="carrier_plate_number"
							labelKey="fields.carrier_plate_number.label"
							placeholderKey="fields.carrier_plate_number.placeholder"
							descriptionKey="fields.carrier_plate_number.description"
							required
							type="text"
							local="LedgerForm"
						/>
						<ReusableFormField
							control={form.control}
							name="carrier_organization_id"
							labelKey="fields.carrier_organization_id.label"
							placeholderKey="fields.carrier_organization_id.placeholder"
							descriptionKey="fields.carrier_organization_id.description"
							required
							type="text"
							local="LedgerForm"
						/>
						<ReusableFormField
							control={form.control}
							name="tracking_number"
							labelKey="fields.tracking_number.label"
							placeholderKey="fields.tracking_number.placeholder"
							descriptionKey="fields.tracking_number.description"
							required
							type="text"
							local="LedgerForm"
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
