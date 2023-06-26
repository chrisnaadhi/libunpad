<script setup>
import { menuContent } from "~/composables/navMenu";
const { tentang, layanan, koleksi, panduan } = menuContent();
const { locale } = useI18n();
</script>

<template>
  <ul class="nav-group">
    <NavigationMenuLink
      :menu-title="locale === 'en' ? 'About' : 'Tentang'"
      :dropdown-menu="tentang"
    />
    <NavigationMenuLink
      :menu-title="locale === 'en' ? 'Service' : 'Layanan'"
      :dropdown-menu="layanan"
    />
    <NavigationMenuLink
      :menu-title="locale === 'en' ? 'Collection' : 'Koleksi'"
      :dropdown-menu="koleksi"
    />
    <NavigationMenuLink
      :menu-title="locale === 'en' ? 'Guides' : 'Panduan'"
      :dropdown-menu="panduan"
    />
    <li>{{ locale === "en" ? "Contact Us" : "Kontak Kami" }}</li>
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
