"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navigationMap = [
	{
		label: "Home",
		route: "/dashboard/home",
		alternateRoutes: ["/en-US/dashboard/home", "/am/dashboard/home"],
	},
	{
		label: "Send Letter",
		route: "/dashboard/ledger",
		alternateRoutes: ["/en-US/dashboard/ledger", "/am/dashboard/ledger"],
	},
];

export function NavigationMenuConf() {
	const path = usePathname();

	const isActive = (route: string, alternateRoutes: string[] = []) =>
		path?.startsWith(route) || alternateRoutes.some((r) => path?.startsWith(r));

	return (
		<NavigationMenu>
			<NavigationMenuList className="gap-4">
				{navigationMap.map(({ label, route, alternateRoutes }) => (
					<NavigationMenuItem key={route}>
						<Link href={route as `/${string}`} legacyBehavior passHref>
							<NavigationMenuLink>
								<Button
									className={cn(
										"relative group px-6 py-2 h-12",
										"bg-transparent hover:bg-transparent",
										"text-sky-300 dark:text-sky-100 font-semibold",
										"transition-all duration-300 ease-out",
										"overflow-hidden",
										isActive(route, alternateRoutes) &&
											"text-sky-900 dark:text-sky-100"
									)}
									variant="ghost"
								>
									{/* Background hover effect */}
									<div className="absolute inset-0 w-full h-full">
										<div className="absolute inset-0 bg-sky-100 dark:bg-sky-800 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-lg"></div>
									</div>

									{/* Border line effect */}
									<div
										className={cn(
											"absolute bottom-0 left-0 w-full h-0.5 bg-sky-500",
											"transform scale-x-0 group-hover:scale-x-100",
											"transition-transform duration-300 ease-out origin-left",
											isActive(route, alternateRoutes) && "scale-x-100"
										)}
									></div>

									{/* Text with hover effect */}
									<span className="relative z-10 transform group-hover:translate-y-0 transition-transform duration-300">
										{label}
									</span>

									{/* Active indicator */}
									{isActive(route, alternateRoutes) && (
										<div className="absolute inset-0 bg-sky-100 dark:bg-sky-800/50 rounded-lg -z-[1]"></div>
									)}
								</Button>
							</NavigationMenuLink>
						</Link>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
