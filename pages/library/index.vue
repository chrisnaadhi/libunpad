<script setup>
const i18n = useI18n();

const libraryObj = {
  title: "Library",
  definition: "(noun) /'laɪ.brer.i/",
  imageUrl: "undraw_Books.png",
  titleDesc: computed(() => i18n.t("libraryDescription")),
};
</script>

<template>
  <GenericBaseGlamLayout v-bind="libraryObj" />
</template>
