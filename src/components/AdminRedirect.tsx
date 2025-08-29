"use client";

import { useAuth } from "@/contexts/AuthContext";

interface AdminRedirectProps {
	children: React.ReactNode;
}

export default function AdminRedirect({ children }: AdminRedirectProps) {
	const { user } = useAuth();

	// Admin users can access all pages - no restrictions
	// This component now serves as a placeholder for potential future role-based restrictions
	return <>{children}</>;
}
