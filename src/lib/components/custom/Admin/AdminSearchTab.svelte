<script>
	import { createQuery } from "@tanstack/svelte-query";
	import PopularSearches from "../Search/PopularSearches.svelte";
	import RecentSearches from "../Search/RecentSearches.svelte";
	import SearchChart from "../Search/SearchChart.svelte";
	import { browser } from "$app/environment";

    let { searches } = $props();
    
    

</script>

<div class="p-2 w-full flex flex-col h-[100%]">
    <!-- CHART CONTAINER -->
    <div class="w=full ">
        <h1 class="text-2xl font-bold text-gray-700 dark:text-gray-400">Most Popular Searches</h1>
        <SearchChart searches={searches} />
    </div>

    <!-- FLEX CONTAINER FOR SEARCH STATS -->
    <div class="flex flex-col md:flex-row items-center gap-2 h-1/2 mt-2">
        <RecentSearches searches={searches}  />
        <PopularSearches searches={searches} />
    </div>
</div>
