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

interface KioskFormFieldProps {
	control: Control<any>;
	name: string;
	labelKey: string;
	placeholderKey: string;
}

export default function KioskFormField({
	control,
	name,
	labelKey,
	placeholderKey,
}: KioskFormFieldProps) {
	const t = useTranslations("LedgerForm");

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel className="text-3xl">{t(labelKey)}</FormLabel>
					<FormControl>
						<Input
							{...field}
							placeholder={t(placeholderKey)}
							className="text-3xl py-10"
						/>
					</FormControl>
					<FormMessage className="text-lg" />
				</FormItem>
			)}
		/>
	);
}
