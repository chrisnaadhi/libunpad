<script setup>
defineProps(["menus", "chosen"]);

const { locale } = useI18n();
const { allMenu } = menuContent();

const viewedIcon = ref("");
const selectedMenu = ref("");
const viewIconToggle = (value) => {
  viewedIcon.value = value;
  const findMenu = allMenu.find((menu) => menu.id === value);
  selectedMenu.value = findMenu;
};
const removeIcon = () => {
  viewedIcon.value = "";
};
</script>

<template>
  <section class="absolute left-0 bg-white shadow-lg w-full mt-5">
    <div class="max-w-7xl ma flex">
      <div class="flex flex-col py-5" @mouseleave="removeIcon">
        <NuxtLink
          v-for="(menu, index) in menus"
          :key="index"
          :to="locale === 'id' ? menu.url : menu.urlEN"
          class="menu-link"
          rel="noopener noreferrer"
          @mouseenter="viewIconToggle(menu.id)"
        >
          <span class="flex items-center justify-between w-50">
            <span>{{ locale === "en" ? menu.nameEN : menu.name }}</span>
            <div
              class="i-mdi-arrow-right-drop-circle w-5 h-5 text-unpad"
              v-show="viewedIcon === menu.id"
            />
          </span>
        </NuxtLink>
      </div>
      <div class="px-3 py-5">
        <NavigationMegaMenu :description="selectedMenu.deskripsi">
          <h5>{{ selectedMenu !== "" ? selectedMenu.name : "Kandaga" }}</h5>
        </NavigationMegaMenu>
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu-link {
  --at-apply: w-full text-left transition-all-500 p-2 my-1 text-dark no-underline border-t-1 border-b-1 border-white hover:(text-unpad border-t-1 border-b-1 border-unpad);
}
</style>
