import { useTranslations } from "next-intl";
import { Control } from "react-hook-form";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface KioskPhoneInputFieldProps {
	control: Control<any>;
	name: string;
	labelKey: string;
	placeholderKey: string;
}

export default function KioskPhoneInputField({
	control,
	name,
	labelKey,
	placeholderKey,
}: KioskPhoneInputFieldProps) {
	const t = useTranslations("LedgerForm");

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel className="text-xl">{t(labelKey)}</FormLabel>
					<FormControl>
						<Input
							{...field}
							type="tel"
							placeholder={t(placeholderKey)}
							className="text-xl py-6"
						/>
					</FormControl>
					<FormMessage className="text-lg" />
				</FormItem>
			)}
		/>
	);
}
