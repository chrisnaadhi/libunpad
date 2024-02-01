<script setup>
const layanan = jamLayanan();
const { locale } = useI18n();
</script>

<template>
  <GenericMiniBanner />
  <div class="wrapper">
    <nav class="navbar">
      <NuxtLink :to="locale === 'en' ? '/en' : '/'">
        <nuxt-img
          src="/images/kandaga-logo-new.png"
          class="logo"
          alt="Logo Perpustakaan"
          height="512px"
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
  --at-apply: ma sticky top-0 z-5 w-full shadow;
}

.navbar {
  --at-apply: max-w-7xl flex items-unset justify-between py-4 px-0 sm:px-3 ma xl:(items-center justify-between px-0);
}

.logo {
  --at-apply: pl-3 max-w-50 md:(pl-0 max-w-75);
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
