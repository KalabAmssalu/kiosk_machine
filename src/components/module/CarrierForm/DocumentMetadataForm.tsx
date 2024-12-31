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
	metadata_title?: string; // optional, min 1, max 100 characters
	metadata_description?: string; // optional, max 500 characters
	metadata_author?: string; // optional, min 1 character
	metadata_dateCreated?: string; // optional, min 1 character
	metadata_lastModified?: string; // optional, min 1 character
	metadata_version?: string; // optional, min 1 character
	metadata_keywords?: string; // optional, min 1 character
	metadata_tags?: string; // optional, min 1 character
	metadata_category?: string; // optional, min 1 character
	metadata_fileType?: string; // optional, min 1 character
	metadata_language?: string; // optional, min 1 character
	metadata_status?:
		| "Draft"
		| "In Review"
		| "Approved"
		| "Published"
		| "Archived"; // optional enum
	metadata_confidentiality?:
		| "Public"
		| "Internal"
		| "Confidential"
		| "Restricted"; // optional enum
	metadata_source_system?: string;
}
const documentMetadataSchema = z.object({
	metadata_title: z
		.string()
		.min(1, "Title is required")
		.max(100, "Title should be at most 100 characters")
		.optional(),
	metadata_description: z
		.string()
		.max(500, "Description should be at most 500 characters")
		.optional(),
	metadata_author: z.string().min(1, "Author is required").optional(),
	metadata_dateCreated: z
		.string()
		.min(1, "Date created is required")
		.optional(),
	metadata_lastModified: z
		.string()
		.min(1, "Last modified date is required")
		.optional(),
	metadata_version: z.string().min(1, "Version is required").optional(),
	metadata_keywords: z
		.string()
		.min(1, "At least one keyword is required")
		.optional(),
	metadata_tags: z.string().min(1, "At least one tag is required").optional(),
	metadata_category: z.string().min(1, "Category is required").optional(),
	metadata_fileType: z.string().min(1, "File type is required").optional(),
	metadata_language: z.string().min(1, "Language is required").optional(),
	metadata_status: z
		.enum(["Draft", "In Review", "Approved", "Published", "Archived"])
		.optional(),
	metadata_confidentiality: z
		.enum(["Public", "Internal", "Confidential", "Restricted"])
		.optional(),
	metadata_source_system: z
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
			metadata_title: "",
			metadata_description: "",
			metadata_author: "",
			metadata_dateCreated: new Date().toISOString().split("T")[0],
			metadata_lastModified: new Date().toISOString().split("T")[0],
			metadata_version: "1.0",
			metadata_keywords: "",
			metadata_tags: "",
			metadata_category: "",
			metadata_fileType: "",
			metadata_language: "English",
			metadata_status: "Draft",
			metadata_confidentiality: "Internal",
			metadata_source_system: "",
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
									name="metadata_title"
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
									name="metadata_description"
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
									name="metadata_author"
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
										name="metadata_dateCreated"
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
										name="metadata_lastModified"
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
									name="metadata_version"
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
									name="metadata_keywords"
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
									name="metadata_tags"
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
									name="metadata_category"
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
									name="metadata_fileType"
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
									name="metadata_language"
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
									name="metadata_status"
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
									name="metadata_confidentiality"
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
									name="metadata_source_system"
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
										{preview.metadata_title}
									</h2>
									<p className="text-sm text-gray-500">
										Version {preview.metadata_version}
									</p>
									<p className="text-sm">{preview.metadata_description}</p>
								</div>
								<div className="flex flex-wrap gap-2">
									<Badge variant="secondary">{preview.metadata_status}</Badge>
									<Badge variant="outline">
										{preview.metadata_confidentiality}
									</Badge>
									<Badge>{preview.metadata_fileType}</Badge>
								</div>
								<div>
									<p>
										<strong>Author:</strong> {preview.metadata_author}
									</p>
									<p>
										<strong>Created:</strong> {preview.metadata_dateCreated}
									</p>
									<p>
										<strong>Last Modified:</strong>{" "}
										{preview.metadata_lastModified}
									</p>
									<p>
										<strong>Category:</strong> {preview.metadata_category}
									</p>
									<p>
										<strong>Language:</strong> {preview.metadata_language}
									</p>
								</div>
								<div>
									<p>
										<strong>Keywords:</strong>{" "}
										{preview.metadata_keywords
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
										{preview.metadata_tags?.split(",").map((tag, index) => (
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
