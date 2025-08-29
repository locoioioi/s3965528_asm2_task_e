"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
	{
		id: 1,
		name: "Sarah Johnson",
		role: "Avid Reader",
		image: "bg-gradient-to-br from-pink-400 to-rose-500",
		rating: 5,
		text: "BookNest has completely transformed my reading experience. The recommendations are spot-on, and I love how easy it is to discover new authors and genres. The community features are amazing too!",
		booksRead: 127
	},
	{
		id: 2,
		name: "Michael Chen",
		role: "Book Club Leader",
		image: "bg-gradient-to-br from-blue-400 to-indigo-500",
		rating: 5,
		text: "As someone who runs multiple book clubs, BookNest has been invaluable. The discussion features and group reading tools make it so much easier to coordinate with members and track our progress.",
		booksRead: 89
	},
	{
		id: 3,
		name: "Emily Rodriguez",
		role: "Student",
		image: "bg-gradient-to-br from-green-400 to-teal-500",
		rating: 5,
		text: "The student discounts and academic book selection are fantastic. I've saved so much money on textbooks, and the study guides available have been incredibly helpful for my courses.",
		booksRead: 45
	},
	{
		id: 4,
		name: "David Thompson",
		role: "Author",
		image: "bg-gradient-to-br from-purple-400 to-violet-500",
		rating: 5,
		text: "BookNest provides excellent exposure for indie authors like myself. The platform makes it easy for readers to discover new voices, and the review system is fair and transparent.",
		booksRead: 203
	}
];

const stats = [
	{ label: "Happy Readers", value: "250K+" },
	{ label: "Books Sold", value: "1.2M+" },
	{ label: "Five-Star Reviews", value: "180K+" },
	{ label: "Authors Featured", value: "15K+" }
];

export default function TestimonialsSection() {
	return (
		<section className="py-16 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
						What Our Readers Say
					</h2>
					<p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
						Join thousands of satisfied readers who have made BookNest their
						go-to destination for discovering and purchasing their next favorite
						books.
					</p>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
					{stats.map((stat, index) => (
						<div key={index} className="text-center">
							<div className="text-3xl font-bold text-primary-600 mb-2">
								{stat.value}
							</div>
							<div className="text-sm text-gray-600">{stat.label}</div>
						</div>
					))}
				</div>

				{/* Testimonials Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{testimonials.map((testimonial) => (
						<div
							key={testimonial.id}
							className="relative bg-gray-50 rounded-xl p-8 hover:shadow-md transition-shadow duration-300"
						>
							{/* Quote Icon */}
							<div className="absolute top-6 right-6 text-primary-200">
								<Quote className="h-8 w-8" />
							</div>

							{/* Rating */}
							<div className="flex items-center mb-4">
								{[...Array(testimonial.rating)].map((_, i) => (
									<Star
										key={i}
										className="h-4 w-4 text-yellow-400 fill-current"
									/>
								))}
							</div>

							{/* Testimonial Text */}
							<blockquote className="text-gray-700 mb-6 relative z-10">
								&ldquo;{testimonial.text}&rdquo;
							</blockquote>

							{/* Author Info */}
							<div className="flex items-center">
								<div
									className={`w-12 h-12 rounded-full ${testimonial.image} flex-shrink-0`}
								>
									{/* Profile image placeholder */}
								</div>
								<div className="ml-4">
									<div className="font-semibold text-gray-900">
										{testimonial.name}
									</div>
									<div className="text-sm text-gray-600">
										{testimonial.role}
									</div>
									<div className="text-xs text-primary-600 mt-1">
										{testimonial.booksRead} books read
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Call-to-Action */}
				<div className="text-center mt-12">
					<div className="bg-primary-50 rounded-2xl p-8 lg:p-12">
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
							Ready to Join Our Reading Community?
						</h3>
						<p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
							Start your journey with BookNest today and discover why thousands
							of readers trust us to help them find their next great read.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a
								href="/register"
								className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
							>
								Start Reading Today
							</a>
							<a
								href="/books"
								className="inline-flex items-center justify-center px-8 py-3 border border-primary-600 text-base font-medium rounded-lg text-primary-600 bg-white hover:bg-primary-50 transition-colors"
							>
								Browse Books
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
