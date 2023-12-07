import { Navigate } from "react-router-dom";
// components
import { LoadingScreen } from "../components";
//
import { useAuthContext } from "./useAuthContext";

// ----------------------------------------------------------------------

type GuestGuardProps = {
	children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
	const { isAuthenticated, isInitialized } = useAuthContext();

	if (isAuthenticated) {
		return <Navigate to='/' />;
	}

	if (!isInitialized) {
		return <LoadingScreen />;
	}

	return <> {children} </>;
}
