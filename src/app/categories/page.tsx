"use client";

import { useState } from "react";
import Link from "next/link";
import {
	Sword,
	Heart,
	Zap,
	Brain,
	Briefcase,
	Palette,
	Microscope,
	Globe,
	Baby,
	BookOpen,
	Users,
	Sparkles,
	Search,
	Grid3X3,
	List,
	ArrowRight,
	TrendingUp,
	Star
} from "lucide-react";

const categories = [
	{
		id: 1,
		name: "Fantasy & Sci-Fi",
		slug: "fantasy-sci-fi",
		icon: Sparkles,
		description:
			"Epic adventures and futuristic tales that transport you to other worlds",
		bookCount: 12450,
		color: "bg-purple-500",
		lightColor: "bg-purple-50",
		textColor: "text-purple-700",
		borderColor: "border-purple-200",
		featuredAuthors: ["Brandon Sanderson", "Isaac Asimov", "Ursula K. Le Guin"],
		trending: true,
		popularBooks: ["Dune", "The Name of the Wind", "The Way of Kings"]
	},
	{
		id: 2,
		name: "Romance",
		slug: "romance",
		icon: Heart,
		description:
			"Love stories that warm the heart and make you believe in happily ever after",
		bookCount: 8920,
		color: "bg-rose-500",
		lightColor: "bg-rose-50",
		textColor: "text-rose-700",
		borderColor: "border-rose-200",
		featuredAuthors: ["Nicholas Sparks", "Jane Austen", "Colleen Hoover"],
		trending: false,
		popularBooks: ["It Ends with Us", "Pride and Prejudice", "The Notebook"]
	},
	{
		id: 3,
		name: "Mystery & Thriller",
		slug: "mystery-thriller",
		icon: Zap,
		description: "Page-turners that keep you guessing until the very last page",
		bookCount: 7340,
		color: "bg-orange-500",
		lightColor: "bg-orange-50",
		textColor: "text-orange-700",
		borderColor: "border-orange-200",
		featuredAuthors: ["Agatha Christie", "Stephen King", "Gillian Flynn"],
		trending: true,
		popularBooks: [
			"Gone Girl",
			"The Silent Patient",
			"Murder on the Orient Express"
		]
	},
	{
		id: 4,
		name: "Self-Help",
		slug: "self-help",
		icon: Brain,
		description:
			"Personal development and growth books to unlock your potential",
		bookCount: 5680,
		color: "bg-green-500",
		lightColor: "bg-green-50",
		textColor: "text-green-700",
		borderColor: "border-green-200",
		featuredAuthors: ["James Clear", "Dale Carnegie", "Tony Robbins"],
		trending: true,
		popularBooks: ["Atomic Habits", "How to Win Friends", "The 7 Habits"]
	},
	{
		id: 5,
		name: "Business",
		slug: "business",
		icon: Briefcase,
		description:
			"Leadership, entrepreneurship, and strategies for professional success",
		bookCount: 4230,
		color: "bg-blue-500",
		lightColor: "bg-blue-50",
		textColor: "text-blue-700",
		borderColor: "border-blue-200",
		featuredAuthors: ["Malcolm Gladwell", "Peter Drucker", "Jim Collins"],
		trending: false,
		popularBooks: [
			"Good to Great",
			"The Lean Startup",
			"Thinking, Fast and Slow"
		]
	},
	{
		id: 6,
		name: "Arts & Design",
		slug: "arts-design",
		icon: Palette,
		description: "Creative inspiration, techniques, and artistic expression",
		bookCount: 3890,
		color: "bg-pink-500",
		lightColor: "bg-pink-50",
		textColor: "text-pink-700",
		borderColor: "border-pink-200",
		featuredAuthors: ["Austin Kleon", "Julia Cameron", "Ellen Lupton"],
		trending: false,
		popularBooks: [
			"Steal Like an Artist",
			"The Artist's Way",
			"Thinking with Type"
		]
	},
	{
		id: 7,
		name: "Science",
		slug: "science",
		icon: Microscope,
		description:
			"Explore the wonders of our world through scientific discovery",
		bookCount: 6540,
		color: "bg-teal-500",
		lightColor: "bg-teal-50",
		textColor: "text-teal-700",
		borderColor: "border-teal-200",
		featuredAuthors: ["Neil deGrasse Tyson", "Mary Roach", "Bill Bryson"],
		trending: true,
		popularBooks: [
			"Astrophysics for People in a Hurry",
			"A Short History of Nearly Everything",
			"Packing for Mars"
		]
	},
	{
		id: 8,
		name: "History",
		slug: "history",
		icon: Globe,
		description:
			"Stories from the past that shape our understanding of the world",
		bookCount: 4720,
		color: "bg-amber-500",
		lightColor: "bg-amber-50",
		textColor: "text-amber-700",
		borderColor: "border-amber-200",
		featuredAuthors: [
			"Yuval Noah Harari",
			"David McCullough",
			"Doris Kearns Goodwin"
		],
		trending: false,
		popularBooks: ["Sapiens", "1776", "Team of Rivals"]
	},
	{
		id: 9,
		name: "Children's",
		slug: "childrens",
		icon: Baby,
		description: "Fun and educational books for young readers of all ages",
		bookCount: 9140,
		color: "bg-cyan-500",
		lightColor: "bg-cyan-50",
		textColor: "text-cyan-700",
		borderColor: "border-cyan-200",
		featuredAuthors: ["Dr. Seuss", "Roald Dahl", "Mo Willems"],
		trending: false,
		popularBooks: [
			"Where the Wild Things Are",
			"Charlotte's Web",
			"The Cat in the Hat"
		]
	},
	{
		id: 10,
		name: "Biography",
		slug: "biography",
		icon: Users,
		description:
			"Inspiring life stories of remarkable people who changed the world",
		bookCount: 3210,
		color: "bg-indigo-500",
		lightColor: "bg-indigo-50",
		textColor: "text-indigo-700",
		borderColor: "border-indigo-200",
		featuredAuthors: ["Walter Isaacson", "Ron Chernow", "David McCullough"],
		trending: false,
		popularBooks: ["Steve Jobs", "Alexander Hamilton", "Becoming"]
	},
	{
		id: 11,
		name: "Health & Fitness",
		slug: "health-fitness",
		icon: Sword,
		description:
			"Wellness, healthy living, and fitness guides for a better life",
		bookCount: 2980,
		color: "bg-lime-500",
		lightColor: "bg-lime-50",
		textColor: "text-lime-700",
		borderColor: "border-lime-200",
		featuredAuthors: ["Michael Pollan", "David Sinclair", "Rhonda Patrick"],
		trending: true,
		popularBooks: ["In Defense of Food", "Lifespan", "The Blue Zones"]
	},
	{
		id: 12,
		name: "Education",
		slug: "education",
		icon: BookOpen,
		description: "Learning resources, textbooks, and educational materials",
		bookCount: 5430,
		color: "bg-violet-500",
		lightColor: "bg-violet-50",
		textColor: "text-violet-700",
		borderColor: "border-violet-200",
		featuredAuthors: ["Carol Dweck", "Ken Robinson", "John Dewey"],
		trending: false,
		popularBooks: ["Mindset", "The Schools Our Children Deserve", "Educated"]
	}
];

