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
	afterSubmit?: string;
};

export default function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);

	// login form fields validation
	const LoginSchema = Yup.object().shape({
		email: Yup.string()
			.required("Email is required")
			.email("Email must be a valid email address"),
		password: Yup.string().required("Password is required"),
	});

	// default login form values
	const defaultValues = {
		email: "",
		password: "",
	};

	const methods = useForm<FormValuesProps>({
		resolver: yupResolver(LoginSchema),
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
				Login
			</Typography>
			<FormProvider methods={methods}>
				<Stack gap={2}>
					{!!errors.afterSubmit && (
						<Alert severity='error'>{errors.afterSubmit.message}</Alert>
					)}
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
						Login
					</LoadingButton>
				</Stack>
				<Stack sx={{ my: 2 }} alignItems='center' justifyContent='center'>
					<Typography variant='body1'>
						Don't have an account yet?{" "}
						<Link
							component={RouterLink}
							to={PATH_AUTH.register}
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
