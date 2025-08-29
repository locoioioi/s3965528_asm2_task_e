"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
	BookOpen,
	Eye,
	EyeOff,
	Mail,
	Lock,
	User,
	AlertCircle,
	Check
} from "lucide-react";

export default function RegisterPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: ""
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [error, setError] = useState("");
	const [showEmailVerification, setShowEmailVerification] = useState(false);
	const [verificationCode, setVerificationCode] = useState("");
	const [resendCooldown, setResendCooldown] = useState(0);
	const [resendSuccess, setResendSuccess] = useState(false);

	const { register, confirmRegistration, resendVerificationCode, isLoading } =
		useAuth();
	const router = useRouter();

	const passwordRequirements = [
		{ label: "At least 8 characters", met: formData.password.length >= 8 },
		{
			label: "Contains uppercase letter",
			met: /[A-Z]/.test(formData.password)
		},
		{
			label: "Contains lowercase letter",
			met: /[a-z]/.test(formData.password)
		},
		{ label: "Contains number", met: /\d/.test(formData.password) },
		{
			label: "Contains special character",
			met: /[^A-Za-z0-9]/.test(formData.password)
		}
	];

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		// Validation
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (!passwordRequirements.every((req) => req.met)) {
			setError("Please meet all password requirements");
			return;
		}

		try {
			const result = await register(
				formData.email,
				formData.password,
				formData.name
			);
			if (result.success) {
				setShowEmailVerification(true);
			} else {
				setError("An account with this email already exists");
			}
		} catch (err: any) {
			if (err.message?.includes("Password does not conform to policy")) {
				setError(
					"Password does not meet security requirements. Please ensure it contains uppercase, lowercase, numbers, and special characters."
				);
			} else if (err.message?.includes("UsernameExistsException")) {
				setError("An account with this email already exists");
			} else {
				setError("An error occurred during registration");
			}
		}
	};

	const handleEmailVerification = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			const success = await confirmRegistration(
				formData.email,
				verificationCode
			);
			if (success) {
				router.push("/login?message=Account verified! Please sign in.");
			} else {
				setError("Invalid verification code");
			}
		} catch (err) {
			setError("An error occurred during email verification");
		}
	};

	const handleResendCode = async () => {
		setError("");
		setResendSuccess(false);
		try {
			const success = await resendVerificationCode(formData.email);
			if (success) {
				setResendSuccess(true);
				setResendCooldown(60); // 60 second cooldown

				// Start countdown timer
				const timer = setInterval(() => {
					setResendCooldown((prev) => {
						if (prev <= 1) {
							clearInterval(timer);
							setResendSuccess(false); // Hide success message after cooldown
							return 0;
						}
						return prev - 1;
					});
				}, 1000);
			} else {
				setError("Failed to resend verification code. Please try again.");
			}
		} catch (err) {
			setError("An error occurred while resending the code");
		}
	};

	if (showEmailVerification) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<div className="mx-auto h-12 w-12 flex items-center justify-center">
							<BookOpen className="h-12 w-12 text-primary-600" />
						</div>
						<h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
							Verify Your Email
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							We&rsquo;ve sent a verification code to{" "}
							<span className="font-medium">{formData.email}</span>
						</p>
					</div>

					<form className="mt-8 space-y-6" onSubmit={handleEmailVerification}>
						{error && (
							<div className="flex items-center p-4 text-red-800 bg-red-100 rounded-lg">
								<AlertCircle className="h-5 w-5 mr-2" />
								<span className="text-sm">{error}</span>
							</div>
						)}

						{resendSuccess && (
							<div className="flex items-center p-4 text-green-800 bg-green-100 rounded-lg">
								<Check className="h-5 w-5 mr-2" />
								<span className="text-sm">
									Verification code sent! Check your Outlook inbox.
								</span>
							</div>
						)}

						<div>
							<label
								htmlFor="verification-code"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Verification Code
							</label>
							<input
								id="verification-code"
								name="verification-code"
								type="text"
								maxLength={6}
								required
								className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 text-center text-2xl tracking-widest focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-lg"
								placeholder="000000"
								value={verificationCode}
								onChange={(e) =>
									setVerificationCode(
										e.target.value.replace(/\D/g, "").slice(0, 6)
									)
								}
							/>
						</div>

						<div>
							<button
								type="submit"
								disabled={isLoading || verificationCode.length !== 6}
								className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isLoading ? "Verifying..." : "Verify Email"}
							</button>
						</div>

						<div className="text-center">
							<button
								type="button"
								disabled={resendCooldown > 0}
								className="mt-2 text-sm text-primary-600 hover:text-primary-500 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
								onClick={handleResendCode}
							>
								{resendCooldown > 0
									? `Resend in ${resendCooldown}s`
									: "Resend verification code"}
							</button>
							<p className="mt-2 text-xs text-gray-500">
								Check your Outlook inbox and spam folder. It may take a few
								minutes to arrive.
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
						Join BookNest
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Or{" "}
						<Link
							href="/login"
							className="font-medium text-primary-600 hover:text-primary-500"
						>
							sign in to your existing account
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
								htmlFor="name"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Full Name
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<User className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="name"
									name="name"
									type="text"
									autoComplete="name"
									required
									className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
									placeholder="Enter your full name"
									value={formData.name}
									onChange={handleInputChange}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Email address
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Mail className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
									placeholder="Enter your email"
									value={formData.email}
									onChange={handleInputChange}
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
									autoComplete="new-password"
									required
									className="appearance-none rounded-lg relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
									placeholder="Create a password"
									value={formData.password}
									onChange={handleInputChange}
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

							{/* Password Requirements */}
							{formData.password && (
								<div className="mt-2 space-y-1">
									{passwordRequirements.map((req, index) => (
										<div key={index} className="flex items-center text-xs">
											<Check
												className={`h-3 w-3 mr-2 ${
													req.met ? "text-green-500" : "text-gray-300"
												}`}
											/>
											<span
												className={req.met ? "text-green-600" : "text-gray-500"}
											>
												{req.label}
											</span>
										</div>
									))}
								</div>
							)}
						</div>

						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Confirm Password
							</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Lock className="h-5 w-5 text-gray-400" />
								</div>
								<input
									id="confirmPassword"
									name="confirmPassword"
									type={showConfirmPassword ? "text" : "password"}
									autoComplete="new-password"
									required
									className="appearance-none rounded-lg relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
									placeholder="Confirm your password"
									value={formData.confirmPassword}
									onChange={handleInputChange}
								/>
								<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
									<button
										type="button"
										className="text-gray-400 hover:text-gray-500 focus:outline-none"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									>
										{showConfirmPassword ? (
											<EyeOff className="h-5 w-5" />
										) : (
											<Eye className="h-5 w-5" />
										)}
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="flex items-center">
						<input
							id="agree-terms"
							name="agree-terms"
							type="checkbox"
							required
							className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
						/>
						<label
							htmlFor="agree-terms"
							className="ml-2 block text-sm text-gray-900"
						>
							I agree to the{" "}
							<Link
								href="/terms"
								className="text-primary-600 hover:text-primary-500"
							>
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link
								href="/privacy"
								className="text-primary-600 hover:text-primary-500"
							>
								Privacy Policy
							</Link>
						</label>
					</div>

					<div>
						<button
							type="submit"
							disabled={isLoading}
							className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? "Creating account..." : "Create account"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
