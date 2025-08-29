"use client";

import Link from "next/link";
import { Star, Heart, ShoppingCart } from "lucide-react";

const featuredBooks = [
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
		description: "A magical story about the infinite lives we could live."
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
		description:
			"A memoir about education and the transformative power of learning."
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
		description:
			"A darkly comic afterlife adventure through Sri Lankan history."
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
		description: "A novel about friendship, art, and the video game industry."
	}
];

export default function FeaturedBooks() {
	return (
		<section className="py-16 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
						Featured Books
					</h2>
					<p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
						Discover our hand-picked selection of must-read books across all
						genres. From bestsellers to hidden gems, find your next favorite
						story.
					</p>
				</div>

				{/* Books Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{featuredBooks.map((book) => (
						<div
							key={book.id}
							className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
						>
							{/* Book Cover */}
							<div className="aspect-[3/4] relative overflow-hidden">
								<div className={`w-full h-full ${book.cover} relative`}>
									{/* Discount Badge */}
									<div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
										SALE
									</div>

									{/* Wishlist Button */}
									<button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white">
										<Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
									</button>

									{/* Quick Add to Cart */}
									<div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
										<button className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-colors">
											<ShoppingCart className="h-4 w-4 mr-2" />
											Add to Cart
										</button>
									</div>
								</div>
							</div>

							{/* Book Details */}
							<div className="p-4">
								<div className="flex items-start justify-between mb-2">
									<span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded">
										{book.genre}
									</span>
								</div>

								<Link
									href={`/books/${book.id}`}
									className="block group-hover:text-primary-600 transition-colors"
								>
									<h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
										{book.title}
									</h3>
								</Link>

								<p className="text-sm text-gray-600 mb-2">{book.author}</p>

								<p className="text-xs text-gray-500 mb-3 line-clamp-2">
									{book.description}
								</p>

								{/* Rating */}
								<div className="flex items-center mb-3">
									<div className="flex text-yellow-400">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`h-3 w-3 ${
													i < Math.floor(book.rating) ? "fill-current" : ""
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
										<span className="text-sm text-gray-500 line-through">
											${book.originalPrice}
										</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* View All Button */}
				<div className="text-center mt-12">
					<Link
						href="/books"
						className="inline-flex items-center px-6 py-3 border border-primary-600 text-base font-medium rounded-lg text-primary-600 bg-white hover:bg-primary-50 transition-colors"
					>
						View All Books
					</Link>
				</div>
			</div>
		</section>
	);
}
