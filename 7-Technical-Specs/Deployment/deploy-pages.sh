#!/bin/bash

# Cloudflare Pages Deployment Script
# This script deploys the Next.js static export to Cloudflare Pages

set -e

echo "🚀 Deploying to Cloudflare Pages..."

# Check if CLOUDFLARE_API_TOKEN is set
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ Error: CLOUDFLARE_API_TOKEN environment variable is not set"
    echo ""
    echo "To get your API token:"
    echo "1. Go to: https://dash.cloudflare.com/profile/api-tokens"
    echo "2. Click 'Create Token'"
    echo "3. Use 'Edit Cloudflare Workers' template"
    echo "4. Add 'Account' and 'Zone' permissions for Pages"
    echo "5. Copy the token and set it:"
    echo "   export CLOUDFLARE_API_TOKEN=your_token_here"
    exit 1
fi

# Check if project name is set
PROJECT_NAME=${CLOUDFLARE_PAGES_PROJECT_NAME:-"performance-review-writer"}
echo "📦 Project name: $PROJECT_NAME"

# Build the project
echo "🔨 Building project..."
npm run build

# Check if out directory exists
if [ ! -d "out" ]; then
    echo "❌ Error: 'out' directory not found. Build may have failed."
    exit 1
fi

echo "✅ Build successful!"

# Deploy to Cloudflare Pages
echo "📤 Deploying to Cloudflare Pages..."
npx wrangler pages deploy out --project-name="$PROJECT_NAME"

echo "✅ Deployment complete!"
echo ""
echo "🌐 Your site should be available at:"
echo "   https://$PROJECT_NAME.pages.dev"
echo ""
echo "💡 To set environment variables, go to:"
echo "   https://dash.cloudflare.com/pages/view/$PROJECT_NAME/settings/environment-variables"

