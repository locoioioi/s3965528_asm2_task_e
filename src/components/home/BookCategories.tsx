"use client";

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
	Sparkles
} from "lucide-react";

const categories = [
	{
		name: "Fantasy & Sci-Fi",
		icon: Sparkles,
		description: "Epic adventures and futuristic tales",
		bookCount: "12,450",
		color: "bg-purple-500",
		lightColor: "bg-purple-50",
		textColor: "text-purple-700"
	},
	{
		name: "Romance",
		icon: Heart,
		description: "Love stories that warm the heart",
		bookCount: "8,920",
		color: "bg-rose-500",
		lightColor: "bg-rose-50",
		textColor: "text-rose-700"
	},
	{
		name: "Mystery & Thriller",
		icon: Zap,
		description: "Page-turners that keep you guessing",
		bookCount: "7,340",
		color: "bg-orange-500",
		lightColor: "bg-orange-50",
		textColor: "text-orange-700"
	},
	{
		name: "Self-Help",
		icon: Brain,
		description: "Personal development and growth",
		bookCount: "5,680",
		color: "bg-green-500",
		lightColor: "bg-green-50",
		textColor: "text-green-700"
	},
	{
		name: "Business",
		icon: Briefcase,
		description: "Leadership and entrepreneurship",
		bookCount: "4,230",
		color: "bg-blue-500",
		lightColor: "bg-blue-50",
		textColor: "text-blue-700"
	},
	{
		name: "Arts & Design",
		icon: Palette,
		description: "Creative inspiration and techniques",
		bookCount: "3,890",
		color: "bg-pink-500",
		lightColor: "bg-pink-50",
		textColor: "text-pink-700"
	},
	{
		name: "Science",
		icon: Microscope,
		description: "Explore the wonders of our world",
		bookCount: "6,540",
		color: "bg-teal-500",
		lightColor: "bg-teal-50",
		textColor: "text-teal-700"
	},
	{
		name: "History",
		icon: Globe,
		description: "Stories from the past",
		bookCount: "4,720",
		color: "bg-amber-500",
		lightColor: "bg-amber-50",
		textColor: "text-amber-700"
	},
	{
		name: "Children's",
		icon: Baby,
		description: "Fun and educational for young readers",
		bookCount: "9,140",
		color: "bg-cyan-500",
		lightColor: "bg-cyan-50",
		textColor: "text-cyan-700"
	},
	{
		name: "Biography",
		icon: Users,
		description: "Inspiring life stories",
		bookCount: "3,210",
		color: "bg-indigo-500",
		lightColor: "bg-indigo-50",
		textColor: "text-indigo-700"
	},
	{
		name: "Health & Fitness",
		icon: Sword,
		description: "Wellness and healthy living",
		bookCount: "2,980",
		color: "bg-lime-500",
		lightColor: "bg-lime-50",
		textColor: "text-lime-700"
	},
	{
		name: "Education",
		icon: BookOpen,
		description: "Learning resources and textbooks",
		bookCount: "5,430",
		color: "bg-violet-500",
		lightColor: "bg-violet-50",
		textColor: "text-violet-700"
	}
];

export default function BookCategories() {
	return (
		<section className="py-16 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
						Browse by Category
					</h2>
					<p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
						Discover books tailored to your interests. From fiction to
						non-fiction, we have something for every reader.
					</p>
				</div>

				{/* Categories Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{categories.map((category) => {
						const IconComponent = category.icon;
						return (
							<Link
								key={category.name}
								href={`/categories/${category.name
									.toLowerCase()
									.replace(/[^a-z0-9]/g, "-")}`}
								className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300"
							>
								<div className="p-6">
									{/* Icon */}
									<div
										className={`inline-flex p-3 rounded-lg ${category.lightColor} mb-4 group-hover:scale-110 transition-transform duration-200`}
									>
										<IconComponent
											className={`h-6 w-6 ${category.textColor}`}
										/>
									</div>

									{/* Category Info */}
									<h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
										{category.name}
									</h3>

									<p className="text-sm text-gray-600 mb-3">
										{category.description}
									</p>

									<div className="flex items-center justify-between">
										<span className="text-sm text-gray-500">
											{category.bookCount} books
										</span>

										{/* Arrow indicator */}
										<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
											<svg
												className="w-4 h-4 text-primary-600"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M9 5l7 7-7 7"
												/>
											</svg>
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

				{/* View All Categories Button */}
				<div className="text-center mt-12">
					<Link
						href="/categories"
						className="inline-flex items-center px-6 py-3 border border-primary-600 text-base font-medium rounded-lg text-primary-600 bg-white hover:bg-primary-50 transition-colors"
					>
						View All Categories
					</Link>
				</div>
			</div>
		</section>
	);
}
