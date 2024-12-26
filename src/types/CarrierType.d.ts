export interface ledgerType {
	carrier_person_first_name: string;
	carrier_person_middle_name: string;
	carrier_person_last_name?: string;
	carrier_phone_number: string;
	carrier_type?: "Individual" | "Organization";
	carrier_organization_id?: string;
	carrier_plate_number?: string;
	letters: File[];
	attachments: File[];
	additional_message: string;
	document_type?: "Letter" | "Invoice" | "Receipt" | "Report" | "Other";
	document_date?: string;
	document_owner?: string;
	ledger_id?: string;
	ledger_subject?: string;
	ledger_description?: string;
	ledger_type?: "INCOMING" | "OUTGOING" | "PERSONAL";
	delivery_medium?: string;
	delivery_channel?: string;
	delivery_organization?: string;
	tracking_number?: string;
	expected_delivery_date?: string;
	delivery_status?: "Pending" | "Stamped" | "Delivered";

	metaData_title?: string; // optional, min 1, max 100 characters
	metaData_description?: string; // optional, max 500 characters
	metaData_author?: string; // optional, min 1 character
	metaData_dateCreated?: string; // optional, min 1 character
	metaData_lastModified?: string; // optional, min 1 character
	metaData_version?: string; // optional, min 1 character
	metaData_keywords?: string; // optional, min 1 character
	metaData_tags?: string; // optional, min 1 character
	metaData_category?: string; // optional, min 1 character
	metaData_fileType?: string; // optional, min 1 character
	metaData_language?: string; // optional, min 1 character
	metaData_status?:
		| "Draft"
		| "In Review"
		| "Approved"
		| "Published"
		| "Archived"; // optional enum
	metaData_confidentiality?:
		| "Public"
		| "Internal"
		| "Confidential"
		| "Restricted"; // optional enum
	metaData_source_system?: string;

	recipient_name?: string;
	recipient_phone_number?: string;
	job_title?: string;
	department?: string;
	sector?: string;
	received_at?: string;
	status?: "Pending" | "Approved" | "Rejected" | "Completed";
	reference_number?: string;
	external_reference_id?: string;
	priority?: "Low" | "Medium" | "High";
	approved_by?: string;
	approved_at?: string;
	deadline?: string;
	category?: string;
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
