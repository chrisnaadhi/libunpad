<script setup>
const { getItems } = useDirectusItems();

const imageBg = "https://www.svgrepo.com/show/9244/newspaper-report.svg";
const platform = [
  {
    nama: "Kandaga",
    deskripsi: "Berita umum seputar Grha Kandaga",
    slug: "all",
  },
  {
    nama: "Gallery",
    deskripsi: "Berita mengenai Galeri Kandaga",
    slug: "gallery",
  },
  {
    nama: "Library",
    deskripsi: "Berita mengenai Perpustakaan Kandaga",
    slug: "library",
  },
  {
    nama: "Archive",
    deskripsi: "Berita mengenai Arsip Publik yang dikelola Kandaga",
    slug: "archive",
  },
  {
    nama: "Museum",
    deskripsi: "Berita mengenai Museum Kandaga",
    slug: "museum",
  },
];

const getNewestArticle = await getItems({
  collection: "artikel",
  params: {
    limit: 5,
    sort: "-date_created",
  },
});

const getAllArticle = await getItems({
  collection: "artikel",
  params: {
    limit: 3,
    sort: "-date_created",
  },
});

const getGalleryArticle = await getItems(fetchArticleCategory("gallery"));
const getLibraryArticle = await getItems(fetchArticleCategory("library"));
const getArchiveArticle = await getItems(fetchArticleCategory("archive"));
const getMuseumArticle = await getItems(fetchArticleCategory("museum"));

platform[0]["collection"] = getAllArticle;
platform[1]["collection"] = getGalleryArticle;
platform[2]["collection"] = getLibraryArticle;
platform[3]["collection"] = getArchiveArticle;
platform[4]["collection"] = getMuseumArticle;
</script>

<template>
  <main>
    <section>
      <pre>
        {{ article?.judul }}
      </pre>
    </section>
    <section>
      <CollectionHeader
        :title="$t('newsTitleHeader')"
        :image="imageBg"
        :description="$t('newsDescriptionHeader')"
      />
    </section>
    <section>
      <h2>Berita Terbaru Kandaga</h2>
      <div class="flex flex-col lg:(flex-row mx-0) gap-3 my-5 mx-3">
        <div class="bg-blue-1 w-full min-h-100 rounded-lg"></div>
        <div v-for="article in getNewestArticle" class="grid grid-cols-2">
          <div class="bg-red">
            {{ article?.id }}
          </div>
        </div>
      </div>
    </section>
    <section v-for="plat in platform" class="platform-section">
      <h2>{{ plat.nama }}</h2>
      <p>{{ plat.deskripsi }}</p>
      <div
        class="flex flex-col mx-3 lg:(grid grid-cols-3 mx-0) justify-between gap-3"
      >
        <GenericArticleCard
          v-for="item in plat.collection"
          :featured-img="item.gambar_unggulan"
          :description="item.konten_artikel"
          :link-slug="item.slug"
          :title="item.judul"
          :date-created="item.date_created"
        />
      </div>
      <div class="text-right mt-5">
        <NuxtLink :to="'/berita/' + plat.slug" class="italic font-semibold">
          Lihat selengkapnya >
        </NuxtLink>
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
