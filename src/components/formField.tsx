import { cn } from "@/lib/utils";
import { Label } from "./ui/label";

type FormFieldProps = {
	label: string;
	alignText?: "top" | "right";
	description?: string;
	errors?: { message: string }[];
	children: React.ReactNode;
};

export const FormField = ({
	label,
	alignText = "top",
	description,
	errors,
	children,
}: FormFieldProps) => {
	return (
		<div className="mb-4">
			<div
				className={cn("flex items-start gap-1", {
					"flex-col": alignText === "top",
					"flex-row-reverse justify-end gap-1.5": alignText === "right",
				})}
			>
				<Label>
					<p>{label}</p>
					{description && <p>{description}</p>}
				</Label>

				{children}
			</div>

			{errors && (
				<p className="text-sm text-red-500">
					{errors.map((error) => error.message).join(", ")}
				</p>
			)}
		</div>
	);
};
