import { z } from "zod";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./components/ui/card";
import { useAppForm } from "./hooks/useAppForm";

const App = () => {
	const { AppField, AppForm, handleSubmit, SubmitButton } = useAppForm({
		defaultValues: {
			username: "",
			email: "",
			age: 18,
			acceptTOS: false,
		},
		validators: {
			onChange: z.object({
				username: z.string().min(3, "Username must be at least 3 characters"),
				email: z.email({ message: "Please enter a valid email" }),
				age: z.number({ message: "Please enter your age" }).min(18, {
					message: "You must be at least 18 years old",
				}),
				acceptTOS: z.literal(true, {
					message: "You must accept the terms of service",
				}),
			}),
		},
		onSubmit: ({ value }) => {
			alert(JSON.stringify(value, null, 2));
		},
	});

	return (
		<main className="container mx-auto min-h-screen flex justify-center items-center">
			<Card className="w-96">
				<CardHeader>
					<CardTitle>Create your account</CardTitle>
					<CardDescription>
						Enter your details below to create to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit();
						}}
					>
						<AppField
							name="username"
							children={(field) => (
								<field.TextInput label="Full Name" placeholder="Jane Doe" />
							)}
						/>
						<AppField
							name="email"
							children={(field) => (
								<field.TextInput label="Email" placeholder="jane@doe.com" />
							)}
						/>
						<AppField
							name="age"
							children={(field) => <field.NumberInput label="Age" />}
						/>
						<AppField
							name="acceptTOS"
							children={(field) => <field.CheckboxInput label="Accept TOS" />}
						/>
						<AppForm>
							<SubmitButton>Create Account</SubmitButton>
						</AppForm>
					</form>
				</CardContent>
			</Card>
		</main>
	);
};

export default App;
