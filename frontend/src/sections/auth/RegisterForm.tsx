import { useState } from "react";
import * as Yup from "yup";
import { Link as RouterLink } from "react-router-dom";
// routes
import { PATH_AUTH } from "../../routes/paths";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// mui
import {
	Stack,
	Card,
	InputAdornment,
	IconButton,
	Alert,
	Typography,
	Link,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
// components
import FormProvider, { RHFTextField } from "../../components/hook-form";

type FormValuesProps = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	afterSubmit?: string;
};

export default function RegisterForm() {
	const [showPassword, setShowPassword] = useState(false);

	// register form fields validation
	const RegisterSchema = Yup.object().shape({
		firstName: Yup.string().required("First name required"),
		lastName: Yup.string().required("Last name required"),
		email: Yup.string()
			.required("Email is required")
			.email("Email must be a valid email address"),
		password: Yup.string().required("Password is required"),
	});

	// default register form values
	const defaultValues = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	};

	const methods = useForm<FormValuesProps>({
		resolver: yupResolver(RegisterSchema),
		defaultValues,
	});

	const {
		reset,
		setError,
		handleSubmit,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = methods;

	return (
		<Card sx={{ p: 3, width: 350 }}>
			<Typography variant='h5' sx={{ mb: 2 }}>
				Register
			</Typography>
			<FormProvider methods={methods}>
				<Stack gap={2}>
					{!!errors.afterSubmit && (
						<Alert severity='error'>{errors.afterSubmit.message}</Alert>
					)}

					<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
						<RHFTextField name='firstName' label='First name' />
						<RHFTextField name='lastName' label='Last name' />
					</Stack>

					<RHFTextField name='email' label='Email address' />

					<RHFTextField
						name='password'
						label='Password'
						type={showPassword ? "text" : "password"}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										onClick={() => setShowPassword(!showPassword)}
										edge='end'>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					<LoadingButton
						fullWidth
						size='large'
						type='submit'
						variant='contained'
						loading={isSubmitSuccessful || isSubmitting}>
						Create account
					</LoadingButton>
				</Stack>
				<Stack sx={{ my: 2 }} alignItems='center' justifyContent='center'>
					<Typography variant='body1'>
						Already have an account?{" "}
						<Link
							component={RouterLink}
							to={PATH_AUTH.login}
							variant='body2'
							underline='always'>
							Login
						</Link>
					</Typography>
				</Stack>
			</FormProvider>
		</Card>
	);
}
