import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
// auth
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
// elements
import {
	LoginPage,
	RegisterPage,
	ProfilePage,
	ShipperPage,
	ReceiverPage,
} from "./element";
// layout
import { MainLayout } from "../layouts";
// config
import { ROUTE_AFTER_LOGIN } from "../config-global";

// Create app routes
const router = createBrowserRouter([
	// AUTH
	{
		path: "auth",
		children: [
			{
				path: "login",
				element: (
					<GuestGuard>
						<LoginPage />
					</GuestGuard>
				),
			},
			{
				path: "register",
				element: (
					<GuestGuard>
						<RegisterPage />
					</GuestGuard>
				),
			},
		],
	},
	{
		path: "dashboard",
		element: (
			<AuthGuard>
				<MainLayout />
			</AuthGuard>
		),
		children: [
			{ element: <Navigate to={ROUTE_AFTER_LOGIN} replace />, index: true },
			{ path: "shipper", element: <ShipperPage /> },
			{ path: "receiver", element: <ReceiverPage /> },
			{ path: "profile", element: <ProfilePage /> },
		],
	},
	{ path: "*", element: <Navigate to='/404' replace /> },
]);

export default function Router() {
	return <RouterProvider router={router} />;
}
