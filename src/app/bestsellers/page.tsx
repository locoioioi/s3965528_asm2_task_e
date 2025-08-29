"use client";

import { useState } from "react";
import {
	Star,
	Heart,
	ShoppingCart,
	TrendingUp,
	Award,
	Crown
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const bestsellers = [
	{
		id: 1,
		title: "The Seven Husbands of Evelyn Hugo",
		author: "Taylor Jenkins Reid",
		price: 24.99,
		originalPrice: 29.99,
		rating: 4.8,
		reviews: 15420,
		cover: "bg-gradient-to-br from-pink-400 to-rose-600",
		category: "Fiction",
		position: 1,
		weeksOnList: 52,
		badge: "crown"
	},
	{
		id: 2,
		title: "Atomic Habits",
		author: "James Clear",
		price: 18.99,
		originalPrice: 22.99,
		rating: 4.9,
		reviews: 8930,
		cover: "bg-gradient-to-br from-blue-400 to-indigo-600",
		category: "Self-Help",
		position: 2,
		weeksOnList: 78,
		badge: "award"
	},
	{
		id: 3,
		title: "Where the Crawdads Sing",
		author: "Delia Owens",
		price: 16.99,
		originalPrice: 19.99,
		rating: 4.7,
		reviews: 22150,
		cover: "bg-gradient-to-br from-green-400 to-emerald-600",
		category: "Fiction",
		position: 3,
		weeksOnList: 104,
		badge: "trending"
	},
	{
		id: 4,
		title: "Educated",
		author: "Tara Westover",
		price: 21.99,
		originalPrice: 26.99,
		rating: 4.6,
		reviews: 11240,
		cover: "bg-gradient-to-br from-orange-400 to-red-500",
		category: "Memoir",
		position: 4,
		weeksOnList: 89,
		badge: "award"
	},
	{
		id: 5,
		title: "The Thursday Murder Club",
		author: "Richard Osman",
		price: 19.99,
		originalPrice: 24.99,
		rating: 4.5,
		reviews: 7680,
		cover: "bg-gradient-to-br from-purple-400 to-violet-600",
		category: "Mystery",
		position: 5,
		weeksOnList: 45,
		badge: "trending"
	},
	{
		id: 6,
		title: "The Silent Patient",
		author: "Alex Michaelides",
		price: 17.99,
		originalPrice: 21.99,
		rating: 4.4,
		reviews: 13560,
		cover: "bg-gradient-to-br from-gray-400 to-slate-600",
		category: "Thriller",
		position: 6,
		weeksOnList: 67,
		badge: "trending"
	},
	{
		id: 7,
		title: "Becoming",
		author: "Michelle Obama",
		price: 23.99,
		originalPrice: 28.99,
		rating: 4.8,
		reviews: 18920,
		cover: "bg-gradient-to-br from-amber-400 to-yellow-600",
		category: "Biography",
		position: 7,
		weeksOnList: 156,
		badge: "crown"
	},
	{
		id: 8,
		title: "The Midnight Library",
		author: "Matt Haig",
		price: 20.99,
		originalPrice: 25.99,
		rating: 4.3,
		reviews: 9870,
		cover: "bg-gradient-to-br from-indigo-400 to-purple-600",
		category: "Fiction",
		position: 8,
		weeksOnList: 34,
		badge: "trending"
	},
	{
		id: 9,
		title: "Sapiens",
		author: "Yuval Noah Harari",
		price: 22.99,
		originalPrice: 27.99,
		rating: 4.7,
		reviews: 14230,
		cover: "bg-gradient-to-br from-teal-400 to-cyan-600",
		category: "History",
		position: 9,
		weeksOnList: 203,
		badge: "award"
	},
	{
		id: 10,
		title: "The Four Winds",
		author: "Kristin Hannah",
		price: 25.99,
		originalPrice: 30.99,
		rating: 4.6,
		reviews: 12340,
		cover: "bg-gradient-to-br from-emerald-400 to-green-600",
		category: "Historical Fiction",
		position: 10,
		weeksOnList: 28,
		badge: "trending"
	}
];

const timeframes = [
	{ id: "week", label: "This Week" },
	{ id: "month", label: "This Month" },
	{ id: "year", label: "This Year" },
	{ id: "all", label: "All Time" }
];

const categories = [
	"All Categories",
	"Fiction",
	"Non-Fiction",
	"Self-Help",
	"Biography",
	"Mystery",
	"Thriller",
	"Romance",
	"History"
];

export default function BestsellersPage() {
	const { user } = useAuth();
	const [selectedTimeframe, setSelectedTimeframe] = useState("month");
	const [selectedCategory, setSelectedCategory] = useState("All Categories");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	const getBadgeIcon = (badge: string) => {
		switch (badge) {
			case "crown":
				return <Crown className="h-4 w-4" />;
			case "award":
				return <Award className="h-4 w-4" />;
			case "trending":
				return <TrendingUp className="h-4 w-4" />;
			default:
				return <Star className="h-4 w-4" />;
		}
	};

	const getBadgeColor = (badge: string) => {
		switch (badge) {
			case "crown":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "award":
				return "bg-purple-100 text-purple-800 border-purple-200";
			case "trending":
				return "bg-green-100 text-green-800 border-green-200";
			default:
				return "bg-blue-100 text-blue-800 border-blue-200";
		}
	};

	const filteredBooks = bestsellers.filter(
		(book) =>
			selectedCategory === "All Categories" ||
			book.category === selectedCategory
	);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<div className="flex justify-center mb-4">
							<div className="bg-white/20 p-3 rounded-full">
								<TrendingUp className="h-8 w-8" />
							</div>
						</div>
						<h1 className="text-4xl font-bold mb-4 sm:text-5xl">Bestsellers</h1>
						<p className="text-xl text-primary-100 max-w-3xl mx-auto">
							Discover the most popular books that readers can&apos;t put down.
							From chart-toppers to hidden gems that are taking the world by
							storm.
						</p>
					</div>
				</div>
			</section>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Filters */}
				<div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
						{/* Timeframe Filter */}
						<div className="flex flex-col sm:flex-row gap-4">
							<div>
								<label className="text-sm font-medium text-gray-700 mb-2 block">
									Time Period
								</label>
								<div className="flex bg-gray-100 rounded-lg p-1">
									{timeframes.map((timeframe) => (
										<button
											key={timeframe.id}
											onClick={() => setSelectedTimeframe(timeframe.id)}
											className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
												selectedTimeframe === timeframe.id
													? "bg-white text-primary-600 shadow-sm"
													: "text-gray-600 hover:text-gray-900"
											}`}
										>
											{timeframe.label}
										</button>
									))}
								</div>
							</div>

							{/* Category Filter */}
							<div>
								<label className="text-sm font-medium text-gray-700 mb-2 block">
									Category
								</label>
								<select
									value={selectedCategory}
									onChange={(e) => setSelectedCategory(e.target.value)}
									className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
								>
									{categories.map((category) => (
										<option
											key={category}
											value={category}
											className="text-gray-900"
										>
											{category}
										</option>
									))}
								</select>
							</div>
						</div>

						{/* View Toggle */}
						<div className="flex items-center gap-2">
							<span className="text-sm text-gray-600">View:</span>
							<div className="flex bg-gray-100 rounded-lg p-1">
								<button
									onClick={() => setViewMode("grid")}
									className={`px-3 py-1 text-sm rounded-md transition-colors ${
										viewMode === "grid"
											? "bg-white text-primary-600 shadow-sm"
											: "text-gray-600 hover:text-gray-900"
									}`}
								>
									Grid
								</button>
								<button
									onClick={() => setViewMode("list")}
									className={`px-3 py-1 text-sm rounded-md transition-colors ${
										viewMode === "list"
											? "bg-white text-primary-600 shadow-sm"
											: "text-gray-600 hover:text-gray-900"
									}`}
								>
									List
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Results Count */}
				<div className="mb-6">
					<p className="text-gray-600">
						Showing {filteredBooks.length} bestselling{" "}
						{selectedCategory === "All Categories"
							? "books"
							: selectedCategory.toLowerCase() + " books"}{" "}
						for{" "}
						{timeframes
							.find((t) => t.id === selectedTimeframe)
							?.label.toLowerCase()}
					</p>
				</div>

				{/* Books Grid/List */}
				{viewMode === "grid" ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
						{filteredBooks.map((book) => (
							<div
								key={book.id}
								className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-200 overflow-hidden group flex flex-col h-full"
							>
								{/* Rank Badge */}
								<div className="relative">
									<div className="absolute top-3 left-3 z-10">
										<div className="bg-primary-600 text-white text-sm font-bold px-2 py-1 rounded-full min-w-[28px] text-center">
											#{book.position}
										</div>
									</div>
									<div className="absolute top-3 right-3 z-10">
										<div
											className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getBadgeColor(
												book.badge
											)}`}
										>
											{getBadgeIcon(book.badge)}
											{book.weeksOnList}w
										</div>
									</div>
									<div
										className={`${book.cover} rounded-lg relative h-64 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
									>
										<div className="text-white text-center p-4">
											<div className="text-sm font-medium mb-1 opacity-90">
												#{book.position} Bestseller
											</div>
											<div className="text-xs opacity-75">{book.category}</div>
										</div>
									</div>
								</div>

								<div className="p-4 flex flex-col flex-grow">
									<h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors line-clamp-2">
										{book.title}
									</h3>
									<p className="text-gray-600 text-sm mb-2">{book.author}</p>
									<p className="text-xs text-gray-500 mb-3">{book.category}</p>

									{/* Rating */}
									<div className="flex items-center gap-2 mb-3">
										<div className="flex items-center">
											{[...Array(5)].map((_, i) => (
												<Star
													key={i}
													className={`h-4 w-4 ${
														i < Math.floor(book.rating)
															? "text-yellow-400 fill-current"
															: "text-gray-300"
													}`}
												/>
											))}
										</div>
										<span className="text-sm text-gray-600">
											{book.rating} ({book.reviews.toLocaleString()})
										</span>
									</div>

									{/* Price */}
									<div className="flex items-center gap-2 mb-4">
										<span className="text-lg font-bold text-gray-900">
											${book.price}
										</span>
										<span className="text-sm text-gray-500 line-through">
											${book.originalPrice}
										</span>
										<span className="text-sm text-green-600 font-medium">
											{Math.round(
												((book.originalPrice - book.price) /
													book.originalPrice) *
													100
											)}
											% off
										</span>
									</div>

									{/* Actions - Push to bottom */}
									<div className="flex gap-2 mt-auto">
										<button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
											<ShoppingCart className="h-4 w-4" />
											Add to Cart
										</button>
										{user && (
											<button className="p-2 border border-gray-300 rounded-lg text-red-500 hover:border-red-300 hover:text-red-600 transition-colors">
												<Heart className="h-4 w-4" />
											</button>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="space-y-4">
						{filteredBooks.map((book) => (
							<div
								key={book.id}
								className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300"
							>
								<div className="flex gap-6">
									<div className="relative flex-shrink-0">
										<div className="absolute -top-2 -left-2 z-10">
											<div className="bg-primary-600 text-white text-sm font-bold px-2 py-1 rounded-full min-w-[32px] text-center">
												#{book.position}
											</div>
										</div>
										<div
											className={`${book.cover} rounded-lg w-24 h-32 flex items-center justify-center relative`}
										>
											<div className="text-white text-center p-2">
												<div className="text-xs font-medium mb-1 opacity-90">
													#{book.position}
												</div>
												<div className="text-xs opacity-75">
													{book.category}
												</div>
											</div>
										</div>
									</div>

									<div className="flex-1">
										<div className="flex items-start justify-between mb-2">
											<div>
												<h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
													{book.title}
												</h3>
												<p className="text-gray-600">{book.author}</p>
												<p className="text-sm text-gray-500">{book.category}</p>
											</div>
											<div
												className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getBadgeColor(
													book.badge
												)}`}
											>
												{getBadgeIcon(book.badge)}
												{book.weeksOnList} weeks on list
											</div>
										</div>

										<div className="flex items-center gap-4 mb-4">
											<div className="flex items-center gap-2">
												<div className="flex items-center">
													{[...Array(5)].map((_, i) => (
														<Star
															key={i}
															className={`h-4 w-4 ${
																i < Math.floor(book.rating)
																	? "text-yellow-400 fill-current"
																	: "text-gray-300"
															}`}
														/>
													))}
												</div>
												<span className="text-sm text-gray-600">
													{book.rating} ({book.reviews.toLocaleString()}{" "}
													reviews)
												</span>
											</div>
										</div>

										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3">
												<span className="text-xl font-bold text-gray-900">
													${book.price}
												</span>
												<span className="text-gray-500 line-through">
													${book.originalPrice}
												</span>
												<span className="text-green-600 font-medium">
													{Math.round(
														((book.originalPrice - book.price) /
															book.originalPrice) *
															100
													)}
													% off
												</span>
											</div>

											<div className="flex gap-2">
												<button className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-6 rounded-lg font-medium transition-colors flex items-center gap-2">
													<ShoppingCart className="h-4 w-4" />
													Add to Cart
												</button>
												{user && (
													<button className="p-2 border border-gray-300 rounded-lg text-red-500 hover:border-red-300 hover:text-red-600 transition-colors">
														<Heart className="h-4 w-4" />
													</button>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
