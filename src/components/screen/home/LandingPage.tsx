"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function LandingPage() {
	const router = useRouter();
	const t = useTranslations("LandingPage");

	const handleGetStarted = () => {
		router.push("/get-started");
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
			<Card className="w-full max-w-8xl h-screen lg:pt-10 bg-white shadow-md rounded-lg overflow-hidden">
				<CardContent className="p-6 flex flex-col lg:flex-row items-center justify-center lg:space-x-6 w-full">
					{/* Text Section */}
					<div className="text-section h-full lg:w-1/2 space-y-6 lg:space-y-4 border-y-2 lg:border-y-0 lg:border-l-2 lg:border-t-2 py-10 px-4 lg:py-[200px] border-blue-500 rounded-lg text-center lg:text-left animate-accordion-down">
						<CardHeader className="text-center lg:text-left mt-5 p-4 lg:p-6">
							<CardTitle className="text-3xl lg:text-4xl font-bold text-gray-900 animate-accordion-down">
								{t("title")}
							</CardTitle>
							<CardDescription className="text-base lg:text-lg text-gray-600 mt-2 animate-accordion-up">
								{t("subtitle")}
							</CardDescription>
							<p className="text-gray-700 text-sm lg:text-lg">
								{t("description")}
							</p>
						</CardHeader>
						<div className="flex pl-6 justify-center lg:justify-start">
							<Button
								onClick={handleGetStarted}
								className="px-6 py-3  text-white bg-blue-600 hover:bg-blue-700 rounded-md"
							>
								{t("button")}
							</Button>
						</div>
					</div>

					{/* Video Section */}
					<div className="video-section w-full lg:w-1/2 aspect-video animate-accordion-up flex justify-center mt-8 lg:mt-0">
						<iframe
							className="w-full lg:h-[72vh] h-64 rounded-lg"
							src="https://www.youtube.com/embed/DZLlw5BNQ3g?autoplay=1&mute=1"
							title={t("videoTitle")}
							frameBorder="0"
							allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
