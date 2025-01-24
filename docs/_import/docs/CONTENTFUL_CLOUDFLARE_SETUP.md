# Contentful & Cloudflare Pages Setup

This document outlines how to configure Contentful and Cloudflare Pages for automatic deployments when content changes.

## Architecture Overview

- Next.js static site generation (SSG) builds complete pages at build time
- Contentful webhook triggers new Cloudflare Pages builds when content changes
- Cloudflare Pages deploys the new build automatically

## Contentful Configuration

1. **Environment Variables**
   Create these in Contentful (Settings > API Keys):
   - Space ID
   - Content Delivery API - access token
   - Content Preview API - access token (if using preview features)

https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/1e8fe880-043b-427b-abd6-2549ef441a87

1. **Webhook Setup**
   In Contentful (Settings > Webhooks):
   1. Click "Add Webhook"
   2. Name it "Trigger Cloudflare Build"
   3. Set the URL to your Cloudflare Pages Deploy Hook URL
   4. Under "Triggers", select:
      - Entry
        - [x] Publish
        - [x] Unpublish
      - Asset
        - [x] Publish
        - [x] Unpublish
   5. Save the webhook

## Cloudflare Pages Configuration

1. **Repository Setup**
   - Connect your GitHub repository to Cloudflare Pages
   - Set build command: `npm run build`
   - Set build output directory: `out`
   - Set Node.js version: 18.x (or your project's version)

2. **Environment Variables**
   Add these in Cloudflare Pages (Settings > Environment variables):
   ```
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ACCESS_TOKEN=your_access_token
   CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
   ```

3. **Deploy Hook**
   1. Go to Cloudflare Pages project settings
   2. Find "Deployments" > "Deploy Hooks"
   3. Create a new Deploy Hook
   4. Copy the generated URL
   5. Use this URL in your Contentful webhook configuration

## Build Process

1. When content is published/unpublished in Contentful:
   - Webhook triggers Cloudflare Pages build
   - Cloudflare Pages pulls latest code
   - Next.js builds static pages with latest content
   - New build is deployed automatically

2. Build Output:
   - Static HTML for all pages
   - No server-side rendering
   - No incremental static regeneration (ISR)

## Testing the Setup

1. **Test Webhook**:
   - Make a small content change in Contentful
   - Publish the change
   - Check Cloudflare Pages for new deployment
   - Verify change appears on site after deployment

2. **Verify Build**:
   - Check Cloudflare Pages build logs
   - Ensure all pages are generated
   - Confirm no runtime errors

## Troubleshooting

1. **Build Failures**:
   - Check Cloudflare Pages build logs
   - Verify environment variables
   - Ensure Contentful API is accessible

2. **Content Not Updating**:
   - Confirm webhook is triggering (Contentful webhook details page)
   - Check if Cloudflare Pages build was triggered
   - Verify build completed successfully

3. **Common Issues**:
   - Missing environment variables
   - Incorrect build output directory
   - Node.js version mismatch
   - Memory/timeout issues during build

## Performance Considerations

- Each content change triggers a full site rebuild
- Build time increases with content volume
- Consider batching content updates
- Use Cloudflare's cache effectively

## Security Notes

- Keep Deploy Hook URL secure
- Rotate Contentful access tokens periodically
- Use environment variables for all sensitive data
- Never commit tokens to repository
