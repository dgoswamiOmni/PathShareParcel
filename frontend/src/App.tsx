// routes
import Router from "./routes";
// auth
import { AuthProvider } from "./auth/FirebaseContext";
// theme
import ThemeProvider from "./theme";
// mui
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'

function App() {
	return (
		<AuthProvider>
			<ThemeProvider>
				<LocalizationProvider dateAdapter={AdapterMoment}>
					<Router />
				</LocalizationProvider>
			</ThemeProvider>
		</AuthProvider>
	);
}

export default App;
