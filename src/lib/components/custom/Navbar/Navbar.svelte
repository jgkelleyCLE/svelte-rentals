<script>
	import SvelteIcon from '@iconify/svelte';
	import MenuDrawer from './MenuDrawer.svelte';
	import NavLinks from './NavLinks.svelte';
	import CartSheet from '../Cart/CartSheet.svelte';
	import ThemeToggle from '../Misc/ThemeToggle.svelte';
</script>

<div
	class="bg-gray-800/80 p-2 flex items-center justify-between h-16 text-white absolute top-0 left-0 w-full z-20"
>
	<div class="md:hidden">
		<MenuDrawer />
	</div>
	<div class="relative">
		<a href="/" aria-label="Tentlify Home">
			<img
				width="200"
				height="100"
				src="https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/Tenlify_Logo_Thin_Small.png?alt=media&token=59587449-7b7c-439f-a434-5b4059035b11"
				alt="TentlifyLogo"
				class="w-32 md:w-44 h-full"
			/>
			<SvelteIcon
				icon="devicon:svelte"
				class="absolute top-6 right-0 w-5 h-5 md:top-10 md:-right-2 z-20 md:h-8 md:w-8 opacity-75"
			/>
		</a>
	</div>
	<div class="flex items-center gap-2">
		<NavLinks />
		<ThemeToggle />
		<CartSheet />
	</div>
</div>
