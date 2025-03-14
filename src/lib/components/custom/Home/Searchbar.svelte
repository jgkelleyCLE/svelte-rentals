<script>
  
  import SearchIcon from "@iconify/svelte";

import { goto } from '$app/navigation'
let query = $state('')

const handleSearchSubmit = (e) => {
    e.preventDefault()

    if(query.trim() === ''){
        return
    } else {
        goto(`/search?q=${encodeURIComponent(query)}`);
    }

}

</script>


<div class=" flex items-center justify-center w-[95%] max-w-[600px] ">
    <form class="flex items-center w-full" onsubmit={handleSearchSubmit}>
        <input bind:value={query}  placeholder='Search our products...' class="p-3 rounded-l-md text-gray-700 placeholder-gray-600 text-2xl bg-white/60 outline-none h-12 z-0 w-[95%]" />
        <button type="submit" class="flex items-center gap-2 rounded-r-md bg-white p-4" title="Search"><SearchIcon icon="uil:search" color="black" /></button>
        </form>
    </div>