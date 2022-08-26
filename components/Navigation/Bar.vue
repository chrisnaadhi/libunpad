<template>
  <div class="wrapper">
    <nav class="navbar">
      <!-- <img src="#" alt="Logo Perpustakaan" /> -->
      <p>Logo disini</p>
      <NavigationMenu />
      <NavigationAction />
    </nav>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  background-color: antiquewhite;
  @apply ma bg-white opacity-95 sticky top-0 z-1;
}

.navbar {
  @apply max-w-7xl flex items-unset justify-between py-4 px-0 ma xl:(items-center justify-between);
}

p {
  @apply mr-0 ml-5 md:(mr-12);
}
</style>
