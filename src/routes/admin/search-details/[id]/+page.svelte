<script>

    let { data } = $props()
    // console.log(data)
    let searchTerm = data
    console.log("SEARCH TERM: ", searchTerm)

const title = 'Search Details | Svelte Rentals'
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="mt-20 mx-auto w-11/12">
    <h1 class="text-3xl">Search Details for "{searchTerm.term}"</h1>
    <p>Results: {searchTerm.resultsCount}</p>
    {#each searchTerm.resultIds as item}
    <div key={item._id} class="flex flex-row items-center justify-between border-b border-gray-200 p-4 w-11/12 mx-auto">
        <div class="flex flex-row items-center">
            <img width={300} height={200} src={item.image} alt={item.product} class="w-20 h-20 object-contain rounded-md" />
            <div class="ml-4">
                <p class="text-md md:text-xl font-bold">{item.product}</p>
            </div>
        </div>
        <p class="text-md md:text-xl font-bold">${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
    </div>
    {/each}
</div>