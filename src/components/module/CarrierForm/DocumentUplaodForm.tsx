"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import ReusableFileUploadField from "@/components/shared/Form/ReusableFileField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
	type DocumentUploadFormValues,
	createDocumentUploadSchema,
} from "@/validation/LedgerValidation";

interface DocumentUploadFormProps {
	onFileComplete: (letters: File[], attachments: File[]) => void;
}

export default function DocumentUploadForm({
	onFileComplete,
}: DocumentUploadFormProps) {
	const [visible, setVisible] = useState(true);
	const t = useTranslations("LedgerForm");

	// Create the schema using `zod`
	const documentUploadSchema = createDocumentUploadSchema(t);

	// Initialize `react-hook-form`
	const form = useForm<DocumentUploadFormValues>({
		resolver: zodResolver(documentUploadSchema),
		defaultValues: {
			letters: [],
			attachments: [],
		},
	});

	// State for uploaded files
	const [letters, setLetters] = useState<File[]>([]);
	const [attachments, setAttachments] = useState<File[]>([]);

	// Submit handler
	function onSubmit(data: DocumentUploadFormValues) {
		onFileComplete(letters, attachments);
		setVisible(false);
		console.log("Submitted data:", data);
	}

	// File change handlers
	function handleLettersFilesChange(files: File[]) {
		setLetters(files);
		form.setValue("letters", files);
	}

	function handleAttachmentsFilesChange(files: File[]) {
		setAttachments(files);
		form.setValue("attachments", files);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<fieldset className="border p-4 rounded-md bg-background pb-6">
					<legend className="text-lg font-semibold">
						{t("DocumentUpload")}
					</legend>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-2">
						<ReusableFileUploadField
							name="letters"
							labelKey="fields.letters.label"
							descriptionKey="fields.letters.description"
							local="LedgerForm"
							required
							control={form.control}
							onFilesChange={handleLettersFilesChange}
						/>
						<ReusableFileUploadField
							name="attachments"
							labelKey="fields.attachments.label"
							descriptionKey="fields.attachments.description"
							local="LedgerForm"
							control={form.control}
							onFilesChange={handleAttachmentsFilesChange}
						/>
					</div>
				</fieldset>
				{visible && (
					<div className="flex w-full justify-end items-end">
						<Button type="submit" className="bg-green-500">
							{t("SaveAndContinue")}
						</Button>
					</div>
				)}
			</form>
		</Form>
	);
}
