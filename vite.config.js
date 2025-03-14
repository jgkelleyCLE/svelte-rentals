import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite'

export default defineConfig({
	plugins: [sveltekit(),
		// Icons({
		// 	compiler: 'svelte',
		// 	autoInstall: true,
		//   })
	],
	optimizeDeps: {
        // Tell Vite to process Svelte files in node_modules
        include: ['@tanstack/svelte-query']
    },
	optimizeDeps: {
        // Tell Vite to process Svelte files in node_modules
        include: ['svelte-sonner']
    },
	optimizeDeps: {
        // Tell Vite to process Svelte files in node_modules
        include: ['layerchart']
    },
	optimizeDeps: {
        // Tell Vite to process Svelte files in node_modules
        include: ['d3-array']
    },
	optimizeDeps: {
        // Tell Vite to process Svelte files in node_modules
        include: ['d3-scale']
    },
	optimizeDeps: {
		include: ['svelte-maplibre', 'maplibre-gl'],
		exclude: []
	  },
});
