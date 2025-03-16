<script>
    import * as Dialog from "$lib/components/ui/dialog";
	import { createQuery } from "@tanstack/svelte-query";
	import EditProductForm from "./EditProductForm.svelte";

    let { item } = $props()

    

    let open = $state(false)

    const product = createQuery({
        queryKey: ['product'],
    queryFn: async() => {
        const response = await fetch(`https://tentlify-ecom.up.railway.app/api/products/${item._id}`)
        const data = await response.json()
        return data
    }   
 })


</script>

<Dialog.Root bind:open={open}>
    <Dialog.Trigger>
      <h1 class="text-blue-500">Edit</h1>
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Edit {item.product}</Dialog.Title>
        <Dialog.Description></Dialog.Description>

        <EditProductForm item={item} open={open} />
      </Dialog.Header>
    </Dialog.Content>
  </Dialog.Root>