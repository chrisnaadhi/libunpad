<script setup>
const layanan = jamLayanan();
const route = useRoute();
</script>

<template>
  <GenericMiniBanner v-show="route.path === '/'" />
  <div class="wrapper">
    <nav class="navbar">
      <NuxtLink to="/">
        <nuxt-img
          src="/images/logo-perpus.png"
          class="logo"
          alt="Logo Perpustakaan"
          width="256px"
          height="64px"
          format="webp"
        />
      </NuxtLink>
      <NavigationMenu />
      <NavigationAction @toggle="layanan.toggleDisplay()" />
    </nav>
    <Transition name="jamlayanan">
      <div class="absolute w-full transition-all-500" v-show="layanan.display">
        <NavigationJamLayanan />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.95);
  --at-apply: ma sticky top-0 z-3 w-full;
}

.navbar {
  --at-apply: container flex items-unset justify-between py-4 px-0 ma xl:(items-center justify-between);
}

.logo {
  --at-apply: max-w-40;
}

.jamlayanan-enter-active,
.jamlayanan-leave-active {
  transition: opacity 0.5 ease-linear;
}

.jamlayanan-enter-from,
.jamlayanan-leave-to {
  opacity: 0;
  transform: translate(0, -5px);
}
</style>
