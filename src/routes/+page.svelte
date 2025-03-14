<script>
	import Searchbar from "$lib/components/custom/Home/Searchbar.svelte";
	import Button from "$lib/components/ui/button/button.svelte";

	const homeImages = [
		"https://firebasestorage.googleapis.com/v0/b/collab-checklist.appspot.com/o/FlatsCoverWebP.webp?alt=media&token=27e98ee5-049a-44e5-8f37-151c3f1f2619",
    	"https://firebasestorage.googleapis.com/v0/b/collab-checklist.appspot.com/o/EdgewaterCoverWebP.webp?alt=media&token=88867055-ee83-497a-b8b7-29f907b464a2",
    	"https://firebasestorage.googleapis.com/v0/b/collab-checklist.appspot.com/o/KSUCoverWebP.webp?alt=media&token=c08f29e7-04e2-4a11-8695-e547ed92c834"
	]

	const rotatingWords = [
		"Corporate Event",
		"Wedding",
		"Church Picnic",
		"Graduation"
	]

	let currentWordIndex = $state(0)
	let currentImageIndex = $state(0)
	let fade = $state(true)

	let wordInterval;
    let imageInterval;
    let fadeOutInterval;
    let fadeInInterval;

	$effect(() => {
        // Set up intervals when component mounts
        wordInterval = setInterval(() => {
            currentWordIndex = (currentWordIndex + 1) % rotatingWords.length;
        }, 3000);

        imageInterval = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % homeImages.length;
        }, 5000);

        fadeOutInterval = setInterval(() => {
            fade = false;
        }, 5000);

        fadeInInterval = setInterval(() => {
            fade = true;
        }, 6000);

        // Clean up intervals when component is destroyed
        return () => {
            clearInterval(wordInterval);
            clearInterval(imageInterval);
            clearInterval(fadeOutInterval);
            clearInterval(fadeInInterval);
        };
    });

	const title = "Svelte Rentals"
	const metaDescription = "Find everything you need for your event. We offer rental equipment for corporate events, weddings, church picnics, graduations and more. Simply the best Cleveland tent, table, and chair rental!"


</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={metaDescription} />
</svelte:head>
	

<!-- PAGE CONTAINER -->
<div class="flex items-center justify-center w-full h-[100vh] relative">
	
	<img 
	width="1200" 
	height="800" 
	src={homeImages[currentImageIndex]} 
	alt="Home Images" 
	class="w-full h-[100vh] object-cover absolute top-0 left-0 select-none pointer-events-none z-10" />

	<!-- IMAGE OVERLAY -->
	<div class="absolute top-0 left-0 w-full h-[100vh] bg-black/55 z-10">


	<!-- ROTATING WORDS CONTAINER -->
	<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10 w-[100%]">
		<div class="flex flex-col items-center mx-4">
		<h1 class="text-white md:text-6xl text-4xl my-5 font-thin ">Everything for your</h1>
		
		<h1 class={`text-white md:text-5xl text-3xl uppercase font-bold mb-5 ${fade ? 'fade-in' : 'fade-out'}`}>
					{rotatingWords[currentWordIndex]}
			</h1>
	</div>

	<Searchbar />
		
		</div>

</div>

</div>