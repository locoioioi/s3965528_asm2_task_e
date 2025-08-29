"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState("");

	const { forgotPassword, isLoading } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			const success = await forgotPassword(email);
			if (success) {
				setIsSubmitted(true);
			} else {
				setError("Unable to send reset email. Please try again.");
			}
		} catch (err) {
			setError("An error occurred. Please try again.");
		}
	};

	if (isSubmitted) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div className="text-center">
						<div className="mx-auto h-12 w-12 flex items-center justify-center">
							<CheckCircle className="h-12 w-12 text-green-500" />
						</div>
						<h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
							Check Your Email
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							We&rsquo;ve sent a password reset link to{" "}
							<span className="font-medium">{email}</span>
						</p>
					</div>

					<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
						<div className="text-sm text-blue-800">
							<p className="font-medium mb-2">What to do next:</p>
							<ul className="list-disc list-inside space-y-1">
								<li>Check your email inbox for the reset link</li>
								<li>Click the link in the email to reset your password</li>
								<li>
									If you don&rsquo;t see the email, check your spam folder
								</li>
								<li>The link will expire in 24 hours</li>
							</ul>
						</div>
					</div>

					<div className="space-y-4">
						<div className="text-center">
							<Link
								href={`/reset-password?email=${encodeURIComponent(email)}`}
								className="text-primary-600 hover:text-primary-500 font-medium text-sm"
							>
								I have the verification code
							</Link>
						</div>

						<div className="text-center">
							<button
								onClick={() => setIsSubmitted(false)}
								className="text-gray-600 hover:text-gray-900 text-sm"
							>
								Try a different email address
							</button>
						</div>

						<div className="text-center">
							<Link
								href="/login"
								className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
							>
								<ArrowLeft className="h-4 w-4 mr-1" />
								Back to sign in
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
						Enter your email address and we&rsquo;ll send you a link to reset
						your password.
					</p>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					{error && (
						<div className="bg-red-50 border border-red-200 rounded-lg p-4">
							<div className="text-sm text-red-700">{error}</div>
						</div>
					)}

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
								placeholder="Enter your email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={isLoading}
							className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isLoading ? "Sending..." : "Send Reset Link"}
						</button>
					</div>

					<div className="text-center">
						<Link
							href="/login"
							className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
						>
							<ArrowLeft className="h-4 w-4 mr-1" />
							Back to sign in
						</Link>
					</div>

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-gray-50 text-gray-500">
									Need help?
								</span>
							</div>
						</div>

						<div className="mt-4 text-center">
							<p className="text-sm text-gray-600">
								Don&rsquo;t have an account?{" "}
								<Link
									href="/register"
									className="font-medium text-primary-600 hover:text-primary-500"
								>
									Sign up for BookNest
								</Link>
							</p>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
