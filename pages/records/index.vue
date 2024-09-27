<script setup>
const { t } = useI18n();
const { getItems } = useDirectusItems();

const getTotalDataArchive = ref(
  await getItems(getGLAMCollectionsCount("koleksi_archive"))
);

const pageTotal = getTotalDataArchive.value.meta.total_count;
const currentPage = ref(0);
const collectionList = ref();
const collectionTag = ref(null);
const filterKeyword = ref("");
const filterJenisKoleksi = ref("");
const isSearching = ref(false);

const archiveObj = {
  title: computed(() => t("archiveTitle")),
  definition: "(noun) /ˈɑːr.kaɪv/",
  imageUrl: "undraw_Professor.png",
  titleDesc: computed(() => t("archiveDescription")),
};

const getArchiveDataHighlight = await getItems({
  collection: "koleksi_archive",
  params: {
    limit: 4,
  },
});

const getArchivePaginationData = async (opts) => {
  if (
    opts === "next" &&
    currentPage.value >= 0 &&
    currentPage.value < pageTotal
  ) {
    collectionList.value = [];
    currentPage.value = currentPage.value + 12;
    collectionList.value = await getItems({
      collection: "koleksi_archive",
      params: {
        sort: "-date_created",
        limit: 12,
        offset: currentPage.value,
      },
    });
  } else if (opts === "previous" && currentPage.value !== 0) {
    collectionList.value = [];
    currentPage.value = currentPage.value - 12;
    collectionList.value = await getItems({
      collection: "koleksi_archive",
      params: {
        sort: "-date_created",
        limit: 12,
        offset: currentPage.value,
      },
    });
  } else {
    alert("Nothing Happened!");
  }
};

const filterArchiveData = async () => {
  currentPage.value = 0;
  isSearching.value = true;
  if (filterKeyword.value !== "") {
    collectionList.value = [];
    const searchData = await getItems({
      collection: "koleksi_archive",
      params: {
        search: filterKeyword.value,
        limit: 12,
      },
    }).finally(() => {
      isSearching.value = false;
    });

    if (searchData.length > 0) {
      collectionList.value = searchData;
    } else {
      collectionList.value = null;
    }
  } else if (filterJenisKoleksi.value !== "") {
    collectionList.value = [];
    const searchData = await getItems({
      collection: "koleksi_archive",
      params: {
        filter: {
          tipe_koleksi: filterJenisKoleksi.value,
        },
        limit: 12,
      },
    }).finally(() => {
      isSearching.value = false;
    });

    if (searchData.length > 0) {
      collectionList.value = searchData;
    } else {
      collectionList.value = null;
    }
  } else {
    alert("Kata Kunci wajib diisi!");
  }
};

const resetFilter = async () => {
  currentPage.value = 0;
  filterKeyword.value = "";
  filterJenisKoleksi.value = "";
  collectionList.value = await getItems({
    collection: "koleksi_archive",
    params: {
      sort: "-date_created",
      limit: 12,
    },
  });
};

const listTipeKoleksi = await getItems({
  collection: "koleksi_archive",
  params: {
    groupBy: "tipe_koleksi",
  },
});

onMounted(async () => {
  collectionList.value = await getItems({
    collection: "koleksi_archive",
    params: {
      sort: "-date_created",
      limit: 12,
      offset: 0,
    },
  });
});
</script>

