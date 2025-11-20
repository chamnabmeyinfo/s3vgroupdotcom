#!/bin/bash
# Vercel Full Control Setup Script
# This script helps you manage your Vercel deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Vercel Full Control Setup${NC}"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️  Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not logged in to Vercel. Please login:${NC}"
    vercel login
fi

echo -e "${GREEN}✅ Vercel CLI ready${NC}"
echo ""

# Function to set environment variables
setup_env_vars() {
    echo -e "${GREEN}📝 Setting up environment variables...${NC}"
    echo ""
    
    read -p "Enter DATABASE_URL (Supabase): " DATABASE_URL
    read -p "Enter AUTH_SECRET (generate with: openssl rand -base64 32): " AUTH_SECRET
    read -p "Enter NEXTAUTH_URL (production URL): " NEXTAUTH_URL
    
    if [ -z "$NEXTAUTH_URL" ]; then
        NEXTAUTH_URL="https://s3v-nu2nzr1da-chamnab-meys-projects-13552d22.vercel.app"
    fi
    
    echo ""
    echo -e "${YELLOW}Setting environment variables for Production, Preview, and Development...${NC}"
    
    vercel env add DATABASE_URL production <<< "$DATABASE_URL"
    vercel env add DATABASE_URL preview <<< "$DATABASE_URL"
    vercel env add DATABASE_URL development <<< "$DATABASE_URL"
    
    vercel env add AUTH_SECRET production <<< "$AUTH_SECRET"
    vercel env add AUTH_SECRET preview <<< "$AUTH_SECRET"
    vercel env add AUTH_SECRET development <<< "$AUTH_SECRET"
    
    vercel env add NEXTAUTH_URL production <<< "$NEXTAUTH_URL"
    vercel env add NEXTAUTH_URL preview <<< "$NEXTAUTH_URL"
    vercel env add NEXTAUTH_URL development <<< "$NEXTAUTH_URL"
    
    echo -e "${GREEN}✅ Environment variables set!${NC}"
}

# Function to deploy
deploy() {
    echo -e "${GREEN}🚀 Deploying to Vercel...${NC}"
    read -p "Deploy to production? (y/n): " confirm
    if [ "$confirm" = "y" ]; then
        vercel --prod
    else
        vercel
    fi
}

# Function to view logs
view_logs() {
    echo -e "${GREEN}📋 Fetching deployment list...${NC}"
    vercel ls
    echo ""
    read -p "Enter deployment URL or ID to view logs: " deployment
    vercel logs "$deployment"
}

# Function to list environment variables
list_env() {
    echo -e "${GREEN}📝 Current environment variables:${NC}"
    vercel env ls
}

# Function to remove environment variable
remove_env() {
    echo -e "${YELLOW}⚠️  Remove environment variable${NC}"
    read -p "Enter variable name: " var_name
    read -p "Environment (production/preview/development): " env
    vercel env rm "$var_name" "$env"
}

# Main menu
show_menu() {
    echo ""
    echo -e "${GREEN}Vercel Management Menu:${NC}"
    echo "1) Setup environment variables"
    echo "2) Deploy to Vercel"
    echo "3) View deployment logs"
    echo "4) List environment variables"
    echo "5) Remove environment variable"
    echo "6) View project info"
    echo "7) Pull environment variables to .env.local"
    echo "8) Exit"
    echo ""
    read -p "Select option (1-8): " choice
    
    case $choice in
        1) setup_env_vars ;;
        2) deploy ;;
        3) view_logs ;;
        4) list_env ;;
        5) remove_env ;;
        6) vercel project ls ;;
        7) vercel env pull .env.local ;;
        8) exit 0 ;;
        *) echo -e "${RED}Invalid option${NC}" ;;
    esac
}

# Run menu
while true; do
    show_menu
done

