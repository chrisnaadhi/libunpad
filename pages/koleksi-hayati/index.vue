<script setup>
const i18n = useI18n();
const { getItems } = useDirectusItems();

const getTotalDataTumbuhan = ref(
  await getItems(getGLAMCollectionsCount("koleksi_tumbuhan"))
);

const pageTotal = getTotalDataTumbuhan.value.meta.total_count;
const currentPage = ref(0);
const collectionList = ref();
const collectionTag = ref(null);
const filterKeyword = ref("");
const filterJenisKoleksi = ref("");

const filterTumbuhanData = async () => {
  currentPage.value = 0;
  if (filterKeyword.value !== "") {
    collectionList.value = [];
    collectionList.value = await getItems({
      collection: "koleksi_tumbuhan",
      params: {
        search: filterKeyword.value,
        limit: 12,
      },
    });
  } else if (filterJenisKoleksi.value !== "") {
    collectionList.value = [];
    collectionList.value = await getItems({
      collection: "koleksi_tumbuhan",
      params: {
        filter: {
          type: filterJenisKoleksi.value,
        },
        limit: 12,
      },
    });
  } else {
    alert("Kata Kunci wajib diisi!");
  }
};

const listTipeKoleksi = await getItems({
  collection: "koleksi_tumbuhan",
  params: {
    groupBy: "type",
    filter: {
      type: {
        _nnull: true,
      },
    },
  },
});

const resetFilter = async () => {
  currentPage.value = 0;
  filterKeyword.value = "";
  filterJenisKoleksi.value = "";
  collectionList.value = await getItems({
    collection: "koleksi_tumbuhan",
    params: {
      filter: {
        featured_image: {
          _nnull: true,
        },
      },
      sort: "-date_created",
      limit: 12,
      offset: 0,
    },
  });
};

