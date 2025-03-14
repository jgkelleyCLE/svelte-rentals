<script>
import { MapLibre } from 'svelte-maplibre';
import Marker from 'svelte-maplibre/Marker.svelte';


const title = "Location | Svelte Rentals"
</script>
<svelte:head>
    <title>{title}</title>
   
</svelte:head>

<div class="h-screen w-full">
    <MapLibre 
  center={[-81.528010,41.427060]}
  zoom={7}
  class="w-full h-full"
  standardControls
  style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json">
    <Marker lngLat={[-81.693517,41.499496]}><img src="https://firebasestorage.googleapis.com/v0/b/collab-checklist.appspot.com/o/media%2FFaviconDiviMap.png?alt=media&token=1bd25b4d-6df9-4f32-a951-ee989c365bbe" alt="giraffe" class="w-16 animate-bounce opacity-75" /></Marker>
</MapLibre>
</div>
