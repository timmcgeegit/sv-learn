# PWA Setup Documentation

This document outlines how the Family Game Library was converted into a Progressive Web App (PWA) for offline gameplay on mobile devices.

## Overview

The PWA implementation allows users to:
- Install the app directly from their browser to their home screen
- Play games completely offline once cached
- Receive automatic updates when new versions are available
- Experience native-like app behavior on mobile devices

## Dependencies Added

```bash
pnpm add -D @vite-pwa/sveltekit
```

This plugin provides:
- Automatic service worker generation
- Web app manifest creation
- Workbox integration for caching strategies
- SvelteKit-specific PWA optimizations

## Configuration Changes

### 1. Vite Configuration (`vite.config.ts`)

Added the SvelteKitPWA plugin with the following configuration:

```typescript
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
  plugins: [
    // ... other plugins
    SvelteKitPWA({
      strategies: 'generateSW',
      manifest: {
        short_name: 'Family Games',
        name: 'Family Game Library',
        start_url: '/',
        display: 'standalone',
        theme_color: '#1f2937',
        background_color: '#ffffff',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}']
      },
      devOptions: {
        enabled: true
      }
    })
  ]
});
```

**Key Configuration Options:**
- `strategies: 'generateSW'` - Automatically generates service worker
- `manifest` - Defines app metadata for installation
- `workbox.globPatterns` - Specifies which files to cache for offline use
- `devOptions.enabled: true` - Enables PWA features in development

### 2. HTML Template Updates (`src/app.html`)

Added PWA-specific meta tags:

```html
<meta name="theme-color" content="#1f2937" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="Family Games" />
<link rel="apple-touch-icon" href="%sveltekit.assets%/icon-192x192.png" />
```

**Purpose:**
- `theme-color` - Sets browser UI color on mobile
- Apple-specific meta tags - Ensures proper iOS home screen installation
- `apple-touch-icon` - Icon used when added to iOS home screen

## Assets Created

### PWA Icons

Created two app icons using ImageMagick:

```bash
# 192x192 icon
magick -size 192x192 xc:"#1f2937" -fill white -gravity center -pointsize 72 -annotate 0 "FG" static/icon-192x192.png

# 512x512 icon  
magick -size 512x512 xc:"#1f2937" -fill white -gravity center -pointsize 180 -annotate 0 "FG" static/icon-512x512.png
```

**Icon Requirements:**
- 192x192px - Minimum required size for PWA
- 512x512px - High-resolution icon for splash screens
- PNG format for broad compatibility
- Placed in `static/` directory for public access

## Generated Files

The PWA plugin automatically generates:

1. **Web App Manifest** (`manifest.webmanifest`)
   - Contains app metadata for installation
   - Defines display mode, colors, and icons

2. **Service Worker** (`sw.js`)
   - Handles offline caching
   - Manages app updates
   - Intercepts network requests

3. **Registration Script** (`registerSW.js`)
   - Registers the service worker
   - Handles update notifications

## Caching Strategy

The service worker caches:
- All JavaScript and CSS files
- HTML pages
- Static assets (images, icons)
- App shell for offline functionality

**Cache-First Strategy:**
1. Check cache for requested resource
2. Return cached version if available
3. Fetch from network if not cached
4. Cache successful network responses

## Installation Process

### Desktop Browsers
- Chrome/Edge: "Install app" icon in address bar
- Firefox: "Install" option in page menu

### Mobile Browsers
- **Chrome Android**: "Add to Home Screen" banner or menu option
- **Safari iOS**: Share button → "Add to Home Screen"
- **Firefox Mobile**: "Install" option in menu

## Testing PWA Features

### Build and Preview
```bash
pnpm build
pnpm preview
```

### Verification Checklist
- [ ] App installs from browser
- [ ] Works offline after installation
- [ ] Service worker registers successfully
- [ ] Manifest loads without errors
- [ ] Icons display correctly
- [ ] App updates automatically

### Browser DevTools
1. Open Chrome DevTools
2. Navigate to "Application" tab
3. Check "Service Workers" and "Manifest" sections
4. Use "Offline" checkbox to test offline functionality

## Deployment Considerations

### Production Requirements
- HTTPS is mandatory for PWA features
- All icons must be accessible
- Manifest must be valid JSON
- Service worker must register successfully

### Hosting Platforms
The PWA works with any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting

## Troubleshooting

### Common Issues
1. **Service worker not registering**
   - Check console for errors
   - Ensure HTTPS in production
   - Verify file paths are correct

2. **App not installable**
   - Check manifest validity
   - Ensure required icons exist
   - Verify HTTPS requirement

3. **Offline functionality not working**
   - Check service worker cache strategy
   - Verify glob patterns match your files
   - Test cache in DevTools

### Debug Commands
```bash
# Check build output
pnpm build

# Inspect generated files
ls -la .svelte-kit/output/client/

# Test service worker registration
# (Check browser console for errors)
```

## Future Enhancements

### Potential Improvements
- Push notifications for game updates
- Background sync for game data
- Advanced caching strategies per game
- App shortcuts for quick game access
- Enhanced offline UX with custom offline pages

### Game-Specific PWA Features
- Cache game state locally
- Offline high score storage
- Progressive loading for larger games
- App badges for achievements

## Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [@vite-pwa/sveltekit Plugin](https://vite-pwa-org.netlify.app/frameworks/sveltekit.html)
- [Workbox Caching Strategies](https://developer.chrome.com/docs/workbox/caching-strategies-overview/)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)