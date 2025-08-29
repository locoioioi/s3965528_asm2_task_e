"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
	Package,
	Truck,
	CheckCircle,
	Clock,
	XCircle,
	Eye,
	Download,
	Star,
	BookOpen,
	Calendar,
	Filter,
	Search
} from "lucide-react";
import Link from "next/link";

// Mock order data
const mockOrders = [
	{
		id: "ORD-2024-001",
		date: "2024-01-15",
		status: "delivered",
		total: 29.98,
		itemCount: 2,
		deliveryDate: "2024-01-18",
		trackingNumber: "TRK123456789",
		items: [
			{
				id: 1,
				title: "The Midnight Library",
				author: "Matt Haig",
				price: 15.99,
				quantity: 1,
				cover: "bg-gradient-to-br from-indigo-400 to-purple-600",
				format: "Paperback"
			},
			{
				id: 2,
				title: "Educated",
				author: "Tara Westover",
				price: 13.99,
				quantity: 1,
				cover: "bg-gradient-to-br from-emerald-400 to-cyan-600",
				format: "Paperback"
			}
		]
	},
	{
		id: "ORD-2024-002",
		date: "2024-01-12",
		status: "shipped",
		total: 45.97,
		itemCount: 3,
		estimatedDelivery: "2024-01-19",
		trackingNumber: "TRK987654321",
		items: [
			{
				id: 3,
				title: "The Seven Husbands of Evelyn Hugo",
				author: "Taylor Jenkins Reid",
				price: 13.99,
				quantity: 1,
				cover: "bg-gradient-to-br from-pink-400 to-rose-600",
				format: "Hardcover"
			},
			{
				id: 4,
				title: "Atomic Habits",
				author: "James Clear",
				price: 15.99,
				quantity: 2,
				cover: "bg-gradient-to-br from-blue-400 to-teal-600",
				format: "Paperback"
			}
		]
	},
	{
		id: "ORD-2024-003",
		date: "2024-01-08",
		status: "processing",
		total: 24.98,
		itemCount: 2,
		estimatedDelivery: "2024-01-22",
		items: [
			{
				id: 5,
				title: "Dune",
				author: "Frank Herbert",
				price: 12.99,
				quantity: 1,
				cover: "bg-gradient-to-br from-orange-400 to-red-600",
				format: "Paperback"
			},
			{
				id: 6,
				title: "The Hobbit",
				author: "J.R.R. Tolkien",
				price: 11.99,
				quantity: 1,
				cover: "bg-gradient-to-br from-green-400 to-emerald-600",
				format: "Paperback"
			}
		]
	},
	{
		id: "ORD-2024-004",
		date: "2024-01-05",
		status: "cancelled",
		total: 18.99,
		itemCount: 1,
		cancelDate: "2024-01-06",
		cancelReason: "Requested by customer",
		items: [
			{
				id: 7,
				title: "The Alchemist",
				author: "Paulo Coelho",
				price: 18.99,
				quantity: 1,
				cover: "bg-gradient-to-br from-yellow-400 to-orange-600",
				format: "Hardcover"
			}
		]
	}
];

const statusConfig = {
	processing: {
		label: "Processing",
		color: "bg-yellow-100 text-yellow-800",
		icon: Clock,
		description: "Your order is being prepared"
	},
	shipped: {
		label: "Shipped",
		color: "bg-blue-100 text-blue-800",
		icon: Truck,
		description: "Your order is on its way"
	},
	delivered: {
		label: "Delivered",
		color: "bg-green-100 text-green-800",
		icon: CheckCircle,
		description: "Order successfully delivered"
	},
	cancelled: {
		label: "Cancelled",
		color: "bg-red-100 text-red-800",
		icon: XCircle,
		description: "Order was cancelled"
	}
};

