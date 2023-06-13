<script setup>
const i18n = useI18n();

const museumObj = {
  title: "Museum",
  definition: "(noun) /mjuːˈziː.əm/",
  imageUrl: "undraw_search_app.png",
  titleDesc: computed(() => i18n.t("museumDescription")),
  branding: "GLAM's Memorabilia",
};
</script>

<template>
  <GenericBaseGlamLayout v-bind="museumObj" />
</template>
