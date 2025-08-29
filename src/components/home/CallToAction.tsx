"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Users, Star, Gift } from "lucide-react";

export default function CallToAction() {
	return (
		<section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-10">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
					}}
				></div>
			</div>

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					{/* Main Heading */}
					<h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
						Your Next Great Read
						<span className="block text-primary-200">Awaits You</span>
					</h2>

					<p className="mt-6 text-xl text-primary-100 max-w-3xl mx-auto">
						Join BookNest today and unlock a world of literary adventures. Get
						exclusive access to new releases, personalized recommendations, and
						a community of passionate readers.
					</p>

					{/* Features */}
					<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
						<div className="text-center">
							<div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
								<BookOpen className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-lg font-semibold text-white mb-2">
								50,000+ Books
							</h3>
							<p className="text-primary-200 text-sm">
								Vast collection across all genres
							</p>
						</div>

						<div className="text-center">
							<div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
								<Users className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-lg font-semibold text-white mb-2">
								Reading Community
							</h3>
							<p className="text-primary-200 text-sm">
								Connect with fellow book lovers
							</p>
						</div>

						<div className="text-center">
							<div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
								<Star className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-lg font-semibold text-white mb-2">
								Personalized
							</h3>
							<p className="text-primary-200 text-sm">
								AI-powered book recommendations
							</p>
						</div>

						<div className="text-center">
							<div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
								<Gift className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-lg font-semibold text-white mb-2">
								Exclusive Deals
							</h3>
							<p className="text-primary-200 text-sm">
								Member-only discounts and offers
							</p>
						</div>
					</div>

					{/* CTA Buttons */}
					<div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							href="/register"
							className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-primary-600 bg-white hover:bg-gray-100 transition-colors group"
						>
							Get Started Free
							<ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
						</Link>

						<Link
							href="/books"
							className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-lg text-white hover:bg-white hover:text-primary-600 transition-colors"
						>
							Browse Books
						</Link>
					</div>

					{/* Special Offer */}
					<div className="mt-12 bg-white/10 rounded-xl p-6 max-w-2xl mx-auto backdrop-blur-sm">
						<div className="flex items-center justify-center mb-4">
							<Gift className="h-6 w-6 text-primary-200 mr-2" />
							<span className="text-primary-200 font-medium">
								Limited Time Offer
							</span>
						</div>
						<h3 className="text-xl font-bold text-white mb-2">
							Get 20% off your first purchase
						</h3>
						<p className="text-primary-200 text-sm">
							Use code{" "}
							<span className="font-mono font-bold text-white">WELCOME20</span>{" "}
							at checkout. Valid for new members only.
						</p>
					</div>

					{/* Trust Indicators */}
					<div className="mt-12 pt-8 border-t border-primary-500">
						<p className="text-primary-200 text-sm mb-4">
							Trusted by readers worldwide
						</p>
						<div className="flex items-center justify-center space-x-8 text-primary-200">
							<div className="text-center">
								<div className="text-2xl font-bold text-white">4.9★</div>
								<div className="text-xs">Average Rating</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-white">250K+</div>
								<div className="text-xs">Active Users</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-bold text-white">1M+</div>
								<div className="text-xs">Books Sold</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
