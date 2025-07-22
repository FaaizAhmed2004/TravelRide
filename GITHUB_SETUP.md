# GitHub Setup Instructions

## Step 1: Create Repository on GitHub
1. Go to https://github.com
2. Click "New repository" or "+"
3. Name your repository (e.g., "TravelNRide")
4. Make it public or private as needed
5. DO NOT initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Add Remote Origin
Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub username and repository name:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
```

## Step 3: Push to GitHub
```bash
git branch -M main
git push -u origin main
```

## Alternative: If you already created the repository
If you already have the GitHub repository URL, run these commands:

```bash
# Add your repository as remote origin
git remote add origin YOUR_GITHUB_REPOSITORY_URL

# Rename branch to main (GitHub default)
git branch -M main

# Push all files to GitHub
git push -u origin main
```

## Example with actual URL:
```bash
git remote add origin https://github.com/yourusername/TravelNRide.git
git branch -M main
git push -u origin main
```

## Verify Setup
After pushing, you can verify with:
```bash
git remote -v
```

This should show your GitHub repository URL for both fetch and push operations.