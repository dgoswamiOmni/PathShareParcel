// @mui
import { CircularProgress } from "@mui/material";
// styles
import { StyledRoot } from "../styles/StyledRoot";

export default function LoadingScreen() {
	return (
		<StyledRoot>
			<CircularProgress />
		</StyledRoot>
	);
}
