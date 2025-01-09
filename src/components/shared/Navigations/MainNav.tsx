"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useLogout } from "@/actions/Query/auth_Query/request";
import { get_user } from "@/actions/auth/action";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/custom/modeToggle";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// import { IMAGES } from "@/constants/files";
import LocaleSwitcher from "../DropDown/LocaleSwitcher";
import { NavigationMenuConf } from "./NavigationMenu";

const MainNav = () => {
	// 	const t = useTranslations();
	const { mutate: logOut } = useLogout();

	const route = useRouter();
	const [userName, setUserName] = useState<string>("Loading...");

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await get_user();
				const fullName =
					[userData.first_name_en || "", userData.last_name_en || ""]
						.filter(Boolean)
						.join(" ") ||
					userData.username ||
					userData.email ||
					"User";
				setUserName(fullName);
			} catch (error) {
				console.error("Error fetching user:", error);
				setUserName("User");
			}
		};

		fetchUser();
	}, []);

	const handleLogout = () => {
		logOut();
	};
	return (
		<nav className="bg-blue-500 z-50 w-full">
			<div className=" mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-14">
					<div className="flex items-center gap-2">
						{/* <Image
							src={IMAGES.logoOnly}
							height={30}
							width={30}
							alt={"logo"}
							onClick={() => route.push("/home")}
						/> */}
						<div
							className="text-xl font-bold  hover:cursor-pointer"
							onClick={() => route.push("/dashboard/home" as `/${string}`)}
						>
							DMS
						</div>
					</div>
					<NavigationMenuConf />

					<div className="mr-0 flex items-center gap-2 md:mr-2">
						<ModeToggle />
						<LocaleSwitcher />
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="secondary"
									size="icon"
									className="rounded-full h-[45px] w-[45px] overflow-hidden "
								>
									<Image
										src="https://media.istockphoto.com/id/1332100919/vector/man-icon-black-icon-person-symbol.jpg?s=612x612&w=0&k=20&c=AVVJkvxQQCuBhawHrUhDRTCeNQ3Jgt0K1tXjJsFy1eg="
										height={40}
										width={40}
										alt="logo"
										className="h-full w-full object-cover"
									/>
									<span className="sr-only">Toggle user menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-56">
								<DropdownMenuLabel className="flex gap-2 text-sm text-customOrange">
									{userName}
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => handleLogout()}>
									Logout
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default MainNav;
