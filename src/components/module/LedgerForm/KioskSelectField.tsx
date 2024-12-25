import { useTranslations } from "next-intl";
import { Control } from "react-hook-form";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface KioskSelectFieldProps {
	control: Control<any>;
	name: string;
	labelKey: string;
	options: { label: string; value: string }[];
}

export default function KioskSelectField({
	control,
	name,
	labelKey,
	options,
}: KioskSelectFieldProps) {
	const t = useTranslations("LedgerForm");

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel className="text-3xl">{t(labelKey)}</FormLabel>
					<Select onValueChange={field.onChange} defaultValue={field.value}>
						<FormControl>
							<SelectTrigger className="text-3xl py-10">
								<SelectValue placeholder={t("select_placeholder")} />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							{options.map((option) => (
								<SelectItem
									key={option.value}
									value={option.value}
									className="text-3xl py-10"
								>
									{option.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<FormMessage className="text-lg" />
				</FormItem>
			)}
		/>
	);
}
