<script setup>
const image = ref("https://www.svgrepo.com/show/428321/notebook.svg");
const route = useRoute();
const { getItems } = useDirectusItems();

const [dataGallery, dataArchive, dataMuseum] = await Promise.all([
  getItems({ collection: "koleksi_gallery", params: { limit: 2 } }),
  getItems({ collection: "koleksi_archive", params: { limit: 2 } }),
  getItems({ collection: "koleksi_museum", params: { limit: 2 } }),
]);

const { data: pustakaLibraryResponse } = await useFetch(
  "/api/v1/koleksi/pustaka",
  {
    query: {
      search: "",
      glam_type: "library",
      status: "published",
      access_level: "public",
      limit: 20,
    },
  },
);

const rawLibraryData = pustakaLibraryResponse?.value?.data ?? [];
const filteredLibraryData = rawLibraryData.filter(
  (item) =>
    item?.type?.label?.toLowerCase()?.includes("library") ||
    item?.collection_type?.toLowerCase()?.includes("library"),
);
const dataLibrary = (
  filteredLibraryData.length ? filteredLibraryData : rawLibraryData
).slice(0, 2);

const collectionSections = [
  {
    title: "Gallery",
    description:
      "Galeri diartikan sebagai ruangan atau bangunan tempat benda atau karya seni dipamerkan dan sebagainya.",
    page: "/gallery",
    left: true,
    firstCollection: dataGallery[0],
    secondCollection: dataGallery[1],
  },
  {
    title: "Library",
    description:
      "Kumpulan bahan, buku, dan media yang dapat diakses untuk studi, referensi, dan pembelajaran.",
    page: "/library",
    detailPage: "/koleksi/pustaka",
    left: false,
    firstCollection: dataLibrary[0],
    secondCollection: dataLibrary[1],
  },
  {
    title: "Archive",
    description:
      "Akumulasi catatan dan bahan sejarah dalam berbagai format yang mendukung riset dan dokumentasi.",
    page: "/records",
    left: true,
    firstCollection: dataArchive[0],
    secondCollection: dataArchive[1],
  },
  {
    title: "Museum",
    description:
      "Bangunan dan institusi yang merawat artefak budaya, seni, sejarah, dan ilmiah untuk umum.",
    page: "/museum",
    left: false,
    firstCollection: dataMuseum[0],
    secondCollection: dataMuseum[1],
  },
  {
    title: "Repository",
    description:
      "Repositori menampilkan koleksi tugas akhir berupa skripsi, tesis, disertasi, dan karya ilmiah lainnya.",
    page: route.fullPath + "/repository",
    left: true,
  },
];

useHead({
  title:
    "Kandaga Library - Perpustakaan Universitas Padjadjaran | Kandaga Unpad",
});
</script>

<template>
  <main class="container ma my-10 space-y-16 px-4 sm:px-6 lg:px-8">
    <section
      class="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-[0_32px_90px_rgba(15,23,42,0.08)]"
    >
      <div
        class="relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16"
      >
        <div
          class="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top_left,_rgba(249,177,41,0.18),transparent_25%),radial-gradient(circle_at_top_right,_rgba(23,35,57,0.10),transparent_30%)] pointer-events-none"
        ></div>
        <div class="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div class="space-y-6">
            <span
              class="inline-flex rounded-full bg-[#fff1d2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#b17d00]"
            >
              Koleksi Unggulan
            </span>
            <h1
              class="text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-5xl"
            >
              Jelajahi Koleksi Kandaga: arsip, buku, galeri, museum, dan
              repository akademik dalam satu pengalaman modern.
            </h1>
            <p class="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Temukan tematik koleksi yang disusun untuk mendukung penelitian,
              pembelajaran, dan eksplorasi budaya. Desain responsif dan navigasi
              intuitif membuat akses menjadi lebih cepat dan nyaman di setiap
              perangkat.
            </p>
            <div class="grid gap-3 sm:grid-cols-2">
              <NuxtLink
                to="/koleksi/buku"
                class="inline-flex items-center justify-center rounded-full bg-[#F9B129] px-5 py-3 text-sm font-semibold text-[#1a0f00] transition hover:shadow-xl"
              >
                Telusuri Buku
              </NuxtLink>
              <NuxtLink
                to="/koleksi/repository"
                class="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:border-[#F9B129] hover:text-[#1a0f00]"
              >
                Buka Repository
              </NuxtLink>
            </div>
          </div>

          <div class="grid gap-5 sm:grid-cols-2">
            <div
              class="rounded-[1.75rem] bg-white/95 p-6 shadow-lg ring-1 ring-slate-200/80"
            >
              <p
                class="text-sm font-semibold uppercase tracking-[0.24em] text-[#F9B129]"
              >
                Pilihan Ini
              </p>
              <p class="mt-4 text-3xl font-semibold text-slate-950">
                4 cabang koleksi
              </p>
              <p class="mt-3 text-sm leading-6 text-slate-600">
                Gallery, Library, Archive, dan Museum dibangun untuk memudahkan
                penemuan dan eksplorasi.
              </p>
            </div>
            <div
              class="rounded-[1.75rem] bg-white/95 p-6 shadow-lg ring-1 ring-slate-200/80"
            >
              <p
                class="text-sm font-semibold uppercase tracking-[0.24em] text-[#F9B129]"
              >
                Repository
              </p>
              <p class="mt-4 text-3xl font-semibold text-slate-950">
                Karya ilmiah
              </p>
              <p class="mt-3 text-sm leading-6 text-slate-600">
                Kumpulan skripsi, tesis, disertasi, dan referensi akademik dari
                Universitas Padjadjaran.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-8">
      <div class="text-center">
        <p
          class="mx-auto mb-3 inline-flex rounded-full bg-[#fff4d7] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#b07b00]"
        >
          Koleksi Terpilih
        </p>
        <h2
          class="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl"
        >
          Pilihan kami untuk inspirasi dan penelusuran data koleksi terbaik.
        </h2>
      </div>
      <div
        class="rounded-[2rem] border border-slate-200/70 bg-slate-50 p-6 shadow-sm sm:p-8"
      >
        <CollectionBooksHighlight />
      </div>
    </section>

    <section class="space-y-2">
      <div class="text-center">
        <p
          class="mx-auto mb-3 inline-flex rounded-full bg-[#fff4d7] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#b07b00]"
        >
          Koleksi Lainnya
        </p>
        <h2 class="text-center text-slate-950 sm:text-4xl">
          Jelajahi tiap cabang koleksi dengan tampilan yang ringan dan mudah
          dijangkau.
        </h2>
      </div>
      <div class="space-y-2">
        <CollectionBlockData
          v-for="(section, index) in collectionSections"
          :key="section.title"
          :left="section.left"
          :title="section.title"
          :description="section.description"
          :page="section.page"
          :first-collection="section.firstCollection"
          :second-collection="section.secondCollection"
        />
      </div>
    </section>
  </main>
</template>

<style scoped>
h2 {
  font-size: clamp(2rem, 2.4vw, 3rem);
  margin: 0;
  color: #1a1a1a;
}

@media (max-width: 640px) {
  main {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}
</style>
