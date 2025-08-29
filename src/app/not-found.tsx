"use client";

import Link from "next/link";
import { FileX, Home, Search, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
					<div className="text-center">
						{/* Error Icon */}
						<div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
							<FileX className="h-8 w-8 text-blue-600" />
						</div>

						{/* Error Code */}
						<h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>

						{/* Error Title */}
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							Page Not Found
						</h2>

						{/* Error Message */}
						<p className="text-gray-600 mb-6">
							Sorry, we couldn&apos;t find the page you&apos;re looking for. It
							might have been moved, deleted, or you entered the wrong URL.
						</p>

						{/* Additional Info */}
						<div className="bg-gray-50 rounded-lg p-4 mb-6">
							<h3 className="text-sm font-medium text-gray-900 mb-2">
								What you can do:
							</h3>
							<ul className="text-sm text-gray-600 space-y-1">
								<li>• Check the URL for typos</li>
								<li>
									• Use the navigation menu to find what you&apos;re looking for
								</li>
								<li>• Browse our book collection</li>
								<li>• Return to the homepage</li>
							</ul>
						</div>

						{/* Action Buttons */}
						<div className="space-y-3">
							<Link
								href="/books"
								className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
							>
								<Search className="h-4 w-4" />
								Browse Books
							</Link>

							<Link
								href="/categories"
								className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
							>
								View Categories
							</Link>

							<Link
								href="/"
								className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
							>
								<Home className="h-4 w-4" />
								Back to Home
							</Link>
						</div>

						{/* Popular Pages */}
						<div className="mt-6 pt-6 border-t border-gray-200">
							<p className="text-sm font-medium text-gray-900 mb-3">
								Popular pages:
							</p>
							<div className="flex flex-wrap gap-2 justify-center">
								<Link
									href="/bestsellers"
									className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
								>
									Bestsellers
								</Link>
								<Link
									href="/categories/fiction"
									className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
								>
									Fiction
								</Link>
								<Link
									href="/categories/self-help"
									className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
								>
									Self-Help
								</Link>
							</div>
						</div>

						{/* Support Link */}
						<div className="mt-4 pt-4 border-t border-gray-200">
							<p className="text-xs text-gray-500">
								Can&apos;t find what you&apos;re looking for?{" "}
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
