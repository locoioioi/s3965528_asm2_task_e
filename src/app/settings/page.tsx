"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
	User,
	Mail,
	Lock,
	Bell,
	CreditCard,
	MapPin,
	Eye,
	EyeOff,
	Save,
	Trash2,
	Shield,
	Smartphone,
	Globe,
	Moon,
	Sun,
	Volume2,
	VolumeX
} from "lucide-react";

export default function SettingsPage() {
	const { user } = useAuth();
	const [activeTab, setActiveTab] = useState("profile");
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	// Profile form state
	const [profileData, setProfileData] = useState({
		firstName: user?.name?.split(" ")[0] || "",
		lastName: user?.name?.split(" ").slice(1).join(" ") || "",
		email: user?.email || "",
		phone: "+1 (555) 123-4567",
		dateOfBirth: "1990-01-01",
		bio: "Passionate reader and book enthusiast"
	});

	// Password form state
	const [passwordData, setPasswordData] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: ""
	});

	// Notification preferences
	const [notifications, setNotifications] = useState({
		orderUpdates: true,
		bookRecommendations: true,
		promotions: false,
		newArrivals: true,
		reviewReminders: true,
		emailDigest: true,
		pushNotifications: true,
		smsNotifications: false
	});

	// App preferences
	const [preferences, setPreferences] = useState({
		theme: "light",
		language: "en",
		currency: "USD",
		timezone: "America/New_York",
		soundEffects: true,
		autoPlay: false,
		compactView: false
	});

	// Address data
	const [addresses, setAddresses] = useState([
		{
			id: 1,
			type: "home",
			name: "Home Address",
			street: "123 Main Street",
			city: "New York",
			state: "NY",
			zipCode: "10001",
			country: "United States",
			isDefault: true
		},
		{
			id: 2,
			type: "work",
			name: "Work Address",
			street: "456 Business Ave",
			city: "New York",
			state: "NY",
			zipCode: "10002",
			country: "United States",
			isDefault: false
		}
	]);

	if (!user) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="text-center">
					<User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
					<h2 className="text-2xl font-bold text-gray-900 mb-2">
						Sign in to access settings
					</h2>
					<p className="text-gray-600 mb-6">
						Manage your account and preferences
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

	const tabs = [
		{ id: "profile", label: "Profile", icon: User },
		{ id: "security", label: "Security", icon: Lock },
		{ id: "notifications", label: "Notifications", icon: Bell },
		{ id: "addresses", label: "Addresses", icon: MapPin },
		{ id: "preferences", label: "Preferences", icon: Globe },
		{ id: "billing", label: "Billing", icon: CreditCard }
	];

	const handleProfileUpdate = () => {
		// Mock profile update
		alert("Profile updated successfully!");
	};

	const handlePasswordChange = () => {
		if (passwordData.newPassword !== passwordData.confirmPassword) {
			alert("New passwords do not match!");
			return;
		}
		// Mock password change
		alert("Password changed successfully!");
		setPasswordData({
			currentPassword: "",
			newPassword: "",
			confirmPassword: ""
		});
	};

	const handleNotificationUpdate = () => {
		// Mock notification update
		alert("Notification preferences updated!");
	};

	const handlePreferencesUpdate = () => {
		// Mock preferences update
		alert("Preferences updated!");
	};

	const renderProfileTab = () => (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					Personal Information
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							First Name
						</label>
						<input
							type="text"
							value={profileData.firstName}
							onChange={(e) =>
								setProfileData({ ...profileData, firstName: e.target.value })
							}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Last Name
						</label>
						<input
							type="text"
							value={profileData.lastName}
							onChange={(e) =>
								setProfileData({ ...profileData, lastName: e.target.value })
							}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Email
						</label>
						<input
							type="email"
							value={profileData.email}
							onChange={(e) =>
								setProfileData({ ...profileData, email: e.target.value })
							}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Phone
						</label>
						<input
							type="tel"
							value={profileData.phone}
							onChange={(e) =>
								setProfileData({ ...profileData, phone: e.target.value })
							}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Date of Birth
						</label>
						<input
							type="date"
							value={profileData.dateOfBirth}
							onChange={(e) =>
								setProfileData({ ...profileData, dateOfBirth: e.target.value })
							}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
						/>
					</div>
				</div>
				<div className="mt-6">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Bio
					</label>
					<textarea
						value={profileData.bio}
						onChange={(e) =>
							setProfileData({ ...profileData, bio: e.target.value })
						}
						rows={3}
						className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
						placeholder="Tell us about yourself..."
					/>
				</div>
			</div>
			<div className="flex justify-end">
				<button
					onClick={handleProfileUpdate}
					className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
				>
					<Save className="h-4 w-4 mr-2" />
					Save Changes
				</button>
			</div>
		</div>
	);

	const renderSecurityTab = () => (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					Change Password
				</h3>
				<div className="space-y-4 max-w-md">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Current Password
						</label>
						<div className="relative">
							<input
								type={showCurrentPassword ? "text" : "password"}
								value={passwordData.currentPassword}
								onChange={(e) =>
									setPasswordData({
										...passwordData,
										currentPassword: e.target.value
									})
								}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
							/>
							<button
								type="button"
								onClick={() => setShowCurrentPassword(!showCurrentPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
							>
								{showCurrentPassword ? (
									<EyeOff className="h-4 w-4" />
								) : (
									<Eye className="h-4 w-4" />
								)}
							</button>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							New Password
						</label>
						<div className="relative">
							<input
								type={showNewPassword ? "text" : "password"}
								value={passwordData.newPassword}
								onChange={(e) =>
									setPasswordData({
										...passwordData,
										newPassword: e.target.value
									})
								}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
							/>
							<button
								type="button"
								onClick={() => setShowNewPassword(!showNewPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
							>
								{showNewPassword ? (
									<EyeOff className="h-4 w-4" />
								) : (
									<Eye className="h-4 w-4" />
								)}
							</button>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Confirm New Password
						</label>
						<div className="relative">
							<input
								type={showConfirmPassword ? "text" : "password"}
								value={passwordData.confirmPassword}
								onChange={(e) =>
									setPasswordData({
										...passwordData,
										confirmPassword: e.target.value
									})
								}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
							/>
							<button
								type="button"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
							>
								{showConfirmPassword ? (
									<EyeOff className="h-4 w-4" />
								) : (
									<Eye className="h-4 w-4" />
								)}
							</button>
						</div>
					</div>
				</div>
				<button
					onClick={handlePasswordChange}
					className="mt-4 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
				>
					Change Password
				</button>
			</div>

			<div className="border-t border-gray-200 pt-6">
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					Two-Factor Authentication
				</h3>
				{user.mfaEnabled ? (
					<div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<Shield className="h-5 w-5 text-green-600 mr-2" />
								<div>
									<span className="text-sm font-medium text-green-800">
										Two-factor authentication is enabled
									</span>
									<p className="text-xs text-green-700">
										Your account is protected with an authenticator app
									</p>
								</div>
							</div>
							<button
								className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
								onClick={() => {
									if (
										confirm(
											"Are you sure you want to disable two-factor authentication? This will make your account less secure."
										)
									) {
										// In a real implementation, you would call a disable MFA function
										alert("MFA would be disabled here");
									}
								}}
							>
								Disable 2FA
							</button>
						</div>
					</div>
				) : (
					<>
						<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
							<div className="flex items-center">
								<Shield className="h-5 w-5 text-yellow-600 mr-2" />
								<div>
									<span className="text-sm text-yellow-800">
										Two-factor authentication is disabled
									</span>
									<p className="text-xs text-yellow-700">
										Enable 2FA to add an extra layer of security to your account
									</p>
								</div>
							</div>
						</div>
						<Link
							href="/mfa-setup"
							className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center w-fit"
						>
							<Smartphone className="h-4 w-4 mr-2" />
							Enable 2FA
						</Link>
					</>
				)}
			</div>

			<div className="border-t border-gray-200 pt-6">
				<h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
				<div className="bg-red-50 border border-red-200 rounded-lg p-4">
					<h4 className="font-medium text-red-900 mb-2">Delete Account</h4>
					<p className="text-sm text-red-700 mb-4">
						Once you delete your account, there is no going back. Please be
						certain.
					</p>
					<button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center">
						<Trash2 className="h-4 w-4 mr-2" />
						Delete Account
					</button>
				</div>
			</div>
		</div>
	);

	const renderNotificationsTab = () => (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					Email Notifications
				</h3>
				<div className="space-y-4">
					{[
						{
							key: "orderUpdates",
							label: "Order Updates",
							desc: "Get notified about your order status"
						},
						{
							key: "bookRecommendations",
							label: "Book Recommendations",
							desc: "Personalized book suggestions"
						},
						{
							key: "promotions",
							label: "Promotions & Deals",
							desc: "Special offers and discounts"
						},
						{
							key: "newArrivals",
							label: "New Arrivals",
							desc: "Latest books in your favorite genres"
						},
						{
							key: "reviewReminders",
							label: "Review Reminders",
							desc: "Reminders to review your purchases"
						},
						{
							key: "emailDigest",
							label: "Weekly Digest",
							desc: "Summary of your activity and recommendations"
						}
					].map((item) => (
						<div
							key={item.key}
							className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
						>
							<div>
								<h4 className="font-medium text-gray-900">{item.label}</h4>
								<p className="text-sm text-gray-600">{item.desc}</p>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={
										notifications[item.key as keyof typeof notifications]
									}
									onChange={(e) =>
										setNotifications({
											...notifications,
											[item.key]: e.target.checked
										})
									}
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
							</label>
						</div>
					))}
				</div>
			</div>

			<div>
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					Push Notifications
				</h3>
				<div className="space-y-4">
					{[
						{
							key: "pushNotifications",
							label: "Browser Notifications",
							desc: "Receive notifications in your browser"
						},
						{
							key: "smsNotifications",
							label: "SMS Notifications",
							desc: "Receive text messages for important updates"
						}
					].map((item) => (
						<div
							key={item.key}
							className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
						>
							<div>
								<h4 className="font-medium text-gray-900">{item.label}</h4>
								<p className="text-sm text-gray-600">{item.desc}</p>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={
										notifications[item.key as keyof typeof notifications]
									}
									onChange={(e) =>
										setNotifications({
											...notifications,
											[item.key]: e.target.checked
										})
									}
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
							</label>
						</div>
					))}
				</div>
			</div>

			<div className="flex justify-end">
				<button
					onClick={handleNotificationUpdate}
					className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
				>
					<Save className="h-4 w-4 mr-2" />
					Save Preferences
				</button>
			</div>
		</div>
	);

	const renderAddressesTab = () => (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-gray-900">Saved Addresses</h3>
				<button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
					Add New Address
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{addresses.map((address) => (
					<div
						key={address.id}
						className="border border-gray-200 rounded-lg p-4"
					>
						<div className="flex items-center justify-between mb-3">
							<h4 className="font-medium text-gray-900">{address.name}</h4>
							{address.isDefault && (
								<span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
									Default
								</span>
							)}
						</div>
						<div className="text-sm text-gray-600 space-y-1">
							<p>{address.street}</p>
							<p>
								{address.city}, {address.state} {address.zipCode}
							</p>
							<p>{address.country}</p>
						</div>
						<div className="flex gap-2 mt-4">
							<button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
								Edit
							</button>
							<button className="text-red-600 hover:text-red-700 text-sm font-medium">
								Delete
							</button>
							{!address.isDefault && (
								<button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
									Set as Default
								</button>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);

	const renderPreferencesTab = () => (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-semibold text-gray-900 mb-4">Appearance</h3>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Theme
						</label>
						<div className="flex gap-4">
							<label className="flex items-center">
								<input
									type="radio"
									name="theme"
									value="light"
									checked={preferences.theme === "light"}
									onChange={(e) =>
										setPreferences({ ...preferences, theme: e.target.value })
									}
									className="mr-2"
								/>
								<Sun className="h-4 w-4 mr-1" />
								Light
							</label>
							<label className="flex items-center">
								<input
									type="radio"
									name="theme"
									value="dark"
									checked={preferences.theme === "dark"}
									onChange={(e) =>
										setPreferences({ ...preferences, theme: e.target.value })
									}
									className="mr-2"
								/>
								<Moon className="h-4 w-4 mr-1" />
								Dark
							</label>
						</div>
					</div>
				</div>
			</div>

			<div>
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					Localization
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Language
						</label>
						<select
							value={preferences.language}
							onChange={(e) =>
								setPreferences({ ...preferences, language: e.target.value })
							}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
						>
							<option value="en">English</option>
							<option value="es">Español</option>
							<option value="fr">Français</option>
							<option value="de">Deutsch</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Currency
						</label>
						<select
							value={preferences.currency}
							onChange={(e) =>
								setPreferences({ ...preferences, currency: e.target.value })
							}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
						>
							<option value="USD">USD ($)</option>
							<option value="EUR">EUR (€)</option>
							<option value="GBP">GBP (£)</option>
							<option value="CAD">CAD ($)</option>
						</select>
					</div>
				</div>
			</div>

			<div>
				<h3 className="text-lg font-semibold text-gray-900 mb-4">Experience</h3>
				<div className="space-y-4">
					{[
						{
							key: "soundEffects",
							label: "Sound Effects",
							desc: "Play sounds for interactions",
							icon: Volume2
						},
						{
							key: "autoPlay",
							label: "Auto-play Videos",
							desc: "Automatically play book trailers",
							icon: null
						},
						{
							key: "compactView",
							label: "Compact View",
							desc: "Show more items per page",
							icon: null
						}
					].map((item) => (
						<div
							key={item.key}
							className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
						>
							<div className="flex items-center">
								{item.icon && (
									<item.icon className="h-4 w-4 mr-3 text-gray-500" />
								)}
								<div>
									<h4 className="font-medium text-gray-900">{item.label}</h4>
									<p className="text-sm text-gray-600">{item.desc}</p>
								</div>
							</div>
							<label className="relative inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={
										preferences[item.key as keyof typeof preferences] as boolean
									}
									onChange={(e) =>
										setPreferences({
											...preferences,
											[item.key]: e.target.checked
										})
									}
									className="sr-only peer"
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
							</label>
						</div>
					))}
				</div>
			</div>

			<div className="flex justify-end">
				<button
					onClick={handlePreferencesUpdate}
					className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
				>
					<Save className="h-4 w-4 mr-2" />
					Save Preferences
				</button>
			</div>
		</div>
	);

	const renderBillingTab = () => (
		<div className="space-y-6">
			<div>
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					Payment Methods
				</h3>
				<div className="space-y-4">
					<div className="border border-gray-200 rounded-lg p-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center mr-3">
									<span className="text-white text-xs font-bold">VISA</span>
								</div>
								<div>
									<p className="font-medium text-gray-900">
										•••• •••• •••• 4242
									</p>
									<p className="text-sm text-gray-600">Expires 12/25</p>
								</div>
							</div>
							<div className="flex gap-2">
								<button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
									Edit
								</button>
								<button className="text-red-600 hover:text-red-700 text-sm font-medium">
									Remove
								</button>
							</div>
						</div>
					</div>
					<button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-primary-300 hover:text-primary-600 transition-colors">
						+ Add New Payment Method
					</button>
				</div>
			</div>

			<div>
				<h3 className="text-lg font-semibold text-gray-900 mb-4">
					Billing History
				</h3>
				<div className="bg-gray-50 rounded-lg p-4">
					<div className="space-y-3">
						{[
							{
								date: "2024-01-15",
								amount: "$29.98",
								invoice: "INV-001",
								status: "Paid"
							},
							{
								date: "2024-01-08",
								amount: "$45.97",
								invoice: "INV-002",
								status: "Paid"
							},
							{
								date: "2023-12-22",
								amount: "$18.99",
								invoice: "INV-003",
								status: "Paid"
							}
						].map((item, index) => (
							<div
								key={index}
								className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0"
							>
								<div>
									<p className="font-medium text-gray-900">{item.invoice}</p>
									<p className="text-sm text-gray-600">{item.date}</p>
								</div>
								<div className="text-right">
									<p className="font-medium text-gray-900">{item.amount}</p>
									<p className="text-sm text-green-600">{item.status}</p>
								</div>
								<button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
									Download
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);

	const renderTabContent = () => {
		switch (activeTab) {
			case "profile":
				return renderProfileTab();
			case "security":
				return renderSecurityTab();
			case "notifications":
				return renderNotificationsTab();
			case "addresses":
				return renderAddressesTab();
			case "preferences":
				return renderPreferencesTab();
			case "billing":
				return renderBillingTab();
			default:
				return renderProfileTab();
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Account Settings
					</h1>
					<p className="text-gray-600">
						Manage your account preferences and settings
					</p>
				</div>

				<div className="lg:grid lg:grid-cols-4 lg:gap-8">
					{/* Sidebar Navigation */}
					<div className="lg:col-span-1">
						<nav className="space-y-1">
							{tabs.map((tab) => {
								const isActive = activeTab === tab.id;
								return (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
											isActive
												? "bg-primary-100 text-primary-700 border-primary-200"
												: "text-gray-700 hover:bg-gray-100"
										}`}
									>
										<tab.icon className="h-4 w-4 mr-3" />
										{tab.label}
									</button>
								);
							})}
						</nav>
					</div>

					{/* Main Content */}
					<div className="mt-8 lg:mt-0 lg:col-span-3">
						<div className="bg-white rounded-lg shadow-sm p-6">
							{renderTabContent()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
