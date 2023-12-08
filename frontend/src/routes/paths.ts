// function to concat root with their sublinks (e.g: /auth/login)
function path(root: string, sublink: string) {
	return `${root}${sublink}`;
}

const ROOT_AUTH = "/auth";
const ROOT_DASHBOARD = "/dashboard";

export const PATH_AUTH = {
	root: ROOT_AUTH,
	login: path(ROOT_AUTH, "/login"),
	register: path(ROOT_AUTH, "/register"),
};

export const PATH_DASHBOARD = {
	root: ROOT_DASHBOARD,
	shipper: path(ROOT_DASHBOARD, "/shipper"),
	receiver: path(ROOT_DASHBOARD, "/receiver"),
	profile: path(ROOT_DASHBOARD, "/profile"),
};
