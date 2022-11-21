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
    <li
      class="cursor-pointer"
      @mouseleave="leaveDropdown"
      @mouseenter="viewDropdown"
    >
      <div class="menu flex items-center">
        <p>Tentang</p>
        <div class="">
          <div class="mdi i-mdi-menu-down bg-gray" v-show="!viewMenu"></div>
          <div class="mdi i-mdi-menu-up bg-gray" v-show="viewMenu"></div>
        </div>
      </div>
      <span :class="viewMenu ? '' : 'hidden'">
        <NavigationContent :menus="tentang" />
      </span>
    </li>
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
