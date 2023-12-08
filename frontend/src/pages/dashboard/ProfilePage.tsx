// mui
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// auth
import { useAuthContext } from "../../auth/useAuthContext";

export default function ProfilePage() {
	const { logout } = useAuthContext();

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Box sx={{ px: 2 }}>
			<LoadingButton
				variant='contained'
				size='large'
				fullWidth
				onClick={handleLogout}>
				Logout
			</LoadingButton>
		</Box>
	);
}
