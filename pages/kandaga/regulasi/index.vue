<script setup>
const { getSingletonItem } = useDirectusItems();

const val = ref("Regulasi Kandaga");
const regulasiKandaga = await getSingletonItem({
  collection: "regulasi_kandaga",
});
</script>

<template>
  <section>
    <div class="w-full relative">
      <img
        :src="img(regulasiKandaga.featured_image)"
        class="w-full max-h-80 object-cover relative"
        alt="daring"
      />
      <div
        class="absolute left-0 right-0 top-0 bottom-0 pt-25 m-inline-auto w-fit text-white text-center bg-dark/70 w-full h-full"
      >
        <h2>{{ val }}</h2>
        <p>
          Peraturan dan Regulasi yang sudah ditetapkan oleh Pusat Pengelolaan
          Pengetahuan Unpad
        </p>
        <p class="text-xs italic">
          {{ displayTanggalIndonesia(regulasiKandaga.date_created) }}
        </p>
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent"
      ></div>
    </div>
    <div class="max-w-7xl ma py-20">
      <div id="contents" v-html="regulasiKandaga.konten" class="px-25" />
    </div>
  </section>
</template>

<style scoped>
p {
  --at-apply: italic;
}
</style>
