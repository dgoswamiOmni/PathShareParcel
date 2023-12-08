// components
import { IconArrowDown, IconArrowUp, IconProfile } from "../components";
// routes
import { PATH_DASHBOARD } from "../routes/paths";

export const navConfig = [
	{
		title: "Receiver",
		path: PATH_DASHBOARD.receiver,
		Icon: IconArrowDown,
	},
	{
		title: "Shipper",
		path: PATH_DASHBOARD.shipper,
		Icon: IconArrowUp,
	},
	{
		title: "Profile",
		path: PATH_DASHBOARD.profile,
		Icon: IconProfile,
	},
];
