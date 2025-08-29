"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
	ShoppingCart,
	Minus,
	Plus,
	Trash2,
	BookOpen,
	ArrowLeft,
	CreditCard,
	Truck
} from "lucide-react";
import Link from "next/link";

// Mock cart data
const mockCartItems = [
	{
		id: 1,
		title: "The Midnight Library",
		author: "Matt Haig",
		price: 15.99,
		originalPrice: 19.99,
		cover: "bg-gradient-to-br from-indigo-400 to-purple-600",
		quantity: 2,
		format: "Paperback",
		isbn: "978-0525559474"
	},
	{
		id: 2,
		title: "Educated",
		author: "Tara Westover",
		price: 14.99,
		originalPrice: 18.99,
		cover: "bg-gradient-to-br from-emerald-400 to-cyan-600",
		quantity: 1,
		format: "Hardcover",
		isbn: "978-0399590504"
	},
	{
		id: 3,
		title: "The Seven Husbands of Evelyn Hugo",
		author: "Taylor Jenkins Reid",
		price: 13.99,
		originalPrice: 16.99,
		cover: "bg-gradient-to-br from-pink-400 to-rose-600",
		quantity: 1,
		format: "Paperback",
		isbn: "978-1501161933"
	}
];

export default function CartPage() {
	const { user } = useAuth();
	const [cartItems, setCartItems] = useState(mockCartItems);
	const [promoCode, setPromoCode] = useState("");
	const [appliedPromo, setAppliedPromo] = useState<{
		code: string;
		discount: number;
	} | null>(null);

	if (!user) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
					<h2 className="text-2xl font-bold text-gray-900 mb-2">
						Sign in to view your cart
					</h2>
					<p className="text-gray-600 mb-6">
						Save your favorite books and complete your purchase
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

	const updateQuantity = (itemId: number, newQuantity: number) => {
		if (newQuantity === 0) {
			removeItem(itemId);
			return;
		}
		setCartItems((items) =>
			items.map((item) =>
				item.id === itemId ? { ...item, quantity: newQuantity } : item
			)
		);
	};

	const removeItem = (itemId: number) => {
		setCartItems((items) => items.filter((item) => item.id !== itemId));
	};

	const applyPromoCode = () => {
		// Mock promo code logic
		const validCodes = {
			BOOK10: 10,
			SAVE20: 20,
			READER15: 15
		};

		if (validCodes[promoCode as keyof typeof validCodes]) {
			setAppliedPromo({
				code: promoCode,
				discount: validCodes[promoCode as keyof typeof validCodes]
			});
			setPromoCode("");
		} else {
			alert("Invalid promo code");
		}
	};

	const removePromoCode = () => {
		setAppliedPromo(null);
	};

	// Calculate totals
	const subtotal = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
	const savings = cartItems.reduce(
		(total, item) => total + (item.originalPrice - item.price) * item.quantity,
		0
	);
	const promoDiscount = appliedPromo
		? (subtotal * appliedPromo.discount) / 100
		: 0;
	const shipping = subtotal > 35 ? 0 : 5.99;
	const tax = (subtotal - promoDiscount) * 0.08; // 8% tax
	const total = subtotal - promoDiscount + shipping + tax;

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<Link
						href="/books"
						className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-4"
					>
						<ArrowLeft className="h-4 w-4 mr-2" />
						Continue Shopping
					</Link>
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Shopping Cart
					</h1>
					<p className="text-gray-600">
						{cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
						your cart
					</p>
				</div>

				{cartItems.length === 0 ? (
					/* Empty Cart */
					<div className="text-center py-16">
						<div className="max-w-md mx-auto">
							<ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Your cart is empty
							</h3>
							<p className="text-gray-600 mb-6">
								Discover amazing books and add them to your cart
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
					<div className="lg:grid lg:grid-cols-12 lg:gap-8">
						{/* Cart Items */}
						<div className="lg:col-span-8">
							<div className="bg-white rounded-lg shadow-sm">
								<div className="p-6">
									<h2 className="text-lg font-semibold text-gray-900 mb-6">
										Cart Items
									</h2>
									<div className="space-y-6">
										{cartItems.map((item) => (
											<div
												key={item.id}
												className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-gray-200 last:border-b-0"
											>
												{/* Book Cover */}
												<div className="flex-shrink-0">
													<div
														className={`w-20 h-28 ${item.cover} rounded-lg flex items-center justify-center`}
													>
														<BookOpen className="h-6 w-6 text-white/80" />
													</div>
												</div>

												{/* Book Details */}
												<div className="flex-1 min-w-0">
													<h3 className="text-lg font-medium text-gray-900 mb-1">
														{item.title}
													</h3>
													<p className="text-gray-600 mb-2">by {item.author}</p>
													<div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
														<span>{item.format}</span>
														<span>ISBN: {item.isbn}</span>
													</div>

													{/* Mobile Price */}
													<div className="flex items-center justify-between mt-4 sm:hidden">
														<div className="flex items-center">
															<span className="text-lg font-bold text-gray-900">
																${item.price}
															</span>
															{item.originalPrice > item.price && (
																<span className="text-sm text-gray-500 line-through ml-2">
																	${item.originalPrice}
																</span>
															)}
														</div>
													</div>
												</div>

												{/* Quantity Controls */}
												<div className="flex flex-col sm:items-end">
													{/* Desktop Price */}
													<div className="hidden sm:flex items-center mb-4">
														<span className="text-lg font-bold text-gray-900">
															${item.price}
														</span>
														{item.originalPrice > item.price && (
															<span className="text-sm text-gray-500 line-through ml-2">
																${item.originalPrice}
															</span>
														)}
													</div>

													<div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
														{/* Quantity Selector */}
														<div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
															<button
																onClick={() =>
																	updateQuantity(item.id, item.quantity - 1)
																}
																className="p-2 text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
																disabled={item.quantity <= 1}
															>
																<Minus className="h-4 w-4" />
															</button>
															<span className="px-4 py-2 min-w-[3rem] text-center bg-white border-x border-gray-300 text-gray-900">
																{item.quantity}
															</span>
															<button
																onClick={() =>
																	updateQuantity(item.id, item.quantity + 1)
																}
																className="p-2 text-gray-700 hover:bg-gray-100 transition-colors"
															>
																<Plus className="h-4 w-4" />
															</button>
														</div>

														{/* Remove Button */}
														<button
															onClick={() => removeItem(item.id)}
															className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors"
															title="Remove item"
														>
															<Trash2 className="h-4 w-4" />
														</button>
													</div>

													{/* Item Total */}
													<div className="text-right mt-2">
														<span className="text-sm text-gray-600">
															${(item.price * item.quantity).toFixed(2)}
														</span>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Order Summary */}
						<div className="mt-8 lg:mt-0 lg:col-span-4">
							<div className="bg-white rounded-lg shadow-sm p-6 lg:sticky lg:top-8">
								<h2 className="text-lg font-semibold text-gray-900 mb-6">
									Order Summary
								</h2>

								{/* Promo Code */}
								<div className="mb-6">
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Promo Code
									</label>
									{appliedPromo ? (
										<div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
											<span className="text-sm text-green-800 font-medium">
												{appliedPromo.code} (-{appliedPromo.discount}%)
											</span>
											<button
												onClick={removePromoCode}
												className="text-green-600 hover:text-green-700"
											>
												<Trash2 className="h-4 w-4" />
											</button>
										</div>
									) : (
										<div className="flex gap-2">
											<input
												type="text"
												value={promoCode}
												onChange={(e) => setPromoCode(e.target.value)}
												placeholder="Enter promo code"
												className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
											/>
											<button
												onClick={applyPromoCode}
												className="bg-primary-100 hover:bg-primary-200 text-primary-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-primary-200"
											>
												Apply
											</button>
										</div>
									)}
									<p className="text-xs text-gray-500 mt-1">
										Try: BOOK10, SAVE20, or READER15
									</p>
								</div>

								{/* Price Breakdown */}
								<div className="space-y-3 mb-6">
									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Subtotal</span>
										<span className="text-gray-900">
											${subtotal.toFixed(2)}
										</span>
									</div>

									{savings > 0 && (
										<div className="flex justify-between text-sm">
											<span className="text-green-600">You Save</span>
											<span className="text-green-600">
												-${savings.toFixed(2)}
											</span>
										</div>
									)}

									{appliedPromo && (
										<div className="flex justify-between text-sm">
											<span className="text-green-600">Promo Discount</span>
											<span className="text-green-600">
												-${promoDiscount.toFixed(2)}
											</span>
										</div>
									)}

									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Shipping</span>
										<span className="text-gray-900">
											{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
										</span>
									</div>

									<div className="flex justify-between text-sm">
										<span className="text-gray-600">Tax</span>
										<span className="text-gray-900">${tax.toFixed(2)}</span>
									</div>

									<div className="border-t border-gray-200 pt-3">
										<div className="flex justify-between">
											<span className="text-lg font-semibold text-gray-900">
												Total
											</span>
											<span className="text-lg font-bold text-gray-900">
												${total.toFixed(2)}
											</span>
										</div>
									</div>
								</div>

								{/* Shipping Info */}
								{shipping === 0 ? (
									<div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
										<div className="flex items-center">
											<Truck className="h-4 w-4 text-green-600 mr-2" />
											<span className="text-sm text-green-800 font-medium">
												Free shipping on orders over $35!
											</span>
										</div>
									</div>
								) : (
									<div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
										<div className="flex items-center">
											<Truck className="h-4 w-4 text-blue-600 mr-2" />
											<span className="text-sm text-blue-800">
												Add ${(35 - subtotal).toFixed(2)} more for free shipping
											</span>
										</div>
									</div>
								)}

								{/* Checkout Button */}
								<button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
									<CreditCard className="h-4 w-4 mr-2" />
									Proceed to Checkout
								</button>

								{/* Secure Checkout Info */}
								<p className="text-xs text-gray-500 text-center mt-3">
									Secure checkout with 256-bit SSL encryption
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
