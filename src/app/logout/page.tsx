"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen } from "lucide-react";

export default function LogoutPage() {
	const router = useRouter();

	useEffect(() => {
		// Clear any local storage or session data
		localStorage.clear();
		sessionStorage.clear();

		// Redirect to home page after a short delay
		const timer = setTimeout(() => {
			router.push("/");
		}, 3000);

		return () => clearTimeout(timer);
	}, [router]);

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
							Successfully Signed Out
						</h2>
						<p className="text-gray-600 mb-4">
							You have been safely signed out of BookNest.
						</p>
						<p className="text-sm text-gray-500">
							Redirecting you to the home page...
						</p>
					</div>
				</div>
			</div>

			<div className="mt-6 text-center">
				<button
					onClick={() => router.push("/")}
					className="text-primary-600 hover:text-primary-500 text-sm font-medium"
				>
					Return to BookNest immediately
				</button>
			</div>
		</div>
	);
}
