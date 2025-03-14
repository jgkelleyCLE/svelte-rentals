<script>

  let { data } = $props()
  const searches = data.searches

	import AdminOrdersTab from "$lib/components/custom/Admin/AdminOrdersTab.svelte";
	import AdminProductsTab from "$lib/components/custom/Admin/AdminProductsTab.svelte";
	import AdminSearchTab from "$lib/components/custom/Admin/AdminSearchTab.svelte";
    import * as Tabs from "$lib/components/ui/tabs";
    import OrdersIcon from '@iconify/svelte'
    import SearchIcon from '@iconify/svelte'
    import ProductsIcon from '@iconify/svelte'

    const title = "Admin | Svelte Rentals"
    
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<div class="mt-20 mx-auto w-11/12">
    <h1 class="text-3xl">Admin</h1>

    <Tabs.Root value="orders" class="w-full">
        <Tabs.List class="w-full bg-safariOrange p-2 h-12">
          <Tabs.Trigger class="w-full h-10" value="orders">
            <OrdersIcon icon="lets-icons:order" class="w-5 h-5 text-primary" />
            <h1 class=" text-lg text-primary ml-1">Orders</h1>
        </Tabs.Trigger>
          <Tabs.Trigger class="w-full h-10" value="products">
            <ProductsIcon icon="fa-solid:box-open" class="w-5 h-5 text-primary" />
            <h1 class=" text-lg text-primary ml-1">Products</h1>
        </Tabs.Trigger>
          <Tabs.Trigger class="w-full h-10" value="search">
            <SearchIcon icon="bx:bx-search" class="w-5 h-5 text-primary" />
            <h1 class=" text-lg text-primary ml-1">Search</h1>
        </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="orders">
          <AdminOrdersTab />
        </Tabs.Content>
        <Tabs.Content value="products">
            <AdminProductsTab />
        </Tabs.Content>
        <Tabs.Content value="search">
            <AdminSearchTab searches={searches} />
        </Tabs.Content>
      </Tabs.Root>
</div>