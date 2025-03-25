<script>
	import { createMutation } from '@tanstack/svelte-query';
	import { createSearch } from '$lib/api/searchApi';
	import { onMount } from 'svelte';
	import ProductCard from '$lib/components/custom/Products/ProductCard.svelte';

	let { data } = $props();

	let hasRecordedSearch = $state(false);

	const searchMutation = createMutation({
		mutationFn: (searchData) => createSearch(searchData),
		onSuccess: (data) => {},
		onError: (error) => {
			console.error('Error creating search record:', error);
		}
	});

	// Record search when products are loaded
	onMount(() => {
		if (data.query) {
			// Extract product IDs
			const resultIds = data.products.map((product) => product._id);

			// Create search record payload
			const searchData = {
				term: data.query,
				resultsCount: data.products.length,
				resultIds: resultIds
			};

			// Execute the mutation only once
			$searchMutation.mutate(searchData);
		}
	});

	$inspect(data.query);
</script>

<!-- PAGE CONTAINER -->
<div class="mt-20 w-full">
	<h1 class="text-xl md:text-2xl text-center">Search results for "{data.query}"</h1>
	<div class="flex flex-col items-center w-11/12 mx-auto">
		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 p-4"
		>
			{#each data.products as item}
				<ProductCard {item} />
			{/each}
		</div>
	</div>
</div>
