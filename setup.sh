#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# IdeaSpark — Capacitor Setup Script (run on macOS)
# ═══════════════════════════════════════════════════════════════
set -e

echo "📦 Installing dependencies..."
npm install

echo "📱 Adding iOS platform..."
npx cap add ios

echo "🤖 Adding Android platform..."
npx cap add android

echo "🔄 Syncing web assets to native projects..."
npx cap sync

echo ""
echo "✅ Done! Next steps:"
echo "   1. Open iOS project:     npx cap open ios"
echo "   2. Open Android project: npx cap open android"
echo ""
echo "Inside Xcode:"
echo "   - Set your Team (Apple Developer account) under Signing & Capabilities"
echo "   - Set the App Icon (use www/icon-1024.png) in Assets.xcassets"
echo "   - Build & Run on Simulator or your device"
