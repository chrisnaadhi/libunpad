<script setup>
const i18n = useI18n();

const galleryObj = {
  title: "Gallery",
  definition: "(noun) /'gæl.ər.i/",
  imageUrl: "undraw_Picture.png",
  titleDesc: computed(() => i18n.t("galleryDescription")),
};
</script>

<template>
  <GenericBaseGlamLayout v-bind="galleryObj" />
</template>
