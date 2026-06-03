<script setup>
const { t } = useI18n();
const router = useRouter();

const searchQuery = ref("");
const currentPage = ref(1);
const perPage = 12;

const {
  data: res,
  pending,
  refresh,
} = await useFetch("/api/v1/koleksi/pustaka", {
  query: computed(() => ({
    glam_type: "library",
    status: "published",
    access_level: "public",
    limit: perPage,
    page: currentPage.value,
  })),
});

const books = computed(() => res.value?.data ?? []);
const totalItems = computed(
  () =>
    res.value?.meta?.total ??
    res.value?.meta?.filter_count ??
    res.value?.count ??
    0,
);
// If total is unknown but we got a full page, show next anyway
const hasNextPage = computed(() =>
  totalItems.value > 0
    ? currentPage.value * perPage < totalItems.value
    : books.value.length === perPage,
);
const totalPages = computed(() =>
  totalItems.value > 0
    ? Math.ceil(totalItems.value / perPage)
    : currentPage.value + (hasNextPage.value ? 1 : 0),
);

const handleSearch = () => {
  const q = searchQuery.value.trim();
  if (q) {
    router.push(`/search?keyword=${encodeURIComponent(q)}`);
  }
};

const goToPage = async (page) => {
  if (page < 1) return;
  if (totalItems.value > 0 && page > totalPages.value) return;
  currentPage.value = page;
  await refresh();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const startItem = computed(() => (currentPage.value - 1) * perPage + 1);
const endItem = computed(() =>
  Math.min(currentPage.value * perPage, totalItems.value),
);

const tipeClass = (type) => {
  const t = (type?.label ?? type ?? "").toLowerCase();
  if (t.includes("journal")) return "bg-purple-1 text-purple-7 border-purple-2";
  if (t.includes("book")) return "bg-blue-1 text-blue-7 border-blue-2";
  if (t.includes("ebook")) return "bg-green-1 text-green-7 border-green-2";
  return "bg-yellow-1 text-[#b07b00] border-yellow-3";
};

useHead({ title: "Library | Kandaga Unpad" });
</script>

<template>
  <main>
    <!-- Hero -->
    <div
      class="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_#F9B12933,transparent_50%),radial-gradient(circle_at_bottom_right,_#17233929,transparent_50%)] bg-white border-b border-slate-200"
    >
      <div class="max-w-7xl ma px-6 py-16 sm:py-20 lg:py-24">
        <div class="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div class="space-y-6">
            <span
              class="inline-flex rounded-full bg-[#fff1d2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#b17d00]"
            >
              Kandaga — Library
            </span>
            <h1
              class="text-4xl font-black leading-tight text-slate-950 sm:text-5xl"
            >
              {{ t("libraryTitle") }}
              <span class="block text-[#F9B129]">(noun) /'laɪ.brer.i/</span>
            </h1>
            <p class="max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              {{ t("libraryDescription") }}
            </p>

            <!-- Search bar -->
            <form class="flex gap-2 max-w-lg" @submit.prevent="handleSearch">
              <div class="relative flex-1">
                <div
                  class="i-mdi-magnify absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
                />
                <input
                  v-model="searchQuery"
                  type="search"
                  placeholder="Cari koleksi buku..."
                  class="w-full pl-11 pr-4 py-3 rounded-full border-2 border-slate-200 hover:border-[#F9B129]/60 focus:border-[#F9B129] outline-none text-sm bg-white transition-all-200 shadow-sm"
                />
              </div>
              <button
                type="submit"
                class="btn bg-[#F9B129] text-[#1a0f00] font-semibold px-6 py-3 rounded-full hover:shadow-lg transition-all-200 shrink-0"
              >
                Cari
              </button>
            </form>

            <p class="text-xs text-slate-400">
              Tekan Enter atau klik Cari untuk menelusuri koleksi lebih lanjut
              di halaman pencarian.
            </p>
          </div>

          <div class="flex flex-col gap-4 sm:flex-row lg:flex-col xl:flex-row">
            <div
              class="flex-1 rounded-[1.5rem] bg-white p-6 shadow-lg ring-1 ring-slate-200/80"
            >
              <p
                class="text-xs font-semibold uppercase tracking-[0.24em] text-[#F9B129]"
              >
                Total Koleksi
              </p>
              <p class="mt-3 text-3xl font-black text-slate-950">
                {{ totalItems > 0 ? totalItems.toLocaleString("id") : "—" }}
              </p>
              <p class="mt-1 text-sm text-slate-500">bahan pustaka tersedia</p>
            </div>
            <div
              class="flex-1 rounded-[1.5rem] bg-white p-6 shadow-lg ring-1 ring-slate-200/80"
            >
              <p
                class="text-xs font-semibold uppercase tracking-[0.24em] text-[#F9B129]"
              >
                Akses
              </p>
              <p class="mt-3 text-3xl font-black text-slate-950">Publik</p>
              <p class="mt-1 text-sm text-slate-500">terbuka untuk semua</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Collection section -->
    <div class="max-w-7xl ma px-6 py-12">
      <!-- Section header -->
      <div
        class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8"
      >
        <div>
          <p
            class="text-xs font-semibold uppercase tracking-[0.24em] text-[#b07b00] mb-1"
          >
            Koleksi Pilihan
          </p>
          <h2 class="text-2xl font-extrabold text-slate-950 m-0">
            Koleksi Buku Library Kami
          </h2>
        </div>
        <p
          v-if="!pending && totalItems > 0"
          class="text-sm text-slate-500 shrink-0"
        >
          Menampilkan
          <span class="font-700 text-slate-700"
            >{{ startItem }}–{{ endItem }}</span
          >
          dari
          <span class="font-700 text-slate-700">{{ totalItems }}</span>
          koleksi
        </p>
      </div>

      <!-- Loading -->
      <div
        v-if="pending"
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
      >
        <div
          v-for="i in perPage"
          :key="i"
          class="animate-pulse bg-slate-100 rounded-2xl h-72"
        />
      </div>

      <!-- Empty -->
      <div
        v-else-if="books.length === 0"
        class="flex flex-col items-center justify-center py-24 text-center"
      >
        <div class="i-mdi-book-open-outline w-16 h-16 text-slate-300 mb-4" />
        <p class="text-slate-600 font-semibold text-lg">
          Koleksi belum tersedia
        </p>
        <p class="text-slate-400 text-sm mt-1">
          Coba kembali beberapa saat lagi.
        </p>
      </div>

      <!-- Grid -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        <NuxtLink
          v-for="book in books"
          :key="book.id"
          :to="'/koleksi/pustaka/' + book.id"
          class="group bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:(shadow-xl -translate-y-1 border-[#F9B129]/60) transition-all-300 no-underline flex flex-col overflow-hidden"
        >
          <!-- Cover -->
          <div class="relative overflow-hidden bg-slate-100 aspect-[3/4]">
            <NuxtImg
              :src="book.thumbnail ?? '/images/default_cover.png'"
              :alt="book.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform-500"
              format="webp"
              loading="lazy"
            />
            <!-- Type badge -->
            <span
              v-if="book.type?.label || book.collection_type"
              :class="tipeClass(book.type ?? book.collection_type)"
              class="absolute top-2 left-2 text-[10px] font-600 px-2 py-0.5 rounded-full border backdrop-blur-sm"
            >
              {{ book.type?.label ?? book.collection_type }}
            </span>
          </div>

          <!-- Info -->
          <div class="p-4 flex flex-col gap-1.5 flex-1">
            <h3
              class="text-sm font-700 text-slate-800 leading-snug line-clamp-2 group-hover:text-[#b07b00] transition-colors m-0"
              :title="book.title"
            >
              {{ book.title }}
            </h3>
            <p
              v-if="book.creator?.creator_name"
              class="text-xs text-slate-500 line-clamp-1"
            >
              {{ book.creator.creator_name }}
            </p>
            <p
              v-if="book.description"
              class="text-xs text-slate-400 line-clamp-2 mt-0.5 flex-1"
            >
              {{ book.description }}
            </p>
            <p
              v-if="book.collection_code"
              class="text-[10px] font-mono text-slate-400 mt-auto pt-1"
            >
              {{ book.collection_code }}
            </p>
          </div>

          <!-- Footer -->
          <div
            class="px-4 py-2.5 border-t border-slate-100 flex items-center justify-between"
          >
            <span class="text-xs text-slate-400 capitalize">
              {{ book.access_level ?? "public" }}
            </span>
            <span
              class="text-xs font-600 text-[#b07b00] flex items-center gap-1 group-hover:gap-2 transition-all-200"
            >
              Lihat
              <div class="i-mdi-arrow-right w-3.5 h-3.5" />
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- Pagination -->
      <div
        v-if="!pending && (currentPage > 1 || hasNextPage)"
        class="mt-12 flex flex-col items-center gap-4"
      >
        <div class="flex items-center gap-2">
          <button
            class="pagination-btn"
            :disabled="currentPage <= 1"
            :class="
              currentPage <= 1
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:border-[#F9B129] hover:text-[#b07b00]'
            "
            @click="goToPage(currentPage - 1)"
          >
            <div class="i-mdi-chevron-left w-5 h-5" />
            Sebelumnya
          </button>

          <div class="flex items-center gap-1">
            <button
              v-for="p in totalPages"
              :key="p"
              class="w-9 h-9 rounded-full text-sm font-600 transition-all-200"
              :class="
                p === currentPage
                  ? 'bg-[#F9B129] text-[#1a0f00] shadow-md'
                  : 'bg-white border border-slate-200 text-slate-600 hover:(border-[#F9B129] text-[#b07b00])'
              "
              @click="goToPage(p)"
            >
              {{ p }}
            </button>
          </div>

          <button
            class="pagination-btn"
            :disabled="!hasNextPage"
            :class="
              !hasNextPage
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:border-[#F9B129] hover:text-[#b07b00]'
            "
            @click="goToPage(currentPage + 1)"
          >
            Berikutnya
            <div class="i-mdi-chevron-right w-5 h-5" />
          </button>
        </div>
        <p class="text-xs text-slate-400">
          Halaman {{ currentPage }} dari {{ totalPages }}
        </p>
      </div>

      <!-- CTA -->
      <div
        class="mt-16 rounded-[2rem] bg-gradient-to-br from-[#fff8e7] to-[#fff1d2] border border-[#F9B129]/30 p-8 sm:p-10 text-center"
      >
        <p
          class="text-xs font-semibold uppercase tracking-[0.3em] text-[#b07b00] mb-3"
        >
          Temukan Lebih Banyak
        </p>
        <h3 class="text-2xl font-extrabold text-slate-950 mb-3">
          Tidak menemukan yang dicari?
        </h3>
        <p class="text-slate-600 max-w-md ma mb-6 text-sm leading-7">
          Gunakan fitur pencarian kami untuk menelusuri seluruh koleksi buku,
          jurnal, dan referensi akademik dari Universitas Padjadjaran.
        </p>
        <div class="flex flex-wrap gap-3 justify-center">
          <NuxtLink
            to="/search"
            class="inline-flex items-center gap-2 rounded-full bg-[#F9B129] px-6 py-3 text-sm font-semibold text-[#1a0f00] hover:shadow-xl transition-all-200 no-underline"
          >
            <div class="i-mdi-magnify w-4 h-4" />
            Telusuri Semua Koleksi
          </NuxtLink>
          <NuxtLink
            to="/koleksi"
            class="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:border-[#F9B129] transition-all-200 no-underline"
          >
            Jelajahi Koleksi Lainnya
          </NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.pagination-btn {
  --at-apply: flex items-center gap-1.5 px-4 py-2 rounded-full border
    border-slate-200 text-sm font-600 text-slate-600 bg-white transition-all-200;
}

h2 {
  --at-apply: text-2xl font-800;
}
</style>
