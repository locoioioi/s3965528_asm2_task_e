"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen } from "lucide-react";

function AuthorizationContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { user, isLoading } = useAuth();
	const [status, setStatus] = useState<"processing" | "success" | "error">(
		"processing"
	);

	useEffect(() => {
		const handleAuthCallback = async () => {
			try {
				const code = searchParams.get("code");
				const error = searchParams.get("error");

				if (error) {
					setStatus("error");
					setTimeout(() => {
						router.push("/login?error=" + encodeURIComponent(error));
					}, 3000);
					return;
				}

				if (code) {
					// Let Amplify handle the OAuth callback automatically
					setStatus("success");
					setTimeout(() => {
						router.push("/");
					}, 2000);
				} else {
					setStatus("error");
					setTimeout(() => {
						router.push("/login");
					}, 3000);
				}
			} catch (error) {
				console.error("Authorization error:", error);
				setStatus("error");
				setTimeout(() => {
					router.push("/login");
				}, 3000);
			}
		};

		if (!isLoading) {
			handleAuthCallback();
		}
	}, [searchParams, router, isLoading]);

	const renderContent = () => {
		switch (status) {
			case "processing":
				return (
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
						<h2 className="text-2xl font-bold text-gray-900 mb-2">
							Processing Authorization
						</h2>
						<p className="text-gray-600">
							Please wait while we complete your sign-in...
						</p>
					</div>
				);
			case "success":
				return (
					<div className="text-center">
						<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg
								className="w-6 h-6 text-green-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<h2 className="text-2xl font-bold text-gray-900 mb-2">
							Authorization Successful
						</h2>
						<p className="text-gray-600">Redirecting you to BookNest...</p>
					</div>
				);
			case "error":
				return (
					<div className="text-center">
						<div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<svg
								className="w-6 h-6 text-red-600"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</div>
						<h2 className="text-2xl font-bold text-gray-900 mb-2">
							Authorization Failed
						</h2>
						<p className="text-gray-600">
							There was an error signing you in. Redirecting to login...
						</p>
					</div>
				);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<div className="flex justify-center">
					<BookOpen className="h-12 w-12 text-primary-600" />
				</div>
				<h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					BookNest
				</h1>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					{renderContent()}
				</div>
			</div>
		</div>
	);
}

export default function AuthorizationPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-md">
						<div className="flex justify-center">
							<BookOpen className="h-12 w-12 text-primary-600" />
						</div>
						<h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
							BookNest
						</h1>
					</div>
					<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
						<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
							<div className="text-center">
								<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
								<h2 className="text-2xl font-bold text-gray-900 mb-2">
									Loading...
								</h2>
							</div>
						</div>
					</div>
				</div>
			}
		>
			<AuthorizationContent />
		</Suspense>
	);
}
