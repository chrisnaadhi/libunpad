<script setup>
const i18n = useI18n();

const { data } = await useFetch("/api/v1/koleksi/buku");

const libraryObj = {
  title: "Library",
  definition: "(noun) /'laɪ.brer.i/",
  imageUrl: "undraw_Books.png",
  titleDesc: computed(() => i18n.t("libraryDescription")),
  collectionObj: data.value,
};
</script>

<template>
  <div>
    <GenericBaseGlamLayout v-bind="libraryObj" />
  </div>
</template>
