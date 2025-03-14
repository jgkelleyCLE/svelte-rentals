<script>
	import OrderStatusSelect from '$lib/components/custom/Orders/OrderStatusSelect.svelte';

    let { data } = $props()
    let order = data

    
    const title = `${order.title} Details | Svelte Rentals`

</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="mt-20 mx-auto w-11/12 max-w-[1800px]">
    
    <h1 class="text-2xl ml-8">{order?.title} Order Details</h1>
            <div class="flex flex-col items-start ml-8">
                <p class="text-sm italic text-gray-500">Order ID: {order?._id}</p>
                <p class="text-sm italic text-gray-500">Order Date: {new Date(order?.createdAt).toLocaleString()}</p>
                <p class="text-sm italic text-gray-500">Event Date: {new Date(order?.eventDate).toLocaleDateString()}</p>

                <OrderStatusSelect item={order} />
            </div>

            {#each order?.orderItems as item}
            <div key={item._id} class="flex flex-row items-center justify-between border-b border-gray-200 p-4 w-11/12 mx-auto">
                <div class="flex flex-row items-center">
                    <img width={300} height={200} src={item.image} alt={item.product} class="w-20 h-20 object-contain" />
                    <div class="ml-4">
                        <p class="text-md md:text-xl font-bold">{item.product}</p>
                        <p class="text-sm italic">Qty: {item.cartQuantity}</p>
                    </div>
                </div>
                <p class="text-md md:text-xl font-bold">${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>
            {/each}
</div>