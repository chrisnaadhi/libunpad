<template>
  <div class="wrapper">
    <nav class="navbar">
      <NuxtLink to="/"
        ><img
          src="/images/logo-perpus.png"
          class="logo"
          alt="Logo Perpustakaan"
      /></NuxtLink>

      <!-- <p>Logo disini</p> -->
      <NavigationMenu />
      <NavigationAction />
    </nav>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.95);
  --at-apply: ma sticky top-0 z-1;
}

.navbar {
  --at-apply: max-w-7xl flex items-unset justify-between py-4 px-0 ma xl:(items-center justify-between);
}

.logo {
  --at-apply: max-w-40;
}
</style>
