import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
// mui
import { Box, Typography } from "@mui/material";
// auth
import { useAuthContext } from "../auth/useAuthContext";

export default function MainLayout() {
	const { user } = useAuthContext();

	// @ts-ignore
	const { displayName } = user;

	return (
		<>
			<Box sx={{ p: 3 }}>
				<Typography variant='h2' fontSize={24}>
					Hello, {displayName ?? "User"}
				</Typography>
			</Box>
			<Outlet />
			<BottomNav />
		</>
	);
}
