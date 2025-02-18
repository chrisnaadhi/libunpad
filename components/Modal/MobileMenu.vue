<script setup>
import { mobileMenu, menuContent } from "~/composables/navMenu";

const { status, data, signOut } = useAuth();
const menu = mobileMenu();
const { layanan, tentang, koleksi, panduan } = menuContent();

const logout = async () => {
  await signOut();
};

const viewTentang = () => {
  menu.isTentangOpen = !menu.isTentangOpen;
  menu.isLayananOpen = false;
  menu.isKoleksiOpen = false;
  menu.isPanduanOpen = false;
};

const viewLayanan = () => {
  menu.isLayananOpen = !menu.isLayananOpen;
  menu.isTentangOpen = false;
  menu.isKoleksiOpen = false;
  menu.isPanduanOpen = false;
};

const viewKoleksi = () => {
  menu.isKoleksiOpen = !menu.isKoleksiOpen;
  menu.isLayananOpen = false;
  menu.isTentangOpen = false;
  menu.isPanduanOpen = false;
};

const viewPanduan = () => {
  menu.isPanduanOpen = !menu.isPanduanOpen;
  menu.isLayananOpen = false;
  menu.isTentangOpen = false;
  menu.isKoleksiOpen = false;
};
</script>

<template>
  <section class="layer" v-if="menu.menuState">
    <div class="mt-17 text-right px-10 font-600 cursor-pointer">
      <span @click="menu.menuState = false">&#10006;</span>
    </div>
    <div class="menu-wrapper">
      <div class="flex flex-col pb-2 pl-10">
        <NuxtLink to="/" class="menu-list hover-menu">Beranda</NuxtLink>
        <p
          class="menu-list"
          :class="menu.isTentangOpen ? 'text-unpad' : ''"
          @click="viewTentang"
        >
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
        <p
          class="menu-list"
          :class="menu.isLayananOpen ? 'text-unpad' : ''"
          @click="viewLayanan"
        >
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
        <p
          class="menu-list"
          :class="menu.isKoleksiOpen ? 'text-unpad' : ''"
          @click="viewKoleksi"
        >
          Koleksi
          <span v-if="menu.isKoleksiOpen"> &#8628;</span>
          <span v-else> &#8594;</span>
        </p>
        <div
          v-show="menu.isKoleksiOpen"
          class="pl-2 text-sm"
          v-for="list in koleksi"
        >
          <NuxtLink :to="list.url" class="hover-menu">{{ list.name }}</NuxtLink>
        </div>
        <p
          class="menu-list"
          :class="menu.isPanduanOpen ? 'text-unpad' : ''"
          @click="viewPanduan"
        >
          Panduan
          <span v-if="menu.isPanduanOpen"> &#8628;</span>
          <span v-else> &#8594;</span>
        </p>
        <div
          v-show="menu.isPanduanOpen"
          class="pl-2 text-sm"
          v-for="list in panduan"
        >
          <NuxtLink :to="list.url" class="hover-menu">{{ list.name }}</NuxtLink>
        </div>
        <NuxtLink class="menu-list hover-menu">Kontak</NuxtLink>
      </div>
      <div class="flex min-w-full flex-row items-center justify-center gap-2">
        <NuxtLink to="/login" v-if="status === 'unauthenticated'">
          <button class="btn bg-unpad w-full text-white">Login</button>
        </NuxtLink>
        <div v-else-if="status === 'authenticated'" class="flex gap-2">
          <img
            :src="data.user.image"
            class="w-15 h-15 rounded-full"
            alt="Foto Profil"
          />
          <div class="text-sm">
            <p>{{ data.user.name }}</p>
            <p class="text-xs">{{ data.user.email }}</p>
            <div class="flex gap-1 mt-2">
              <NuxtLink to="/keanggotaan" class="btn bg-unpad text-white py-0"
                >Keanggotaan</NuxtLink
              >
              <button class="btn bg-red text-white py-0" @click="logout">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.layer {
  --at-apply: fixed mt--16 h-full w-full bg-white/95 transition-all-500 z-5;
}

.menu-wrapper {
  --at-apply: w-full flex flex-col justify-center;
}

.menu-list {
  --at-apply: text-lg py-1 cursor-pointer;
}

.hover-menu {
  --at-apply: transition-all-500 text-dark no-underline hover:(text-unpad underline);
}
</style>