const getTumbuhanPaginationData = async (opts) => {
  collectionTag.value.scrollIntoView();
  if (
    opts === "next" &&
    currentPage.value >= 0 &&
    currentPage.value < pageTotal
  ) {
    collectionList.value = [];
    currentPage.value = currentPage.value + 12;
    collectionList.value = await getItems({
      collection: "koleksi_tumbuhan",
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
      collection: "koleksi_tumbuhan",
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

const herbariumObj = {
  title: computed(() => i18n.t("koleksiHayatiTitle")),
  definition: "(noun) /'baɪəˈlɒʤɪkl kəˈlekʃn/",
  imageUrl: "undraw_Online_art.png",
  titleDesc: computed(() => i18n.t("koleksiHayatiDescription")),
};

const listKategoriKoleksiHayati = [
  {
    id: 1,
    namaKoleksi: "Koleksi Tumbuhan",
    ikon: "i-mdi-leaf",
    deskripsi:
      "Merupakan koleksi dari jenis tumbuhan yang terbagi menjadi dua tipe yaitu Herbarium dan Arboretum",
    url: "/koleksi-hayati/tumbuhan",
  },
  {
    id: 2,
    namaKoleksi: "Koleksi Hewan",
    ikon: "i-mdi-horse",
    deskripsi:
      "Merupakan koleksi dari jenis hewan yang terbagi menjadi dua tipe yaitu Vertebrata dan Invertebrata",
    url: "/koleksi-hayati/hewan",
  },
  {
    id: 3,
    namaKoleksi: "Koleksi Jamur",
    ikon: "i-mdi-mushroom",
    deskripsi:
      "Merupakan koleksi dari jenis jamur yang terbagi menjadi dua tipe yaitu Mycology dan Lichenology",
    url: "/koleksi-hayati/jamur",
  },
  {
    id: 4,
    namaKoleksi: "Koleksi Mikroorganisme",
    ikon: "i-mdi-bacteria",
    deskripsi:
      "Merupakan koleksi dari jenis mikroorganisme yang terbagi menjadi dua tipe yaitu Bacteria dan Virus",
    url: "/koleksi-hayati/mikroorganisme",
  },
];

const getKolektorHayati = await getItems({
  collection: "collector_hayati",
});

const findCollector = (id) => {
  const collector = getKolektorHayati.find((collector) => collector.id === id);
  return collector?.full_name;
};

onMounted(async () => {
  collectionList.value = await getItems({
    collection: "koleksi_tumbuhan",
    params: {
      filter: {
        featured_image: {
          _nnull: true,
        },
      },
      sort: "-date_created",
      limit: 12,
      offset: 0,
    },
  });

  console.log(collectionList.value);
});
</script>

<template>
  <section>
    <GenericBaseGlamLayout v-bind="herbariumObj" />
    <div class="max-w-7xl ma py-10">
      <h2 class="text-center py-5">Koleksi Hayati</h2>
      <div class="flex flex-col gap-5 px-5 md:(grid grid-cols-2)">
        <div
          class="hayati-category-card"
          v-for="kategori in listKategoriKoleksiHayati"
        >
          <div class="text-orange w-16 h-16" :class="kategori.ikon" />
          <h3>{{ kategori.namaKoleksi }}</h3>
          <p>
            {{ kategori.deskripsi }}
          </p>
          <div class="mt-5">
            <NuxtLink :to="kategori.url" class="btn bg-orange text-white">
              Lihat Koleksi
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-7xl ma py-10">
      <div ref="collectionTag">
        <h4 class="text-center py-5">Daftar Koleksi Hayati</h4>
      </div>
      <div class="flex gap-5">
        <div class="bg-orange-50 p-5 rounded-xl">
          <h6 class="text-center">Filter Koleksi</h6>
          <div class="input-block">
            <label for="keyword">Kata Kunci :</label>
            <input
              type="search"
              name="search"
              id="search"
              class="input-area"
              v-model="filterKeyword"
              @keyup.enter="filterTumbuhanData"
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
              <option v-for="tipe in listTipeKoleksi" :value="tipe.type">
                {{ tipe.type }}
              </option>
            </select>
          </div>
          <div class="input-block flex flex-col gap-2">
            <button
              class="btn bg-orange w-full text-white"
              @click="filterTumbuhanData"
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
        <div class="w-full">
          <div class="grid grid-cols-4 gap-4">
            <div
              class="bg-orange-50 p-5 rounded-xl flex flex-col"
              v-for="data in collectionList"
            >
              <div
                class="bg-orange text-white text-center px-2 py-0 rounded-lg mb-5"
              >
                {{ data.register_number }}
              </div>
              <NuxtImg
                :src="
                  data.featured_image
                    ? directusImageUrl(data.featured_image)
                    : '/images/no-image.jpg'
                "
                class="w-full max-h-75 object-cover rounded-2xl hover:scale-110"
                format="webp"
              />
              <div class="py-5 h-full flex flex-col gap-2 justify-between">
                <NuxtLink
                  :href="'/koleksi-hayati/tumbuhan/' + data.id"
                  class="no-underline text-orange hover:text-orange-6"
                >
                  <h4>{{ data.local_name ?? "Unknown" }}</h4>
                </NuxtLink>
                <div class="flex flex-col justify-between">
                  <div class="my-2 flex flex-col gap-1">
                    <p class="bg-orange-2 rounded text-orange-6 px-2">Tipe :</p>
                    <p class="px-2">{{ data.type }}</p>
                  </div>
                  <div class="my-2 flex flex-col gap-1">
                    <p class="bg-orange-2 rounded text-orange-6 px-2">
                      Lokasi :
                    </p>
                    <p class="px-2">{{ data.locality_or_location }}</p>
                  </div>
                  <div class="my-2 flex flex-col gap-1">
                    <p class="bg-orange-2 rounded text-orange-6 px-2">
                      Kolektor :
                    </p>
                    <p class="px-2">{{ findCollector(data.collector_id) }}</p>
                  </div>
                </div>
                <div class="mt-5">
                  <NuxtLink :href="'/koleksi-hayati/tumbuhan/' + data.id">
                    <button class="btn bg-orange text-white w-full">
                      Lihat Koleksi
                    </button>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center justify-center gap-3 w-full mt-8">
            <button
              class="btn bg-orange text-white py-0"
              @click="getTumbuhanPaginationData('previous')"
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
              @click="getTumbuhanPaginationData('next')"
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
.hayati-category-card {
  --at-apply: p-10 bg-orange-50 rounded-xl flex flex-col items-center
    text-center;
}
</style>
