<script setup>
const i18n = useI18n();

const archiveObj = {
  title: "Archives",
  definition: "(noun) /ˈɑːr.kaɪv/",
  imageUrl: "undraw_Professor.png",
  titleDesc: computed(() => i18n.t("archiveDescription")),
};
</script>

<template>
  <GenericBaseGlamLayout v-bind="archiveObj" />
</template>
