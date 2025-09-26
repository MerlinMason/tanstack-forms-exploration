import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { FormField } from "@/components/formField";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const { fieldContext, formContext } = createFormHookContexts();

type CommonProps = {
	label: string;
	description?: string;
};
type Placeholder = {
	placeholder?: string;
};

export const { useAppForm } = createFormHook({
	fieldComponents: {
		TextInput: ({
			label,
			description,
			placeholder,
		}: CommonProps & Placeholder) => {
			const { useFieldContext } = createFormHookContexts();
			const field = useFieldContext<string>();

			return (
				<FormField
					label={label}
					errors={field.state.meta.errors}
					description={description}
				>
					<Input
						value={field.state.value}
						placeholder={placeholder}
						onChange={(e) => field.handleChange(e.target.value)}
						onBlur={field.handleBlur}
						type="text"
					/>
				</FormField>
			);
		},
		NumberInput: ({ label, description }: CommonProps) => {
			const { useFieldContext } = createFormHookContexts();
			const field = useFieldContext<number>();

			return (
				<FormField
					label={label}
					errors={field.state.meta.errors}
					description={description}
				>
					<Input
						value={field.state.value}
						onChange={(e) => field.handleChange(e.target.valueAsNumber)}
						onBlur={field.handleBlur}
						type="number"
					/>
				</FormField>
			);
		},
		CheckboxInput: ({ label, description }: CommonProps) => {
			const { useFieldContext } = createFormHookContexts();
			const field = useFieldContext<boolean>();

			return (
				<FormField
					label={label}
					description={description}
					errors={field.state.meta.errors}
					alignText="right"
				>
					<Checkbox
						onCheckedChange={(checked) => field.handleChange(checked === true)}
						onBlur={field.handleBlur}
						checked={field.state.value}
					/>
				</FormField>
			);
		},
	},
	formComponents: {
		SubmitButton: ({ children }) => {
			const { useFormContext } = createFormHookContexts();
			const form = useFormContext();

			return (
				<Button type="submit" disabled={!form.state.isValid}>
					{children}
				</Button>
			);
		},
	},
	fieldContext,
	formContext,
});
