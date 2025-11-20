# Automated Vercel Setup Script
# This script helps automate Vercel configuration

$ErrorActionPreference = "Stop"

function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

Write-ColorOutput Green "🚀 Automated Vercel Setup"
Write-Output ""

# Step 1: Check/Login to Vercel
Write-ColorOutput Yellow "Step 1: Vercel Authentication"
try {
    $null = vercel whoami 2>&1
    Write-ColorOutput Green "✅ Already logged in to Vercel"
    $user = vercel whoami
    Write-Output "Logged in as: $user"
} catch {
    Write-ColorOutput Yellow "⚠️  Not logged in. Opening browser for login..."
    Write-Output "Please complete the login in your browser."
    vercel login
    Start-Sleep -Seconds 2
    try {
        $user = vercel whoami
        Write-ColorOutput Green "✅ Logged in as: $user"
    } catch {
        Write-ColorOutput Red "❌ Login failed. Please run 'vercel login' manually."
        exit 1
    }
}

Write-Output ""

# Step 2: Link project (if not already linked)
Write-ColorOutput Yellow "Step 2: Project Linking"
if (Test-Path ".vercel/project.json") {
    $project = Get-Content ".vercel/project.json" | ConvertFrom-Json
    Write-ColorOutput Green "✅ Project already linked: $($project.projectName)"
} else {
    Write-ColorOutput Yellow "Linking project to Vercel..."
    vercel link --yes
}

Write-Output ""

# Step 3: Check current environment variables
Write-ColorOutput Yellow "Step 3: Environment Variables Check"
Write-Output "Current environment variables:"
vercel env ls

Write-Output ""
Write-ColorOutput Cyan "📝 Next Steps:"
Write-Output "1. You need to set these environment variables manually (they contain secrets):"
Write-Output "   - DATABASE_URL (from Supabase)"
Write-Output "   - AUTH_SECRET (generate with: openssl rand -base64 32)"
Write-Output "   - NEXTAUTH_URL (your production URL)"
Write-Output ""
Write-Output "2. Run this command to set them:"
Write-Output "   vercel env add DATABASE_URL production"
Write-Output "   vercel env add AUTH_SECRET production"
Write-Output "   vercel env add NEXTAUTH_URL production"
Write-Output ""
Write-Output "3. Or use the interactive script:"
Write-Output "   .\scripts\vercel-setup.ps1"
Write-Output ""

# Step 4: Pull environment template
Write-ColorOutput Yellow "Step 4: Creating Environment Template"
if (-not (Test-Path ".env.example")) {
    @"
# Vercel Environment Variables Template
# Copy these to Vercel Dashboard or use: vercel env add VARIABLE_NAME production

# Database (from Supabase)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres?sslmode=require"

# NextAuth.js
AUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="https://your-domain.vercel.app"

# Optional: For local development
# Copy to .env.local for local use
"@ | Out-File -FilePath ".env.example" -Encoding UTF8
    Write-ColorOutput Green "✅ Created .env.example template"
}

Write-Output ""
Write-ColorOutput Green "✅ Setup complete!"
Write-Output ""
Write-ColorOutput Cyan "📚 For full documentation, see: VERCEL_MANAGEMENT.md"

