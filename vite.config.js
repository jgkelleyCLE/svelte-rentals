import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite'

export default defineConfig({
	plugins: [
        sveltekit(),
        enhancedImages(),
	],
    optimizeDeps: {
        // Tell Vite to process Svelte files in node_modules
        include: [
            '@tanstack/svelte-query',
            'svelte-sonner',
            'layerchart',
            'd3-array',
            'd3-scale',
            'svelte-maplibre', 
            'maplibre-gl'
        ],
        exclude: []
    }
});
