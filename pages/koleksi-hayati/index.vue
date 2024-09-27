<script setup>
const i18n = useI18n();

const herbariumObj = {
  title: computed(() => i18n.t("koleksiHayatiTitle")),
  definition: "(noun) /'baɪəˈlɒʤɪkl kəˈlekʃn/",
  imageUrl: "undraw_Online_art.png",
  titleDesc: computed(() => i18n.t("koleksiHayatiDescription")),
};
</script>

<template>
  <section>
    <GenericBaseGlamLayout v-bind="herbariumObj" />
  </section>
</template>
