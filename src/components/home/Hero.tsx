"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Star, Users } from "lucide-react";

export default function Hero() {
	return (
		<section className="relative bg-gradient-to-br from-primary-50 to-primary-100 overflow-hidden">
			<div className="absolute inset-0 bg-white/20 backdrop-blur-3xl"></div>

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
				<div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
					<div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
						<h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
							Your Digital
							<span className="block text-primary-600">Reading Haven</span>
						</h1>

						<p className="mt-6 text-lg text-gray-600 sm:max-w-xl sm:mx-auto lg:mx-0">
							Discover millions of books, connect with fellow readers, and build
							your personal library. From bestsellers to hidden gems, find your
							next favorite read at BookNest.
						</p>

						<div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
							<div className="flex flex-col sm:flex-row gap-4">
								<Link
									href="/books"
									className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors md:py-4 md:text-lg md:px-10"
								>
									Browse Books
									<ArrowRight className="ml-2 h-5 w-5" />
								</Link>

								<Link
									href="/categories"
									className="inline-flex items-center justify-center px-8 py-3 border border-primary-600 text-base font-medium rounded-lg text-primary-600 bg-white hover:bg-primary-50 transition-colors md:py-4 md:text-lg md:px-10"
								>
									Explore Categories
								</Link>
							</div>
						</div>

						{/* Stats */}
						<div className="mt-12 grid grid-cols-3 gap-8 sm:max-w-lg sm:mx-auto lg:mx-0">
							<div className="text-center lg:text-left">
								<div className="flex items-center justify-center lg:justify-start">
									<BookOpen className="h-8 w-8 text-primary-600" />
								</div>
								<p className="mt-2 text-2xl font-bold text-gray-900">50K+</p>
								<p className="text-sm text-gray-600">Books Available</p>
							</div>

							<div className="text-center lg:text-left">
								<div className="flex items-center justify-center lg:justify-start">
									<Users className="h-8 w-8 text-primary-600" />
								</div>
								<p className="mt-2 text-2xl font-bold text-gray-900">25K+</p>
								<p className="text-sm text-gray-600">Active Readers</p>
							</div>

							<div className="text-center lg:text-left">
								<div className="flex items-center justify-center lg:justify-start">
									<Star className="h-8 w-8 text-primary-600" />
								</div>
								<p className="mt-2 text-2xl font-bold text-gray-900">4.9</p>
								<p className="text-sm text-gray-600">Average Rating</p>
							</div>
						</div>
					</div>

					<div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
						<div className="bg-white rounded-2xl shadow-xl overflow-hidden">
							<div className="px-6 py-8">
								<div className="flex items-center justify-between mb-6">
									<h3 className="text-lg font-semibold text-gray-900">
										Trending This Week
									</h3>
									<span className="text-sm text-primary-600 font-medium">
										See all
									</span>
								</div>

								<div className="space-y-4">
									{/* Book 1 */}
									<div className="flex items-center space-x-4">
										<div className="flex-shrink-0">
											<div className="w-12 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded shadow-sm"></div>
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium text-gray-900 truncate">
												The Seven Husbands of Evelyn Hugo
											</p>
											<p className="text-sm text-gray-500">
												Taylor Jenkins Reid
											</p>
											<div className="flex items-center mt-1">
												<div className="flex text-yellow-400">
													<Star className="h-3 w-3 fill-current" />
													<Star className="h-3 w-3 fill-current" />
													<Star className="h-3 w-3 fill-current" />
													<Star className="h-3 w-3 fill-current" />
													<Star className="h-3 w-3 fill-current" />
												</div>
												<span className="ml-1 text-xs text-gray-500">4.8</span>
											</div>
										</div>
										<div className="text-sm font-medium text-gray-900">
											$14.99
										</div>
									</div>

									{/* Book 2 */}
									<div className="flex items-center space-x-4">
										<div className="flex-shrink-0">
											<div className="w-12 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded shadow-sm"></div>
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium text-gray-900 truncate">
												Atomic Habits
											</p>
											<p className="text-sm text-gray-500">James Clear</p>
											<div className="flex items-center mt-1">
												<div className="flex text-yellow-400">
													<Star className="h-3 w-3 fill-current" />
													<Star className="h-3 w-3 fill-current" />
													<Star className="h-3 w-3 fill-current" />
													<Star className="h-3 w-3 fill-current" />
													<Star className="h-3 w-3 fill-current" />
												</div>
												<span className="ml-1 text-xs text-gray-500">4.9</span>
											</div>
										</div>
										<div className="text-sm font-medium text-gray-900">
											$16.99
										</div>
									</div>

									{/* Book 3 */}
									<div className="flex items-center space-x-4">
										<div className="flex-shrink-0">
											<div className="w-12 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded shadow-sm"></div>
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium text-gray-900 truncate">
												The Thursday Murder Club
											</p>
											<p className="text-sm text-gray-500">Richard Osman</p>
											<div className="flex items-center mt-1">
												<div className="flex text-yellow-400">
													<Star className="h-3 w-3 fill-current" />
													<Star className="h-3 w-3 fill-current" />
													<Star className="h-3 w-3 fill-current" />
													<Star className="h-3 w-3 fill-current" />
													<Star className="h-3 w-3" />
												</div>
												<span className="ml-1 text-xs text-gray-500">4.6</span>
											</div>
										</div>
										<div className="text-sm font-medium text-gray-900">
											$13.99
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
