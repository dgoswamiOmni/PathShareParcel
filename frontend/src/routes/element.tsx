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

export const LoginPage = Loadable(
	lazy(() => import("../pages/auth/LoginPage")),
);
export const RegisterPage = Loadable(
	lazy(() => import("../pages/auth/RegisterPage")),
);
export const SelectRolePage = Loadable(
	lazy(() => import("../pages/dashboard/SelectRolePage")),
);
