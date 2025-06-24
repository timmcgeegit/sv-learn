import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		tailwindcss(), 
		sveltekit(), 
		devtoolsJson(),
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
