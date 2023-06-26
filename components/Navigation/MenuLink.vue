<script setup>
const props = defineProps(["menuTitle", "dropdownMenu"]);
const viewMenu = ref(false);

const viewDropdown = () => {
  viewMenu.value = true;
};

const leaveDropdown = () => {
  viewMenu.value = false;
};

const openDropdown = () => {
  viewMenu.value = !viewMenu.value;
};
</script>

<template>
  <li
    class="cursor-pointer z-2"
    @click="openDropdown"
    @mouseenter="viewDropdown"
    @mouseleave="leaveDropdown"
  >
    <div class="menu">
      <p class="menu-title">{{ menuTitle }}</p>
      <div class="">
        <div class="i-mdi-menu-down bg-gray" v-show="!viewMenu"></div>
        <div class="i-mdi-menu-up bg-gray" v-show="viewMenu"></div>
      </div>
    </div>
    <span class="transition-all-500" :class="viewMenu ? '' : 'hidden'">
      <NavigationContent :menus="dropdownMenu" />
    </span>
  </li>
</template>

<style scoped>
.menu {
  --at-apply: flex items-center;
}

.menu-title {
  --at-apply: transition-all-200 hover:(text-orange) ;
}
</style>
