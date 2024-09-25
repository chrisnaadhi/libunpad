<script setup>
const { getItems } = useDirectusItems();
const { getThumbnail: img } = useDirectusFiles();

const val = ref("Dukungan Riset Kandaga");
const daataLayananRiset = await getItems({
  collection: "layanan_riset_kandaga",
});
</script>

<template>
  <section>
    <div class="w-full relative">
      <img
        :src="img(daataLayananRiset.featured_image)"
        class="w-full max-h-80 object-cover relative"
        alt="daring"
      />
      <div
        class="absolute left-0 right-0 top-0 bottom-0 pt-25 m-inline-auto w-fit text-white text-center bg-dark/70 w-full h-full"
      >
        <h2>{{ val }}</h2>
        <p>
          Deskripsi terkait Layanan Dukungan Riset (Research Support) dan
          Pembelajaran di Kandaga
        </p>
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent"
      ></div>
    </div>
    <div class="max-w-7xl ma py-10">
      <div id="contents" v-html="daataLayananRiset.konten" class="px-25" />
    </div>
  </section>
</template>

<style scoped>
p {
  --at-apply: italic;
}
</style>
