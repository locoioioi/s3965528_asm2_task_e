"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, ShoppingCart, Star, Trash2, BookOpen } from "lucide-react";
import Link from "next/link";

// Mock wishlist data
const mockWishlistItems = [
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
		addedDate: "2024-01-15"
	},
	{
		id: 2,
		title: "Educated",
		author: "Tara Westover",
		price: 14.99,
		originalPrice: 18.99,
		rating: 4.9,
		reviews: 8932,
		cover: "bg-gradient-to-br from-emerald-400 to-cyan-600",
		genre: "Biography",
		addedDate: "2024-01-10"
	},
	{
		id: 3,
		title: "The Seven Husbands of Evelyn Hugo",
		author: "Taylor Jenkins Reid",
		price: 13.99,
		originalPrice: 16.99,
		rating: 4.7,
		reviews: 15672,
		cover: "bg-gradient-to-br from-pink-400 to-rose-600",
		genre: "Romance",
		addedDate: "2024-01-08"
	}
];

export default function WishlistPage() {
	const { user } = useAuth();
	const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);

	if (!user) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
					<h2 className="text-2xl font-bold text-gray-900 mb-2">
						Sign in to view your wishlist
					</h2>
					<p className="text-gray-600 mb-6">
						Save your favorite books for later
					</p>
					<Link
						href="/login"
						className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
					>
						Sign In
					</Link>
				</div>
			</div>
		);
	}

	const removeFromWishlist = (bookId: number) => {
		setWishlistItems((items) => items.filter((item) => item.id !== bookId));
	};

	const addToCart = (bookId: number) => {
		// Mock add to cart functionality
		alert("Added to cart!");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
					<p className="text-gray-600">
						{wishlistItems.length}{" "}
						{wishlistItems.length === 1 ? "book" : "books"} saved for later
					</p>
				</div>

				{wishlistItems.length === 0 ? (
					/* Empty State */
					<div className="text-center py-16">
						<div className="max-w-md mx-auto">
							<Heart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Your wishlist is empty
							</h3>
							<p className="text-gray-600 mb-6">
								Start adding books you&rsquo;d like to read to your wishlist
							</p>
							<Link
								href="/books"
								className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors inline-flex items-center"
							>
								<BookOpen className="h-4 w-4 mr-2" />
								Browse Books
							</Link>
						</div>
					</div>
				) : (
					/* Wishlist Items */
					<div className="space-y-6">
						{wishlistItems.map((book) => (
							<div key={book.id} className="bg-white rounded-lg shadow-sm p-6">
								<div className="flex flex-col sm:flex-row gap-6">
									{/* Book Cover */}
									<div className="flex-shrink-0">
										<div
											className={`w-24 h-32 ${book.cover} rounded-lg flex items-center justify-center`}
										>
											<BookOpen className="h-8 w-8 text-white/80" />
										</div>
									</div>

									{/* Book Details */}
									<div className="flex-1 min-w-0">
										<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
											<div className="flex-1">
												<h3 className="text-lg font-semibold text-gray-900 mb-1">
													{book.title}
												</h3>
												<p className="text-gray-600 mb-2">by {book.author}</p>

												{/* Rating */}
												<div className="flex items-center mb-3">
													<div className="flex">
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
													<span className="text-sm text-gray-600 ml-2">
														{book.rating} ({book.reviews.toLocaleString()}{" "}
														reviews)
													</span>
												</div>

												<div className="flex items-center gap-4 text-sm text-gray-600">
													<span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
														{book.genre}
													</span>
													<span>
														Added{" "}
														{new Date(book.addedDate).toLocaleDateString()}
													</span>
												</div>
											</div>

											{/* Price and Actions */}
											<div className="flex flex-col items-end mt-4 sm:mt-0">
												<div className="text-right mb-4">
													<div className="text-2xl font-bold text-gray-900">
														${book.price}
													</div>
													{book.originalPrice > book.price && (
														<div className="text-sm text-gray-500 line-through">
															${book.originalPrice}
														</div>
													)}
												</div>

												<div className="flex gap-2">
													<button
														onClick={() => addToCart(book.id)}
														className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center text-sm"
													>
														<ShoppingCart className="h-4 w-4 mr-1" />
														Add to Cart
													</button>
													<button
														onClick={() => removeFromWishlist(book.id)}
														className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors"
														title="Remove from wishlist"
													>
														<Trash2 className="h-4 w-4" />
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}

						{/* Continue Shopping */}
						<div className="text-center pt-8">
							<Link
								href="/books"
								className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
							>
								<BookOpen className="h-4 w-4 mr-2" />
								Continue Shopping
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
