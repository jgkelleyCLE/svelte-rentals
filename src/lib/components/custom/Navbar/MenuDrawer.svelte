<script>

import * as Sheet from "$lib/components/ui/sheet";
import { goto } from "$app/navigation";
import MenuIcon from '@iconify/svelte';
import SvelteIcon from '@iconify/svelte'

let open = $state(false)


const mobileMenuLinks = [
        {
            id: 1,
            title: 'Tents',
            image: "https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/7B487F91B0923473A0EC997E5C904F1F.jpg?alt=media&token=3f343ef4-d389-46ea-9b63-6623589502d5"
        },
        {
            id: 2,
            title: "Tables",
            image: "https://d2j6dbq0eux0bg.cloudfront.net/images/648178/1143315935.jpg"
        },
        {
            id: 3,
            title: "Chairs",
            image: "https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/IMG_0059.jpg?alt=media&token=91cb8946-1828-4f36-9775-dc5d49574d4a"
        }
      ]


      const navigationHandler = (item) => {
          open = false
          goto(`/category/${item.title}`)
        
      }
     

</script>


<Sheet.Root bind:open={open}>
    <Sheet.Trigger aria-label="Open navigation menu" aria-expanded={open}>
        <MenuIcon icon="mdi:menu" class="w-8 h-8 text-white md:hidden" />
    </Sheet.Trigger>
    <Sheet.Content side="left" class="bg-gray-200 dark:bg-background">
      <Sheet.Header>
        <Sheet.Title></Sheet.Title>
        <Sheet.Description class="hidden">
        </Sheet.Description>
        <div class="flex items-center justify-center relative">
            <button onclick={()=> {
                goto('/')
                open = false
            }}><img src="https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/Tenlify_Logo_Thin_Small.png?alt=media&token=59587449-7b7c-439f-a434-5b4059035b11" alt="Tentlify Logo" class="w-[150px]" /></button>
            <SvelteIcon icon="devicon:svelte" class="absolute top-8 right-16 w-5 h-5 z-20 opacity-75" />
        </div>

        <!-- SCROLL AREA -->
        <div class="h-[500px] w-full overflow-y-scroll">
        {#each mobileMenuLinks as item}
        <button aria-label={`Navigate to ${item.title}`} key={item.id} class="relative w-full" onclick={()=> navigationHandler(item)}>
            <div class="bg-black/40 inset-0 rounded-md absolute z-20 top-0 left-0 w-full"></div>
            <img alt={item.title} src={item.image} priority class="w-full h-[100px] object-cover z-10 rounded-md" />
            <h1 class="text-white text-2xl font-bold absolute left-2 bottom-0 z-30">{item.title}</h1>
        </button>
        
        {/each}

        <!-- LOCATION BUTTON -->
        <button aria-label="Navigate to Location Page" class="relative w-full" onclick={()=> {
            goto('/location')
            open = false
        }}>
  <div class="bg-black/30 inset-0 rounded-md absolute z-20 top-0 left-0 w-full"></div>
<img alt="Location" src="https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/Screenshot%202024-09-18%20at%205.35.50%E2%80%AFPM.png?alt=media&token=fa1d7420-d9e9-4189-9597-015c43fc5159" class="w-full h-[100px] object-cover z-10 rounded-md" />
<h1 class="text-white text-2xl font-bold absolute left-2 bottom-0 z-30">Location</h1>
</button>

<!-- GALLERY BUTTON -->
        <button aria-label="Navigate to Gallery Page" class="relative w-full" onclick={()=> {
            goto('/gallery')
            open = false
        }}>
  <div class="bg-black/30 inset-0 rounded-md absolute z-20 top-0 left-0 w-full"></div>
<img alt="Location" src="https://firebasestorage.googleapis.com/v0/b/mern-ecommerce-f07b1.appspot.com/o/View%20recent%20photos.jpg?alt=media&token=ad5e25d9-63f9-43fb-8539-4c2a92004bd0" class="w-full h-[100px] object-cover z-10 rounded-md" />
<h1 class="text-white text-2xl font-bold absolute left-2 bottom-0 z-30">Gallery</h1>
</button>
</div>

      </Sheet.Header>
    </Sheet.Content>
  </Sheet.Root>