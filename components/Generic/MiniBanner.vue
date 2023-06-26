<script setup>
const { locale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const bahasaState = computed(() => {
  switch (locale.value) {
    case "id":
      return "Pilih Bahasa";
    case "en":
      return "Choose Language";
    default:
      return "Not one of these";
  }
});
</script>

<template>
  <div class="bg-gray-7 w-full py-2 transition-all-500">
    <div
      class="max-w-7xl ma flex items-center justify-between text-white text-xs font-600"
    >
      <p class="px-5 lg:px-0">
        Pemberitahuan, pengumuman ataupun sekilas informasi akan tampil disini
      </p>
      <div class="flex flex-col w-60% md:w-unset items-end">
        <p>{{ bahasaState }}: &nbsp;</p>
        <div>
          <NuxtLink
            :to="switchLocalePath('id')"
            class="locale"
            title="Indonesia"
            >ID</NuxtLink
          >
          |
          <NuxtLink :to="switchLocalePath('en')" class="locale" title="English"
            >EN</NuxtLink
          >
          |
          <NuxtLink
            :to="switchLocalePath('id')"
            class="locale"
            title="Sundanese"
            >SU</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.locale {
  --at-apply: px-2;
}
</style>
