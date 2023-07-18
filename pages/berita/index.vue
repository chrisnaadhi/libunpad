<script setup>
const { getItems } = useDirectusItems();
const config = useRuntimeConfig();

const image = "https://www.svgrepo.com/show/9244/newspaper-report.svg";
const platform = [
  { nama: "Kandaga", deskripsi: "Berita umum seputar layanan Kandaga" },
  { nama: "Gallery", deskripsi: "Berita mengenai Galeri Kandaga" },
  { nama: "Library", deskripsi: "Berita mengenai Perpustakaan Kandaga" },
  { nama: "Records", deskripsi: "Berita mengenai Arsip Kandaga" },
  { nama: "Museum", deskripsi: "Berita mengenai Museum Kandaga" },
];

const article = await getItems({
  collection: "artikel",
  params: {
    limit: 3,
    sort: "-date_updated",
  },
});
</script>

<template>
  <main>
    <section>
      <CollectionHeader
        :title="$t('newsTitleHeader')"
        :image="image"
        :description="$t('newsDescriptionHeader')"
      />
    </section>
    <section>
      <h2>Berita Terbaru Kandaga</h2>
      <div class="flex flex-col lg:(flex-row mx-0) gap-3 my-5 mx-3">
        <div class="bg-blue-1 w-full min-h-100 rounded-lg"></div>
        <div class="flex flex-col gap-3">
          <div class="bg-green-1 min-w-100 min-h-50 rounded-lg"></div>
          <div class="bg-orange-1 min-h-50 rounded-lg"></div>
        </div>
        <div class="flex flex-col gap-3">
          <div class="bg-red-1 min-w-100 min-h-50 rounded-lg"></div>
          <div class="bg-violet-1 min-h-50 rounded-lg"></div>
        </div>
      </div>
    </section>
    <section v-for="plat in platform" class="platform-section">
      <h2>{{ plat.nama }}</h2>
      <p>{{ plat.deskripsi }}</p>
      <div class="flex flex-col mx-3 lg:(flex-row mx-0) justify-between gap-3">
        <div class="article-block" v-for="item in article">
          <NuxtImg
            :src="`${config.public.directus.url}assets/` + item.gambar_unggulan"
            class="w-full max-h-45 object-cover rounded-lg"
          />
          <NuxtLink
            :to="'/berita/' + item.slug"
            class="text-dark no-underline transition-all-500 hover:text-orange"
          >
            <h5>{{ item.judul }}</h5>
          </NuxtLink>
          <p class="text-xs italic">{{ convertTimeZone(item.date_created) }}</p>
          <div></div>
          <p>
            <span v-html="trimDescription(item.konten_artikel, 100)"></span>
            <NuxtLink
              :to="'/berita/' + item.slug"
              class="text-sm text-orange underline"
            >
              Baca selengkapnya
            </NuxtLink>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  --at-apply: max-w-7xl ma text-center;
}

.platform-section {
  --at-apply: w-full my-8;
}

.article-block {
  --at-apply: flex flex-col gap-2 text-left w-full bg-gray-50 p-3 rounded-lg
    shadow-md shadow-gray-4;
}
</style>
