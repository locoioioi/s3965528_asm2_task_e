"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Users, Shield, AlertCircle, CheckCircle, Info } from "lucide-react";

export default function UserManagementPage() {
	const { user } = useAuth();

	if (!user || user.role !== "admin") {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="max-w-md w-full text-center">
					<Shield className="mx-auto h-16 w-16 text-red-500" />
					<h2 className="mt-4 text-2xl font-bold text-gray-900">
						Access Denied
					</h2>
					<p className="mt-2 text-gray-600">
						You need admin privileges to access this page.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">User Management</h1>
					<p className="mt-2 text-gray-600">
						Manage user roles and group assignments
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Current User Info */}
					<div className="bg-white shadow rounded-lg p-6">
						<div className="flex items-center mb-4">
							<Users className="h-6 w-6 text-primary-600" />
							<h2 className="ml-2 text-xl font-semibold text-gray-900">
								Your Account
							</h2>
						</div>

						<div className="space-y-3">
							<div>
								<span className="text-sm font-medium text-gray-500">
									Email:
								</span>
								<p className="text-gray-900">{user.email}</p>
							</div>
							<div>
								<span className="text-sm font-medium text-gray-500">Name:</span>
								<p className="text-gray-900">{user.name}</p>
							</div>
							<div>
								<span className="text-sm font-medium text-gray-500">Role:</span>
								<span
									className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
										user.role === "admin"
											? "bg-red-100 text-red-800"
											: "bg-blue-100 text-blue-800"
									}`}
								>
									{user.role}
								</span>
							</div>
							<div>
								<span className="text-sm font-medium text-gray-500">
									User ID:
								</span>
								<p className="text-gray-900 font-mono text-sm">{user.id}</p>
							</div>
						</div>
					</div>

					{/* Group Management Instructions */}
					<div className="bg-white shadow rounded-lg p-6">
						<div className="flex items-center mb-4">
							<Info className="h-6 w-6 text-blue-600" />
							<h2 className="ml-2 text-xl font-semibold text-gray-900">
								Group Management
							</h2>
						</div>

						<div className="space-y-4">
							<div className="p-4 bg-blue-50 rounded-lg">
								<h3 className="font-medium text-blue-900 mb-2">
									Automatic Group Assignment
								</h3>
								<p className="text-sm text-blue-800">
									New users should be automatically added to the
									&apos;user&apos; group via Lambda trigger. If this isn&apos;t
									working, check the Lambda function setup.
								</p>
							</div>

							<div className="p-4 bg-yellow-50 rounded-lg">
								<h3 className="font-medium text-yellow-900 mb-2">
									Manual Group Assignment
								</h3>
								<p className="text-sm text-yellow-800 mb-2">
									To manually add users to groups, use the AWS Console or CLI:
								</p>
								<code className="block text-xs bg-gray-100 p-2 rounded">
									aws cognito-idp admin-add-user-to-group
									<br />
									--user-pool-id us-east-1_7JEbEDNxI
									<br />
									--username [email]
									<br />
									--group-name user
								</code>
							</div>

							<div className="p-4 bg-green-50 rounded-lg">
								<h3 className="font-medium text-green-900 mb-2">
									Role Hierarchy
								</h3>
								<ul className="text-sm text-green-800 space-y-1">
									<li>
										• <strong>admin</strong> group: Administrator access
									</li>
									<li>
										• <strong>user</strong> group: Regular user access
									</li>
									<li>
										• <strong>No groups</strong>: Regular user access (default)
									</li>
									<li>• Admin group takes priority over user group</li>
								</ul>
							</div>
						</div>
					</div>

					{/* Debugging Info */}
					<div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
						<div className="flex items-center mb-4">
							<AlertCircle className="h-6 w-6 text-orange-600" />
							<h2 className="ml-2 text-xl font-semibold text-gray-900">
								Debug Information
							</h2>
						</div>

						<div className="bg-gray-50 p-4 rounded-lg">
							<p className="text-sm text-gray-600 mb-2">
								Check the browser console for group assignment logs when users
								sign in. You should see messages like:
							</p>
							<div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm">
								User groups: [&quot;admin&quot;]
								<br />
								Assigned role: admin
							</div>
						</div>

						<div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
							<div className="text-center p-4 bg-blue-50 rounded-lg">
								<h4 className="font-medium text-blue-900">User Pool ID</h4>
								<p className="text-sm text-blue-800 font-mono">
									us-east-1_7JEbEDNxI
								</p>
							</div>
							<div className="text-center p-4 bg-green-50 rounded-lg">
								<h4 className="font-medium text-green-900">Available Groups</h4>
								<p className="text-sm text-green-800">user, admin</p>
							</div>
							<div className="text-center p-4 bg-purple-50 rounded-lg">
								<h4 className="font-medium text-purple-900">Region</h4>
								<p className="text-sm text-purple-800">us-east-1</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
