<script setup>
const tentang = tentangMenu();
const viewMenu = ref(false);

const viewDropdown = () => {
  viewMenu.value = !viewMenu.value;
};
</script>

<template>
  <ul class="nav-group">
    <li class="">
      <span @mouseover="viewDropdown" @mouseleave="viewDropdown">Tentang</span>
      <span :class="viewMenu ? '' : 'hidden'"
        ><NavigationContent :menus="tentang"
      /></span>
    </li>
    <li>Layanan</li>
    <li>Reports</li>
    <li>Berita</li>
    <li>Kontak</li>
  </ul>
</template>

<style scoped>
.nav-group {
  --at-apply: flex list-none my-0 mx-8;
}

ul li {
  --at-apply: my-0 px-8 hidden xl:(block);
}
</style>
