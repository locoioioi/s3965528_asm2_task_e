"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
	BookOpen,
	ShoppingCart,
	User,
	Menu,
	X,
	Heart,
	Settings,
	LogOut,
	ShieldCheck
} from "lucide-react";

export default function Navbar() {
	const { user, logout } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

	const handleLogout = () => {
		logout();
		setIsUserMenuOpen(false);
	};

	return (
		<nav className="bg-white shadow-md border-b">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					{/* Logo and brand */}
					<div className="flex items-center">
						<Link href="/" className="flex items-center space-x-2">
							<BookOpen className="h-8 w-8 text-primary-600" />
							<span className="text-2xl font-bold text-gray-900">BookNest</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-10">
						<Link
							href="/books"
							className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2 px-1"
						>
							Browse Books
						</Link>
						<Link
							href="/categories"
							className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2 px-1"
						>
							Categories
						</Link>
						<Link
							href="/bestsellers"
							className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2 px-1"
						>
							Bestsellers
						</Link>
						{user?.role === "admin" && (
							<Link
								href="/admin"
								className="text-gray-700 hover:text-primary-600 font-medium flex items-center transition-colors duration-200 py-2 px-1"
							>
								<ShieldCheck className="h-4 w-4 mr-1" />
								Admin Panel
							</Link>
						)}
					</div>

					{/* Right side - User actions */}
					<div className="flex items-center space-x-4">
						{user ? (
							<>
								{/* Wishlist */}
								<Link
									href="/wishlist"
									className="p-2 text-gray-500 hover:text-primary-600"
								>
									<Heart className="h-6 w-6" />
								</Link>

								{/* Shopping Cart */}
								<Link
									href="/cart"
									className="p-2 text-gray-500 hover:text-primary-600 relative"
								>
									<ShoppingCart className="h-6 w-6" />
									<span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
										3
									</span>
								</Link>

								{/* User Menu */}
								<div className="relative">
									<button
										onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
										className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 focus:outline-none"
									>
										<div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
											<User className="h-5 w-5 text-primary-600" />
										</div>
										<span className="hidden lg:block font-medium">
											{user.name}
										</span>
									</button>

									{isUserMenuOpen && (
										<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
											<Link
												href="/profile"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												onClick={() => setIsUserMenuOpen(false)}
											>
												<User className="inline h-4 w-4 mr-2" />
												My Profile
											</Link>
											<Link
												href="/orders"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												onClick={() => setIsUserMenuOpen(false)}
											>
												<BookOpen className="inline h-4 w-4 mr-2" />
												My Orders
											</Link>
											<Link
												href="/wishlist"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												onClick={() => setIsUserMenuOpen(false)}
											>
												<Heart className="inline h-4 w-4 mr-2" />
												Wishlist
											</Link>
											<Link
												href="/settings"
												className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												onClick={() => setIsUserMenuOpen(false)}
											>
												<Settings className="inline h-4 w-4 mr-2" />
												Settings
											</Link>
											{user.role === "admin" && (
												<Link
													href="/admin"
													className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
													onClick={() => setIsUserMenuOpen(false)}
												>
													<ShieldCheck className="inline h-4 w-4 mr-2" />
													Admin Panel
												</Link>
											)}
											<button
												onClick={handleLogout}
												className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												<LogOut className="inline h-4 w-4 mr-2" />
												Sign Out
											</button>
										</div>
									)}
								</div>
							</>
						) : (
							<div className="flex items-center space-x-4">
								<Link
									href="/login"
									className="text-gray-700 hover:text-primary-600 font-medium"
								>
									Sign In
								</Link>
								<Link
									href="/register"
									className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
								>
									Sign Up
								</Link>
							</div>
						)}

						{/* Mobile menu button */}
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
						>
							{isMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className="md:hidden">
						<div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 border-t bg-gray-50">
							<Link
								href="/books"
								className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-white rounded-lg transition-colors duration-200"
								onClick={() => setIsMenuOpen(false)}
							>
								Browse Books
							</Link>
							<Link
								href="/categories"
								className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-white rounded-lg transition-colors duration-200"
								onClick={() => setIsMenuOpen(false)}
							>
								Categories
							</Link>
							<Link
								href="/bestsellers"
								className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-white rounded-lg transition-colors duration-200"
								onClick={() => setIsMenuOpen(false)}
							>
								Bestsellers
							</Link>
							{user?.role === "admin" && (
								<Link
									href="/admin"
									className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-white rounded-lg transition-colors duration-200"
									onClick={() => setIsMenuOpen(false)}
								>
									Admin Panel
								</Link>
							)}
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
