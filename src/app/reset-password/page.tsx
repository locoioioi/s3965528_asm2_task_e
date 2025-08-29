"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
	BookOpen,
	Lock,
	Eye,
	EyeOff,
	AlertCircle,
	CheckCircle
} from "lucide-react";
import { Suspense } from "react";

function ResetPasswordForm() {
	const [formData, setFormData] = useState({
		email: "",
		code: "",
		newPassword: "",
		confirmPassword: ""
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [error, setError] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);

	const { confirmForgotPassword, isLoading } = useAuth();
	const router = useRouter();
	const searchParams = useSearchParams();

	useEffect(() => {
		const email = searchParams.get("email");
		if (email) {
			setFormData((prev) => ({ ...prev, email }));
		}
	}, [searchParams]);

	const passwordRequirements = [
		{ label: "At least 8 characters", met: formData.newPassword.length >= 8 },
		{
			label: "Contains uppercase letter",
			met: /[A-Z]/.test(formData.newPassword)
		},
		{
			label: "Contains lowercase letter",
			met: /[a-z]/.test(formData.newPassword)
		},
		{ label: "Contains number", met: /\d/.test(formData.newPassword) },
		{
			label: "Contains special character",
			met: /[^A-Za-z0-9]/.test(formData.newPassword)
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
		if (formData.newPassword !== formData.confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (!passwordRequirements.every((req) => req.met)) {
			setError("Please meet all password requirements");
			return;
		}

		try {
			const success = await confirmForgotPassword(
				formData.email,
				formData.code,
				formData.newPassword
			);
			if (success) {
				setIsSuccess(true);
				setTimeout(() => {
					router.push(
						"/login?message=Password reset successfully! Please sign in with your new password."
					);
				}, 3000);
			} else {
				setError("Invalid verification code or unable to reset password");
			}
		} catch (err) {
			setError("An error occurred while resetting your password");
		}
	};

	if (isSuccess) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div className="text-center">
						<div className="mx-auto h-12 w-12 flex items-center justify-center">
							<CheckCircle className="h-12 w-12 text-green-500" />
						</div>
						<h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
							Password Reset Successful
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Your password has been successfully reset. You can now sign in
							with your new password.
						</p>
						<div className="mt-4">
							<Link
								href="/login"
								className="text-primary-600 hover:text-primary-500 font-medium"
							>
								Continue to Sign In
							</Link>
						</div>
					</div>
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
						Reset Your Password
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Enter the verification code from your email and create a new
						password.
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
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								placeholder="Enter your email"
								value={formData.email}
								onChange={handleInputChange}
							/>
						</div>

						<div>
							<label
								htmlFor="code"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Verification code
							</label>
							<input
								id="code"
								name="code"
								type="text"
								required
								className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
								placeholder="Enter the code from your email"
								value={formData.code}
								onChange={handleInputChange}
							/>
						</div>

						<div>
							<label
								htmlFor="newPassword"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								New password
							</label>
							<div className="relative">
								<input
									id="newPassword"
									name="newPassword"
									type={showPassword ? "text" : "password"}
									required
									className="appearance-none rounded-lg relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
									placeholder="Enter new password"
									value={formData.newPassword}
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
						</div>

						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								Confirm new password
							</label>
							<div className="relative">
								<input
									id="confirmPassword"
									name="confirmPassword"
									type={showConfirmPassword ? "text" : "password"}
									required
									className="appearance-none rounded-lg relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
									placeholder="Confirm new password"
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

					{/* Password Requirements */}
					{formData.newPassword && (
						<div className="bg-gray-50 rounded-lg p-4">
							<h4 className="text-sm font-medium text-gray-900 mb-2">
								Password requirements:
							</h4>
							<ul className="space-y-1">
								{passwordRequirements.map((req, index) => (
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
								isLoading || !passwordRequirements.every((req) => req.met)
							}
							className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? "Resetting password..." : "Reset password"}
						</button>
					</div>

					<div className="text-center">
						<Link
							href="/login"
							className="text-sm text-gray-600 hover:text-gray-900"
						>
							Back to sign in
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default function ResetPasswordPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen flex items-center justify-center bg-gray-50">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
				</div>
			}
		>
			<ResetPasswordForm />
		</Suspense>
	);
}
