<script setup>
import { mobileMenu, menuContent } from "~/composables/navMenu";

const menu = mobileMenu();
const { layanan, tentang, koleksi } = menuContent();

const viewTentang = () => {
  menu.isTentangOpen = !menu.isTentangOpen;
  menu.isLayananOpen = false;
};

const viewLayanan = () => {
  menu.isLayananOpen = !menu.isLayananOpen;
  menu.isTentangOpen = false;
};
</script>

<template>
  <section class="layer" v-if="menu.menuState">
    <div class="mt-15 text-right px-10 font-600 cursor-pointer">
      <span @click="menu.menuState = false">&#10006;</span>
    </div>
    <div class="menu-wrapper">
      <div class="flex flex-col pb-2 pl-10">
        <NuxtLink to="/" class="menu-list hover-menu">Beranda</NuxtLink>
        <p class="menu-list hover-menu" @click="viewTentang">
          Tentang
          <span v-if="menu.isTentangOpen"> &#8628;</span>
          <span v-else> &#8594;</span>
        </p>
        <div
          v-show="menu.isTentangOpen"
          class="pl-2 text-sm"
          v-for="list in tentang"
        >
          <NuxtLink :to="list.url" class="hover-menu">{{ list.name }}</NuxtLink>
        </div>
        <p class="menu-list" @click="viewLayanan">
          Layanan
          <span v-if="menu.isLayananOpen"> &#8628;</span>
          <span v-else> &#8594;</span>
        </p>
        <div
          v-show="menu.isLayananOpen"
          class="pl-2 text-sm"
          v-for="list in layanan"
        >
          <NuxtLink :to="list.url" class="hover-menu">{{ list.name }}</NuxtLink>
        </div>
        <div
          v-show="menu.isLayananOpen"
          class="pl-2 text-sm"
          v-for="list in layanan"
        >
          <NuxtLink :to="list.url" class="hover-menu">{{ list.name }}</NuxtLink>
        </div>
        <NuxtLink class="menu-list hover-menu">Berita</NuxtLink>
        <NuxtLink class="menu-list hover-menu">Kontak</NuxtLink>
      </div>
      <div class="flex min-w-full flex-row items-center justify-center gap-2">
        <NuxtLink to="keanggotaan">
          <button class="btn bg-orange w-full text-white">Keanggotaan</button>
        </NuxtLink>
        <NuxtLink to="keanggotaan">
          <button class="btn bg-orange w-full text-white">Register</button>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.layer {
  --at-apply: fixed mt--15 h-full w-full bg-white transition-all-500 z-2;
}
.menu-wrapper {
  --at-apply: min-h-full w-full flex flex-col mt--35 justify-center;
}
.menu-list {
  --at-apply: text-lg py-1 cursor-pointer;
}
.hover-menu {
  --at-apply: transition-all-500 hover:(text-orange underline);
}
</style>
