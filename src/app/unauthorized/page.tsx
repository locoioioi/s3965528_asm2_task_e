"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ShieldX, Home, LogIn, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
	const { user } = useAuth();

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
					<div className="text-center">
						{/* Error Icon */}
						<div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
							<ShieldX className="h-8 w-8 text-red-600" />
						</div>

						{/* Error Code */}
						<h1 className="text-4xl font-bold text-gray-900 mb-2">403</h1>

						{/* Error Title */}
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							Access Denied
						</h2>

						{/* Error Message */}
						<p className="text-gray-600 mb-6">
							{user ? (
								<>
									Sorry, you don&apos;t have permission to access this page.
									Your current account level doesn&apos;t include access to this
									feature.
								</>
							) : (
								<>
									You need to be logged in to access this page. Please sign in
									to continue.
								</>
							)}
						</p>

						{/* Additional Info */}
						<div className="bg-gray-50 rounded-lg p-4 mb-6">
							<h3 className="text-sm font-medium text-gray-900 mb-2">
								What you can do:
							</h3>
							<ul className="text-sm text-gray-600 space-y-1">
								{user ? (
									<>
										<li>• Contact support if you believe this is an error</li>
										<li>
											• Check if you have the required account permissions
										</li>
										<li>
											• Return to the homepage to browse available content
										</li>
									</>
								) : (
									<>
										<li>• Sign in to your account</li>
										<li>• Create a new account if you don&apos;t have one</li>
										<li>• Browse our public content without signing in</li>
									</>
								)}
							</ul>
						</div>

						{/* Action Buttons */}
						<div className="space-y-3">
							{!user ? (
								<>
									<Link
										href="/login"
										className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
									>
										<LogIn className="h-4 w-4" />
										Sign In
									</Link>
									<Link
										href="/register"
										className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
									>
										Create Account
									</Link>
								</>
							) : (
								<Link
									href="/books"
									className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
								>
									<ArrowLeft className="h-4 w-4" />
									Browse Books
								</Link>
							)}

							<Link
								href="/"
								className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
							>
								<Home className="h-4 w-4" />
								Back to Home
							</Link>
						</div>

						{/* Support Link */}
						<div className="mt-6 pt-6 border-t border-gray-200">
							<p className="text-xs text-gray-500">
								Need help?{" "}
								<a
									href="mailto:support@booknest.com"
									className="text-primary-600 hover:text-primary-500 font-medium"
								>
									Contact Support
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
