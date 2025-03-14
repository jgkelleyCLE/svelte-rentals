<script>

import { page } from '$app/stores';
const isActive = (path) => {
        
    //keeps products active while in categories
        if (path === '/product') {
            return $page.url.pathname === '/product' || $page.url.pathname.includes('/category');
        }
        
        return $page.url.pathname === path;
    };

</script>

<div class="md:flex items-center gap-3 hidden">
    <a href="/" class={`text-xl ${isActive("/") ? "text-safariOrange" : "text-white"}`}>Home</a>
        <a href="/product" class={`text-xl ${isActive("/product") ? "text-safariOrange" : "text-white"}`}>Products</a>
        <a href="/gallery" class={`text-xl ${isActive("/gallery") ? "text-safariOrange" : "text-white"}`}>Gallery</a>
        <a href="/location" class={`text-xl ${isActive("/location") ? "text-safariOrange" : "text-white"}`}>Location</a>
        <a href="/admin" class={`text-xl ${isActive("/admin") ? "text-safariOrange" : "text-white"}`}>Admin</a>
</div>