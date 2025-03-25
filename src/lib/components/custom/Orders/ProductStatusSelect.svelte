<script>
	import { updateProductStatus } from '$lib/api/productsApi';

	let { item } = $props();
	import { createMutation, useQueryClient } from '@tanstack/svelte-query';
	import { toast } from 'svelte-sonner';

	const statuses = ['Active', 'Inactive'];

	const queryClient = useQueryClient();
	const mutation = createMutation({
		mutationFn: (status) => updateProductStatus(item._id, status),
		onSuccess: () => {
			toast.success(`Status updated successfully`);
			queryClient.invalidateQueries({ queryKey: ['products'] });
		},
		onError: (error) => {
			toast.error('Error updating status');
		}
	});
</script>

<select
	value={item.status}
	onchange={(e) => $mutation.mutate(e.target.value)}
	disabled={$mutation.isPending}
	class="border border-gray-300 rounded-md px-2 py-1"
>
	{#each statuses as status}
		<option key={status} value={status}>
			{status}
		</option>
	{/each}
</select>
