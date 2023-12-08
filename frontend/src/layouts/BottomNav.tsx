import { Link as RouterLink, useLocation } from "react-router-dom";
// mui
import { Box, Link, SvgIcon, Stack, Typography } from "@mui/material";
// navigation configs
import { navConfig } from "./nav-config";

export default function BottomNav() {
	const { pathname } = useLocation();

	return (
		<Box
			position='fixed'
			color='white'
			sx={{
				top: "auto",
				bottom: 0,
				height: 80,
				width: "100%",
				px: 5,
				boxShadow: "0px -4px 16px 4px #0000001A",
				borderRadius: "20px 20px 0 0",
				zIndex: 100000,
				bgcolor: "grey.0",
			}}>
			<Stack
				direction='row'
				alignItems='center'
				justifyContent='space-between'
				sx={{ mt: 2 }}>
				{navConfig.map(({ title, path, Icon }) => (
					<Link
						key={title}
						component={RouterLink}
						to={path}
						color={pathname === path ? "primary.main" : "grey.900"}
						variant='body2'
						underline='none'>
						<Stack
							direction='column'
							justifyContent='center'
							alignItems='center'>
							<SvgIcon
								viewBox='0 0 51 51'
								sx={{ width: "2rem", height: "2rem" }}>
								<Icon selected={pathname === path} />
							</SvgIcon>
							<Typography variant='caption'>{title}</Typography>
						</Stack>
					</Link>
				))}
			</Stack>
		</Box>
	);
}
