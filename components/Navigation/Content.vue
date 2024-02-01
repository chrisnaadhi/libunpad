<script setup>
defineProps(["menus"]);

const { locale } = useI18n();

const viewedIcon = ref("");
const viewIconToggle = (value) => {
  viewedIcon.value = value;
};
const removeIcon = () => {
  viewedIcon.value = "";
};
</script>

<template>
  <section class="absolute left-0 bg-white shadow-lg w-full mt-5">
    <div class="max-w-6xl ma flex">
      <div class="flex flex-col" @mouseleave="removeIcon">
        <NuxtLink
          v-for="(menu, index) in menus"
          :key="index"
          :to="locale === 'id' ? menu.url : menu.urlEN"
          class="menu-link"
          rel="noopener noreferrer"
          @mouseenter="viewIconToggle(menu.id)"
        >
          <span class="flex justify-between">
            <span>{{ locale === "en" ? menu.nameEN : menu.name }}</span>
            <div
              class="i-mdi-arrow-right-drop-circle w-5 h-5 text-orange"
              v-show="viewedIcon === menu.id"
            />
          </span>
        </NuxtLink>
      </div>
      <div class="px-3 py-1">
        <p>Mega Menu Disini</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu-link {
  --at-apply: w-full text-left transition-all-500 p-2 my-1 text-dark no-underline border-t-1 border-b-1 border-white hover:(text-orange border-t-1 border-b-1 border-orange);
}
</style>
