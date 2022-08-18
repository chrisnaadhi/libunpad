<template>
  <ul class="nav-group">
    <li>Tentang</li>
    <li>Layanan</li>
    <li>Reports</li>
    <li>Berita</li>
    <li>Kontak</li>
  </ul>
</template>

<style scoped>
.nav-group {
  @apply flex list-none my-0 mx-8;
}

ul li {
  @apply my-0 mx-8 hidden xl:(block);
}
</style>
