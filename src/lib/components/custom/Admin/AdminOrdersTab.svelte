<script>
      import * as Table from "$lib/components/ui/table";
	import { getOrders } from "$lib/api/ordersApi";
	import { onMount } from "svelte";
	import OrderStatusSelect from "../Orders/OrderStatusSelect.svelte";
	

    let orders = $state([])
    let isLoading = $state(true)
    let error = $state(null)

onMount(async()=> {
    try {
        orders = await getOrders()
        
    } catch (error) {
        error = error.message
        console.log("ERROR FETCHING ORDERS", error)
    }finally {
        isLoading = false
    }
})


</script>


<div class="p-2 w-full">
    

    <Table.Root>
        
        <Table.Header>
          <Table.Row>
            <Table.Head>Title</Table.Head>
            <Table.Head class="hidden md:table-cell">Created</Table.Head>
            <Table.Head class="hidden md:table-cell">Event Date</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head class="hidden md:table-cell">Amount</Table.Head>
            <Table.Head>Link</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>

            {#each orders as item}
          <Table.Row key={item._id}>
            <Table.Cell class="font-medium">{item.title}</Table.Cell>
            <Table.Cell class="hidden md:table-cell">{new Date(item.createdAt).toLocaleDateString()}</Table.Cell>
            <Table.Cell class="hidden md:table-cell">{new Date(item.eventDate).toLocaleDateString()}</Table.Cell>
            <Table.Cell><OrderStatusSelect item={item} /></Table.Cell>
            <Table.Cell class="hidden md:table-cell">${item.totalPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Table.Cell>
            <Table.Cell><a href={`/orders/${item._id}`} class="text-blue-500">View</a></Table.Cell>
          </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>

</div>

