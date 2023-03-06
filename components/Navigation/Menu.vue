<script setup>
import { menuContent } from "~/composables/navMenu";
const { tentang, layanan, koleksi } = menuContent();
</script>

<template>
  <ul class="nav-group">
    <NavigationMenuLink menu-title="Tentang" :dropdown-menu="tentang" />
    <NavigationMenuLink menu-title="Layanan" :dropdown-menu="layanan" />
    <NavigationMenuLink menu-title="Koleksi" :dropdown-menu="koleksi" />
    <li>Berita</li>
    <li>Kontak</li>
  </ul>
</template>

<style scoped>
.nav-group {
  --at-apply: flex list-none my-0 mx-8;
}

ul li {
  --at-apply: my-0 px-5 hidden xl:(block);
}
</style>
