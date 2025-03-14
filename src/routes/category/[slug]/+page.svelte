<script>
    import { navigating } from '$app/stores';
	import ProductCard from '$lib/components/custom/Products/ProductCard.svelte';
    let { data } = $props();
    console.log(data)

    let isLoading = $state(true)

    const title = `${data.slug} | Svelte Rentals`
</script>
<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="mt-20 mx-auto w-11/12 max-w-[1800px]">
    <h1 class="text-3xl">{data.slug}</h1>

    <!-- PRODUCT GRID -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 p-4">
        {#each data.products as item}
            <ProductCard item={item} />
        {/each}
    </div>

</div>