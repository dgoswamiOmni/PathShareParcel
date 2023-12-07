// routes
import Router from "./routes";
// auth
import { AuthProvider } from "./auth/FirebaseContext";
// theme
import ThemeProvider from "./theme";

function App() {
	return (
		<AuthProvider>
			<ThemeProvider>
				<Router />
			</ThemeProvider>
		</AuthProvider>
	);
}

export default App;
