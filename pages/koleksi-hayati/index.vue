<script setup>
const i18n = useI18n();
const galleryDesc = computed(() => i18n.t("galleryDescription"));

const herbariumObj = {
  title: "Koleksi Hayati",
  definition: "(noun) /'herbarium/",
  imageUrl: "undraw_Online_art.png",
  titleDesc: {
    value:
      "Koleksi Hayati adalah kumpulan koleksi dari berbagai organisme, termasuk tumbuhan, hewan, dan mikroba, beserta data terkaitnya. Koleksi ini dapat mencakup spesimen, jaringan, sel, gen, dan data ekologi, yang diawetkan dan diorganisir dengan cermat untuk tujuan penelitian, pendidikan, dan konservasi.",
  },
};
</script>

<template>
  <GenericBaseGlamLayout v-bind="herbariumObj" />
</template>
