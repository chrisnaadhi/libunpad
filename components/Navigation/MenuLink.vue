<script setup>
const props = defineProps(["menuTitle", "dropdownMenu", "menuName"]);
const menuState = navigationMenuBar();
</script>

<template>
  <li class="cursor-pointer z-2" @click="menuState.clickDropdown(menuName)">
    <div class="menu">
      <p class="menu-title" @mouseenter="menuState.viewDropdown(menuName)">
        {{ menuTitle }}
      </p>
      <div class="">
        <div
          class="i-mdi-menu-down bg-gray"
          v-if="menuState.viewedMenuName !== menuName"
        ></div>
        <div class="i-mdi-menu-up bg-gray" v-else></div>
      </div>
    </div>
    <span
      class="transition-all-500 w-full"
      :class="menuState.viewedMenuName === menuName ? '' : 'hidden'"
      @mouseenter="menuState.viewState = true"
      @mouseleave="menuState.leaveDropdown"
    >
      <NavigationContent :menus="dropdownMenu" :chosen="menuTitle" />
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
