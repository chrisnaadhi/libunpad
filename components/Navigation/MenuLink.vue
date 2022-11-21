<script setup>
const props = defineProps(["menuTitle", "dropdownMenu"]);
const viewMenu = ref(false);

const viewDropdown = () => {
  viewMenu.value = true;
};

const leaveDropdown = () => {
  viewMenu.value = false;
};
</script>

<template>
  <li
    class="cursor-pointer"
    @mouseleave="leaveDropdown"
    @mouseenter="viewDropdown"
  >
    <div class="menu flex items-center">
      <p>{{ menuTitle }}</p>
      <div class="">
        <div class="i-mdi-menu-down bg-gray" v-show="!viewMenu"></div>
        <div class="i-mdi-menu-up bg-gray" v-show="viewMenu"></div>
      </div>
    </div>
    <span :class="viewMenu ? '' : 'hidden'">
      <NavigationContent :menus="dropdownMenu" />
    </span>
  </li>
</template>

<style scoped></style>
