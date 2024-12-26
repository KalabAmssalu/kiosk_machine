"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export interface MetaDataType {
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
const documentMetadataSchema = z.object({
	metaData_title: z
		.string()
		.min(1, "Title is required")
		.max(100, "Title should be at most 100 characters")
		.optional(),
	metaData_description: z
		.string()
		.max(500, "Description should be at most 500 characters")
		.optional(),
	metaData_author: z.string().min(1, "Author is required").optional(),
	metaData_dateCreated: z
		.string()
		.min(1, "Date created is required")
		.optional(),
	metaData_lastModified: z
		.string()
		.min(1, "Last modified date is required")
		.optional(),
	metaData_version: z.string().min(1, "Version is required").optional(),
	metaData_keywords: z
		.string()
		.min(1, "At least one keyword is required")
		.optional(),
	metaData_tags: z.string().min(1, "At least one tag is required").optional(),
	metaData_category: z.string().min(1, "Category is required").optional(),
	metaData_fileType: z.string().min(1, "File type is required").optional(),
	metaData_language: z.string().min(1, "Language is required").optional(),
	metaData_status: z
		.enum(["Draft", "In Review", "Approved", "Published", "Archived"])
		.optional(),
	metaData_confidentiality: z
		.enum(["Public", "Internal", "Confidential", "Restricted"])
		.optional(),
	metaData_source_system: z
		.string()
		.min(1, "Source system is required")
		.optional(),
});

type DocumentMetadataFormValues = z.infer<typeof documentMetadataSchema>;

interface DocumentMetadataFormProps {
	onMetadataComplete: (data: MetaDataType) => void;
}

export default function DocumentMetadataForm({
	onMetadataComplete,
}: DocumentMetadataFormProps) {
	const [preview, setPreview] = useState<DocumentMetadataFormValues | null>(
		null
	);

	const form = useForm<DocumentMetadataFormValues>({
		resolver: zodResolver(documentMetadataSchema),
		defaultValues: {
			metaData_title: "",
			metaData_description: "",
			metaData_author: "",
			metaData_dateCreated: new Date().toISOString().split("T")[0],
			metaData_lastModified: new Date().toISOString().split("T")[0],
			metaData_version: "1.0",
			metaData_keywords: "",
			metaData_tags: "",
			metaData_category: "",
			metaData_fileType: "",
			metaData_language: "English",
			metaData_status: "Draft",
			metaData_confidentiality: "Internal",
			metaData_source_system: "",
		},
	});

	function onSubmit(data: DocumentMetadataFormValues) {
		setPreview(data);
		console.log(data);
		onMetadataComplete(data);
	}

	return (
		<div className="container mx-auto p-4 mb-20">
			<h1 className="text-2xl text-center font-bold mb-6">
				Document Metadata Form (Optional)
			</h1>
			<div className="grid gap-6 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Document Metadata</CardTitle>
						<CardDescription>
							Enter the metadata for your document
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4"
							>
								<FormField
									control={form.control}
									name="metaData_title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input placeholder="Enter document title" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="metaData_description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Enter document description"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="metaData_author"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Author</FormLabel>
											<FormControl>
												<Input placeholder="Enter author name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="grid grid-cols-2 gap-4">
									<FormField
										control={form.control}
										name="metaData_dateCreated"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Date Created</FormLabel>
												<FormControl>
													<Input type="date" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="metaData_lastModified"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Last Modified</FormLabel>
												<FormControl>
													<Input type="date" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<FormField
									control={form.control}
									name="metaData_version"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Version</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter document version"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="metaData_keywords"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Keywords</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter keywords, separated by commas"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Relevant keywords for your document
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="metaData_tags"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tags</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter tags, separated by commas"
													{...field}
												/>
											</FormControl>
											<FormDescription>
												Tags to categorize your document
											</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="metaData_category"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Category</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter document category"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="metaData_fileType"
									render={({ field }) => (
										<FormItem>
											<FormLabel>File Type</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter file type (e.g., PDF, DOCX)"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="metaData_language"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Language</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter document language"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="metaData_status"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Status</FormLabel>
											<FormControl>
												<select
													className="w-full p-2 border rounded"
													{...field}
												>
													<option value="Draft">Draft</option>
													<option value="In Review">In Review</option>
													<option value="Approved">Approved</option>
													<option value="Published">Published</option>
													<option value="Archived">Archived</option>
												</select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="metaData_confidentiality"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Confidentiality</FormLabel>
											<FormControl>
												<select
													className="w-full p-2 border rounded"
													{...field}
												>
													<option value="Public">Public</option>
													<option value="Internal">Internal</option>
													<option value="Confidential">Confidential</option>
													<option value="Restricted">Restricted</option>
												</select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="metaData_source_system"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Source System</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full">
									Generate Metadata
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Metadata Preview</CardTitle>
						<CardDescription>
							How your document metadata might be displayed
						</CardDescription>
					</CardHeader>
					<CardContent>
						{preview ? (
							<div className="space-y-4">
								<div>
									<h2 className="text-xl font-semibold">
										{preview.metaData_title}
									</h2>
									<p className="text-sm text-gray-500">
										Version {preview.metaData_version}
									</p>
									<p className="text-sm">{preview.metaData_description}</p>
								</div>
								<div className="flex flex-wrap gap-2">
									<Badge variant="secondary">{preview.metaData_status}</Badge>
									<Badge variant="outline">
										{preview.metaData_confidentiality}
									</Badge>
									<Badge>{preview.metaData_fileType}</Badge>
								</div>
								<div>
									<p>
										<strong>Author:</strong> {preview.metaData_author}
									</p>
									<p>
										<strong>Created:</strong> {preview.metaData_dateCreated}
									</p>
									<p>
										<strong>Last Modified:</strong>{" "}
										{preview.metaData_lastModified}
									</p>
									<p>
										<strong>Category:</strong> {preview.metaData_category}
									</p>
									<p>
										<strong>Language:</strong> {preview.metaData_language}
									</p>
								</div>
								<div>
									<p>
										<strong>Keywords:</strong>{" "}
										{preview.metaData_keywords
											?.split(",")
											.map((keyword) => keyword.trim())
											.join(", ") || ""}
									</p>
								</div>
								<div>
									<p>
										<strong> Tags:</strong>
									</p>
									<div className="flex flex-wrap gap-2 mt-1">
										{preview.metaData_tags?.split(",").map((tag, index) => (
											<Badge key={index} variant="secondary">
												{tag.trim()}
											</Badge>
										))}
									</div>
								</div>
							</div>
						) : (
							<p className="text-gray-500 italic">
								Fill out the form and submit to see a preview of your document
								metadata
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
