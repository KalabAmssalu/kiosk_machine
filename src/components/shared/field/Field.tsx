"use client";

import React from "react";

interface FieldProps {
	label: string;
	value: string | number | null | undefined;
	local?: string; // Optional prop for localization keys or other metadata
}

const Field: React.FC<FieldProps> = ({ label, value, local }) => {
	return (
		<div className="flex flex-col space-y-1">
			<label className="text-sm font-medium text-gray-700">{label}</label>
			<p className="text-sm text-gray-900 bg-gray-100 p-2 rounded-md">
				{value !== null && value !== undefined ? value : "N/A"}
			</p>
		</div>
	);
};

export default Field;
