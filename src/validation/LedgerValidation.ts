import * as RPNInput from "react-phone-number-input";
import * as z from "zod";

export const createCarrierInfoSchema = (t: (key: string) => string) =>
	z.object({
		carrier_organization_id: z.union([
			z.literal(""),
			z.string().min(2, {
				message: t("fields.carrier_organization_id.error"),
			}),
		]),
		carrier_plate_number: z.union([
			z.literal(""),
			z.string().min(2, {
				message: t("fields.carrier_plate_number.error"),
			}),
		]),

		carrier_person_first_name: z.string().regex(/^[^\d]*$/, {
			message: t("fields.carrier_person_first_name.error"),
		}),

		carrier_person_middle_name: z.string().regex(/^[^\d]*$/, {
			message: t("fields.carrier_person_middle_name.error"),
		}),

		carrier_person_last_name: z.union([
			z.literal(""),
			z.string().regex(/^[^\d]*$/, {
				message: t("fields.carrier_person_last_name.error"),
			}),
		]),

		organization_type: z.enum(["private", "EthioPosta", "DHL", "Other"], {
			invalid_type_error: t("fields.organization_type.error"),
		}),

		carrier_type: z.enum(["INDIVIDUAL", "ORGANIZATION"], {
			invalid_type_error: t("fields.carrier_type.error"),
		}),

		carrier_phone_number: z
			.string()
			.refine((val) => RPNInput.isValidPhoneNumber(val), {
				message: t("fields.carrier_phone_number.error"),
			}),

		delivery_medium: z.union([
			z.literal(""),
			z.enum(["RIDE", "POSTA", "PRIVATE", "MOTOR", "OTHER"], {
				invalid_type_error: t("fields.delivery_medium.error"),
			}),
		]),
		delivery_channel: z.union([
			z.literal(""),
			z.enum(["INPERSON", "DELIVERY"], {
				invalid_type_error: t("fields.delivery_channel.error"),
			}),
		]),
		delivery_organization: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.delivery_organization.error") }),
		]),
		tracking_number: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.tracking_number.error") }),
		]),
	});

export type CarrierInfoFormValues = z.infer<
	ReturnType<typeof createCarrierInfoSchema>
>;

export const createDocumentSchema = (t: (key: string) => string) =>
	z.object({
		document_type: z.enum(["Letter", "Invoice", "Receipt", "Report", "Other"], {
			invalid_type_error: t("fields.document_type.error"),
		}),

		document_date: z.union([
			z.literal(""),
			z.string().min(2, {
				message: t("fields.document_date.error"),
			}),
		]),
		document_owner: z.union([
			z.literal(""),
			z.string().min(2, {
				message: t("fields.document_owner.error"),
			}),
		]),

		additional_message: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.additional_message.error") }),
		]),
		external_reference_id: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.external_reference_id.error") }),
		]),

		metadata: z.object({
			keywords: z.array(z.string()).optional(),
		}),
	});

export type DocumentFormValues = z.infer<
	ReturnType<typeof createDocumentSchema>
>;

export const createSenderInfoSchema = (t: (key: string) => string) =>
	z.object({
		sender_name: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.sender_name.error") }),
		]),
		sender_phone_number: z.union([
			z.literal(""),
			z.string().refine((val) => RPNInput.isValidPhoneNumber(val), {
				message: t("fields.sender_phone_number.error"),
			}),
		]),
		sender_email: z.union([
			z.literal(""),
			z.string().email({ message: t("fields.sender_email.error") }),
		]),
		sender_address: z.union([
			z.literal(""),
			z.string().min(5, { message: t("fields.sender_address.error") }),
		]),
		sender_type: z.enum(["INDIVIDUAL", "ORGANIZATION"], {
			errorMap: () => ({ message: t("fields.sender_type.error") }),
		}),
	});

export type SenderInfoFormValues = z.infer<
	ReturnType<typeof createSenderInfoSchema>
>;

export const createRecipientInfoSchema = (t: (key: string) => string) =>
	z.object({
		recipient_name: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.recipient_name.error") }),
		]),
		recipient_phone_number: z.union([
			z.literal(""),
			z.string().refine((val) => RPNInput.isValidPhoneNumber(val), {
				message: t("fields.recipient_phone_number.error"),
			}),
		]),
		job_title: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.job_title.error") }),
		]),
		department: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.department.error") }),
		]),
		sector: z.union([
			z.literal(""),
			z.string().min(2, { message: t("fields.sector.error") }),
		]),
	});

export type RecipientInfoFormValues = z.infer<
	ReturnType<typeof createRecipientInfoSchema>
>;

export const createDocumentUploadSchema = (t: (key: string) => string) =>
	z.object({
		letters: z
			.array(z.instanceof(File, { message: t("fields.letters.fileTypeError") }))
			.min(1, { message: t("fields.letters.error") })
			.optional(),
		attachments: z
			.array(
				z.instanceof(File, { message: t("fields.attachments.fileTypeError") })
			)
			.min(1, { message: t("fields.attachments.error") })
			.optional(),
	});

export type DocumentUploadFormValues = z.infer<
	ReturnType<typeof createDocumentUploadSchema>
>;
