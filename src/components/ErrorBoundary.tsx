"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

class ErrorBoundary extends React.Component<
	{
		children: React.ReactNode;
		fallback?: React.ComponentType<{ error?: Error; reset: () => void }>;
	},
	ErrorBoundaryState
> {
	constructor(props: {
		children: React.ReactNode;
		fallback?: React.ComponentType<{ error?: Error; reset: () => void }>;
	}) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Error caught by boundary:", error, errorInfo);
	}

	reset = () => {
		this.setState({ hasError: false, error: undefined });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				const FallbackComponent = this.props.fallback;
				return (
					<FallbackComponent error={this.state.error} reset={this.reset} />
				);
			}

			return (
				<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
					<div className="max-w-md w-full space-y-8">
						<div className="text-center">
							<div className="mx-auto h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
								<AlertTriangle className="h-8 w-8 text-red-600" />
							</div>
							<h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
								Something went wrong
							</h2>
							<p className="mt-2 text-center text-sm text-gray-600">
								We encountered an unexpected error. Don&apos;t worry, you can
								try again.
							</p>
							{this.state.error && (
								<details className="mt-4 text-left">
									<summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
										Error Details
									</summary>
									<pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
										{this.state.error.message}
									</pre>
								</details>
							)}
						</div>

						<div className="space-y-4">
							<button
								onClick={this.reset}
								className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
							>
								<RefreshCw className="h-4 w-4 mr-2" />
								Try Again
							</button>

							<button
								onClick={() => (window.location.href = "/")}
								className="w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
							>
								Go to Home
							</button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;

// Hook version for function components
export function useErrorHandler() {
	return (error: Error, errorInfo?: { componentStack: string }) => {
		console.error("Error handled:", error, errorInfo);
		// You can also send this to an error reporting service
	};
}
