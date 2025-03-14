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
    <Sheet.Content side="right" >
      <Sheet.Header>
        <Sheet.Title class="text-2xl">Cart</Sheet.Title>
        <Sheet.Description></Sheet.Description>
        {#if $cartItems.length === 0}
        <div class="flex flex-col items-center justify-center gap-2 h-[50vh]">
            <h1 class="text-2xl">Cart is empty</h1>
            <a href="/product" class="bg-safariOrange hover:bg-safariOrangeHover p-2 px-6 rounded-md text-white transition duration-300 font-bold mt-8" >View Products</a>
        </div>
        {:else}
        
        {#each $cartItems as item}
        <div class="md:flex relative -my-6 w-full">
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