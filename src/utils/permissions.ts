// Types
export interface User {
	id: string;
	email: string;
	name: string;
	role: "user" | "admin";
}

export type AccessLevel = "public" | "user" | "admin";

export interface RoutePermission {
	path: string;
	requiredLevel: AccessLevel;
	description?: string;
}

// Define route permissions
export const routePermissions: RoutePermission[] = [
	{ path: "/", requiredLevel: "public", description: "Homepage" },
	{ path: "/books", requiredLevel: "public", description: "Browse books" },
	{
		path: "/categories",
		requiredLevel: "public",
		description: "Book categories"
	},
	{ path: "/bestsellers", requiredLevel: "public", description: "Bestsellers" },
	{ path: "/login", requiredLevel: "public", description: "Login page" },
	{
		path: "/register",
		requiredLevel: "public",
		description: "Registration page"
	},
	{
		path: "/forgot-password",
		requiredLevel: "public",
		description: "Password reset"
	},
	{ path: "/admin", requiredLevel: "admin", description: "Admin dashboard" },
	{ path: "/profile", requiredLevel: "user", description: "User profile" },
	{ path: "/wishlist", requiredLevel: "user", description: "User wishlist" },
	{ path: "/orders", requiredLevel: "user", description: "Order history" }
];

/**
 * Check if user has permission to access a route
 */
export function hasPermission(
	user: User | null,
	requiredLevel: AccessLevel
): boolean {
	switch (requiredLevel) {
		case "public":
			return true;
		case "user":
			return user !== null;
		case "admin":
			return user !== null && user.role === "admin";
		default:
			return false;
	}
}

/**
 * Get the required access level for a route
 */
export function getRoutePermission(path: string): RoutePermission | null {
	return (
		routePermissions.find(
			(route) => route.path === path || path.startsWith(route.path + "/")
		) || null
	);
}

/**
 * Check if user can access a specific route
 */
export function canAccessRoute(user: User | null, path: string): boolean {
	const permission = getRoutePermission(path);
	if (!permission) {
		// If route is not defined, allow access (default behavior)
		return true;
	}
	return hasPermission(user, permission.requiredLevel);
}

/**
 * Get redirect URL based on user status
 */
export function getRedirectUrl(
	user: User | null,
	intendedPath?: string
): string {
	if (!user) {
		return `/login${
			intendedPath ? `?redirect=${encodeURIComponent(intendedPath)}` : ""
		}`;
	}
	return "/unauthorized";
}

/**
 * Get user-friendly access level name
 */
export function getAccessLevelName(level: AccessLevel): string {
	switch (level) {
		case "public":
			return "Everyone";
		case "user":
			return "Registered Users";
		case "admin":
			return "Administrators";
		default:
			return "Unknown";
	}
}
