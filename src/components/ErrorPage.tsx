"use client";

import Link from "next/link";
import { AlertCircle, Home, RefreshCw, ArrowLeft } from "lucide-react";

interface ErrorPageProps {
	errorCode?: string;
	title?: string;
	message?: string;
	showRefresh?: boolean;
	backLink?: string;
	backLinkText?: string;
}

export default function ErrorPage({
	errorCode = "500",
	title = "Something went wrong",
	message = "We encountered an unexpected error. Please try again later.",
	showRefresh = true,
	backLink = "/",
	backLinkText = "Back to Home"
}: ErrorPageProps) {
	const handleRefresh = () => {
		window.location.reload();
	};

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
					<div className="text-center">
						{/* Error Icon */}
						<div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
							<AlertCircle className="h-8 w-8 text-red-600" />
						</div>

						{/* Error Code */}
						{errorCode && (
							<h1 className="text-4xl font-bold text-gray-900 mb-2">
								{errorCode}
							</h1>
						)}

						{/* Error Title */}
						<h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>

						{/* Error Message */}
						<p className="text-gray-600 mb-6">{message}</p>

						{/* Additional Info */}
						<div className="bg-gray-50 rounded-lg p-4 mb-6">
							<h3 className="text-sm font-medium text-gray-900 mb-2">
								What you can try:
							</h3>
							<ul className="text-sm text-gray-600 space-y-1">
								<li>• Check your internet connection</li>
								<li>• Refresh the page</li>
								<li>• Try again in a few minutes</li>
								<li>• Contact support if the problem persists</li>
							</ul>
						</div>

						{/* Action Buttons */}
						<div className="space-y-3">
							{showRefresh && (
								<button
									onClick={handleRefresh}
									className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
								>
									<RefreshCw className="h-4 w-4" />
									Try Again
								</button>
							)}

							<Link
								href={backLink}
								className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
							>
								{backLink === "/" ? (
									<Home className="h-4 w-4" />
								) : (
									<ArrowLeft className="h-4 w-4" />
								)}
								{backLinkText}
							</Link>
						</div>

						{/* Support Link */}
						<div className="mt-6 pt-6 border-t border-gray-200">
							<p className="text-xs text-gray-500">
								Still having trouble?{" "}
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
