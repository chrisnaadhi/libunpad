<script setup>
const { t } = useI18n();
const { getItems } = useDirectusItems();

const getTotalDataMuseum = ref(
  await getItems(getGLAMCollectionsCount("koleksi_museum")),
);
const pageTotal = getTotalDataMuseum.value.meta.total_count;
const currentPage = ref(0);
const collectionList = ref([]);
const collectionTag = ref(null);
const filterKeyword = ref("");
const filterJenisKoleksi = ref("");
const isSearching = ref(false);

const museumObj = {
  title: computed(() => t("museumTitle")),
  definition: "(noun) /mjuːˈziː.əm/",
  imageUrl: "undraw_search_app.png",
  titleDesc: computed(() => t("museumDescription")),
};

const getMuseumDataHighlight = await getItems({
  collection: "koleksi_museum",
  params: {
    filter: { status: "published" },
    limit: 4,
    sort: "-date_created",
  },
});

const listTipeKoleksi = await getItems({
  collection: "koleksi_museum",
  params: { groupBy: "tipe_koleksi" },
});

const loadMuseumPage = async (offset = 0) => {
  collectionList.value = [];
  collectionList.value = await getItems({
    collection: "koleksi_museum",
    params: {
      sort: "-date_created",
      limit: 12,
      offset,
      filter: { status: "published" },
    },
  });
};

const getMuseumPaginationData = async (opts) => {
  collectionTag.value?.scrollIntoView({ behavior: "smooth" });
  if (opts === "next" && currentPage.value + 12 < pageTotal) {
    currentPage.value += 12;
    await loadMuseumPage(currentPage.value);
  } else if (opts === "previous" && currentPage.value > 0) {
    currentPage.value -= 12;
    await loadMuseumPage(currentPage.value);
  }
};

const filterMuseumData = async () => {
  currentPage.value = 0;
  isSearching.value = true;
  if (filterKeyword.value.trim() !== "") {
    collectionList.value = [];
    collectionList.value = await getItems({
      collection: "koleksi_museum",
      params: {
        search: filterKeyword.value,
        limit: 12,
        sort: "-date_created",
        filter: { status: "published" },
      },
    });
  } else if (filterJenisKoleksi.value !== "") {
    collectionList.value = [];
    collectionList.value = await getItems({
      collection: "koleksi_museum",
      params: {
        filter: {
          tipe_koleksi: filterJenisKoleksi.value,
          status: "published",
        },
        limit: 12,
        sort: "-date_created",
      },
    });
  } else {
    await loadMuseumPage(0);
  }
  isSearching.value = false;
};

const resetFilter = async () => {
  currentPage.value = 0;
  filterKeyword.value = "";
  filterJenisKoleksi.value = "";
  await loadMuseumPage(0);
};

onMounted(async () => {
  await loadMuseumPage(0);
});
</script>

