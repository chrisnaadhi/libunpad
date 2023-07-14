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

const { data: fetchApiSolr } = await useFetch(
  "http://10.9.245.16:9501/api/v1",
  {
    query: {
      title: "Komunikasi",
    },
    transform: (data) => {
      return JSON.parse(data);
    },
  }
);

// const results = ref();
// console.log(fetchApiSolr.value);
// onBeforeMount(async () => {
//   results.value = await JSON.parse(fetchApiSolr.value.data.response);
//   console.log(results.value);
// });
</script>

<template>
  <div>
    <GenericBaseGlamLayout v-bind="libraryObj" />
    <section>
      <p>{{ fetchApiSolr }}</p>
    </section>
  </div>
</template>
