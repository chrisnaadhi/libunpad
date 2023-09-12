<script setup>
const { getItems } = useDirectusItems();

const data = ref("Vue Composition API");
const route = useRoute();

const dataKoleksi = await getItems({
  collection: "koleksi_teater",
  params: {
    filter: {
      slug_koleksi: route.params.koleksi,
    },
  },
});

const metaDataKoleksi = dataKoleksi[0];

const ytCode = extractYoutubeLink(metaDataKoleksi.link_youtube);

const daftarKoleksiTerkait = await getItems({
  collection: "koleksi_teater",
  params: {
    filter: {
      kategori: metaDataKoleksi.kategori,
    },
    limit: 10,
  },
});

const koleksiTerseleksi = daftarKoleksiTerkait.filter(
  (koleksi) => koleksi.slug_koleksi !== route.params.koleksi
);
</script>

<template>
  <section class="main-frame">
    <div class="mt-4">
      <NuxtLink to="/e-teater"> &#8592;Kembali ke Koleksi E-Teater </NuxtLink>
    </div>
    <h1 class="kandaga-gradient font-semibold text-center">E-Teater</h1>
    <h3 class="text-center mb-4">{{ metaDataKoleksi.nama_koleksi }}</h3>
    <div class="flex flex-col gap-4 lg:flex-row">
      <div class="min-w-65%">
        <iframe
          :src="`https://www.youtube-nocookie.com/embed/${ytCode}`"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          class="w-full h-lg"
        ></iframe>
      </div>
      <div class="flex flex-col items-start lg:items-center">
        <h6 class="bg-orange text-white rounded-full text-center px-20">
          {{ metaDataKoleksi.kategori }}
        </h6>
        <h2 class="font-semibold">{{ metaDataKoleksi.nama_koleksi }}</h2>
        <h5 class="italic">
          Pembuat:
          <span class="text-orange-6 font-bold">{{
            metaDataKoleksi.author_koleksi
          }}</span>
        </h5>
        <p class="text-justify">
          <span v-html="metaDataKoleksi.deskripsi" />
        </p>
      </div>
    </div>

    <div class="my-5">
      <NuxtLink
        :to="'/e-teater/' + metaDataKoleksi.kategori"
        class="btn bg-orange text-white py-1 w-full"
      >
        Kembali ke Koleksi
      </NuxtLink>
    </div>
    <div class="mb-10">
      <h3 class="rekomendasi-title">Koleksi terkait</h3>
      <div
        class="flex flex-col gap-10 sm:(grid grid-cols-3 gap-5) lg:grid-cols-5"
      >
        <div
          v-for="rekomendasi in koleksiTerseleksi"
          class="w-full md:max-w-55"
        >
          <NuxtImg
            :src="`https://img.youtube.com/vi/${extractYoutubeLink(
              rekomendasi.link_youtube
            )}/sddefault.jpg`"
            class="w-full md:max-w-55 rounded-lg"
          ></NuxtImg>
          <NuxtLink
            class="font-semibold no-underline italic hover:underline"
            :to="`/e-teater/${rekomendasi.kategori}/${rekomendasi.slug_koleksi}`"
          >
            {{ rekomendasi.nama_koleksi }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main-frame {
  --at-apply: max-w-7xl ma px-3;
}

.rekomendasi-title {
  --at-apply: font-semibold mt-25 mb-4 underline transition-all-500 hover:(text-orange);
}

p {
  --at-apply: italic;
}
</style>
