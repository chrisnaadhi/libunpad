<script setup>
const val = ref("Fasilitas Kandaga");

const { getItems } = useDirectusItems();
const { getThumbnail: img } = useDirectusFiles();

const getFasilitasKandaga = await getItems({
  collection: "fasilitas_kandaga",
  params: {
    filter: {
      status: "published",
    },
    sort: "-date_created",
  },
});
</script>

<template>
  <section>
    <div class="w-full relative mb-10">
      <NuxtImg
        src="/images/kandaga-bg.webp"
        class="w-full max-h-80 object-cover relative"
        alt="kandaga"
      />
      <div
        class="absolute left-0 right-0 top-0 bottom-0 pt-25 m-inline-auto w-fit text-white text-center bg-dark/70 w-full h-full"
      >
        <h2>{{ val }}</h2>
        <p>Informasi mengenai Fasilitas yang tersedia Kandaga</p>
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent"
      ></div>
    </div>
    <div class="flex flex-col gap-3 lg:(grid grid-cols-3) content-section">
      <div
        v-for="facility in getFasilitasKandaga"
        class="flex flex-col items-center"
      >
        <div class="card-block">
          <div class="description-block overflow-hidden">
            <div class="text-white py-6 px-8">
              <h4>{{ facility.nama_fasilitas }}</h4>
              <p class="text-sm">{{ facility.deskripsi }}</p>
            </div>
          </div>
          <NuxtImg
            :src="directusImageUrl(facility.foto_fasilitas)"
            class="w-100 max-w-md h-60 object-cover z-0 rounded-lg"
          />
        </div>
        <h4>{{ facility.nama_fasilitas }}</h4>
        <p>Lantai {{ facility.lantai }} Gd. Kandaga</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content-section {
  --at-apply: max-w-7xl ma py-10;
}

p {
  --at-apply: italic;
}

.card-block {
  --at-apply: relative transition-all-500;
}

.description-block {
  --at-apply: absolute bg-dark opacity-70 w-full h-full rounded-lg
    transition-all-1000 opacity-0;
}

.card-block:hover .description-block {
  --at-apply: opacity-80;
}
</style>
