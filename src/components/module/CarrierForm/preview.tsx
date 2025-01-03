"use client";

import Image from "next/image";
import { forwardRef, useMemo } from "react";

import Field from "@/components/shared/field/Field";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/constants/files";
import { useAppSelector } from "@/hooks/storehooks";

interface PersonalInfoProps {
	onConfirm: () => void;
	letters: File[];
	attachments: File[];
	ref: React.RefObject<HTMLDivElement>;
}

// eslint-disable-next-line react/display-name
const Preview = forwardRef<HTMLDivElement, PersonalInfoProps>(
	({ onConfirm, letters, attachments }, ref) => {
		const data = useAppSelector((state) => state.ledger.ledgers[0]);

		const displayedData = useMemo(() => {
			if (!data) return null;

			return data;
		}, [data]);

		const handlemodal = () => {
			// onIsOpenChange(true);
			onConfirm();
		};

		return (
			<>
				<div className="min-h-screen bg-gray-100 p-8 flex justify-center">
					{/* A4 size container */}
					<div
						className="bg-white w-[210mm] h-[297mm] shadow-lg p-12 relative"
						ref={ref}
					>
						<div className="border-b pb-6 mb-6">
							<h1 className="text-3xl font-bold text-gray-900">
								Document Submission Information Preview
							</h1>
							<h2 className="text-md font-semibold text-gray-700 mt-2">
								{/* {`${data.carrier_person_first_name || ""} ${data.carrier_person_middle_name || ""} ${data.carrier_person_last_name || ""}`} */}
							</h2>

							<div className="text-sm text-gray-500 mt-2">
								Document generated on {new Date().toLocaleDateString()}
							</div>
						</div>

						<Image
							src={IMAGES.mint}
							width={60}
							alt={"logo"}
							className="absolute top-12 right-12"
						/>

						{/* Content Grid */}
						{displayedData ? (
							<div className="grid grid-cols-2 gap-x-6 gap-y-6 text-sm">
								<div>
									<h2 className="text-lg font-semibold text-gray-900 mb-4">
										Carrier Information
									</h2>
									<div className="space-y-3">
										{[
											"carrier_type",
											"carrier_organization_id",
											"carrier_plate_number",
											"carrier_phone_number",
										].map((key) => (
											<Field
												key={key}
												label={key}
												value={String(
													displayedData[key as keyof typeof displayedData] || ""
												)}
												local="LedgerForm.fields"
											/>
										))}
									</div>
								</div>

								<div>
									<h2 className="text-lg font-semibold text-gray-900 mb-4">
										Delivery Information
									</h2>
									<div className="space-y-3">
										{[
											"delivery_medium",
											"delivery_channel",
											"delivery_organization",
											"tracking_number",
											"expected_delivery_date",
											"delivery_status",
											"additional_message",
										].map((key) => (
											<Field
												key={key}
												label={key}
												value={String(
													displayedData[key as keyof typeof displayedData] || ""
												)}
												local="OrganizationInfoForm.fields"
											/>
										))}
									</div>
								</div>
								{/* Representative Information Section */}

								<div>
									<h2 className="text-lg font-semibold text-gray-900 mb-4">
										Document Information
									</h2>
									<div className="space-y-3">
										{[
											"document_type",
											"document_date",
											"document_owner",
											"additional_message",
											"external_reference_id",
											"metadata",
											"meta_tags",
											"version",
											"source_system",
											"recipient_name",
											"recipient_phone_number",
											"job_title",
											"department",
											"tracking_number",
											"expected_delivery_date",
											"delivery_status",
											"additional_message",
										].map((key) => (
											<Field
												key={key}
												label={key}
												value={String(
													displayedData[key as keyof typeof displayedData] || ""
												)}
												local="OrganizationInfoForm.fields"
											/>
										))}
									</div>
								</div>
							</div>
						) : (
							<p>No data available to preview.</p>
						)}

						{/* Footer */}
						<div className="absolute bottom-8 left-12 right-12 text-xs text-gray-400 border-t pt-4">
							<div className="flex justify-between">
								<span>Generated by Tilla Health Insurance Provider System</span>
								<span>Page 1 of 1</span>
							</div>
						</div>
					</div>
					{/* Submit Button */}
					<div className="absolute bottom-20 right-12">
						<Button
							onClick={handlemodal}
							className="bg-green-500 hover:bg-green-600 text-white"
						>
							Confirm
						</Button>
					</div>
				</div>
			</>
		);
	}
);

export default Preview;
