export interface ledgerType {
	carrier_person_first_name?: string;
	carrier_person_middle_name?: string;
	carrier_person_last_name?: string;
	carrier_phone_number?: string;
	carrier_type?: "INDIVIDUAL" | "ORGANIZATION";
	carrier_organization_id?: string;
	carrier_plate_number?: string;
	letters?: File[];
	attachments?: File[];
	additional_message?: string;
	document_type?: "Letter" | "Invoice" | "Receipt" | "Report" | "Other";
	document_date?: string;
	document_owner?: string;
	ledger_id?: string; // autofilled by the system
	ledger_subject?: string; //filled by the record officer
	ledger_description?: string; //filled by the record officer
	ledger_type?: "INCOMING" | "OUTGOING" | "PERSONAL"; //filled by the record officer
	delivery_medium?: string;
	delivery_channel?: string;
	delivery_organization?: string;
	tracking_number?: string; // autofilled by the system
	expected_delivery_date?: string;
	delivery_status?: "PENDING" | "STAMPED" | "DELIVERED";

	metadata_title?: string; // optional, can be filled by the record officer and the carrier
	metadata_description?: string; // optional, can be filled by the record officer and the carrier
	metadata_author?: string; // optional, can be filled by the record officer and the carrier
	metadata_dateCreated?: string; // optional, can be filled by the record officer and the carrier
	metadata_lastModified?: string; // optional, can be filled by the record officer and the carrier
	metadata_version?: string; // optional, can be filled by the record officer and the carrier
	metadata_keywords?: string; // optional, can be filled by the record officer and the carrier
	metadata_tags?: string; // optional, can be filled by the record officer and the carrier
	metadata_category?: string; // optional, can be filled by the record officer and the carrier
	metadata_fileType?: string; // optional, can be filled by the record officer and the carrier
	metadata_language?: string; // optional, can be filled by the record officer and the carrier
	metadata_status?:
		| "DRAFT"
		| "IN_REVIEW"
		| "APPROVED"
		| "PUBLISHED"
		| "ARCHIVED"; // autofilled by the system
	metadata_confidentiality?:
		| "PUBLIC"
		| "INTERNAL"
		| "CONFIDENTIAL"
		| "RESTRICTED"; // filled by the record officer and the carrier
	metadata_source_system?: string;
	sender_name?: String;
	sender_phone_number?: String;
	sender_email?: String;
	sender_address?: String;
	sender_type?: "INDIVIDUAL" | "ORGANIZATION";
	recipient_name?: string; // filled by the record officer
	recipient_phone_number?: string; // filled by the record officer
	job_title?: string; // filled by the record officer
	department?: string; // filled by the record officer
	sector?: string; // filled by the record officer
	received_at?: string; // autofilled by the system
	status?: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED"; // autofilled by the system
	reference_number?: string; // filled by the record officer
	external_reference_id?: string; // filled by the record officer
	priority?: "LOW" | "MEDIUM" | "HIGH"; // filled by the record officer
	approved_by?: string; // autofilled by the system
	approved_at?: string; // autofilled by the system
	deadline?: string;
	category?: string; // filled by the record officer
}

// carrier_medium ............(RIDE, POSTA, PRIVATE, MOTOR, OTHER)
// delivery_channel.............(INPERSON, DELIVERY)

// export interface ledgerType {
// 	ledger_id?: string;
// 	ledger_subject?: string;
// 	ledger_description?: string;
//     ledger_type?: "INCOMING" | "OUTGOING" | "PERSONAL";
// 	carrier: CarrierType;
// 	delivery: Delivery_infoType;
// 	document: DocumentType;
// 	metaData: MetaDataType;
// 	recipient: Recipient_infoType;
// 	received_at?: string;
// 	status?: "Pending" | "Approved" | "Rejected" | "Completed";
// 	reference_number?: string;
// 	external_reference_id?: string;
// 	priority?: "Low" | "Medium" | "High";
// 	approved_by?: string;
// 	approved_at?: string;
// 	deadline?: string;
// 	category?: string;
// }

// export interface CarrierType {
// 	carrier_person_first_name: string;
// 	carrier_person_middle_name: string;
// 	carrier_person_last_name?: string;
// 	carrier_phone_number: string;
// 	carrier_type?: "Individual" | "Organization";
// 	carrier_organization_id?: string;
// 	carrier_plate_number?: string;
// }

// export interface DocumentType {
// 	letters: File[];
// 	attachments: File[];
// 	additional_message: string;
// 	document_type?: "Letter" | "Invoice" | "Receipt" | "Report" | "Other";
// 	document_date?: string;
// 	document_owner?: string;
// }

// export interface MetaDataType {
// 	metadata: {
// 		keywords: Array<string>;
// 	} & Record<string, unknown>;
// 	meta_tags?: string[];
// 	version?: string;
// 	source_system?: string;
// }

// export interface Delivery_infoType {
// 	delivery_medium?: string;
// 	delivery_channel?: string;
// 	delivery_organization?: string;
// 	tracking_number?: string;
// 	expected_delivery_date?: string;
// 	delivery_status?: "Pending" | "Stamped" | "Delivered";
// }

// export interface Recipient_infoType {
// 	recipient_name?: string;
// 	recipient_phone_number?: string;
//     job_title?: string;
//     department?: string;
//     sector?: string;
// }
