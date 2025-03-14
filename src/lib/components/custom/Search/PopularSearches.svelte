<script>
	import { goto } from "$app/navigation";
	import { getAllSearches } from "$lib/api/searchApi";
	import { createQuery } from "@tanstack/svelte-query";


    let { searches } = $props()



const getTopSearchTerms = (searches, limit = 10) => {
        if (!searches || !searches.length) return []

        // Count occurrences of each search term
        const termCounts = searches.reduce((acc, search) => {
            const term = search.term.toLowerCase() 
            acc[term] = (acc[term] || 0) + 1
            return acc
        }, {})

        // Convert to array and sort by count (descending)
        const sortedTerms = Object.entries(termCounts)
            .map(([term, count]) => ({ term, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit)

        return sortedTerms
    }

    const topSearches = getTopSearchTerms(searches, 10)

</script>

<div class="p-2 w-full h-full bg-gray-200 dark:bg-gray-700 rounded-md">
    <h1 class="text-2xl font-bold text-gray-700 dark:text-gray-400">10 Most Popular Searches</h1>

    {#each topSearches as item}
    <div key={item.term} class="flex items-center justify-between gap-2 bg-white dark:bg-gray-800 p-2 rounded-md my-1 hover:bg-white/60 dark:hover:bg-gray-900 transition duration-300">
        <h1>"{item.term}"</h1>
        <span class="text-gray-400 italic text-xs">{item.count} searches</span>
    </div>

    {/each}
    <button onclick={()=> goto('/admin/all-searches')} class="bg-safariOrange dark:bg-safariOrangeHover text-white w-full mt-1 font-bold p-2 rounded-md">View All Searches</button>
</div>