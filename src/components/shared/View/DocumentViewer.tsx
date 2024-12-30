"use client";

import { useState } from "react";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface DocumentViewerProps {
	file: File | null;
}

export default function DocumentViewer({ file }: DocumentViewerProps) {
	const [numPages, setNumPages] = useState<number | null>(null);
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
		setNumPages(numPages);
	}

	if (!file) return null;

	const fileUrl = URL.createObjectURL(file);

	if (file.type.startsWith("image/")) {
		return (
			<div className="max-w-2xl mx-auto mt-8">
				<img src={fileUrl} alt="Uploaded image" className="max-w-full h-auto" />
			</div>
		);
	}

	if (file.type === "application/pdf") {
		return (
			<div className="max-w-2xl mx-auto mt-8">
				<Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
					<Page pageNumber={pageNumber} />
				</Document>
				<p className="text-center mt-4">
					Page {pageNumber} of {numPages}
				</p>
				<div className="flex justify-center mt-4 space-x-4">
					<button
						onClick={() => setPageNumber((page) => Math.max(page - 1, 1))}
						disabled={pageNumber <= 1}
						className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
					>
						Previous
					</button>
					<button
						onClick={() =>
							setPageNumber((page) => Math.min(page + 1, numPages || 1))
						}
						disabled={pageNumber >= (numPages || 1)}
						className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
					>
						Next
					</button>
				</div>
			</div>
		);
	}

	return <p>Unsupported file type</p>;
}
