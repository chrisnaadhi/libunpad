<script setup>
const { t } = useI18n();
const { getItems } = useDirectusItems();

const getTotalDataGallery = ref(
  await getItems(getGLAMCollectionsCount("koleksi_gallery"))
);

const pageTotal = getTotalDataGallery.value.meta.total_count;
const currentPage = ref(0);
const collectionList = ref();
const collectionTag = ref(null);
const filterKeyword = ref("");
const filterJenisKoleksi = ref("");

const galleryObj = {
  title: computed(() => t("galleryTitle")),
  definition: "(noun) /'gæl.ər.i/",
  imageUrl: "undraw_Picture.png",
  titleDesc: computed(() => t("galleryDescription")),
};

const getGalleryDataHighlight = await getItems({
  collection: "koleksi_gallery",
  params: {
    filter: {
      status: "published",
    },
    limit: 4,
    filter: {
      status: "published",
    },
  },
});

const getGalleryPaginationData = async (opts) => {
  collectionTag.value.scrollIntoView();
  if (
    opts === "next" &&
    currentPage.value >= 0 &&
    currentPage.value < pageTotal
  ) {
    collectionList.value = [];
    currentPage.value = currentPage.value + 12;
    collectionList.value = await getItems({
      collection: "koleksi_gallery",
      params: {
        sort: "-date_created",
        limit: 12,
        offset: currentPage.value,
        filter: {
          status: "published",
        },
      },
    });
  } else if (opts === "previous" && currentPage.value !== 0) {
    collectionList.value = [];
    currentPage.value = currentPage.value - 12;
    collectionList.value = await getItems({
      collection: "koleksi_gallery",
      params: {
        sort: "-date_created",
        limit: 12,
        offset: currentPage.value,
        filter: {
          status: "published",
        },
      },
    });
  } else {
    alert("Nothing Happened!");
  }
};

const filterGalleryData = async () => {
  currentPage.value = 0;
  if (filterKeyword.value !== "") {
    collectionList.value = [];
    collectionList.value = await getItems({
      collection: "koleksi_gallery",
      params: {
        search: filterKeyword.value,
        limit: 12,
        filter: {
          status: "published",
        },
      },
    });
  } else if (filterJenisKoleksi.value !== "") {
    collectionList.value = [];
    collectionList.value = await getItems({
      collection: "koleksi_gallery",
      params: {
        filter: {
          tipe_koleksi: filterJenisKoleksi.value,
          status: "published",
        },
        limit: 12,
        filter: {
          status: "published",
        },
      },
    });
  } else {
    alert("Kata Kunci wajib diisi!");
  }
};

const resetFilter = async () => {
  currentPage.value = 0;
  filterKeyword.value = "";
  filterJenisKoleksi.value = "";
  collectionList.value = await getItems({
    collection: "koleksi_gallery",
    params: {
      sort: "-date_created",
      limit: 12,
      filter: {
        status: "published",
      },
    },
  });
};

const listTipeKoleksi = await getItems({
  collection: "koleksi_gallery",
  params: {
    groupBy: "tipe_koleksi",
  },
});

onMounted(async () => {
  collectionList.value = await getItems({
    collection: "koleksi_gallery",
    params: {
      sort: "-date_created",
      limit: 12,
      offset: 0,
      filter: {
        status: "published",
      },
    },
  });
});
</script>

<template>
  <section>
    <GenericBaseGlamLayout v-bind="galleryObj" />
    <div class="max-w-6xl ma bg-gray-1 rounded-lg rounded-rt-lg p-4">
      <div class="p-4">
        <h1 class="text-4xl text-center">{{ galleryObj.title }}</h1>
      </div>
      <div class="p-4 flex flex-col items-center">
        <h3>Koleksi {{ galleryObj.title }} Pilihan Kami</h3>
        <div
          class="my-5 flex flex-col gap-5 lg:(grid grid-cols-2 gap-3) w-full"
        >
          <div
            class="bg-white p-5 rounded flex w-full h-full gap-5"
            v-for="galeri in getGalleryDataHighlight"
          >
            <NuxtLink :to="'/gallery/' + galeri.id">
              <NuxtImg
                :src="directusImageUrl(galeri.thumbnail)"
                format="webp"
                class="w-full h-40 object-cover rounded-lg lg:(w-50 h-60) transition duration-300 ease-in-out hover:scale-110"
              />
            </NuxtLink>
            <div class="flex flex-col justify-around gap-3 w-full">
              <div class="flex">
                <NuxtLink
                  :to="'/gallery/' + galeri.id"
                  class="no-underline w-full"
                >
                  <h4
                    class="bg-orange-1 px-3 rounded text-orange"
                    :title="galeri.judul"
                  >
                    {{ trimTitle(galeri.judul, 25) }}
                  </h4>
                </NuxtLink>
              </div>
              <div class="flex flex-col w-full pl-2">
                <p class="text-sm text-gray-5">
                  Pembuat: {{ galeri.pembuat_koleksi ?? "Belum ada data" }}
                </p>
                <p class="text-sm text-gray-5">
                  Dibuat pada: {{ galeri.tanggal_dibuat ?? "Tidak diketahui" }}
                </p>
                <p class="text-sm text-gray-5">
                  Pengelola : {{ galeri.lembaga_penanggungjawab }}
                </p>
              </div>
              <NuxtLink
                class="btn bg-orange text-white text-center py-1"
                :to="'/gallery/' + galeri.id"
                >Lihat</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-10 flex flex-col items-center justify-evenly w-full">
      <h3 class="text-center mb-5" ref="collectionTag">
        Daftar Koleksi Galeri
      </h3>
      <h5 class="text-center mb-5">Total Koleksi Galeri: {{ pageTotal }}</h5>
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
                @keyup.enter="filterGalleryData"
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
                @click="filterGalleryData"
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
          <div class="w-full" v-if="collectionList?.length === 0">
            <h5>Sedang memuat koleksi...</h5>
          </div>
          <div class="gallery-collection" v-else>
            <div
              v-for="galeri in collectionList"
              class="max-w-50 text-center flex flex-col gap-2"
            >
              <CollectionGLAMItems v-bind="galeri" type_collection="gallery" />
            </div>
          </div>
          <div class="flex items-center justify-center gap-3 w-full mt-8">
            <button
              class="btn bg-orange text-white py-0"
              @click="getGalleryPaginationData('previous')"
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
              @click="getGalleryPaginationData('next')"
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
  </section>
</template>

<style scoped>
.gallery-collection {
  --at-apply: flex w-full flex-col gap-3 sm:(grid grid-cols-3) lg:(grid grid-cols-4 gap-10);
}

.navigation-area {
  --at-apply: flex items-center justify-center gap-3 w-full mt-8;
}

section {
  --at-apply: max-w-7xl ma;
}
</style>
