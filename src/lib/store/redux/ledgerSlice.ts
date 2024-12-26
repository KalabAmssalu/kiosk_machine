import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define the types based on the provided interfaces
interface CarrierType {
	carrier_person_first_name: string;
	carrier_person_middle_name: string;
	carrier_person_last_name: string;
	carrier_phone_number: string;
	carrier_type?: "Individual" | "Organization";
	carrier_organization_id?: string;
	carrier_plate_number?: string;
}

interface DocumentType {
	letters: File[];
	attachments: File[];
	additional_message: string;
	document_type?: "Letter" | "Invoice" | "Receipt" | "Report" | "Other";
	document_date?: string;
	document_owner?: string;
}

interface MetaDataType {
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
}

interface Delivery_infoType {
	delivery_medium: string;
	delivery_channel: string;
	delivery_organization: string;
	tracking_number?: string;
	expected_delivery_date?: string;
	delivery_status?: "Pending" | "Shipped" | "Delivered";
}

interface Recipient_infoType {
	recipient_name: string;
	recipient_phone_number: string;
	job_title: string;
	department: string;
	sector: string;
}

export interface ledgerType {
	ledger_id?: string;
	ledger_subject?: string;
	ledger_description?: string;
	carrier: CarrierType;
	delivery: Delivery_infoType;
	document: DocumentType;
	metaData: MetaDataType;
	recipient: Recipient_infoType;
	received_at?: string;
	status?: "Pending" | "Approved" | "Rejected" | "Completed";
	reference_number?: string;
	external_reference_id?: string;
	priority?: "Low" | "Medium" | "High";
	approved_by?: string;
	approved_at?: string;
	category?: string;
}

// Define the initial state for the ledger slice
const initialState = {
	ledgers: [] as ledgerType[], // Array to hold the ledgers
};

// Create the ledger slice
const ledgerSlice = createSlice({
	name: "ledgers",
	initialState,
	reducers: {
		// Action to set the ledgers array
		SetLedgers: (state, action: PayloadAction<ledgerType[]>) => {
			state.ledgers = action.payload;
		},
		// Action to add a new ledger
		AddLedger: (state, action: PayloadAction<ledgerType>) => {
			state.ledgers.push(action.payload);
		},
		// Action to update an existing ledger by ledger_id
		UpdateLedger: (state, action: PayloadAction<ledgerType>) => {
			const index = state.ledgers.findIndex(
				(ledger) => ledger.ledger_id === action.payload.ledger_id
			);
			if (index !== -1) {
				state.ledgers[index] = action.payload;
			}
		},
		// Action to delete a ledger by ledger_id
		DeleteLedger: (state, action: PayloadAction<string>) => {
			state.ledgers = state.ledgers.filter(
				(ledger) => ledger.ledger_id !== action.payload
			);
		},
		// Action to clear all ledgers
		ClearLedgers: (state) => {
			state.ledgers = []; // Resets the ledgers array to an empty array
		},
	},
});

// Export the actions and reducer
export const {
	SetLedgers,
	AddLedger,
	UpdateLedger,
	DeleteLedger,
	ClearLedgers,
} = ledgerSlice.actions;
export default ledgerSlice.reducer;
