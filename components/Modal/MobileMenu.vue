<script setup>
import { mobileMenu } from "~/composables/navMenu";

const menu = mobileMenu();
const isTentangOpen = ref(false);
const isLayananOpen = ref(false);

const viewTentang = () => {
  isTentangOpen.value = !isTentangOpen.value;
  isLayananOpen.value = false;
};

const viewLayanan = () => {};
</script>

<template>
  <Teleport to="#main-content">
    <section class="layer" v-if="menu.menuState">
      <div class="mt-15 text-right px-10 font-600 cursor-pointer">
        <span @click="menu.menuState = false">&#10006;</span>
      </div>
      <div class="menu-wrapper">
        <div class="pb-2 pl-10">
          <NuxtLink to="/" class="menu-list">Beranda</NuxtLink>
          <p class="menu-list">
            Tentang
            <span v-if="true"> &#707;</span>
            <span v-else> &#709;</span>
          </p>
          <div v-show="true" class="pl-2 text-sm">
            <p>One</p>
            <p>Two</p>
            <p>Three</p>
          </div>
          <p class="menu-list">
            Layanan
            <span v-if="true"> &#707;</span>
            <span v-else> &#709;</span>
          </p>
          <div v-show="true" class="pl-2 text-sm">
            <p>One</p>
            <p>Two</p>
            <p>Three</p>
          </div>
          <NuxtLink class="menu-list">Reports</NuxtLink>
          <NuxtLink class="menu-list">Berita</NuxtLink>
          <NuxtLink class="menu-list">Kontak</NuxtLink>
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
  </Teleport>
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
</style>
