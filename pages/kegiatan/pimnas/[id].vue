<script setup>
const { getItemById } = useDirectusItems();
const route = useRoute();

const getCampusData = await getItemById({
  collection: "pimnas",
  id: route.params.id,
});
const getYoutubeCode = extractYoutubeLink(getCampusData.link_youtube);
</script>

<template>
  <section class="max-w-7xl ma">
    <div class="my-3 text-center">
      <NuxtLink href="/kegiatan/pimnas" class="btn text-white bg-orange py-1">
        &leftarrow;Kembali
      </NuxtLink>
    </div>
    <div class="flex gap-4 flex-col items-center bg-orange-2 p-3 rounded-lg mt-5 mb-15">
      <h1 class="text-5xl">{{ getCampusData.nama_perguruan_tinggi }}</h1>
      <NuxtImg :src="getCampusData.link_logo" class="h-25 object-contain" />
      <div class="min-w-full">
        <iframe class="w-full h-3xl" :src="'https://www.youtube-nocookie.com/embed/' + getYoutubeCode"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </div>
    </div>
  </section>
</template>

<style scoped>
p {
  --at-apply: italic;
}
</style>
