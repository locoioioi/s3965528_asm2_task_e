"use client";

import { useState, useEffect, Suspense } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams } from "next/navigation";
import {
	Search,
	Filter,
	Star,
	Heart,
	ShoppingCart,
	Grid,
	List
} from "lucide-react";

// Mock book data
const books = [
	{
		id: 1,
		title: "The Midnight Library",
		author: "Matt Haig",
		price: 15.99,
		originalPrice: 19.99,
		rating: 4.8,
		reviews: 12453,
		cover: "bg-gradient-to-br from-indigo-400 to-purple-600",
		genre: "Fiction",
		published: 2020,
		pages: 288,
		description:
			"Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
		inStock: true
	},
	{
		id: 2,
		title: "Educated",
		author: "Tara Westover",
		price: 14.99,
		originalPrice: 18.99,
		rating: 4.9,
		reviews: 8742,
		cover: "bg-gradient-to-br from-orange-400 to-red-500",
		genre: "Memoir",
		published: 2018,
		pages: 334,
		description:
			"A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
		inStock: true
	},
	{
		id: 3,
		title: "The Seven Moons of Maali Almeida",
		author: "Shehan Karunatilaka",
		price: 16.99,
		originalPrice: 21.99,
		rating: 4.7,
		reviews: 5234,
		cover: "bg-gradient-to-br from-green-400 to-teal-500",
		genre: "Fantasy",
		published: 2022,
		pages: 416,
		description:
			"A darkly humorous and devastating satire set amid the fractured politics and murderous mayhem of 1990s Sri Lanka.",
		inStock: false
	},
	{
		id: 4,
		title: "Tomorrow, and Tomorrow, and Tomorrow",
		author: "Gabrielle Zevin",
		price: 17.99,
		originalPrice: 22.99,
		rating: 4.6,
		reviews: 9876,
		cover: "bg-gradient-to-br from-pink-400 to-rose-500",
		genre: "Contemporary Fiction",
		published: 2022,
		pages: 401,
		description:
			"A novel about friendship, art, tragedy, and the nature of identity, set in the world of video game design.",
		inStock: true
	},
	// Add more books...
	{
		id: 5,
		title: "Atomic Habits",
		author: "James Clear",
		price: 16.99,
		originalPrice: 20.99,
		rating: 4.9,
		reviews: 15423,
		cover: "bg-gradient-to-br from-blue-400 to-cyan-500",
		genre: "Self-Help",
		published: 2018,
		pages: 320,
		description:
			"An easy and proven way to build good habits and break bad ones with tiny changes that deliver remarkable results.",
		inStock: true
	},
	{
		id: 6,
		title: "The Thursday Murder Club",
		author: "Richard Osman",
		price: 13.99,
		originalPrice: 17.99,
		rating: 4.6,
		reviews: 7834,
		cover: "bg-gradient-to-br from-purple-400 to-pink-500",
		genre: "Mystery",
		published: 2020,
		pages: 368,
		description:
			"Four unlikely friends meet weekly to investigate cold cases. But when a local property developer is found dead, they find themselves in the middle of their first live case.",
		inStock: true
	}
];

const genres = [
	"All",
	"Fiction",
	"Memoir",
	"Fantasy",
	"Contemporary Fiction",
	"Self-Help",
	"Mystery"
];
const sortOptions = [
	{ value: "relevance", label: "Relevance" },
	{ value: "price-low", label: "Price: Low to High" },
	{ value: "price-high", label: "Price: High to Low" },
	{ value: "rating", label: "Customer Rating" },
	{ value: "newest", label: "Newest First" },
	{ value: "title", label: "Title A-Z" }
];

export default function BooksPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-gray-50 flex items-center justify-center">
					<div className="text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
						<p className="text-gray-600">Loading books...</p>
					</div>
				</div>
			}
		>
			<BooksPageContent />
		</Suspense>
	);
}

