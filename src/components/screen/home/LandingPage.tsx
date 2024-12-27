"use client";

import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";

import KioskHero from "./Kiosk-Hero";
import KioskInfo from "./Kiosk-Info";

export function LandingPage() {
	const router = useRouter();
	const t = useTranslations("LandingPage");

	return (
		<main className="min-h-screen bg-background">
			<KioskHero />
			<KioskInfo />
		</main>
	);
}
