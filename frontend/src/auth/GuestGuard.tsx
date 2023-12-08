import { Navigate } from "react-router-dom";
// components
import { LoadingScreen } from "../components";
// config
import { ROUTE_AFTER_LOGIN } from "../config-global";
//
import { useAuthContext } from "./useAuthContext";

// ----------------------------------------------------------------------

type GuestGuardProps = {
	children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
	const { isAuthenticated, isInitialized } = useAuthContext();

	if (isAuthenticated) {
		return <Navigate to={ROUTE_AFTER_LOGIN} />;
	}

	if (!isInitialized) {
		return <LoadingScreen />;
	}

	return <> {children} </>;
}
