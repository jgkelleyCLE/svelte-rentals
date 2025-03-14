<script>
    import { goto } from "$app/navigation";

let { item } = $props();

</script>


<div key={item._id} class="flex flex-col w-full shadow-md shadow-black/20 rounded-md dark:bg-gray-800
    bg-gray-200 relative">
    <a
    href={`/product/${item._id}`}
    data-sveltekit-preload-data="hover"
    >
    <img 
        src={item.image}
        alt={item.product}                                    
        class="rounded-t-md w-full h-[250px] object-cover bg-white cursor-pointer"
        priority={false}
        />
    </a>
        <div class="flex flex-col items-start p-3 gap-1 w-full">
                        <div class="flex items-center gap-2">
                        <h1 class="font-semibold text-md md:text-lg lg:text-xl line-clamp-1">{item.product}</h1> 
                        
                        </div>
                        <h1 class="font-semibold text-gray-400 -mt-1">${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
                        
                        <button class="bg-primary text-secondary p-2 rounded-md hover:bg-primary/70 transition duration-300 w-full font-bold" onclick={()=> goto(`/product/${item._id}`)}>View Product</button>
        </div>
    </div>