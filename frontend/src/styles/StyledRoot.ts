// mui
import { styled } from "@mui/material/styles";

export const StyledRoot = styled("div")(({ theme }) => ({
	right: 0,
	bottom: 0,
	zIndex: 9998,
	width: "100%",
	height: "100%",
	position: "fixed",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: theme.palette.grey[300],
}));