<template>
  <section>
    <GenericBaseGlamLayout v-bind="archiveObj" />
    <div class="max-w-6xl ma bg-gray-1 rounded-lg rounded-rt-lg p-4">
      <div class="p-4">
        <h1 class="text-4xl text-center">{{ archiveObj.title }}</h1>
      </div>
      <div class="p-4 flex flex-col items-center">
        <h3>Koleksi {{ archiveObj.title }} Pilihan Kami</h3>
        <div
          class="my-5 flex flex-col gap-5 lg:(grid grid-cols-2 gap-3) w-full"
        >
          <div
            class="bg-white p-5 rounded flex w-full h-full gap-5"
            v-for="archive in getArchiveDataHighlight"
          >
            <NuxtLink :to="'/records/' + archive.id">
              <NuxtImg
                :src="directusImageUrl(archive.thumbnail)"
                format="webp"
                class="w-full h-40 object-cover rounded-lg lg:(w-50 h-60) transition duration-300 ease-in-out hover:scale-110"
              />
            </NuxtLink>
            <div class="flex flex-col justify-around gap-3 w-full">
              <div class="flex">
                <NuxtLink
                  :to="'/records/' + archive.id"
                  class="no-underline w-full"
                >
                  <h4
                    class="bg-orange-1 px-3 rounded text-orange"
                    :title="archive.judul"
                  >
                    {{ trimTitle(archive.judul, 22) }}
                  </h4>
                </NuxtLink>
              </div>
              <div class="flex flex-col w-full pl-2">
                <p class="text-sm text-gray-5">
                  Pembuat: {{ archive.pembuat_koleksi ?? "Belum ada data" }}
                </p>
                <p class="text-sm text-gray-5">
                  Dibuat pada: {{ archive.tanggal_dibuat ?? "Tidak diketahui" }}
                </p>
                <p class="text-sm text-gray-5">
                  Pengelola : {{ archive.lembaga_penanggungjawab }}
                </p>
              </div>
              <NuxtLink
                class="btn bg-orange text-white text-center py-1"
                :to="'/records/' + archive.id"
                >Lihat
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="my-10 flex flex-col items-center justify-evenly w-full">
        <h3 class="text-center mb-5" ref="collectionTag">
          Daftar Koleksi Arsip
        </h3>
        <h5 class="text-center mb-5">Total Koleksi Arsip: {{ pageTotal }}</h5>
        <div class="flex justify-center gap-5 w-full">
          <div class="w-full max-w-65">
            <div class="bg-orange-50 h-full rounded-xl p-5">
              <h5 class="text-center">Filter Koleksi</h5>
              <div class="input-block">
                <label for="search">Kata Kunci :</label>
                <input
                  type="search"
                  name="search"
                  id="search"
                  class="input-area"
                  v-model="filterKeyword"
                  @keyup.enter="filterArchiveData"
                />
              </div>
              <div class="input-block">
                <label for="jenis-koleksi">Tipe Koleksi: </label>
                <select
                  name="jenis-koleksi"
                  id="jenis-koleksi"
                  class="input-area"
                  v-model="filterJenisKoleksi"
                >
                  <option value="" selected disabled>Pilih Tipe Koleksi</option>
                  <option
                    v-for="tipe in listTipeKoleksi"
                    :value="tipe.tipe_koleksi"
                  >
                    {{ tipe.tipe_koleksi }}
                  </option>
                </select>
              </div>
              <div class="input-block flex flex-col gap-2">
                <button
                  class="btn bg-orange w-full text-white"
                  @click="filterArchiveData"
                >
                  Filter Gallery
                </button>
                <button
                  class="btn w-full text-white"
                  :class="
                    filterKeyword || filterJenisKoleksi
                      ? 'bg-red'
                      : 'bg-gray cursor-not-allowed'
                  "
                  @click="resetFilter"
                  :disabled="!filterKeyword && !filterJenisKoleksi"
                >
                  Reset Filter
                </button>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div v-if="collectionList?.length === 0 && isSearching">
              <p>Sedang memuat koleksi...</p>
            </div>
            <div v-else-if="collectionList === null && !isSearching">
              <p class="text-red">
                Hasil pencarian dari kata kunci "{{ filterKeyword }}" tidak
                ditemukan!
              </p>
            </div>
            <div class="archive-collection" v-else>
              <div
                v-for="archive in collectionList"
                class="max-w-50 text-center flex flex-col gap-2"
              >
                <CollectionGLAMItems
                  v-bind="archive"
                  type_collection="records"
                />
              </div>
            </div>
            <div class="flex items-center justify-center gap-3 w-full mt-8">
              <button
                class="btn bg-orange text-white py-0"
                @click="getArchivePaginationData('previous')"
                :disabled="currentPage === 0"
              >
                Sebelumnya
              </button>
              <p>
                {{ currentPage == 0 ? "1" : Math.ceil(currentPage / 12 + 1) }} /
                {{ Math.ceil(pageTotal / 12) }}
              </p>
              <button
                class="btn bg-orange text-white py-0"
                @click="getArchivePaginationData('next')"
                :disabled="
                  Math.ceil(currentPage / 12 + 1) === Math.ceil(pageTotal / 12)
                "
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.archive-collection {
  --at-apply: flex flex-col gap-3 sm:(grid grid-cols-3) lg:(grid grid-cols-4 gap-10);
}

.navigation-area {
  --at-apply: flex items-center justify-center gap-3 w-full mt-8;
}

section {
  --at-apply: max-w-7xl ma;
}
</style>
