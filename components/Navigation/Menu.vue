<script setup>
const tentang = tentangMenu();
const viewMenu = ref(false);

const viewDropdown = () => {
  viewMenu.value = true;
};

const leaveDropdown = () => {
  viewMenu.value = false;
};
</script>

<template>
  <ul class="nav-group">
    <NavigationMenuLink menu-title="Tentang" :dropdown-menu="tentang" />
    <NavigationMenuLink menu-title="Layanan" :dropdown-menu="tentang" />
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
