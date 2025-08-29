"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
	BookOpen,
	Smartphone,
	Shield,
	AlertCircle,
	CheckCircle,
	Copy
} from "lucide-react";
import Image from "next/image";
import QRCode from "qrcode";

export default function MFASetupPage() {
	const [step, setStep] = useState<"setup" | "verify" | "success">("setup");
	const [qrCode, setQrCode] = useState("");
	const [qrCodeImage, setQrCodeImage] = useState("");
	const [secret, setSecret] = useState("");
	const [verificationCode, setVerificationCode] = useState("");
	const [error, setError] = useState("");
	const [copied, setCopied] = useState(false);

	const {
		setupMFA,
		confirmMFASetup,
		user,
		isLoading,
		currentChallenge,
		totpSetupDetails
	} = useAuth();
	const router = useRouter();

	const initializeMFA = useCallback(async () => {
		try {
			// If we already have setup details from the challenge, use them
			if (
				totpSetupDetails &&
				totpSetupDetails.qrCode &&
				totpSetupDetails.secret
			) {
				setQrCode(totpSetupDetails.qrCode);
				setSecret(totpSetupDetails.secret);

				// Generate QR code image from TOTP URI
				try {
					const qrCodeDataUrl = await QRCode.toDataURL(totpSetupDetails.qrCode);
					setQrCodeImage(qrCodeDataUrl);
				} catch (qrError) {
					console.error("QR Code generation error:", qrError);
					// Don't set error here, just log it - user can still use secret key
				}
				return;
			}

			const { qrCode: qr, secret: sec } = await setupMFA();
			if (qr && sec) {
				setQrCode(qr);
				setSecret(sec);

				// Generate QR code image from TOTP URI
				try {
					const qrCodeDataUrl = await QRCode.toDataURL(qr);
					setQrCodeImage(qrCodeDataUrl);
				} catch (qrError) {
					console.error("QR Code generation error:", qrError);
					// Don't set error here, just log it - user can still use secret key
				}
			} else {
				setError(
					"Failed to initialize MFA setup. Please try refreshing the page."
				);
			}
		} catch (err: any) {
			console.error("MFA initialization error:", err);
			setError("Failed to setup MFA. Please try again or contact support.");
		}
	}, [setupMFA, totpSetupDetails]);

	useEffect(() => {
		// Allow access if user is in MFA_SETUP challenge or already authenticated
		if (!user && currentChallenge !== "MFA_SETUP") {
			router.push("/login");
			return;
		}

		// If user is already authenticated and has MFA enabled, redirect to settings
		if (user && user.mfaEnabled) {
			router.push("/settings?tab=security");
			return;
		}

		initializeMFA();
	}, [user, router, initializeMFA, currentChallenge]);

	const handleVerifyCode = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		try {
			const success = await confirmMFASetup(verificationCode);
			if (success) {
				// If we were in the middle of authentication flow, redirect to home
				if (currentChallenge === "MFA_SETUP") {
					router.push("/");
				} else {
					setStep("success");
				}
			} else {
				setError("Invalid verification code. Please try again.");
			}
		} catch (err) {
			setError("Failed to verify MFA code");
		}
	};

	const copySecret = async () => {
		try {
			await navigator.clipboard.writeText(secret);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy secret:", err);
		}
	};

	if (step === "success") {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div className="text-center">
						<div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
							<Shield className="h-8 w-8 text-green-600" />
						</div>
						<h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
							MFA Successfully Enabled
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Your account is now protected with two-factor authentication
						</p>
					</div>

					<div className="bg-green-50 border border-green-200 rounded-lg p-4">
						<div className="text-sm text-green-800">
							<p className="font-medium mb-2">
								Your account is now more secure!
							</p>
							<ul className="list-disc list-inside space-y-1">
								<li>MFA has been enabled for your account</li>
								<li>You&apos;ll need your authenticator app to sign in</li>
								<li>Keep your authenticator app safe and accessible</li>
								<li>You can disable MFA anytime in your security settings</li>
							</ul>
						</div>
					</div>

					<div className="space-y-4">
						<button
							onClick={() => router.push("/settings?tab=security")}
							className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
						>
							Go to Security Settings
						</button>

						<button
							onClick={() => router.push("/")}
							className="w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
						>
							Continue to BookNest
						</button>
					</div>
				</div>
			</div>
		);
	}

	if (step === "verify") {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-md w-full space-y-8">
					<div>
						<div className="mx-auto h-12 w-12 flex items-center justify-center">
							<BookOpen className="h-12 w-12 text-primary-600" />
						</div>
						<h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
							Verify Your Authenticator
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Enter the 6-digit code from your authenticator app
						</p>
					</div>

					<form className="mt-8 space-y-6" onSubmit={handleVerifyCode}>
						{error && (
							<div className="flex items-center p-4 text-red-800 bg-red-100 rounded-lg">
								<AlertCircle className="h-5 w-5 mr-2" />
								<span className="text-sm">{error}</span>
							</div>
						)}

						<div>
							<label htmlFor="verification-code" className="sr-only">
								Verification Code
							</label>
							<input
								id="verification-code"
								name="verification-code"
								type="text"
								maxLength={6}
								required
								className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 text-center text-2xl tracking-widest focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-lg"
								placeholder="000000"
								value={verificationCode}
								onChange={(e) =>
									setVerificationCode(
										e.target.value.replace(/\D/g, "").slice(0, 6)
									)
								}
							/>
						</div>

						<div className="space-y-3">
							<button
								type="submit"
								disabled={isLoading || verificationCode.length !== 6}
								className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isLoading ? "Verifying..." : "Enable MFA"}
							</button>

							<button
								type="button"
								onClick={() => setStep("setup")}
								className="w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
							>
								Back to Setup
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<div className="mx-auto h-12 w-12 flex items-center justify-center">
						<BookOpen className="h-12 w-12 text-primary-600" />
					</div>
					<h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
						Setup Two-Factor Authentication
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Secure your account with an authenticator app
					</p>
				</div>

				<div className="space-y-6">
					{error && (
						<div className="flex items-center p-4 text-red-800 bg-red-100 rounded-lg">
							<AlertCircle className="h-5 w-5 mr-2" />
							<span className="text-sm">{error}</span>
						</div>
					)}

					<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
						<div className="flex items-start">
							<Smartphone className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
							<div className="text-sm text-blue-800">
								<p className="font-medium mb-1">
									Step 1: Install an authenticator app
								</p>
								<p>
									Download Google Authenticator, Authy, or Microsoft
									Authenticator on your phone.
								</p>
							</div>
						</div>
					</div>

					<div className="bg-white border border-gray-200 rounded-lg p-4">
						<div className="text-sm text-gray-800">
							<p className="font-medium mb-3">
								Step 2: Scan the QR code or enter the secret key
							</p>

							{qrCodeImage && (
								<div className="text-center mb-4">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={qrCodeImage}
										alt="QR Code for MFA setup"
										className="mx-auto w-48 h-48 border border-gray-300 rounded-lg"
									/>
								</div>
							)}

							{!qrCodeImage && qrCode && (
								<div className="text-center mb-4 p-4 bg-gray-50 rounded-lg">
									<p className="text-sm text-gray-600 mb-2">
										QR Code URI (for manual entry):
									</p>
									<code className="text-xs break-all">{qrCode}</code>
								</div>
							)}

							{secret && (
								<div className="mb-4">
									<p className="text-xs text-gray-600 mb-2">
										Or manually enter this secret key:
									</p>
									<div className="flex items-center space-x-2">
										<code className="flex-1 bg-gray-100 px-3 py-2 rounded text-xs font-mono break-all">
											{secret}
										</code>
										<button
											onClick={copySecret}
											className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
											title="Copy secret key"
										>
											{copied ? (
												<CheckCircle className="h-4 w-4 text-green-500" />
											) : (
												<Copy className="h-4 w-4" />
											)}
										</button>
									</div>
								</div>
							)}
						</div>
					</div>

					<div className="space-y-3">
						<button
							onClick={() => setStep("verify")}
							disabled={!qrCode || !secret}
							className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							I&apos;ve Set Up My Authenticator
						</button>

						<button
							onClick={() => router.push("/settings?tab=security")}
							className="w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
