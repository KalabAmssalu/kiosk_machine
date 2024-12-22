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

interface KioskFileUploadFieldProps {
	control: Control<any>;
	name: string;
	labelKey: string;
	descriptionKey: string;
}

export default function KioskFileUploadField({
	control,
	name,
	labelKey,
	descriptionKey,
}: KioskFileUploadFieldProps) {
	const t = useTranslations("LedgerForm");

	return (
		<FormField
			control={control}
			name={name}
			render={({ field: { onChange, ...field } }) => (
				<FormItem>
					<FormLabel className="text-xl">{t(labelKey)}</FormLabel>
					<FormControl>
						<Input
							type="file"
							onChange={(e) => onChange(e.target.files?.[0])}
							{...field}
							value={undefined}
							className="text-xl py-6"
						/>
					</FormControl>
					<p className="text-lg text-muted-foreground mt-2">
						{t(descriptionKey)}
					</p>
					<FormMessage className="text-lg" />
				</FormItem>
			)}
		/>
	);
}
