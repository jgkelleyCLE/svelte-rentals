<script>
	import { goto } from "$app/navigation";
	import { createQuery } from "@tanstack/svelte-query";
	import { onMount } from "svelte";


    let { searches } = $props();


</script>

<div class="p-2 w-full h-full bg-gray-200 dark:bg-gray-700 rounded-md">
    <h1 class="text-2xl font-bold text-gray-700 dark:text-gray-400">10 Most Recent Searches</h1>

    {#each searches.slice(0, 10) as item}
    <a href={`/admin/search-details/${item._id}`} key={item._id} class="flex items-center justify-between gap-2 bg-white dark:bg-gray-800 p-2 rounded-md my-1 cursor-pointer hover:bg-white/60 dark:hover:bg-gray-900 transition duration-300">
        <h1>"{item.term}"</h1>
        <span class="text-gray-400 line-clamp-1 italic text-xs">{new Date(item.createdAt).toLocaleString()}</span>
        <h1>{item.resultsCount} results</h1>
    </a>

    {/each}
    <button onclick={()=> goto('/admin/all-searches')} class="bg-safariOrange dark:bg-safariOrangeHover text-white w-full mt-1 font-bold p-2 rounded-md">View All Searches</button>
</div>