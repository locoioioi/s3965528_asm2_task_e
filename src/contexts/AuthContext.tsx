"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import {
	signIn,
	signUp,
	confirmSignUp,
	resetPassword,
	confirmResetPassword,
	signOut,
	getCurrentUser,
	fetchUserAttributes,
	confirmSignIn,
	setUpTOTP,
	verifyTOTPSetup,
	updateMFAPreference,
	fetchAuthSession,
	resendSignUpCode
} from "aws-amplify/auth";

// Configure Amplify
const cognitoAuthConfig = {
	Auth: {
		Cognito: {
			userPoolId: "us-east-1_7JEbEDNxI",
			userPoolClientId: "62doa0cn2vvgu9is2ctp515ui2",
			loginWith: {
				oauth: {
					domain: "us-east-17jebednxi.auth.us-east-1.amazoncognito.com",
					scopes: ["email", "openid", "phone"],
					redirectSignIn: ["http://localhost:3000/authorization"],
					redirectSignOut: ["http://localhost:3000/logout"],
					responseType: "code" as const
				}
			}
		}
	}
};

Amplify.configure(cognitoAuthConfig);

export type UserRole = "public" | "user" | "admin";

export interface User {
	id: string;
	email: string;
	name: string;
	role: UserRole;
	avatar?: string;
	memberSince?: string;
	favoriteGenres?: string[];
	readingList?: string[];
	purchaseHistory?: string[];
	emailVerified?: boolean;
	mfaEnabled?: boolean;
}

