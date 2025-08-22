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

const getHighlightArticle = await getItems({
  collection: "artikel",
  params: {
    limit: 1,
    sort: "-date_created",
    filter: {
      status: "published",
    },
  },
});

const highlightArticle = getHighlightArticle[0];

const getNewestArticle = await getItems({
  collection: "berita_kunjungan",
  params: {
    limit: 4,
    sort: "-date_created",
    offset: 1,
    filter: {
      status: "published",
    },
  },
});

const getAllArticle = await getItems({
  collection: "artikel",
  params: {
    limit: 3,
    sort: "-date_created",
    filter: {
      status: "published",
    },
  },
});

const getAllBeritaKunjungan = await getItems({
  collection: "berita_kunjungan",
  params: {
    limit: 3,
    sort: "-date_created",
    filter: {
      status: "published",
    },
  },
});

const beritaKandaga = [...getAllArticle, ...getAllBeritaKunjungan].sort(
  (a, b) =>
    new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
);
const servedBerita = beritaKandaga.slice(0, 3);

const getGalleryArticle = await getItems(fetchArticleCategory("gallery"));
const getLibraryArticle = await getItems(fetchArticleCategory("library"));
const getArchiveArticle = await getItems(fetchArticleCategory("archive"));
const getMuseumArticle = await getItems(fetchArticleCategory("museum"));

platform[0]["collection"] = servedBerita;
platform[1]["collection"] = getGalleryArticle;
platform[2]["collection"] = getLibraryArticle;
platform[3]["collection"] = getArchiveArticle;
platform[4]["collection"] = getMuseumArticle;
</script>

<template>
  <main>
    <section>
      <CollectionHeader
        :title="$t('newsTitleHeader')"
        :image="imageBg"
        :description="$t('newsDescriptionHeader')"
      />
    </section>
    <section>
      <h2>{{ $t("newestKandagaNews") }}</h2>
      <div class="flex flex-col lg:(flex-row mx-0) gap-4 my-5 mx-3">
        <div class="highlight-block">
          <NuxtLink :to="beritaType(highlightArticle)" class="no-underline">
            <NuxtImg
              class="highlight-img"
              :src="handleAssets(highlightArticle?.gambar_unggulan)"
            />
            <div class="highlight-content">
              <div
                class="bg-unpad text-white rounded-xl px-5 py-1 font-semibold mb-5"
              >
                Berita Highlight
              </div>
              <h2 class="highlight-heading">
                {{ trimTitle(highlightArticle?.judul, 80) }}
              </h2>
              <p class="text-left italic text-sm">
                {{ trimDescription(highlightArticle?.konten_artikel, 200) }}
              </p>
            </div>
          </NuxtLink>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="article in getNewestArticle"
            class="bg-gray-50 shadow-sm shadow-gray-4 rounded max-h-xl"
          >
            <NuxtImg
              :src="handleAssets(article?.gambar_unggulan)"
              class="w-full h-40 object-cover rounded"
            />
            <div
              class="h-30 my-3 px-3 flex flex-col items-start justify-center"
            >
              <NuxtLink :to="beritaType(article)" class="text-left">
                <h6 :title="article?.judul">
                  {{ trimTitle(article?.judul, 27) }}
                </h6>
              </NuxtLink>
              <p class="text-xs text-left italic">
                {{ trimDescription(article?.konten_berita, 90) }}
              </p>
              <div class="pt-4">
                <NuxtLink
                  :to="beritaType(article)"
                  class="btn bg-unpad text-dark text-xs"
                >
                  Baca selengkapnya >
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-for="plat in platform" class="platform-section">
      <h2>{{ plat.nama }}</h2>
      <p>{{ plat.deskripsi }}</p>
      <div v-if="plat.collection.length > 0">
        <div
          class="flex flex-col mx-3 lg:(grid grid-cols-3 mx-0) justify-between gap-3"
        >
          <GenericArticleCard
            v-for="item in plat.collection"
            :featured-img="item.gambar_unggulan"
            :description="item.konten_artikel ?? item.konten_berita"
            :link-slug="beritaType(item)"
            :title="item.judul"
            :date-created="item.date_created"
          />
        </div>
        <div class="text-right mt-5">
          <NuxtLink :to="'/berita/' + plat.slug" class="italic font-semibold">
            Lihat selengkapnya >
          </NuxtLink>
        </div>
      </div>
      <div v-else>
        <p class="italic text-red-400">
          Belum ada berita mengenai {{ plat.nama }}!
        </p>
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

.highlight-block {
  --at-apply: bg-dark max-w-2xl w-full min-h-lg rounded-lg;
}

.highlight-img {
  --at-apply: max-w-2xl h-lg object-cover rounded opacity-35 transition-all-500
    absolute;
}

.highlight-block:hover .highlight-img {
  --at-apply: opacity-20;
}

.highlight-block:hover .highlight-heading {
  --at-apply: text-unpad;
}

.highlight-heading {
  --at-apply: text-white text-left transition-all-500;
}

.highlight-content {
  --at-apply: relative flex flex-col justify-end items-start p-8 h-full
    text-white;
}
</style>
