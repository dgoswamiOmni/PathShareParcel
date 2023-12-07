import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
// auth
import AuthGuard from "../auth/AuthGuard";
import GuestGuard from "../auth/GuestGuard";
// elements
import { LoginPage, RegisterPage } from "./element";

const router = createBrowserRouter([
	// AUTH
	{
		path: "auth",
		children: [
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
		],
	},
	{ path: "*", element: <Navigate to='/404' replace /> },
]);

export default function Router() {
	return <RouterProvider router={router} />;
}
