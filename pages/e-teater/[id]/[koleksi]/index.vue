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
</script>

<template>
  <section>
    <div class="mt-4">
      <NuxtLink :to="'e-teater/' + metaDataKoleksi.kategori">
        &#8592;Kembali
      </NuxtLink>
    </div>

    <h3 class="text-center mb-4">{{ metaDataKoleksi.nama_koleksi }}</h3>
    <div>
      <iframe
        width="100%"
        height="720"
        :src="`https://www.youtube-nocookie.com/embed/${ytCode}`"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
    <div class="my-5">
      <h6 class="bg-orange text-white rounded-full text-center max-w-55">
        {{ metaDataKoleksi.kategori }}
      </h6>
      <h1>{{ metaDataKoleksi.nama_koleksi }}</h1>
      <h4 class="italic">{{ metaDataKoleksi.author_koleksi }}</h4>
      <p>
        <span v-html="metaDataKoleksi.deskripsi" />
      </p>
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
      <h3>Koleksi terkait</h3>
      <div class="grid grid-cols-5 gap-3">
        <div v-for="i in 15" class="bg-blue text-white h-35">
          <p>{{ i }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}

p {
  --at-apply: italic;
}
</style>
