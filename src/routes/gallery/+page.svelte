<script>
	import GalleryLinks from '$lib/components/custom/Gallery/GalleryLinks.svelte';

	const title = 'Gallery | Svelte Rentals';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="mt-20 mx-8 w-11/12">
	<h1 class="text-3xl">Gallery</h1>
	<GalleryLinks />
</div>
