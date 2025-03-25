<script>
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';

	import Navbar from '$lib/components/custom/Navbar/Navbar.svelte';
	import '../app.css';
	let { children } = $props();

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: true
			}
		}
	});
	let title = $state('Svelte Rentals');
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<Navbar />
	<ModeWatcher />
	<Toaster position="top-center" />

	{@render children()}
</QueryClientProvider>
