import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function KioskInfo() {
	return (
		<section className="py-12 px-4 bg-background">
			<div className="max-w-6xl mx-auto">
				<h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Information</CardTitle>
							<CardDescription>Find what you need</CardDescription>
						</CardHeader>
						<CardContent>
							<Button className="w-full">Learn More</Button>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Directions</CardTitle>
							<CardDescription>Navigate our facility</CardDescription>
						</CardHeader>
						<CardContent>
							<Button className="w-full">View Map</Button>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Assistance</CardTitle>
							<CardDescription>Get help from our staff</CardDescription>
						</CardHeader>
						<CardContent>
							<Button className="w-full">Call for Help</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
