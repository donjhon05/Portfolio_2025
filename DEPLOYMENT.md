# Deployment Guide for Vercel

This guide will help you deploy your portfolio to Vercel.

## Prerequisites

- A GitHub account
- A Vercel account (sign up at [vercel.com](https://vercel.com))

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import Project to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select the `client` folder as the root directory (or configure it in settings)

3. **Configure Build Settings**
   - Framework Preset: Next.js
   - Root Directory: `client` (if not already set)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

4. **Environment Variables** (if needed)
   - Add any environment variables in the Vercel dashboard
   - Currently, no environment variables are required

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live at `your-project-name.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Navigate to client directory**
   ```bash
   cd client
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - For production: `vercel --prod`

## Post-Deployment

1. **Custom Domain** (Optional)
   - Go to your project settings in Vercel
   - Navigate to "Domains"
   - Add your custom domain

2. **Environment Variables** (if needed later)
   - Project Settings → Environment Variables
   - Add any required variables

## Build Configuration

The project uses:
- **Next.js 16** with App Router
- **TypeScript**
- **Tailwind CSS 4**
- **React 19**

All build settings are configured in:
- `next.config.ts` - Next.js configuration
- `vercel.json` - Vercel-specific settings
- `package.json` - Dependencies and scripts

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure Node.js version is 18+ (Vercel uses 18.x by default)
- Check build logs in Vercel dashboard

### Theme Not Working
- Ensure `ThemeProvider` is wrapping the app in `layout.tsx`
- Check browser console for errors

### Images Not Loading
- Verify image paths are correct (starting with `/`)
- Check that images exist in `public` folder

## Continuous Deployment

Vercel automatically deploys when you push to:
- `main` branch → Production
- Other branches → Preview deployments

Each push creates a new preview URL for testing.
