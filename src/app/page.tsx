import Hero from "@/components/home/Hero";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import BookCategories from "@/components/home/BookCategories";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen">
			<Hero />
			<FeaturedBooks />
			<BookCategories />
			<TestimonialsSection />
			<CallToAction />
		</div>
	);
}
