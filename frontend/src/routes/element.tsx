import { lazy, ElementType, Suspense } from "react";
// components
import { LoadingScreen } from "../components";

// Create a fallback component for lazy loaded component
const Loadable = (Component: ElementType) => (props: any) =>
	(
		<Suspense fallback={<LoadingScreen />}>
			<Component {...props} />
		</Suspense>
	);

// Auth pages
export const LoginPage = Loadable(
	lazy(() => import("../pages/auth/LoginPage")),
);
export const RegisterPage = Loadable(
	lazy(() => import("../pages/auth/RegisterPage")),
);
// Dashboard pages
export const SelectRolePage = Loadable(
	lazy(() => import("../pages/dashboard/SelectRolePage")),
);
export const ShipperPage = Loadable(
	lazy(() => import("../pages/dashboard/ShipperPage")),
);
export const ReceiverPage = Loadable(
	lazy(() => import("../pages/dashboard/ReceiverPage")),
);
