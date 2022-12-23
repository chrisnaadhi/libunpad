<script setup>
import { mobileMenu } from "~/composables/navMenu";

const menu = mobileMenu();
</script>

<template>
  <Teleport to="#main-content">
    <section class="layer" v-if="menu.menuState">
      <div
        class="h-full w-full flex flex-col mt--25 items-center justify-center"
      >
        <div>
          <p class="menu-list">Beranda ></p>
          <p class="menu-list">Tentang ></p>
          <p class="menu-list">Layanan ></p>
          <p class="menu-list">Reports ></p>
          <p class="menu-list">Berita ></p>
          <p class="menu-list">Kontak ></p>
        </div>
        <div>
          <NuxtLink to="keanggotaan">
            <button class="btn bg-orange w-full text-white">Keanggotaan</button>
          </NuxtLink>
        </div>
      </div>
    </section>
  </Teleport>
</template>

<style scoped>
.layer {
  --at-apply: fixed mt--8 h-full w-full bg-white z-2;
}
.menu-list {
  --at-apply: text-2xl py-2;
}
</style>
