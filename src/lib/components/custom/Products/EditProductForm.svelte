<script>
	import { editProduct } from '$lib/api/productsApi';
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	import { toast } from 'svelte-sonner';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const queryClient = useQueryClient();

	let { item, open } = $props();
	console.log('OPEN: ', open);

	let formData = $state({
		title: item.product || '',
		price: item.price || '',
		status: item.status || '',
		category: item.category || '',
		tags: item.tags || ''
	});

	const updateProduct = createMutation({
		mutationKey: ['product', item._id],
		mutationFn: async () => {
			const response = await fetch(
				`https://tentlify-ecom.up.railway.app/api/products/tags/${item._id}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ tags: formData.tags })
				}
			);
			const data = await response.json();
			return data;
		},
		onSuccess: () => {
			console.log('Product updated successfully');

			queryClient.invalidateQueries({ queryKey: ['products'] });

			// Update the specific product in the cache to avoid a full refetch
			queryClient.setQueryData(['product', item._id], (oldData) => {
				return { ...oldData, tags: formData.tags };
			});
			dispatch('close');
			// open = false
			toast.success('Product updated successfully');
		}
	});

	const submitHandler = (e) => {
		e.preventDefault();
		console.log('Form submitted');
		$updateProduct.mutate(formData.tags);
	};
</script>

<form class="flex flex-col gap-2" onsubmit={submitHandler}>
	<input
		disabled
		bind:value={formData.title}
		class="p-2 rounded-md w-full disabled:cursor-not-allowed border border-gray-500"
	/>
	<input
		disabled
		bind:value={formData.price}
		class="p-2 rounded-md w-full disabled:cursor-not-allowed border border-gray-500"
	/>
	<input
		disabled
		bind:value={formData.status}
		class="p-2 rounded-md w-full disabled:cursor-not-allowed border border-gray-500"
	/>
	<input
		disabled
		bind:value={formData.category}
		class="p-2 rounded-md w-full disabled:cursor-not-allowed border border-gray-500"
	/>
	<textarea
		rows="3"
		bind:value={formData.tags}
		class="p-2 rounded-md w-full border border-green-300"
	></textarea>
	<button class="bg-safariOrange hover:bg-safariOrangeHover p-2 rounded-md transition duration-300"
		>{$updateProduct.isPending ? 'Updating...' : 'Update'}</button
	>
</form>
