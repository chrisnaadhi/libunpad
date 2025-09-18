<script setup>
import { ref, computed, onMounted } from "vue";
const { getItems } = useDirectusItems();
const { cariFakultasAbbrevation } = daftarNamaFakultasUnpad();
const { t } = useI18n();
const { status } = useAuth();

// UI state
const perPage = 20; // requirement: 20 items per page
const currentOffset = ref(0);
const currentPage = computed(
  () => Math.floor(currentOffset.value / perPage) + 1
);
const totalCount = ref(0);
const ebooks = ref([]);
const loading = ref(false);

// Filters
const fakultasFilter = ref("");
const searchKeyword = ref("");
const fakultasList = ref([]);

// helper to build thumbnail url (kept from original)
const getEbookThumbnail = (url) => {
  if (!url) return "/images/ebook-placeholder.png";
  const get_id = url.split("/").at(5);
  return `https://lh3.googleusercontent.com/d/${get_id}=w600-h600`;
};

// fetch total count and initial list
const fetchTotalCount = async () => {
  const res = await getItems({
    collection: "koleksi_ebook",
    params: {
      limit: 1,
      meta: "total_count",
      filter: { status: { _eq: "published" } },
    },
  });
  totalCount.value =
    res?.meta?.total_count ?? (Array.isArray(res) ? res.length : 0);
};

const fetchFakultasList = async () => {
  // groupBy fakultas to get available fakultas values
  const res = await getItems({
    collection: "koleksi_ebook",
    params: {
      groupBy: "fakultas",
    },
  });
  fakultasList.value = res || [];
};

const fetchEbooks = async (opts = {}) => {
  loading.value = true;
  const params = {
    sort: "-date_created",
    limit: perPage,
    offset: currentOffset.value,
    filter: { status: "published" },
  };

  if (fakultasFilter.value) {
    params.filter = { ...params.filter, fakultas: fakultasFilter.value };
  }

  if (searchKeyword.value) {
    // Directus SDK: use `search` param for full-text
    params.search = searchKeyword.value;
  }

  const res = await getItems({ collection: "koleksi_ebook", params });
  // if Directus returns array and meta, keep items
  ebooks.value = Array.isArray(res) ? res : res?.data ?? [];
  // Update total if available
  totalCount.value = res?.meta?.total_count ?? totalCount.value;
  loading.value = false;
};

const goNext = async () => {
  const maxOffset = Math.max(
    0,
    Math.ceil(totalCount.value / perPage) * perPage - perPage
  );
  if (currentOffset.value + perPage <= maxOffset) {
    currentOffset.value += perPage;
    await fetchEbooks();
    scrollToTop();
  }
};

const goPrevious = async () => {
  if (currentOffset.value >= perPage) {
    currentOffset.value -= perPage;
    await fetchEbooks();
    scrollToTop();
  }
};

const applyFilter = async () => {
  currentOffset.value = 0;
  await fetchEbooks();
};

const resetFilter = async () => {
  fakultasFilter.value = "";
  searchKeyword.value = "";
  currentOffset.value = 0;
  await fetchEbooks();
};

const scrollToTop = () => {
  try {
    document.querySelector("section")?.scrollIntoView({ behavior: "smooth" });
  } catch (e) {}
};

onMounted(async () => {
  await Promise.all([fetchFakultasList(), fetchTotalCount()]);
  await fetchEbooks();
});
</script>

<template>
  <section class="max-w-7xl ma py-6 px-2">
    <div class="mb-6">
      <h1 class="text-3xl font-semibold">{{ t("ebookPageListTitle") }}</h1>
      <p class="text-sm text-gray-500">
        {{ t("ebookPageListDescription") }}
      </p>
      <div
        class="bg-red-400 w-full p-4 text-xs my-5 rounded text-white"
        v-if="status !== 'authenticated'"
      >
        {{ t("ebookDetailAccess") }}
        <span class="ml-2 bg-green-500 text-white px-2 py-1 rounded">
          <NuxtLink to="/login" class="text-white no-underline font-semibold">
            Login
          </NuxtLink>
        </span>
      </div>
    </div>

    <!-- Filter/Search area -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="col-span-2 flex gap-3">
        <input
          v-model="searchKeyword"
          @keyup.enter="applyFilter"
          type="search"
          placeholder="Cari judul, penulis, atau kata kunci..."
          class="input-area w-full"
        />
        <div class="flex gap-2">
          <button class="btn bg-unpad text-white" @click="applyFilter">
            Cari
          </button>
          <button class="btn bg-gray text-white" @click="resetFilter">
            Reset
          </button>
        </div>
      </div>

      <div>
        <label class="text-sm">Filter Fakultas</label>
        <select v-model="fakultasFilter" class="input-area w-full">
          <option value="">Semua Fakultas</option>
          <option
            v-for="f in fakultasList"
            :key="f.fakultas"
            :value="f.fakultas"
          >
            {{ cariFakultasAbbrevation(f.fakultas) || f.fakultas }}
          </option>
        </select>
      </div>
    </div>

    <!-- List -->
    <div v-if="loading" class="py-10 text-center">Loading e-book...</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="item in ebooks"
        :key="item.id"
        class="bg-white rounded-lg shadow p-4 flex flex-col"
      >
        <NuxtLink :to="`/koleksi/ebook/${item.id}`" class="no-underline">
          <span v-if="item.thumbnail">
            <NuxtImg
              :src="directusImageUrl(item.thumbnail)"
              class="w-full h-100 object-cover rounded"
              referrerpolicy="no-referrer"
            />
          </span>
          <span v-else>
            <NuxtImg
              :src="getEbookThumbnail(item.link_url)"
              class="w-full h-100 object-cover rounded"
              referrerpolicy="no-referrer"
            />
          </span>
        </NuxtLink>
        <div class="my-3 flex-1">
          <NuxtLink :to="`/koleksi/ebook/${item.id}`" class="no-underline">
            <h3 class="text-lg font-medium" :title="item.judul">
              {{ item.judul }}
            </h3>
          </NuxtLink>
          <p class="text-sm text-gray-500">
            {{ cariFakultasAbbrevation(item.fakultas) }}
          </p>
        </div>
        <div class="my-3">
          <NuxtLink
            :to="`/koleksi/ebook/${item.id}`"
            class="btn bg-unpad text-white w-full text-center py-1"
            >{{ t("ebookDetailView") }}</NuxtLink
          >
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="navigation-area mt-8 flex items-center justify-center gap-4">
      <button
        class="btn bg-unpad text-white py-0 px-3"
        @click="goPrevious"
        :disabled="currentOffset === 0"
      >
        Sebelumnya
      </button>
      <p>{{ currentPage }} / {{ Math.ceil(totalCount / perPage) || 1 }}</p>
      <button
        class="btn bg-unpad text-white py-0 px-3"
        @click="goNext"
        :disabled="currentOffset + perPage >= totalCount"
      >
        Selanjutnya
      </button>
    </div>
  </section>
</template>

<style scoped>
.input-area {
  --at-apply: input-area px-3 py-2 rounded border border-gray-200;
}
.btn {
  --at-apply: rounded px-4 py-2;
}
.navigation-area {
  --at-apply: flex items-center justify-center gap-3 w-full mt-8;
}
</style>
