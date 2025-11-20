# Vercel Full Control Setup Script (PowerShell)
# This script helps you manage your Vercel deployment on Windows

$ErrorActionPreference = "Stop"

function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

Write-ColorOutput Green "🚀 Vercel Full Control Setup"
Write-Output ""

# Check if Vercel CLI is installed
try {
    $null = Get-Command vercel -ErrorAction Stop
    Write-ColorOutput Green "✅ Vercel CLI found"
} catch {
    Write-ColorOutput Yellow "⚠️  Vercel CLI not found. Installing..."
    npm install -g vercel
}

# Check if logged in
try {
    $null = vercel whoami 2>&1
    Write-ColorOutput Green "✅ Logged in to Vercel"
} catch {
    Write-ColorOutput Yellow "⚠️  Not logged in to Vercel. Please login:"
    vercel login
}

Write-Output ""

# Function to set environment variables
function Setup-EnvVars {
    Write-ColorOutput Green "📝 Setting up environment variables..."
    Write-Output ""
    
    $DATABASE_URL = Read-Host "Enter DATABASE_URL (Supabase)"
    $AUTH_SECRET = Read-Host "Enter AUTH_SECRET (generate with: openssl rand -base64 32)"
    $NEXTAUTH_URL = Read-Host "Enter NEXTAUTH_URL (production URL) [default: https://s3v-nu2nzr1da-chamnab-meys-projects-13552d22.vercel.app]"
    
    if ([string]::IsNullOrWhiteSpace($NEXTAUTH_URL)) {
        $NEXTAUTH_URL = "https://s3v-nu2nzr1da-chamnab-meys-projects-13552d22.vercel.app"
    }
    
    Write-Output ""
    Write-ColorOutput Yellow "Setting environment variables for Production, Preview, and Development..."
    
    echo $DATABASE_URL | vercel env add DATABASE_URL production
    echo $DATABASE_URL | vercel env add DATABASE_URL preview
    echo $DATABASE_URL | vercel env add DATABASE_URL development
    
    echo $AUTH_SECRET | vercel env add AUTH_SECRET production
    echo $AUTH_SECRET | vercel env add AUTH_SECRET preview
    echo $AUTH_SECRET | vercel env add AUTH_SECRET development
    
    echo $NEXTAUTH_URL | vercel env add NEXTAUTH_URL production
    echo $NEXTAUTH_URL | vercel env add NEXTAUTH_URL preview
    echo $NEXTAUTH_URL | vercel env add NEXTAUTH_URL development
    
    Write-ColorOutput Green "✅ Environment variables set!"
}

# Function to deploy
function Deploy-Vercel {
    Write-ColorOutput Green "🚀 Deploying to Vercel..."
    $confirm = Read-Host "Deploy to production? (y/n)"
    if ($confirm -eq "y") {
        vercel --prod
    } else {
        vercel
    }
}

# Function to view logs
function View-Logs {
    Write-ColorOutput Green "📋 Fetching deployment list..."
    vercel ls
    Write-Output ""
    $deployment = Read-Host "Enter deployment URL or ID to view logs"
    vercel logs $deployment
}

# Function to list environment variables
function List-Env {
    Write-ColorOutput Green "📝 Current environment variables:"
    vercel env ls
}

# Function to remove environment variable
function Remove-Env {
    Write-ColorOutput Yellow "⚠️  Remove environment variable"
    $varName = Read-Host "Enter variable name"
    $env = Read-Host "Environment (production/preview/development)"
    vercel env rm $varName $env
}

# Main menu
function Show-Menu {
    Write-Output ""
    Write-ColorOutput Green "Vercel Management Menu:"
    Write-Output "1) Setup environment variables"
    Write-Output "2) Deploy to Vercel"
    Write-Output "3) View deployment logs"
    Write-Output "4) List environment variables"
    Write-Output "5) Remove environment variable"
    Write-Output "6) View project info"
    Write-Output "7) Pull environment variables to .env.local"
    Write-Output "8) Exit"
    Write-Output ""
    $choice = Read-Host "Select option (1-8)"
    
    switch ($choice) {
        "1" { Setup-EnvVars }
        "2" { Deploy-Vercel }
        "3" { View-Logs }
        "4" { List-Env }
        "5" { Remove-Env }
        "6" { vercel project ls }
        "7" { vercel env pull .env.local }
        "8" { exit 0 }
        default { Write-ColorOutput Red "Invalid option" }
    }
}

# Run menu
while ($true) {
    Show-Menu
}