interface AuthContextType {
	user: User | null;
	login: (
		email: string,
		password: string
	) => Promise<{
		success: boolean;
		requiresMFA?: boolean;
		requiresNewPassword?: boolean;
		requiresMFASetup?: boolean;
		challengeName?: string;
	}>;
	logout: () => Promise<void>;
	register: (
		email: string,
		password: string,
		name: string
	) => Promise<{ success: boolean; requiresVerification?: boolean }>;
	confirmRegistration: (email: string, code: string) => Promise<boolean>;
	resendVerificationCode: (email: string) => Promise<boolean>;
	forgotPassword: (email: string) => Promise<boolean>;
	confirmForgotPassword: (
		email: string,
		code: string,
		newPassword: string
	) => Promise<boolean>;
	verifyMFA: (code: string) => Promise<boolean>;
	setNewPassword: (newPassword: string) => Promise<boolean>;
	setupMFA: () => Promise<{ qrCode?: string; secret?: string }>;
	confirmMFASetup: (code: string) => Promise<boolean>;
	isLoading: boolean;
	currentChallenge: string | null;
	totpSetupDetails: { secret?: string; qrCode?: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [currentChallenge, setCurrentChallenge] = useState<string | null>(null);
	const [totpSetupDetails, setTotpSetupDetails] = useState<{
		secret?: string;
		qrCode?: string;
	} | null>(null);

	useEffect(() => {
		checkAuthState();
	}, []);

	const checkAuthState = async () => {
		try {
			const currentUser = await getCurrentUser();
			const attributes = await fetchUserAttributes();

			// Fetch user groups to determine role
			let userRole: UserRole = "user"; // default role for users with no groups
			try {
				const session = await fetchAuthSession();
				const groups =
					(session.tokens?.accessToken?.payload[
						"cognito:groups"
					] as string[]) || [];

				console.log("User groups:", groups); // Debug log to help with troubleshooting

				// Role determination logic:
				// - If user has "admin" group → admin role (highest priority)
				// - If user has no groups → regular user (default)
				// - If user has "user" group but no "admin" → regular user
				if (groups.includes("admin")) {
					userRole = "admin";
				} else {
					userRole = "user"; // Default for no groups or user group only
				}

				console.log("Assigned role:", userRole); // Debug log
			} catch (groupError) {
				console.log(
					"Could not fetch user groups, defaulting to user role:",
					groupError
				);
				userRole = "user"; // Fallback to regular user if groups can't be fetched
			}

			const userData: User = {
				id: currentUser.userId,
				email: attributes.email || "",
				name: attributes.name || attributes.given_name || "User",
				role: userRole,
				emailVerified: attributes.email_verified === "true",
				memberSince: attributes.created_at || new Date().toISOString(),
				favoriteGenres: [],
				readingList: [],
				purchaseHistory: [],
				mfaEnabled: false // Will be updated based on MFA status
			};

			setUser(userData);
		} catch (error) {
			console.log("No authenticated user", error);
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};

	const login = async (email: string, password: string) => {
		setIsLoading(true);
		try {
			const result = await signIn({
				username: email,
				password: password
			});

			if (result.isSignedIn) {
				await checkAuthState();
				setCurrentChallenge(null);
				setTotpSetupDetails(null);
				setIsLoading(false);
				return { success: true };
			} else if (
				result.nextStep?.signInStep === "CONFIRM_SIGN_IN_WITH_TOTP_CODE"
			) {
				setCurrentChallenge("SOFTWARE_TOKEN_MFA");
				setIsLoading(false);
				return {
					success: false,
					requiresMFA: true,
					challengeName: "SOFTWARE_TOKEN_MFA"
				};
			} else if (
				result.nextStep?.signInStep ===
				"CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
			) {
				setCurrentChallenge("NEW_PASSWORD_REQUIRED");
				setIsLoading(false);
				return {
					success: false,
					requiresNewPassword: true,
					challengeName: "NEW_PASSWORD_REQUIRED"
				};
			} else if (
				result.nextStep?.signInStep === "CONTINUE_SIGN_IN_WITH_TOTP_SETUP"
			) {
				setCurrentChallenge("MFA_SETUP");
				// Extract TOTP setup details if available
				if (result.nextStep?.totpSetupDetails) {
					const details = result.nextStep.totpSetupDetails;
					setTotpSetupDetails({
						secret: details.sharedSecret,
						qrCode: details.getSetupUri("BookNest").toString()
					});
				}
				setIsLoading(false);
				return {
					success: false,
					requiresMFASetup: true,
					challengeName: "MFA_SETUP"
				};
			}

			setIsLoading(false);
			return { success: false };
		} catch (error: any) {
			console.error("Login error:", error);
			setIsLoading(false);
			return { success: false };
		}
	};

	const logout = async () => {
		try {
			await signOut({ global: true });
			setUser(null);

			// Redirect to Cognito logout
			const clientId = "62doa0cn2vvgu9is2ctp515ui2";
			const logoutUri = "http://localhost:3000/logout";
			const cognitoDomain =
				"https://us-east-17jebednxi.auth.us-east-1.amazoncognito.com";
			window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
				logoutUri
			)}`;
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	const register = async (email: string, password: string, name: string) => {
		setIsLoading(true);
		try {
			await signUp({
				username: email,
				password: password,
				options: {
					userAttributes: {
						email: email,
						name: name
					}
				}
			});

			setIsLoading(false);
			return { success: true, requiresVerification: true };
		} catch (error: any) {
			console.error("Registration error:", error);
			setIsLoading(false);
			return { success: false };
		}
	};

	const confirmRegistration = async (
		email: string,
		code: string
	): Promise<boolean> => {
		try {
			await confirmSignUp({
				username: email,
				confirmationCode: code
			});
			return true;
		} catch (error) {
			console.error("Confirmation error:", error);
			return false;
		}
	};

	const resendVerificationCode = async (email: string): Promise<boolean> => {
		try {
			await resendSignUpCode({ username: email });
			return true;
		} catch (error) {
			console.error("Resend verification code error:", error);
			return false;
		}
	};

	const forgotPassword = async (email: string): Promise<boolean> => {
		try {
			await resetPassword({ username: email });
			return true;
		} catch (error) {
			console.error("Forgot password error:", error);
			return false;
		}
	};

	const confirmForgotPassword = async (
		email: string,
		code: string,
		newPassword: string
	): Promise<boolean> => {
		try {
			await confirmResetPassword({
				username: email,
				confirmationCode: code,
				newPassword: newPassword
			});
			return true;
		} catch (error) {
			console.error("Confirm forgot password error:", error);
			return false;
		}
	};

	const verifyMFA = async (code: string): Promise<boolean> => {
		try {
			const result = await confirmSignIn({
				challengeResponse: code
			});

			if (result.isSignedIn) {
				await checkAuthState();
				setCurrentChallenge(null);
				return true;
			}
			return false;
		} catch (error) {
			console.error("MFA verification error:", error);
			return false;
		}
	};

	const setNewPassword = async (newPassword: string): Promise<boolean> => {
		try {
			const result = await confirmSignIn({
				challengeResponse: newPassword
			});

			if (result.isSignedIn) {
				await checkAuthState();
				setCurrentChallenge(null);
				return true;
			} else if (
				result.nextStep?.signInStep === "CONFIRM_SIGN_IN_WITH_TOTP_CODE"
			) {
				// If MFA is required after password change, update challenge state
				setCurrentChallenge("SOFTWARE_TOKEN_MFA");
				return false;
			} else if (
				result.nextStep?.signInStep === "CONTINUE_SIGN_IN_WITH_TOTP_SETUP"
			) {
				// If MFA setup is required after password change, update challenge state
				setCurrentChallenge("MFA_SETUP");
				// Extract TOTP setup details if available
				if (result.nextStep?.totpSetupDetails) {
					const details = result.nextStep.totpSetupDetails;
					setTotpSetupDetails({
						secret: details.sharedSecret,
						qrCode: details.getSetupUri("BookNest").toString()
					});
				}
				return false;
			}
			return false;
		} catch (error: any) {
			console.error("New password error:", error);
			// Clear challenge state on error
			setCurrentChallenge(null);
			throw error;
		}
	};

	const setupMFA = async () => {
		try {
			// If we already have TOTP setup details from the challenge, return them
			if (totpSetupDetails && currentChallenge === "MFA_SETUP") {
				return totpSetupDetails;
			}

			// Otherwise, call the API for authenticated users
			const totpSetupDetailsFromAPI = await setUpTOTP();
			const details = {
				qrCode: totpSetupDetailsFromAPI.getSetupUri("BookNest").toString(),
				secret: totpSetupDetailsFromAPI.sharedSecret
			};
			setTotpSetupDetails(details);
			return details;
		} catch (error) {
			console.error("MFA setup error:", error);
			// Return empty object but don't throw to prevent app crash
			return {};
		}
	};

	const confirmMFASetup = async (code: string): Promise<boolean> => {
		try {
			// If we're in an MFA_SETUP challenge, use confirmSignIn
			if (currentChallenge === "MFA_SETUP") {
				const result = await confirmSignIn({
					challengeResponse: code
				});

				if (result.isSignedIn) {
					await checkAuthState();
					setCurrentChallenge(null);
					setTotpSetupDetails(null);
					return true;
				}
				return false;
			} else {
				// Standard MFA setup for authenticated users
				await verifyTOTPSetup({ code });
				await updateMFAPreference({
					sms: "DISABLED",
					totp: "PREFERRED"
				});

				// Update user MFA status
				if (user) {
					setUser({ ...user, mfaEnabled: true });
				}

				return true;
			}
		} catch (error) {
			console.error("MFA confirmation error:", error);
			return false;
		}
	};

	const value = {
		user,
		login,
		logout,
		register,
		confirmRegistration,
		resendVerificationCode,
		forgotPassword,
		confirmForgotPassword,
		verifyMFA,
		setNewPassword,
		setupMFA,
		confirmMFASetup,
		isLoading,
		currentChallenge,
		totpSetupDetails
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
