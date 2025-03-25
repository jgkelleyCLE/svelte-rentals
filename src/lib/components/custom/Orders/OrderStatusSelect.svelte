<script>
	import { updateOrderStatus } from '$lib/api/ordersApi';
	import { createMutation } from '@tanstack/svelte-query';
	import { toast } from 'svelte-sonner';

	let { item } = $props();

	const statuses = ['Quote', 'Reservation', 'Delivered', 'Closed', 'Cancelled'];

	const mutation = createMutation({
		mutationFn: (status) => updateOrderStatus(item._id, status),
		onSuccess: () => {
			toast.success(`Status updated successfully`);
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
