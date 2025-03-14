<script>
    import { cart, cartActions } from '$lib/stores/cartStore'
	import { onMount } from 'svelte';
	import { derived } from 'svelte/store';
    import PlusIcon from '@iconify/svelte'
    import MinusIcon from '@iconify/svelte'
    import RemoveIcon from '@iconify/svelte'
	import EmailModal from '$lib/components/custom/Cart/EmailModal.svelte';
	import { toast } from 'svelte-sonner';

    const cartItems = derived(cart, $cart => $cart.cartList)
    const subtotal = derived(cartItems, $items => 
    $items.reduce((acc, item) => acc + (item.price * item.cartQuantity), 0))

    const taxPrice = derived(subtotal, $subtotal => $subtotal * 0.07)
    const deliveryFee = 85.00
    
    const total = derived(([subtotal, taxPrice]), ([$subtotal, $taxPrice]) => $subtotal + $taxPrice + deliveryFee)
    

    const increaseQuantity = (item) => {
        cartActions.increaseQuantity(item)
    }

    const decreaseQuantity = (item) => {
        cartActions.decreaseQuantity(item)
    }

    const removeHandler = (item) => {
        cartActions.removeFromCart(item)
        toast.success(`${item.product} removed from cart`)
    }

    const title = `Cart (${$cartItems?.length}) | Svelte Rentals`

</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="mt-20 mx-8">
    <!-- EMPTY CART -->
    {#if $cartItems.length === 0}
    <div class="flex flex-col items-center justify-center gap-2 h-[50vh]">
        <h1 class="text-2xl">Cart is empty</h1>
        <a href="/product" class="bg-safariOrange hover:bg-safariOrangeHover p-2 px-6 rounded-md text-white transition duration-300font-boldmt-8" >View Products</a>
    </div>
        {:else}
    
    <h1 class="text-2xl">Cart</h1>
   
    <div class="flex flex-col md:flex-row md:items-start items-center w-11/12 max-w-[1600px]">

        <!-- LEFT SIDE -->
        <div class="w-[95%] md:w-[65%] mx-4">
            {#each $cartItems as item}
            <div class="flex items-center justify-between p-2 shadow-md shadow-black/20 dark:bg-gray-800 bg-gray-100 w-full rounded-md my-2 relative">
                <div class="flex items-start ">
                    <img width={100} height={50} class="w-32 object-fit rounded-md cursor-pointer mr-2" src={item.image} alt={item.product} onClick={()=> router.push(`/product/${item._id}`)} />
  
                    <div class="flex flex-col items-start">
                      <h1 class="text-xl font-bold cursor-pointer" onClick={()=> router.push(`/product/${item._id}`)}>{item.product}</h1>
                      <h1 class="text-lg font-semibold text-gray-600 dark:text-gray-400">${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
                      <div class="flex items-center gap-2">
                      <button onclick={()=> decreaseQuantity(item)}><MinusIcon icon="mynaui:minus" /></button>
                      <h1 class="w-[50px] border-2 border-gray-400 px-2 rounded-md">{item.cartQuantity}</h1>
                      
                      <button onclick={()=> increaseQuantity(item)}><PlusIcon icon="mynaui:plus" /></button>
                      
                    </div>
                    
                    </div>
                    
                </div>
                <button onclick={(e) => {
                        e.stopPropagation(); // Prevent event from bubbling up to the parent div
                        removeHandler(item);
                      }}><RemoveIcon icon="streamline:delete-1" class=" absolute -top-1 -right-1 z-40 hover:text-white transition duration-300 dark:bg-white bg-red-500 rounded-full w-6 h-6 p-1 dark:text-red-500 text-white dark:hover:bg-red-500 hover:bg-red-500 dark:hover:text-white" />
                          </button>
                
            </div>
            {/each}
            <div class="flex justify-end">
                <button class="bg-safariOrange hover:bg-safariOrangeHover p-2 px-6 rounded-md text-white transition duration-300 font-bold mt-2 mb-2" onclick={()=> cartActions.clearCart()}>Clear Cart</button>
            </div>

        </div>
            


        <!-- RIGHT SIDE -->

        <div class="w-[95%] md:w-[30%] flex flex-col items-start gap-1 p-3 shadow-md shadow-black/20 md:mr-4 rounded-md bg-gray-200 dark:bg-gray-600">
            <h1>Subtotal: ${$subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
            <h1>Estimated Delivery: ${deliveryFee}</h1>
            <h1>Tax: ${$taxPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
            
            <h1 class="font-bold">Total: ${$total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </h1>
            
            
            <EmailModal subtotal={subtotal} deliveryFee={deliveryFee} taxPrice={taxPrice} total={total} />
            
            
            </div>

    </div>

    {/if}
</div>