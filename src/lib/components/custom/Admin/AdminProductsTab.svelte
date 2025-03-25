<script>
	import { getProducts } from '$lib/api/productsApi';
	import * as Table from '$lib/components/ui/table';
	import { onMount } from 'svelte';
	import ProductStatusSelect from '../Orders/ProductStatusSelect.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import PageSpinner from '../Misc/PageSpinner.svelte';
	import EditProductModal from '../Products/EditProductModal.svelte';

	//FETCH DATA WITH SVELTE QUERY so we can invalidate the query and have the cell go to red without refreshing the page -- queryKey allows this
	const products = createQuery({
		queryKey: ['products'],
		queryFn: getProducts
	});
</script>

<div class="p-2 w-full">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="hidden md:table-cell">Image</Table.Head>
				<Table.Head>Product</Table.Head>
				<Table.Head class="hidden md:table-cell">Category</Table.Head>
				<Table.Head>Status</Table.Head>
				<Table.Head class="hidden md:table-cell">Amount</Table.Head>
				<Table.Head>Edit</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#if $products.isPending}
				<div class="flex justify-center py-8 w-full">
					<div
						class="text-center animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"
					></div>
					<!-- <PageSpinner /> -->
				</div>
			{:else}
				{#each $products.data as item}
					<Table.Row
						key={item._id}
						class={`${item.status === 'Inactive' ? 'bg-red-100 dark:bg-red-950/75' : null} border-2 border-gray-300 relative`}
					>
						<Table.Cell class="hidden md:table-cell"
							><a href={`/product/${item._id}`}
								><img width={75} height={50} src={item.image} alt={item.product} /></a
							></Table.Cell
						>
						<Table.Cell><a href={`/product/${item._id}`}>{item.product}</a></Table.Cell>
						<Table.Cell class="hidden md:table-cell">{item.category}</Table.Cell>
						<Table.Cell>
							<ProductStatusSelect {item} />
						</Table.Cell>
						<Table.Cell textAlign="end" class="hidden md:table-cell">
							${item.price.toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})}
						</Table.Cell>

						<Table.Cell textAlign="end">
							<EditProductModal {item} />
						</Table.Cell>
					</Table.Row>
				{/each}
			{/if}
		</Table.Body>
	</Table.Root>
</div>