function BooksPageContent() {
	const { user } = useAuth();
	const searchParams = useSearchParams();
	const [searchQuery, setSearchQuery] = useState(
		searchParams.get("search") || ""
	);
	const [selectedGenre, setSelectedGenre] = useState("All");
	const [sortBy, setSortBy] = useState("relevance");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [showFilters, setShowFilters] = useState(false);

	// Update search query when URL params change
	useEffect(() => {
		const searchParam = searchParams.get("search");
		if (searchParam) {
			setSearchQuery(searchParam);
		}
	}, [searchParams]);

	const filteredBooks = books.filter((book) => {
		const matchesSearch =
			book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			book.author.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesGenre =
			selectedGenre === "All" || book.genre === selectedGenre;
		return matchesSearch && matchesGenre;
	});

	const sortedBooks = [...filteredBooks].sort((a, b) => {
		switch (sortBy) {
			case "price-low":
				return a.price - b.price;
			case "price-high":
				return b.price - a.price;
			case "rating":
				return b.rating - a.rating;
			case "newest":
				return b.published - a.published;
			case "title":
				return a.title.localeCompare(b.title);
			default:
				return 0;
		}
	});

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<h1 className="text-3xl font-bold text-gray-900">Browse Books</h1>
					<p className="mt-2 text-gray-600">
						Discover your next favorite read from our collection of{" "}
						{books.length.toLocaleString()} books
					</p>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="lg:grid lg:grid-cols-4 lg:gap-8">
					{/* Sidebar Filters */}
					<div className="hidden lg:block">
						<div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Filters
								</h3>

								{/* Genre Filter */}
								<div className="space-y-2">
									<h4 className="font-medium text-gray-700">Genre</h4>
									{genres.map((genre) => (
										<label key={genre} className="flex items-center">
											<input
												type="radio"
												name="genre"
												value={genre}
												checked={selectedGenre === genre}
												onChange={(e) => setSelectedGenre(e.target.value)}
												className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
											/>
											<span className="ml-2 text-sm text-gray-600">
												{genre}
											</span>
										</label>
									))}
								</div>

								{/* Price Range */}
								<div className="pt-4 border-t">
									<h4 className="font-medium text-gray-700 mb-2">
										Price Range
									</h4>
									<div className="space-y-2">
										<label className="flex items-center">
											<input
												type="checkbox"
												className="h-4 w-4 text-primary-600 border-gray-300 rounded"
											/>
											<span className="ml-2 text-sm text-gray-600">
												Under $15
											</span>
										</label>
										<label className="flex items-center">
											<input
												type="checkbox"
												className="h-4 w-4 text-primary-600 border-gray-300 rounded"
											/>
											<span className="ml-2 text-sm text-gray-600">
												$15 - $20
											</span>
										</label>
										<label className="flex items-center">
											<input
												type="checkbox"
												className="h-4 w-4 text-primary-600 border-gray-300 rounded"
											/>
											<span className="ml-2 text-sm text-gray-600">
												Over $20
											</span>
										</label>
									</div>
								</div>

								{/* Rating Filter */}
								<div className="pt-4 border-t">
									<h4 className="font-medium text-gray-700 mb-2">
										Customer Rating
									</h4>
									<div className="space-y-2">
										{[4, 3, 2, 1].map((rating) => (
											<label key={rating} className="flex items-center">
												<input
													type="checkbox"
													className="h-4 w-4 text-primary-600 border-gray-300 rounded"
												/>
												<div className="ml-2 flex items-center">
													<div className="flex text-yellow-400">
														{[...Array(5)].map((_, i) => (
															<Star
																key={i}
																className={`h-3 w-3 ${
																	i < rating ? "fill-current" : ""
																}`}
															/>
														))}
													</div>
													<span className="ml-1 text-sm text-gray-600">
														& Up
													</span>
												</div>
											</label>
										))}
									</div>
								</div>

								{/* Availability */}
								<div className="pt-4 border-t">
									<h4 className="font-medium text-gray-700 mb-2">
										Availability
									</h4>
									<label className="flex items-center">
										<input
											type="checkbox"
											className="h-4 w-4 text-primary-600 border-gray-300 rounded"
										/>
										<span className="ml-2 text-sm text-gray-600">
											In Stock Only
										</span>
									</label>
								</div>
							</div>
						</div>
					</div>

					{/* Main Content */}
					<div className="lg:col-span-3">
						{/* Search and Sort Bar */}
						<div className="bg-white rounded-lg shadow-sm p-4 mb-6">
							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
								{/* Search */}
								<div className="relative flex-1 max-w-md">
									<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
										<Search className="h-5 w-5 text-gray-400" />
									</div>
									<input
										type="text"
										placeholder="Search books, authors..."
										className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
									/>
								</div>

								<div className="flex items-center gap-4">
									{/* Sort */}
									<select
										value={sortBy}
										onChange={(e) => setSortBy(e.target.value)}
										className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
									>
										{sortOptions.map((option) => (
											<option
												key={option.value}
												value={option.value}
												className="text-gray-900"
											>
												{option.label}
											</option>
										))}
									</select>

									{/* View Mode */}
									<div className="flex border border-gray-300 rounded-lg">
										<button
											onClick={() => setViewMode("grid")}
											className={`p-2 ${
												viewMode === "grid"
													? "bg-primary-600 text-white"
													: "text-gray-500 hover:text-gray-700"
											}`}
										>
											<Grid className="h-4 w-4" />
										</button>
										<button
											onClick={() => setViewMode("list")}
											className={`p-2 ${
												viewMode === "list"
													? "bg-primary-600 text-white"
													: "text-gray-500 hover:text-gray-700"
											}`}
										>
											<List className="h-4 w-4" />
										</button>
									</div>

									{/* Mobile Filter Button */}
									<button
										onClick={() => setShowFilters(!showFilters)}
										className="lg:hidden inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
									>
										<Filter className="h-4 w-4 mr-1" />
										Filters
									</button>
								</div>
							</div>
						</div>

						{/* Results Count */}
						<div className="mb-6">
							<p className="text-sm text-gray-600">
								Showing {sortedBooks.length} of {books.length} books
								{searchQuery && <span> for &ldquo;{searchQuery}&rdquo;</span>}
								{selectedGenre !== "All" && <span> in {selectedGenre}</span>}
							</p>
						</div>

						{/* Books Grid/List */}
						{viewMode === "grid" ? (
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
								{sortedBooks.map((book) => (
									<div
										key={book.id}
										className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
									>
										{/* Book Cover */}
										<div className="aspect-[3/4] relative overflow-hidden">
											<div className={`w-full h-full ${book.cover} relative`}>
												{!book.inStock && (
													<div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
														OUT OF STOCK
													</div>
												)}

												{user && (
													<button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white">
														<Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
													</button>
												)}

												{user && book.inStock && (
													<div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
														<button className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
															<ShoppingCart className="h-4 w-4 mr-2" />
															Add to Cart
														</button>
													</div>
												)}
											</div>
										</div>

										{/* Book Details */}
										<div className="p-4">
											<div className="flex items-start justify-between mb-2">
												<span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded">
													{book.genre}
												</span>
											</div>

											<h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
												{book.title}
											</h3>

											<p className="text-sm text-gray-600 mb-2">
												{book.author}
											</p>

											{/* Rating */}
											<div className="flex items-center mb-3">
												<div className="flex text-yellow-400">
													{[...Array(5)].map((_, i) => (
														<Star
															key={i}
															className={`h-3 w-3 ${
																i < Math.floor(book.rating)
																	? "fill-current"
																	: ""
															}`}
														/>
													))}
												</div>
												<span className="ml-1 text-xs text-gray-500">
													{book.rating} ({book.reviews.toLocaleString()})
												</span>
											</div>

											{/* Price */}
											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-2">
													<span className="text-lg font-bold text-gray-900">
														${book.price}
													</span>
													{book.originalPrice > book.price && (
														<span className="text-sm text-gray-500 line-through">
															${book.originalPrice}
														</span>
													)}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						) : (
							// List View
							<div className="space-y-4">
								{sortedBooks.map((book) => (
									<div
										key={book.id}
										className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6"
									>
										<div className="flex">
											<div className="flex-shrink-0 w-24 h-32">
												<div
													className={`w-full h-full ${book.cover} rounded`}
												></div>
											</div>
											<div className="ml-6 flex-1">
												<div className="flex items-start justify-between">
													<div className="flex-1">
														<div className="flex items-center mb-2">
															<span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded mr-2">
																{book.genre}
															</span>
															{!book.inStock && (
																<span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
																	Out of Stock
																</span>
															)}
														</div>
														<h3 className="text-xl font-semibold text-gray-900 mb-1 hover:text-primary-600 transition-colors">
															{book.title}
														</h3>
														<p className="text-gray-600 mb-2">
															by {book.author}
														</p>

														{/* Rating */}
														<div className="flex items-center mb-3">
															<div className="flex text-yellow-400">
																{[...Array(5)].map((_, i) => (
																	<Star
																		key={i}
																		className={`h-4 w-4 ${
																			i < Math.floor(book.rating)
																				? "fill-current"
																				: ""
																		}`}
																	/>
																))}
															</div>
															<span className="ml-2 text-sm text-gray-500">
																{book.rating} ({book.reviews.toLocaleString()}{" "}
																reviews)
															</span>
														</div>

														<p className="text-gray-600 text-sm mb-4 line-clamp-2">
															{book.description}
														</p>

														<div className="flex items-center text-sm text-gray-500 space-x-4">
															<span>Published: {book.published}</span>
															<span>Pages: {book.pages}</span>
														</div>
													</div>

													<div className="ml-6 text-right">
														<div className="mb-4">
															<div className="text-2xl font-bold text-gray-900">
																${book.price}
															</div>
															{book.originalPrice > book.price && (
																<div className="text-sm text-gray-500 line-through">
																	${book.originalPrice}
																</div>
															)}
														</div>

														{user && (
															<div className="space-y-2">
																<button
																	disabled={!book.inStock}
																	className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
																>
																	<ShoppingCart className="h-4 w-4 mr-2" />
																	{book.inStock
																		? "Add to Cart"
																		: "Out of Stock"}
																</button>
																<button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
																	<Heart className="h-4 w-4 mr-2" />
																	Wishlist
																</button>
															</div>
														)}
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						)}

						{sortedBooks.length === 0 && (
							<div className="text-center py-12">
								<div className="text-gray-400 mb-4">
									<Search className="h-12 w-12 mx-auto" />
								</div>
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									No books found
								</h3>
								<p className="text-gray-600">
									Try adjusting your search or filter criteria
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