<template>
  <section>
    <GenericBaseGlamLayout v-bind="museumObj" />

    <div class="max-w-7xl ma px-6 py-12 space-y-12">
      <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="museum in getMuseumDataHighlight"
          :key="museum.id"
          class="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <NuxtLink :to="`/museum/${museum.id}`" class="block h-full">
            <div class="relative aspect-[3/4] bg-slate-100 overflow-hidden">
              <NuxtImg
                :src="directusImageUrl(museum.thumbnail)"
                alt="museum.judul"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                format="webp"
              />
              <span
                class="absolute left-3 top-3 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-700"
              >
                {{ museum.tipe_koleksi ?? "Museum" }}
              </span>
            </div>
            <div class="flex h-full flex-col gap-3 p-5">
              <h3
                class="text-base font-bold text-slate-900 line-clamp-2"
                :title="museum.judul"
              >
                {{ museum.judul }}
              </h3>
              <p class="text-xs text-slate-500 line-clamp-2">
                {{ museum.pembuat_koleksi ?? "Pembuat tidak tersedia" }}
              </p>
              <p class="text-xs text-slate-400">
                {{ museum.tanggal_dibuat ?? "Tanggal tidak tersedia" }}
              </p>
              <div
                class="mt-auto flex items-center justify-between text-xs font-semibold text-[#b07b00]"
              >
                <span>Lihat</span>
                <div class="i-mdi-arrow-right w-4 h-4" />
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div class="grid gap-8 xl:grid-cols-[0.75fr_1.25fr]">
        <aside
          class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div class="space-y-5">
            <p
              class="text-xs font-semibold uppercase tracking-[0.28em] text-[#b07b00]"
            >
              Filter Koleksi
            </p>
            <div class="space-y-2">
              <label
                class="text-sm font-semibold text-slate-700"
                for="museum-search"
                >Kata Kunci</label
              >
              <input
                id="museum-search"
                v-model="filterKeyword"
                type="search"
                placeholder="Cari koleksi..."
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#F9B129]"
              />
            </div>
            <div class="space-y-2">
              <label
                class="text-sm font-semibold text-slate-700"
                for="museum-type"
                >Tipe Koleksi</label
              >
              <select
                id="museum-type"
                v-model="filterJenisKoleksi"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#F9B129]"
              >
                <option value="">Semua Tipe</option>
                <option
                  v-for="tipe in listTipeKoleksi"
                  :key="tipe.tipe_koleksi"
                  :value="tipe.tipe_koleksi"
                >
                  {{ tipe.tipe_koleksi }}
                </option>
              </select>
            </div>
            <div class="flex flex-col gap-3 pt-2">
              <button
                class="rounded-2xl bg-[#F9B129] px-4 py-3 text-sm font-semibold text-[#1a0f00] transition hover:shadow-lg"
                @click="filterMuseumData"
              >
                Terapkan Filter
              </button>
              <button
                class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#F9B129]"
                @click="resetFilter"
              >
                Reset Filter
              </button>
            </div>
          </div>
        </aside>

        <div class="space-y-6">
          <div
            class="rounded-[32px] border border-slate-200 bg-slate-50 p-6 shadow-sm"
          >
            <div
              class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p class="text-xs uppercase tracking-[0.28em] text-[#b07b00]">
                  Daftar Koleksi
                </p>
                <h2 class="mt-2 text-2xl font-extrabold text-slate-950">
                  Temukan koleksi museum terpilih
                </h2>
              </div>
              <p class="text-sm text-slate-500">
                Total koleksi: {{ pageTotal }}
              </p>
            </div>
          </div>

          <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <div
              v-for="item in collectionList"
              :key="item.id"
              class="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <NuxtLink :to="`/museum/${item.id}`" class="block h-full">
                <div class="relative aspect-[3/4] bg-slate-100 overflow-hidden">
                  <NuxtImg
                    :src="directusImageUrl(item.thumbnail)"
                    alt="item.judul"
                    class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    format="webp"
                  />
                  <span
                    class="absolute left-3 top-3 rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-700"
                  >
                    {{ item.tipe_koleksi ?? "Museum" }}
                  </span>
                </div>
                <div class="flex h-full flex-col gap-3 p-5">
                  <h3
                    class="text-base font-bold text-slate-900 line-clamp-2"
                    :title="item.judul"
                  >
                    {{ item.judul }}
                  </h3>
                  <p class="text-xs text-slate-500 line-clamp-2">
                    {{ item.pembuat_koleksi ?? "Pembuat tidak tersedia" }}
                  </p>
                  <p class="text-xs text-slate-400">
                    {{
                      item.lembaga_penanggungjawab ?? "Pengelola tidak tersedia"
                    }}
                  </p>
                  <div
                    class="mt-auto flex items-center justify-between text-xs font-semibold text-[#b07b00]"
                  >
                    <span>Lihat</span>
                    <div class="i-mdi-arrow-right w-4 h-4" />
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>

          <div class="flex flex-col items-center gap-4 py-4">
            <div class="flex flex-wrap items-center justify-center gap-3">
              <button
                class="pagination-btn"
                @click="getMuseumPaginationData('previous')"
                :disabled="currentPage === 0"
              >
                <div class="i-mdi-chevron-left w-4 h-4" />
                Sebelumnya
              </button>
              <p class="text-sm text-slate-600">
                Halaman
                {{
                  currentPage == 0 ? 1 : Math.ceil(currentPage / 12 + 1)
                }}
                dari {{ Math.ceil(pageTotal / 12) }}
              </p>
              <button
                class="pagination-btn"
                @click="getMuseumPaginationData('next')"
                :disabled="
                  Math.ceil(currentPage / 12 + 1) === Math.ceil(pageTotal / 12)
                "
              >
                Berikutnya
                <div class="i-mdi-chevron-right w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pagination-btn {
  --at-apply: inline-flex items-center gap-2 rounded-full border
    border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700
    transition-all duration-200 hover: border-[#F9B129] hover: text-[#b07b00];
}

section {
  --at-apply: max-w-7xl ma;
}
</style>
