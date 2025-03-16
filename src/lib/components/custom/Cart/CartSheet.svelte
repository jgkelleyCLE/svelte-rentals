<script>

import * as Sheet from "$lib/components/ui/sheet";
import CartIcon from '@iconify/svelte'
import { cart, cartActions } from '$lib/stores/cartStore'
import { onMount } from 'svelte';
	import { goto } from "$app/navigation";
	import { derived } from "svelte/store";
import RemoveIcon from '@iconify/svelte'
	import { toast } from "svelte-sonner";

  let open = $state(false)
    
    const cartItems = derived(cart, $cart => $cart.cartList);
    const subtotal = derived(cartItems, $items => 
    $items.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0)
  );

    

    const navigationHandler = (item) => {
      open = false
      goto(`/product/${item._id}`);
    }

    const removeHandler = (item) => {
      cartActions.removeFromCart(item);
      toast.success(`${item.product} removed from cart`);
    }

   

</script>



<Sheet.Root bind:open={open}>
    <Sheet.Trigger>
        <CartIcon icon="mdi:cart" class="w-8 h-8 text-white relative mr-3" />
        <span class="absolute top-1 right-3 bg-red-500 text-white rounded-full text-xs p-1 w-5 h-5 flex items-center justify-center">{$cartItems.length}</span>
    </Sheet.Trigger>
    <Sheet.Content side="right" class="flex flex-col max-h-screen overflow-hidden" >
      <Sheet.Header>
        <Sheet.Title class="text-2xl">Cart</Sheet.Title>
        <Sheet.Description></Sheet.Description>

        <div 
        class="flex-grow overflow-y-scroll py-2 pt-6 md:pt-1 mt-6 h-[500px] md:h-[800px] max-h-[100%] pb-4 scrollable-content">
        {#if $cartItems.length === 0}
        <div class="flex flex-col items-center justify-center gap-2 h-[50vh]">
          <h1 class="text-2xl">Cart is empty</h1>
          <button arai-label="View Products Page" href="/product" class="bg-safariOrange hover:bg-safariOrangeHover p-2 px-6 rounded-md text-white transition duration-300 font-bold mt-8" onclick={()=> {
            open = false;
            goto('/product');
          }} >View Products</button>
        </div>
        {:else}
        
        <!-- <div class="h-[800px] flex flex-col items-center gap-2 w-full overflow-y-scroll"> -->
        {#each $cartItems as item}
        <div class="md:flex relative md:my-1 -my-5 w-full">
        <a href={`/product/${item._id}`} key={item.id} class="bg-gray-200 dark:bg-gray-800 dark:text-gray-200 p-2 rounded-md flex items-center justify-start cursor-pointer hover:bg-gray-100 transition duration-300 w-full" 
        onclick={(e) => {
          e.preventDefault();
          open = false;
          setTimeout(() => window.location.href = `/product/${item._id}`, 20);
        }}
        >
          <img width={100} height={100} src={item.image} alt={item.product} class="w-16 md:w-20 rounded-md m-2 mr-4" />
          <div class="flex flex-col">
              <h1 class="text-lg font-bold">{item.product}</h1>
              <h1 class="text-sm">${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
              <h1 class="text-sm">Qty: {item.cartQuantity}</h1>
          </div>
          
      </a>
      <button aria-label="Open Cart" onclick={(e) => {
        e.stopPropagation(); // Prevent event from bubbling up to the parent div
        removeHandler(item);
      }}><RemoveIcon icon="streamline:delete-1" class=" absolute top-0 right-0 z-40 hover:text-white transition duration-300 bg-white rounded-full w-6 h-6 p-1 text-red-500 hover:bg-red-500" />
          </button>
    </div>
        {/each}
        {/if}
      </div>
      </Sheet.Header>
      {#if $cartItems.length > 0}
      <Sheet.Footer>
        <div class="absolute bottom-0 right-0 w-full p-4 bg-background flex flex-col items-end">
          
          <h1 class="text-2xl ">Subtotal: ${$subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
          <button aria-label="View Quote" class="bg-safariOrange text-white p-2 rounded-md mt-2 px-4" onclick={() => {
            open = false;
            goto('/cart');
          }}>View Quote</button>
        </div>
      </Sheet.Footer>
      {/if}
    </Sheet.Content>
  </Sheet.Root>


<style>
  /* Hide scrollbar but maintain functionality */
  .scrollable-content {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }
  
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollable-content::-webkit-scrollbar {
    display: none;
  }
</style>