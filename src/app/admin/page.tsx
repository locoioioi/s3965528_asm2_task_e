"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
	Users,
	BookOpen,
	ShoppingCart,
	TrendingUp,
	DollarSign,
	Eye,
	Edit,
	Trash2,
	Plus,
	Shield,
	AlertTriangle
} from "lucide-react";

export default function AdminPage() {
	const { user } = useAuth();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("dashboard");

	useEffect(() => {
		// Check if user is logged in and has admin role
		if (!user) {
			router.push("/login?redirect=/admin");
			return;
		}

		if (user.role !== "admin") {
			router.push("/unauthorized");
			return;
		}

		setIsLoading(false);
	}, [user, router]);

	// Show loading while checking permissions
	if (isLoading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
					<p className="text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	// If we get here, user is authenticated and authorized

	// Mock data for admin dashboard
	const stats = [
		{
			label: "Total Users",
			value: "24,873",
			change: "+12%",
			icon: Users,
			color: "bg-blue-500"
		},
		{
			label: "Books in Catalog",
			value: "52,341",
			change: "+5%",
			icon: BookOpen,
			color: "bg-green-500"
		},
		{
			label: "Orders Today",
			value: "156",
			change: "+8%",
			icon: ShoppingCart,
			color: "bg-purple-500"
		},
		{
			label: "Revenue (MTD)",
			value: "$45,678",
			change: "+15%",
			icon: DollarSign,
			color: "bg-yellow-500"
		}
	];

	const recentUsers = [
		{
			id: 1,
			name: "Alice Johnson",
			email: "alice@example.com",
			role: "user",
			joined: "2024-01-15",
			status: "active"
		},
		{
			id: 2,
			name: "Bob Smith",
			email: "bob@example.com",
			role: "user",
			joined: "2024-01-14",
			status: "active"
		},
		{
			id: 3,
			name: "Carol Davis",
			email: "carol@example.com",
			role: "user",
			joined: "2024-01-13",
			status: "pending"
		},
		{
			id: 4,
			name: "David Wilson",
			email: "david@example.com",
			role: "user",
			joined: "2024-01-12",
			status: "suspended"
		}
	];

	const recentOrders = [
		{
			id: 1001,
			customer: "Alice Johnson",
			items: 2,
			total: 29.98,
			status: "completed",
			date: "2024-01-15"
		},
		{
			id: 1002,
			customer: "Bob Smith",
			items: 1,
			total: 15.99,
			status: "processing",
			date: "2024-01-15"
		},
		{
			id: 1003,
			customer: "Carol Davis",
			items: 3,
			total: 45.97,
			status: "shipped",
			date: "2024-01-14"
		},
		{
			id: 1004,
			customer: "David Wilson",
			items: 1,
			total: 12.99,
			status: "cancelled",
			date: "2024-01-14"
		}
	];

	const reportedReviews = [
		{
			id: 1,
			book: "The Midnight Library",
			reviewer: "Anonymous User",
			content: "This review contains inappropriate content...",
			reports: 3,
			status: "pending"
		},
		{
			id: 2,
			book: "Educated",
			reviewer: "John Doe",
			content: "Spam content with links...",
			reports: 5,
			status: "pending"
		}
	];

	const tabs = [
		{ id: "dashboard", label: "Dashboard", icon: TrendingUp },
		{ id: "users", label: "User Management", icon: Users },
		{ id: "inventory", label: "Inventory", icon: BookOpen },
		{ id: "orders", label: "Orders", icon: ShoppingCart },
		{ id: "moderation", label: "Content Moderation", icon: AlertTriangle }
	];

	const renderDashboard = () => (
		<div className="space-y-8">
			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, index) => {
					const IconComponent = stat.icon;
					return (
						<div key={index} className="bg-white rounded-lg shadow-sm p-6">
							<div className="flex items-center">
								<div className={`p-3 rounded-lg ${stat.color}`}>
									<IconComponent className="h-6 w-6 text-white" />
								</div>
								<div className="ml-4">
									<p className="text-sm font-medium text-gray-600">
										{stat.label}
									</p>
									<div className="flex items-center">
										<p className="text-2xl font-bold text-gray-900">
											{stat.value}
										</p>
										<span className="ml-2 text-sm font-medium text-green-600">
											{stat.change}
										</span>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Recent Users */}
				<div className="bg-white rounded-lg shadow-sm">
					<div className="p-6 border-b border-gray-200">
						<h3 className="text-lg font-semibold text-gray-900">
							Recent Users
						</h3>
					</div>
					<div className="p-6">
						<div className="space-y-4">
							{recentUsers.map((user) => (
								<div
									key={user.id}
									className="flex items-center justify-between"
								>
									<div>
										<p className="font-medium text-gray-900">{user.name}</p>
										<p className="text-sm text-gray-600">{user.email}</p>
									</div>
									<div className="text-right">
										<span
											className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
												user.status === "active"
													? "bg-green-100 text-green-800"
													: user.status === "pending"
													? "bg-yellow-100 text-yellow-800"
													: "bg-red-100 text-red-800"
											}`}
										>
											{user.status}
										</span>
										<p className="text-xs text-gray-500 mt-1">{user.joined}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Recent Orders */}
				<div className="bg-white rounded-lg shadow-sm">
					<div className="p-6 border-b border-gray-200">
						<h3 className="text-lg font-semibold text-gray-900">
							Recent Orders
						</h3>
					</div>
					<div className="p-6">
						<div className="space-y-4">
							{recentOrders.map((order) => (
								<div
									key={order.id}
									className="flex items-center justify-between"
								>
									<div>
										<p className="font-medium text-gray-900">
											Order #{order.id}
										</p>
										<p className="text-sm text-gray-600">{order.customer}</p>
									</div>
									<div className="text-right">
										<p className="font-medium text-gray-900">${order.total}</p>
										<span
											className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
												order.status === "completed"
													? "bg-green-100 text-green-800"
													: order.status === "processing"
													? "bg-blue-100 text-blue-800"
													: order.status === "shipped"
													? "bg-purple-100 text-purple-800"
													: "bg-red-100 text-red-800"
											}`}
										>
											{order.status}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	const renderUsers = () => (
		<div className="bg-white rounded-lg shadow-sm">
			<div className="p-6 border-b border-gray-200 flex items-center justify-between">
				<h3 className="text-lg font-semibold text-gray-900">User Management</h3>
				<button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center">
					<Plus className="h-4 w-4 mr-2" />
					Add User
				</button>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								User
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Role
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Status
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Joined
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{recentUsers.map((user) => (
							<tr key={user.id}>
								<td className="px-6 py-4 whitespace-nowrap">
									<div>
										<p className="font-medium text-gray-900">{user.name}</p>
										<p className="text-sm text-gray-600">{user.email}</p>
									</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
										{user.role}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span
										className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
											user.status === "active"
												? "bg-green-100 text-green-800"
												: user.status === "pending"
												? "bg-yellow-100 text-yellow-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{user.status}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
									{user.joined}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
									<div className="flex space-x-2">
										<button className="text-blue-600 hover:text-blue-900">
											<Eye className="h-4 w-4" />
										</button>
										<button className="text-green-600 hover:text-green-900">
											<Edit className="h-4 w-4" />
										</button>
										<button className="text-red-600 hover:text-red-900">
											<Trash2 className="h-4 w-4" />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);

	const renderModeration = () => (
		<div className="bg-white rounded-lg shadow-sm">
			<div className="p-6 border-b border-gray-200">
				<h3 className="text-lg font-semibold text-gray-900">
					Content Moderation
				</h3>
				<p className="text-sm text-gray-600 mt-1">
					Review reported content and user-generated reviews
				</p>
			</div>
			<div className="p-6">
				<div className="space-y-6">
					{reportedReviews.map((review) => (
						<div
							key={review.id}
							className="border border-gray-200 rounded-lg p-4"
						>
							<div className="flex items-start justify-between mb-4">
								<div>
									<h4 className="font-medium text-gray-900">{review.book}</h4>
									<p className="text-sm text-gray-600">
										Reviewed by: {review.reviewer}
									</p>
									<p className="text-sm text-red-600">
										{review.reports} reports
									</p>
								</div>
								<span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
									{review.status}
								</span>
							</div>
							<div className="bg-gray-50 rounded p-3 mb-4">
								<p className="text-sm text-gray-700">{review.content}</p>
							</div>
							<div className="flex space-x-3">
								<button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
									Approve
								</button>
								<button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
									Remove
								</button>
								<button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm">
									Flag User
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);

	const renderContent = () => {
		switch (activeTab) {
			case "dashboard":
				return renderDashboard();
			case "users":
				return renderUsers();
			case "moderation":
				return renderModeration();
			case "inventory":
				return (
					<div className="bg-white rounded-lg shadow-sm p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Inventory Management
						</h3>
						<p className="text-gray-600">
							Manage book catalog, pricing, and stock levels.
						</p>
					</div>
				);
			case "orders":
				return (
					<div className="bg-white rounded-lg shadow-sm p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Order Management
						</h3>
						<p className="text-gray-600">Track and manage customer orders.</p>
					</div>
				);
			default:
				return renderDashboard();
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<div className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-center">
						<Shield className="h-8 w-8 text-primary-600 mr-3" />
						<div>
							<h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
							<p className="text-gray-600">
								Welcome back, {user?.name || "Admin"}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="lg:grid lg:grid-cols-4 lg:gap-8">
					{/* Sidebar Navigation */}
					<div className="lg:col-span-1">
						<nav className="space-y-1">
							{tabs.map((tab) => {
								const IconComponent = tab.icon;
								return (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
											activeTab === tab.id
												? "bg-primary-100 text-primary-700"
												: "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
										}`}
									>
										<IconComponent className="h-5 w-5 mr-3" />
										{tab.label}
									</button>
								);
							})}
						</nav>
					</div>

					{/* Main Content */}
					<div className="lg:col-span-3 mt-8 lg:mt-0">{renderContent()}</div>
				</div>
			</div>
		</div>
	);
}