export default function CategoriesPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [sortBy, setSortBy] = useState<"name" | "books" | "trending">("name");

	const filteredCategories = categories
		.filter(
			(category) =>
				category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				category.description.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.sort((a, b) => {
			switch (sortBy) {
				case "name":
					return a.name.localeCompare(b.name);
				case "books":
					return b.bookCount - a.bookCount;
				case "trending":
					return Number(b.trending) - Number(a.trending);
				default:
					return 0;
			}
		});

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<div className="flex justify-center mb-4">
							<div className="bg-white/20 p-3 rounded-full">
								<Grid3X3 className="h-8 w-8" />
							</div>
						</div>
						<h1 className="text-4xl font-bold mb-4 sm:text-5xl">
							Book Categories
						</h1>
						<p className="text-xl text-primary-100 max-w-3xl mx-auto">
							Explore our extensive collection of books organized by category.
							Find exactly what you&apos;re looking for or discover something
							new.
						</p>
					</div>
				</div>
			</section>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Search and Filters */}
				<div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
						{/* Search */}
						<div className="flex-1 max-w-md">
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<Search className="h-5 w-5 text-gray-400" />
								</div>
								<input
									type="text"
									placeholder="Search categories..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
								/>
							</div>
						</div>

						<div className="flex items-center gap-4">
							{/* Sort */}
							<div className="flex items-center gap-2">
								<label className="text-sm font-medium text-gray-700">
									Sort by:
								</label>
								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value as any)}
									className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
								>
									<option value="name" className="text-gray-900">
										Name
									</option>
									<option value="books" className="text-gray-900">
										Book Count
									</option>
									<option value="trending" className="text-gray-900">
										Trending
									</option>
								</select>
							</div>

							{/* View Toggle */}
							<div className="flex items-center gap-2">
								<span className="text-sm text-gray-600">View:</span>
								<div className="flex bg-gray-100 rounded-lg p-1">
									<button
										onClick={() => setViewMode("grid")}
										className={`p-1 rounded-md transition-colors ${
											viewMode === "grid"
												? "bg-white text-primary-600 shadow-sm"
												: "text-gray-600 hover:text-gray-900"
										}`}
									>
										<Grid3X3 className="h-4 w-4" />
									</button>
									<button
										onClick={() => setViewMode("list")}
										className={`p-1 rounded-md transition-colors ${
											viewMode === "list"
												? "bg-white text-primary-600 shadow-sm"
												: "text-gray-600 hover:text-gray-900"
										}`}
									>
										<List className="h-4 w-4" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Results Count */}
				<div className="mb-6">
					<p className="text-gray-600">
						Showing {filteredCategories.length}{" "}
						{filteredCategories.length === 1 ? "category" : "categories"}
						{searchTerm && ` matching "${searchTerm}"`}
					</p>
				</div>

				{/* Categories Grid/List */}
				{viewMode === "grid" ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{filteredCategories.map((category) => {
							const IconComponent = category.icon;
							return (
								<Link
									key={category.id}
									href={`/categories/${category.slug}`}
									className={`group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border ${category.borderColor} hover:border-primary-300`}
								>
									<div className="p-6">
										{/* Header */}
										<div className="flex items-start justify-between mb-4">
											<div
												className={`inline-flex p-3 rounded-lg ${category.lightColor} group-hover:scale-110 transition-transform duration-200`}
											>
												<IconComponent
													className={`h-6 w-6 ${category.textColor}`}
												/>
											</div>
											{category.trending && (
												<div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
													<TrendingUp className="h-3 w-3" />
													Trending
												</div>
											)}
										</div>

										{/* Category Info */}
										<h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
											{category.name}
										</h3>

										<p className="text-sm text-gray-600 mb-4 line-clamp-2">
											{category.description}
										</p>

										{/* Stats */}
										<div className="space-y-2 mb-4">
											<div className="flex items-center justify-between">
												<span className="text-sm text-gray-500">Books</span>
												<span className="text-sm font-medium text-gray-900">
													{category.bookCount.toLocaleString()}
												</span>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm text-gray-500">
													Featured Authors
												</span>
												<span className="text-sm font-medium text-gray-900">
													{category.featuredAuthors.length}
												</span>
											</div>
										</div>

										{/* Popular Books Preview */}
										<div className="mb-4">
											<p className="text-xs text-gray-500 mb-2">
												Popular books:
											</p>
											<div className="space-y-1">
												{category.popularBooks
													.slice(0, 2)
													.map((book, index) => (
														<p
															key={index}
															className="text-xs text-gray-600 truncate"
														>
															• {book}
														</p>
													))}
											</div>
										</div>

										{/* Arrow indicator */}
										<div className="flex items-center justify-between">
											<span className="text-sm text-primary-600 font-medium group-hover:text-primary-700">
												Browse Category
											</span>
											<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
												<ArrowRight className="w-4 h-4 text-primary-600" />
											</div>
										</div>
									</div>

									{/* Gradient overlay on hover */}
									<div
										className={`absolute inset-0 ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
									></div>
								</Link>
							);
						})}
					</div>
				) : (
					<div className="space-y-4">
						{filteredCategories.map((category) => {
							const IconComponent = category.icon;
							return (
								<Link
									key={category.id}
									href={`/categories/${category.slug}`}
									className={`group block bg-white rounded-lg shadow-sm border ${category.borderColor} hover:border-primary-300 hover:shadow-md transition-all duration-300`}
								>
									<div className="p-6">
										<div className="flex items-center gap-6">
											{/* Icon */}
											<div
												className={`flex-shrink-0 p-4 rounded-lg ${category.lightColor} group-hover:scale-105 transition-transform duration-200`}
											>
												<IconComponent
													className={`h-8 w-8 ${category.textColor}`}
												/>
											</div>

											{/* Content */}
											<div className="flex-1">
												<div className="flex items-start justify-between mb-2">
													<div>
														<div className="flex items-center gap-3 mb-1">
															<h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
																{category.name}
															</h3>
															{category.trending && (
																<div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
																	<TrendingUp className="h-3 w-3" />
																	Trending
																</div>
															)}
														</div>
														<p className="text-gray-600 mb-3 max-w-2xl">
															{category.description}
														</p>
													</div>
													<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
														<ArrowRight className="w-5 h-5 text-primary-600" />
													</div>
												</div>

												{/* Stats and Info */}
												<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
													<div>
														<p className="text-sm text-gray-500 mb-1">
															Book Count
														</p>
														<p className="text-lg font-semibold text-gray-900">
															{category.bookCount.toLocaleString()}
														</p>
													</div>

													<div>
														<p className="text-sm text-gray-500 mb-1">
															Featured Authors
														</p>
														<div className="space-y-1">
															{category.featuredAuthors
																.slice(0, 2)
																.map((author, index) => (
																	<p
																		key={index}
																		className="text-sm text-gray-700"
																	>
																		{author}
																	</p>
																))}
														</div>
													</div>

													<div>
														<p className="text-sm text-gray-500 mb-1">
															Popular Books
														</p>
														<div className="space-y-1">
															{category.popularBooks
																.slice(0, 2)
																.map((book, index) => (
																	<p
																		key={index}
																		className="text-sm text-gray-700"
																	>
																		{book}
																	</p>
																))}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Link>
							);
						})}
					</div>
				)}

				{/* No Results */}
				{filteredCategories.length === 0 && (
					<div className="text-center py-12">
						<div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
							<Search className="h-8 w-8 text-gray-400" />
						</div>
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							No categories found
						</h3>
						<p className="text-gray-600">
							Try adjusting your search terms or browse all categories.
						</p>
						<button
							onClick={() => setSearchTerm("")}
							className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
						>
							Clear search
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
