<script>
	import { getAllSearches } from "$lib/api/searchApi";
	import { createQuery } from "@tanstack/svelte-query";
	import { onMount } from "svelte";


    let { data } = $props()
    const searches = data.searches

    console.log(searches)
    

</script>

<div class="mt-20 mx-auto w-11/12">
    <h1 class="text-3xl">All Searches</h1>


    {#each searches as item}
        <a href={`/admin/search-details/${item._id}`} key={item._id} class="flex items-center justify-between gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md my-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900 transition duration-300" aria-label="View search details">
            <h1>"{item.term}"</h1>
            <span class="text-gray-400 italic text-xs">{new Date(item.createdAt).toLocaleString()}</span>
            <h1>{item.resultsCount} results</h1>
        </a>
    {/each}

    
</div>