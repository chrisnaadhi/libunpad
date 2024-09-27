<script setup>
const { getItems } = useDirectusItems();

const val = ref("Layanan Daring Kandaga");
const dataLayananDaring = await getItems({
  collection: "layanan_daring_kandaga",
});
</script>

<template>
  <section>
    <div class="w-full relative">
      <img
        :src="directusImageUrl(dataLayananDaring.featured_image)"
        class="w-full max-h-80 object-cover relative"
        alt="daring"
      />
      <div
        class="absolute left-0 right-0 m-inline-auto top-35% w-fit text-white text-center"
      >
        <h2>{{ val }}</h2>
        <p>Deskripsi terkait Layanan Daring (Online) Kandaga</p>
        <p class="text-xs italic">
          {{ displayTanggalIndonesia(dataLayananDaring.date_created) }}
        </p>
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent"
      ></div>
    </div>
    <div class="max-w-7xl ma py-20">
      <div id="contents" v-html="dataLayananDaring.konten" class="px-25" />
    </div>
  </section>
</template>

<style scoped>
p {
  --at-apply: italic;
}
</style>