export default function OrdersPage() {
	const { user } = useAuth();
	const [orders, setOrders] = useState(mockOrders);
	const [statusFilter, setStatusFilter] = useState<string>("all");
	const [searchQuery, setSearchQuery] = useState("");
	const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

	if (!user) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
					<h2 className="text-2xl font-bold text-gray-900 mb-2">
						Sign in to view your orders
					</h2>
					<p className="text-gray-600 mb-6">
						Track your purchases and order history
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

	// Filter orders based on status and search
	const filteredOrders = orders.filter((order) => {
		const matchesStatus =
			statusFilter === "all" || order.status === statusFilter;
		const matchesSearch =
			searchQuery === "" ||
			order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
			order.items.some(
				(item) =>
					item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					item.author.toLowerCase().includes(searchQuery.toLowerCase())
			);
		return matchesStatus && matchesSearch;
	});

	const toggleOrderExpansion = (orderId: string) => {
		setExpandedOrder(expandedOrder === orderId ? null : orderId);
	};

	const downloadInvoice = (orderId: string) => {
		// Mock download functionality
		alert(`Downloading invoice for order ${orderId}`);
	};

	const trackOrder = (trackingNumber: string) => {
		// Mock tracking functionality
		alert(`Tracking order with number: ${trackingNumber}`);
	};

	const reorderItems = (order: any) => {
		// Mock reorder functionality
		alert(`Adding ${order.itemCount} items to cart`);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
					<p className="text-gray-600">Track and manage your book orders</p>
				</div>

				{/* Filters and Search */}
				<div className="bg-white rounded-lg shadow-sm p-6 mb-6">
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
						{/* Search */}
						<div className="relative flex-1 max-w-md">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
							<input
								type="text"
								placeholder="Search orders or books..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder:text-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
							/>
						</div>

						{/* Status Filter */}
						<div className="flex items-center gap-2">
							<Filter className="h-4 w-4 text-gray-500" />
							<select
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
								className="border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
							>
								<option value="all">All Orders</option>
								<option value="processing">Processing</option>
								<option value="shipped">Shipped</option>
								<option value="delivered">Delivered</option>
								<option value="cancelled">Cancelled</option>
							</select>
						</div>
					</div>
				</div>

				{/* Orders List */}
				{filteredOrders.length === 0 ? (
					<div className="text-center py-16">
						<Package className="h-16 w-16 text-gray-300 mx-auto mb-6" />
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
							{searchQuery || statusFilter !== "all"
								? "No matching orders found"
								: "No orders yet"}
						</h3>
						<p className="text-gray-600 mb-6">
							{searchQuery || statusFilter !== "all"
								? "Try adjusting your search or filter criteria"
								: "Start browsing our collection to place your first order"}
						</p>
						<Link
							href="/books"
							className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors inline-flex items-center"
						>
							<BookOpen className="h-4 w-4 mr-2" />
							Browse Books
						</Link>
					</div>
				) : (
					<div className="space-y-6">
						{filteredOrders.map((order) => {
							const statusInfo =
								statusConfig[order.status as keyof typeof statusConfig];
							const isExpanded = expandedOrder === order.id;

							return (
								<div
									key={order.id}
									className="bg-white rounded-lg shadow-sm border border-gray-200"
								>
									{/* Order Header */}
									<div className="p-6 border-b border-gray-200">
										<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
											<div className="flex flex-col sm:flex-row sm:items-center gap-4">
												<div>
													<h3 className="text-lg font-semibold text-gray-900">
														Order {order.id}
													</h3>
													<div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
														<span className="flex items-center">
															<Calendar className="h-4 w-4 mr-1" />
															{new Date(order.date).toLocaleDateString()}
														</span>
														<span>{order.itemCount} items</span>
														<span className="font-medium">
															${order.total.toFixed(2)}
														</span>
													</div>
												</div>

												<div className="flex items-center gap-2">
													<span
														className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
													>
														<statusInfo.icon className="inline h-3 w-3 mr-1" />
														{statusInfo.label}
													</span>
												</div>
											</div>

											<div className="flex items-center gap-2">
												<button
													onClick={() => toggleOrderExpansion(order.id)}
													className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
												>
													<Eye className="h-4 w-4" />
													{isExpanded ? "Hide Details" : "View Details"}
												</button>

												{order.status === "delivered" && (
													<button
														onClick={() => downloadInvoice(order.id)}
														className="flex items-center gap-2 text-gray-600 hover:text-gray-700 font-medium text-sm"
													>
														<Download className="h-4 w-4" />
														Invoice
													</button>
												)}
											</div>
										</div>
									</div>

									{/* Order Details (Expandable) */}
									{isExpanded && (
										<div className="p-6">
											<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
												{/* Order Items */}
												<div className="lg:col-span-2">
													<h4 className="font-semibold text-gray-900 mb-4">
														Order Items
													</h4>
													<div className="space-y-4">
														{order.items.map((item) => (
															<div
																key={item.id}
																className="flex gap-4 p-4 bg-gray-50 rounded-lg"
															>
																<div
																	className={`w-16 h-20 ${item.cover} rounded-lg flex items-center justify-center flex-shrink-0`}
																>
																	<BookOpen className="h-5 w-5 text-white/80" />
																</div>
																<div className="flex-1 min-w-0">
																	<h5 className="font-medium text-gray-900 mb-1">
																		{item.title}
																	</h5>
																	<p className="text-sm text-gray-600 mb-1">
																		by {item.author}
																	</p>
																	<div className="flex items-center justify-between">
																		<span className="text-sm text-gray-500">
																			{item.format}
																		</span>
																		<div className="text-right">
																			<div className="text-sm text-gray-600">
																				Qty: {item.quantity}
																			</div>
																			<div className="font-medium text-gray-900">
																				${item.price}
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														))}
													</div>
												</div>

												{/* Order Status & Actions */}
												<div className="space-y-6">
													{/* Status Details */}
													<div className="bg-gray-50 rounded-lg p-4">
														<h4 className="font-semibold text-gray-900 mb-3">
															Order Status
														</h4>
														<div className="space-y-3">
															<div className="flex items-center gap-2">
																<statusInfo.icon className="h-4 w-4 text-gray-600" />
																<span className="text-sm text-gray-900">
																	{statusInfo.description}
																</span>
															</div>

															{order.status === "delivered" &&
																order.deliveryDate && (
																	<div className="text-sm text-gray-600">
																		Delivered on{" "}
																		{new Date(
																			order.deliveryDate
																		).toLocaleDateString()}
																	</div>
																)}

															{order.status === "shipped" &&
																order.estimatedDelivery && (
																	<div className="text-sm text-gray-600">
																		Estimated delivery:{" "}
																		{new Date(
																			order.estimatedDelivery
																		).toLocaleDateString()}
																	</div>
																)}

															{order.status === "processing" &&
																order.estimatedDelivery && (
																	<div className="text-sm text-gray-600">
																		Estimated delivery:{" "}
																		{new Date(
																			order.estimatedDelivery
																		).toLocaleDateString()}
																	</div>
																)}

															{order.status === "cancelled" && (
																<div className="text-sm text-red-600">
																	Cancelled on{" "}
																	{new Date(
																		order.cancelDate!
																	).toLocaleDateString()}
																	<br />
																	Reason: {order.cancelReason}
																</div>
															)}
														</div>
													</div>

													{/* Actions */}
													<div className="space-y-3">
														{order.trackingNumber &&
															order.status !== "cancelled" && (
																<button
																	onClick={() =>
																		trackOrder(order.trackingNumber!)
																	}
																	className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
																>
																	<Truck className="h-4 w-4 mr-2" />
																	Track Package
																</button>
															)}

														{order.status === "delivered" && (
															<button
																onClick={() => reorderItems(order)}
																className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
															>
																Order Again
															</button>
														)}
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
