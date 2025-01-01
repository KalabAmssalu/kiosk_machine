"use client";

import { useRef, useState } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CheckCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useAddLedger } from "@/actions/Query/ledger_Query/request";
import StepIndicator from "@/components/shared/Stepper/step-indicator";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/storehooks";
import { SetLedgers } from "@/lib/store/redux/ledgerSlice";
import { type ledgerType } from "@/types/CarrierType";

import DocumentInfoForm from "./DocumentInfoForm";
import DocumentMetadataForm, {
	type MetaDataType,
} from "./DocumentMetadataForm";
import DocumentUploadForm from "./DocumentUplaodForm";
import CarrierInfoForm from "./InfoForm";
import RecipientInfoForm from "./RecipientInfoForm";
import SenderInfoForm from "./SenderInfoForm";
import Preview from "./preview";

export default function LedgerRegForm() {
	const [nextActive, setNextActive] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);

	// const data = useAppSelector((state) => state.ledger.ledgers);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const printRef = useRef<HTMLDivElement>(null);
	const [letters, setLetters] = useState<File[]>([]);
	const [attachments, setAttachments] = useState<File[]>([]);
	const [formData, setFormData] = useState<Partial<ledgerType>>({
		carrier_person_first_name: "",
		carrier_person_middle_name: "",
		carrier_person_last_name: "",
		carrier_phone_number: "",
		carrier_type: "INDIVIDUAL",
		carrier_organization_id: "",
		carrier_plate_number: "",

		delivery_medium: "",
		delivery_channel: "",
		delivery_organization: "",
		tracking_number: "",
		expected_delivery_date: "",
		delivery_status: "PENDING",

		additional_message: "",
		document_type: "Letter",
		document_date: "",
		document_owner: "",

		metadata_title: "",
		metadata_description: "",
		metadata_author: "",
		metadata_dateCreated: "",
		metadata_lastModified: "",
		metadata_version: "",
		metadata_keywords: "",
		metadata_tags: "",
		metadata_category: "",
		metadata_fileType: "",
		metadata_language: "",
		metadata_status: "DRAFT",
		metadata_confidentiality: "PUBLIC",

		sender_name: "",
		sender_phone_number: "",
		sender_email: "",
		sender_address: " ",
		sender_type: "INDIVIDUAL",

		recipient_name: "",
		recipient_phone_number: "",
		job_title: "",
		department: "",
		sector: "",

		status: "PENDING",
		reference_number: "",
		external_reference_id: "",
		priority: "LOW",
		received_at: "",
		approved_by: "",
		approved_at: "",
		category: "",
		ledger_type: "INCOMING",
	});

	const dispatch = useAppDispatch();

	const updateFormData = (newData: Partial<ledgerType>) => {
		const updatedData = {
			...formData,
			...newData,
		};

		setFormData(updatedData);
		dispatch(SetLedgers([updatedData]));
		setNextActive(true);
	};

	const updateFileData = (newData: {
		letters: File[];
		attachments: File[];
	}) => {
		setLetters(newData.letters);
		setAttachments(newData.attachments);
	};

	const [isOpen, setIsOpen] = useState(false);

	const handleDownloadPDF = async () => {
		if (printRef.current) {
			const canvas = await html2canvas(printRef.current);
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("p", "mm", "a4");
			const imgProps = pdf.getImageProperties(imgData);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
			pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
			pdf.save("Ledger Information.pdf");
		}
	};
	const handleConfirm = () => {
		setIsOpen(true);
	};
	const updateMetadataUpload = (data: MetaDataType) => {
		console.log("metadata uploaded", data);
	};
	const { mutate: addLedger } = useAddLedger();

	const handleSubmit = async (data: ledgerType) => {
		setIsSubmitting(true);
		const formData = new FormData();

		// Append all form fields
		Object.entries(data).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				// if (typeof value === "object" && !(value instanceof File)) {
				// 	formData.append(key, JSON.stringify(value));
				// } else {
				// 	formData.append(key, value as string | Blob);
				// }
				const cleanedKey = key.startsWith("1_") ? key.substring(2) : key;

				if (
					[
						"carrier_phone_number",
						"sender_phone_number",
						"recipient_phone_number",
					].includes(cleanedKey)
				) {
					// Remove '+' symbol if the value is not empty
					value =
						typeof value === "string" && value.trim() !== ""
							? value.replace(/\+/g, "")
							: value;
				}

				if (typeof value === "object" && !(value instanceof File)) {
					formData.append(cleanedKey, JSON.stringify(value));
				} else {
					formData.append(cleanedKey, value as string | Blob);
				}
			}
		});

		// Append file arrays
		const appendFiles = (files: File[], fieldName: string) => {
			files.forEach((file) => {
				formData.append(fieldName, file);
			});
		};

		appendFiles(letters, "letters");
		appendFiles(attachments, "attachments");

		try {
			addLedger(formData, {
				onSuccess: () => {
					handleDownloadPDF();
				},
			});
		} catch (error) {
			toast.error("Failed to submit ledger data. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};
	const steps = [
		{
			title: "Carrier Information",
			content: (
				<CarrierInfoForm
					onFormComplete={(data) => {
						updateFormData(data);
						nextStep();
					}}
				/>
			),
		},
		{
			title: "Document Information",
			content: (
				<DocumentInfoForm
					onFormComplete={(data) => {
						updateFormData(data);
						nextStep();
					}}
				/>
			),
		},

		{
			title: "Sender Information",
			content: (
				<SenderInfoForm
					onFormComplete={(data) => {
						updateFormData(data);
						nextStep();
					}}
				/>
			),
		},
		{
			title: "Recipient Information",
			content: (
				<RecipientInfoForm
					onFormComplete={(data) => {
						updateFormData(data);
						nextStep();
					}}
				/>
			),
		},
		{
			title: "Document Upload",
			content: (
				<DocumentUploadForm
					onFileComplete={(letters, attachments) => {
						updateFileData({ letters, attachments });
						nextStep();
					}}
				/>
			),
		},
		{
			title: "Document Metadata",
			content: (
				<DocumentMetadataForm
					onMetadataComplete={(data) => {
						updateMetadataUpload(data);
						nextStep();
					}}
				/>
			),
		},
		{
			title: "Preview",
			content: (
				<Preview
					type="ledger"
					onConfirm={handleConfirm}
					ref={printRef}
					letters={[]}
					attachments={[]}
				/>
			),
		},
	];

	const nextStep = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
			setNextActive(false);
		}
	};

	const prevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	return (
		<>
			<h1 className="text-2xl font-bold mb-6 text-center">
				Ledger Registration Form
			</h1>
			<Card className="w-full mx-auto">
				<CardHeader>
					<CardTitle>{steps[currentStep].title}</CardTitle>
					<StepIndicator currentStep={currentStep} totalSteps={steps.length} />
				</CardHeader>
				<CardContent className="p-6 relative bg-muted">
					{steps[currentStep].content}
					<div className="mt-6 flex justify-between">
						<Button
							onClick={prevStep}
							disabled={currentStep === 0}
							variant="outline"
							className="absolute bottom-[3.05rem]"
						>
							Previous
						</Button>
					</div>
				</CardContent>
			</Card>
			<p className=" text-center mt-20 border-primary py-32 border-t-2">
				Ministry Of Innovation And Technology Have provided the following
				Document Management system.
			</p>
			<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle className="flex gap-4 items-center">
							<CheckCheck className="h-6 w-6 p-1 bg-green-300 rounded-full" />
							Document Submission
						</AlertDialogTitle>
						<AlertDialogDescription>
							To finish your form submission, please submut the form. and you
							can download the receipt file.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							className="bg-green-500"
							disabled={isSubmitting}
							onClick={() => handleSubmit(formData)}
						>
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Submitting...
								</>
							) : (
								"Download and Submit"
							)}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
