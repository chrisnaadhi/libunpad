<script setup>
const route = useRoute();
const { getItems } = useDirectusItems();

const getLayanan = await getItems({
  collection: "layanan_kandaga",
  params: {
    filter: {
      slug_layanan: {
        _eq: route.params.slug,
      },
    },
  },
});
const dataLayanan = getLayanan[0];
</script>

<template>
  <section class="layer">
    <h1>{{ dataLayanan.nama_layanan }}</h1>
    <p>{{ dataLayanan.deskripsi_layanan }}</p>
    <div v-html="dataLayanan.konten_layanan"></div>
    <div>
      <NuxtLink to="/panduan" class="btn bg-orange text-white">
        Kembali
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.layer {
  --at-apply: max-w-7xl ma flex flex-col items-center justify-center gap-4 py-5
    px-2;
}

p {
  --at-apply: italic;
}
</style>
