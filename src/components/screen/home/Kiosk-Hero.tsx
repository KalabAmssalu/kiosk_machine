"use client";

export default function KioskHero() {
	return (
		<section className="relative h-screen w-full overflow-hidden">
			<div className="absolute inset-0">
				<iframe
					src="https://www.youtube.com/embed/s9xk77X4m5c?autoplay=1&mute=1&loop=1&playlist=s9xk77X4m5c&controls=0&showinfo=0&rel=0"
					title="NEW 4K Macro Plexus Blue Looped Background"
					className="w-full h-full object-cover"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</div>
			<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
						Welcome to DMS Kiosk
					</h1>
					<p className="text-xl md:text-2xl text-white">
						Explore our Document Management services
					</p>
				</div>
			</div>
		</section>
	);
}
