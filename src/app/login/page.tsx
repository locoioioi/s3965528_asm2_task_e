"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
	BookOpen,
	Eye,
	EyeOff,
	Mail,
	Lock,
	AlertCircle,
	CheckCircle
} from "lucide-react";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
	const [error, setError] = useState("");
	const [showMFA, setShowMFA] = useState(false);
	const [showNewPasswordRequired, setShowNewPasswordRequired] = useState(false);
	const [mfaCode, setMfaCode] = useState("");

	const {
		login,
		verifyMFA,
		setNewPassword: setNewPasswordChallenge,
		isLoading,
		user,
		currentChallenge
	} = useAuth();
	const router = useRouter();

	// Handle challenge state changes
	useEffect(() => {
		if (currentChallenge === "SOFTWARE_TOKEN_MFA") {
			setShowNewPasswordRequired(false);
			setShowMFA(true);
		} else if (currentChallenge === "NEW_PASSWORD_REQUIRED") {
			setShowNewPasswordRequired(true);
			setShowMFA(false);
		} else if (currentChallenge === "MFA_SETUP") {
			// Redirect to MFA setup page
			router.push("/mfa-setup");
		} else if (currentChallenge === null) {
			setShowNewPasswordRequired(false);
			setShowMFA(false);
		}
	}, [currentChallenge, router]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			const result = await login(email, password);
			if (result.success) {
				router.push("/");
			} else if (result.requiresMFA) {
				setShowMFA(true);
			} else if (result.requiresNewPassword) {
				setShowNewPasswordRequired(true);
			} else {
				setError("Invalid email or password");
			}
		} catch (err: any) {
			console.error("Login error:", err);
			if (err.name === "UserNotConfirmedException") {
				setError("Please verify your email address before signing in");
			} else if (err.name === "NotAuthorizedException") {
				setError("Invalid email or password");
			} else if (err.name === "UserNotFoundException") {
				setError("User not found. Please check your email address");
			} else {
				setError("An error occurred during login. Please try again.");
			}
		}
	};

	const handleMFASubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			const success = await verifyMFA(mfaCode);
			if (success) {
				router.push("/");
			} else {
				setError("Invalid MFA code");
			}
		} catch (err: any) {
			console.error("MFA error:", err);
			if (err.name === "CodeMismatchException") {
				setError("Invalid MFA code. Please try again.");
			} else if (err.name === "ExpiredCodeException") {
				setError("MFA code has expired. Please try again.");
			} else {
				setError(
					"An error occurred during MFA verification. Please try again."
				);
			}
		}
	};

	const handleNewPasswordSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (newPassword !== confirmNewPassword) {
			setError("Passwords do not match");
			return;
		}

		// Enhanced password validation for Cognito policy
		const passwordErrors = [];
		if (newPassword.length < 8) passwordErrors.push("at least 8 characters");
		if (!/[a-z]/.test(newPassword)) passwordErrors.push("lowercase letters");
		if (!/[A-Z]/.test(newPassword)) passwordErrors.push("uppercase letters");
		if (!/\d/.test(newPassword)) passwordErrors.push("numbers");
		if (!/[^A-Za-z0-9]/.test(newPassword))
			passwordErrors.push("special characters");

		if (passwordErrors.length > 0) {
			setError(`Password must contain ${passwordErrors.join(", ")}`);
			return;
		}

		try {
			const success = await setNewPasswordChallenge(newPassword);
			if (success) {
				router.push("/");
			} else {
				// Check the current challenge state to determine next step
				// setNewPasswordChallenge will update currentChallenge if MFA is needed
				// We'll use useEffect to react to challenge changes
			}
		} catch (err: any) {
			if (err.message?.includes("Password does not conform to policy")) {
				setError(
					"Password does not meet security requirements. Please ensure it contains uppercase, lowercase, numbers, and special characters."
				);
			} else if (err.message?.includes("Cannot proceed with MFA setup")) {
				setError(
					"There was an issue with the authentication flow. Please try signing in again."
				);
				// Reset to initial state
				setShowNewPasswordRequired(false);
				setShowMFA(false);
			} else {
				setError("An error occurred while setting new password");
			}
		}
	};

	if (showNewPasswordRequired) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<div className="mx-auto h-12 w-12 flex items-center justify-center">
							<BookOpen className="h-12 w-12 text-primary-600" />
						</div>
						<h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
							Set New Password
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							You need to set a new password to continue
						</p>
					</div>

					<form className="mt-8 space-y-6" onSubmit={handleNewPasswordSubmit}>
						{error && (
							<div className="flex items-center p-4 text-red-800 bg-red-100 rounded-lg">
								<AlertCircle className="h-5 w-5 mr-2" />
								<span className="text-sm">{error}</span>
							</div>
						)}

						<div className="space-y-4">
							<div>
								<label
									htmlFor="new-password"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									New Password
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Lock className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="new-password"
										name="new-password"
										type={showNewPassword ? "text" : "password"}
										required
										className="appearance-none rounded-lg relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
										placeholder="Enter new password"
										value={newPassword}
										onChange={(e) => setNewPassword(e.target.value)}
									/>
									<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
										<button
											type="button"
											className="text-gray-400 hover:text-gray-500 focus:outline-none"
											onClick={() => setShowNewPassword(!showNewPassword)}
										>
											{showNewPassword ? (
												<EyeOff className="h-5 w-5" />
											) : (
												<Eye className="h-5 w-5" />
											)}
										</button>
									</div>
								</div>
							</div>

							<div>
								<label
									htmlFor="confirm-new-password"
									className="block text-sm font-medium text-gray-700 mb-1"
								>
									Confirm New Password
								</label>
								<div className="relative">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Lock className="h-5 w-5 text-gray-400" />
									</div>
									<input
										id="confirm-new-password"
										name="confirm-new-password"
										type={showConfirmNewPassword ? "text" : "password"}
										required
										className="appearance-none rounded-lg relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
										placeholder="Confirm new password"
										value={confirmNewPassword}
										onChange={(e) => setConfirmNewPassword(e.target.value)}
									/>
									<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
										<button
											type="button"
											className="text-gray-400 hover:text-gray-500 focus:outline-none"
											onClick={() =>
												setShowConfirmNewPassword(!showConfirmNewPassword)
											}
										>
											{showConfirmNewPassword ? (
												<EyeOff className="h-5 w-5" />
											) : (
												<Eye className="h-5 w-5" />
											)}
										</button>
									</div>
								</div>
							</div>
						</div>

						{/* Password Requirements */}
						{newPassword && (
							<div className="bg-gray-50 rounded-lg p-4">
								<h4 className="text-sm font-medium text-gray-900 mb-2">
									Password requirements:
								</h4>
								<ul className="space-y-1">
									{[
										{
											label: "At least 8 characters",
											met: newPassword.length >= 8
										},
										{
											label: "Contains lowercase letter",
											met: /[a-z]/.test(newPassword)
										},
										{
											label: "Contains uppercase letter",
											met: /[A-Z]/.test(newPassword)
										},
										{ label: "Contains number", met: /\d/.test(newPassword) },
										{
											label: "Contains special character",
											met: /[^A-Za-z0-9]/.test(newPassword)
										}
									].map((req, index) => (
										<li key={index} className="flex items-center text-sm">
											{req.met ? (
												<CheckCircle className="h-4 w-4 text-green-500 mr-2" />
											) : (
												<div className="h-4 w-4 border border-gray-300 rounded-full mr-2" />
											)}
											<span
												className={req.met ? "text-green-700" : "text-gray-600"}
											>
												{req.label}
											</span>
										</li>
									))}
								</ul>
							</div>
						)}

						<div>
							<button
								type="submit"
								disabled={
									isLoading ||
									newPassword !== confirmNewPassword ||
									newPassword.length < 8 ||
									!/[a-z]/.test(newPassword) ||
									!/[A-Z]/.test(newPassword) ||
									!/\d/.test(newPassword) ||
									!/[^A-Za-z0-9]/.test(newPassword)
								}
								className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isLoading ? "Setting Password..." : "Set New Password"}
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}

	if (showMFA) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<div className="mx-auto h-12 w-12 flex items-center justify-center">
							<BookOpen className="h-12 w-12 text-primary-600" />
						</div>
						<h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
							Two-Factor Authentication
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Please enter the 6-digit code from your authenticator app
						</p>
					</div>

					<form className="mt-8 space-y-6" onSubmit={handleMFASubmit}>
						{error && (
							<div className="flex items-center p-4 text-red-800 bg-red-100 rounded-lg">
								<AlertCircle className="h-5 w-5 mr-2" />
								<span className="text-sm">{error}</span>
							</div>
						)}

						<div>
							<label htmlFor="mfa-code" className="sr-only">
								MFA Code
							</label>
							<input
								id="mfa-code"
								name="mfa-code"
								type="text"
								maxLength={6}
								required
								className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 text-center text-2xl tracking-widest focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-lg"
								placeholder="000000"
								value={mfaCode}
								onChange={(e) =>
									setMfaCode(e.target.value.replace(/\D/g, "").slice(0, 6))
								}
							/>
						</div>

						<div>
							<button
								type="submit"
								disabled={isLoading || mfaCode.length !== 6}
								className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isLoading ? "Verifying..." : "Verify Code"}
							</button>
						</div>

						<div className="text-center">
							<p className="text-sm text-gray-600">
								Enter the 6-digit code from your authenticator app
							</p>
						</div>
					</form>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<div className="mx-auto h-12 w-12 flex items-center justify-center">
						<BookOpen className="h-12 w-12 text-primary-600" />
					</div>
					<h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
						Welcome back to BookNest
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Or{" "}
						<Link
							href="/register"
							className="font-medium text-primary-600 hover:text-primary-500"
						>
							create a new account
						</Link>
					</p>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					{error && (
						<div className="flex items-center p-4 text-red-800 bg-red-100 rounded-lg">
							<AlertCircle className="h-5 w-5 mr-2" />
							<span className="text-sm">{error}</span>
						</div>
					)}

					<div className="space-y-4">
						<div>
							<label
								htmlFor="email-address"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Email address
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									autoComplete="current-password"
									required
									className="appearance-none rounded-lg relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
									placeholder="Enter your password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
									<button
										type="button"
										className="text-gray-400 hover:text-gray-500 focus:outline-none"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeOff className="h-5 w-5" />
										) : (
											<Eye className="h-5 w-5" />
										)}
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
							/>
							<label
								htmlFor="remember-me"
								className="ml-2 block text-sm text-gray-900"
							>
								Remember me
							</label>
						</div>

						<div className="text-sm">
							<Link
								href="/forgot-password"
								className="font-medium text-primary-600 hover:text-primary-500"
							>
								Forgot your password?
							</Link>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={isLoading}
							className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? "Signing in..." : "Sign in"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
