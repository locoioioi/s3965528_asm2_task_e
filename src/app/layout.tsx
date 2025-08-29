import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/layout/Navbar";
import AdminRedirect from "@/components/AdminRedirect";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "BookNest - Your Digital Reading Haven",
	description:
		"Discover, purchase, and discuss your favorite books in our modern online bookstore and reading community"
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ErrorBoundary>
					<AuthProvider>
						<AdminRedirect>
							<div className="min-h-screen bg-gray-50">
								<Navbar />
								<main>{children}</main>
							</div>
						</AdminRedirect>
					</AuthProvider>
				</ErrorBoundary>
			</body>
		</html>
	);
}
