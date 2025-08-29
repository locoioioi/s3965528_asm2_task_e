const fs = require("fs");
const path = require("path");

// Function to recursively find and process HTML files
function processHtmlFiles(dir) {
	const files = fs.readdirSync(dir);
	let processedCount = 0;

	for (const file of files) {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			processedCount += processHtmlFiles(filePath);
		} else if (file.endsWith(".html")) {
			console.log(`Processing ${filePath}`);

			let content = fs.readFileSync(filePath, "utf8");
			const originalContent = content;

			// Replace absolute paths with relative paths for static hosting
			content = content.replace(/href="\/_next\//g, 'href="./_next/');
			content = content.replace(/src="\/_next\//g, 'src="./_next/');

			// Fix JavaScript hydration data - patterns like "href":"/_next/"
			content = content.replace(/"href":"\/\_next\//g, '"href":"./_next/');
			content = content.replace(/href:"\/\_next\//g, 'href:"./_next/');
			content = content.replace(/"src":"\/\_next\//g, '"src":"./_next/');
			content = content.replace(/src:"\/\_next\//g, 'src:"./_next/');

			// Check if changes were made
			if (content !== originalContent) {
				fs.writeFileSync(filePath, content, "utf8");
				console.log(`✅ Fixed paths in ${filePath}`);
				processedCount++;
			} else {
				console.log(`ℹ️  No changes needed in ${filePath}`);
			}
		}
	}

	return processedCount;
}

console.log("🔧 Fixing static paths for deployment...");

// Check if out directory exists
if (!fs.existsSync("./out")) {
	console.error(
		'❌ Error: ./out directory not found. Make sure to run "npm run build" first.'
	);
	process.exit(1);
}

const fixedFiles = processHtmlFiles("./out");
console.log(`✅ Successfully processed ${fixedFiles} HTML files`);

// Verify the fix worked by checking index.html
const indexPath = "./out/index.html";
if (fs.existsSync(indexPath)) {
	const indexContent = fs.readFileSync(indexPath, "utf8");
	const hasRelativePaths = indexContent.includes('href="./_next/');
	console.log(
		`🔍 Verification: ${
			hasRelativePaths
				? "✅ Relative paths found"
				: "❌ Still using absolute paths"
		}`
	);

	// Show first few lines with CSS/JS references
	const lines = indexContent.split("\n");
	const relevantLines = lines.filter((line) => line.includes("_next/"));
	if (relevantLines.length > 0) {
		console.log("📄 Sample asset references:");
		relevantLines.slice(0, 3).forEach((line) => {
			console.log(`   ${line.trim()}`);
		});
	}
} else {
	console.error("❌ Warning: index.html not found in build directory");
}
console.log("All paths fixed successfully!");
