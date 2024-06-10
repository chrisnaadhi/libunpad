<script setup>
const i18n = useI18n();
const { getItems } = useDirectusItems();
const { getThumbnail: img } = useDirectusFiles();

const getTotalDataMuseum = ref(await getItems({
  collection: "koleksi_museum",
}))

const pageTotal = getTotalDataMuseum.value.length
const currentPage = ref(0);
const collectionList = ref();
const collectionTag = ref(null);

const museumObj = {
  title: "Museum",
  definition: "(noun) /mjuːˈziː.əm/",
  imageUrl: "undraw_search_app.png",
  titleDesc: computed(() => i18n.t("museumDescription"))
};

const getMuseumDataHighlight = await getItems({
  collection: "koleksi_museum",
  params: {
    limit: 4
  }
})

const getMuseumPaginationData = async (opts) => {
  collectionTag.value.scrollIntoView()
  if (opts === 'next' && currentPage.value >= 0 && currentPage.value < pageTotal) {
    collectionList.value = [];
    currentPage.value = currentPage.value + 12;
    collectionList.value = await getItems({
      collection: "koleksi_museum",
      params: {
        sort: "-date_created",
        limit: 12,
        offset: currentPage.value
      }
    })
  } else if (opts === 'previous' && currentPage.value !== 0) {
    collectionList.value = [];
    currentPage.value = currentPage.value - 12;
    collectionList.value = await getItems({
      collection: "koleksi_museum",
      params: {
        sort: "-date_created",
        limit: 12,
        offset: currentPage.value
      }
    })
  } else {
    alert("Nothing Happened!")
  }
}

onMounted(async () => {
  collectionList.value = await getItems({
    collection: "koleksi_museum",
    params: {
      sort: "-date_created",
      limit: 12,
      offset: 0
    }
  })
})
</script>

<template>
  <section>
    <GenericBaseGlamLayout v-bind="museumObj" />
    <div class="max-w-6xl ma bg-gray-1 rounded-lg rounded-rt-lg p-4">
      <div class="p-4">
        <h1 class="text-4xl text-center">{{ museumObj.title }}</h1>
      </div>
      <div class="p-4 flex flex-col items-center">
        <h3>Koleksi {{ museumObj.title }} Pilihan Kami</h3>
        <div class="my-5 flex flex-col gap-5 lg:(grid grid-cols-2 gap-3) w-full">
          <div class="bg-white p-5 rounded flex w-full h-full gap-5" v-for="museum in getMuseumDataHighlight">
            <NuxtLink :to="'/museum/' + museum.id">
              <NuxtImg :src="img(museum.thumbnail)" format="webp"
                class="w-full h-40 object-cover rounded-lg lg:(w-50 h-60) transition duration-300 ease-in-out hover:scale-110" />
            </NuxtLink>
            <div class="flex flex-col justify-around gap-3 w-full">
              <div class="flex">
                <NuxtLink :to="'/museum/' + museum.id" class="no-underline w-full">
                  <h4 class="bg-orange-1 px-3 rounded text-orange" :title="museum.judul">{{ trimTitle(museum.judul, 25) }}</h4>
                </NuxtLink>
              </div>
              <div class="flex flex-col w-full pl-2">
                <p class="text-sm text-gray-5">Pembuat: {{ museum.pembuat_koleksi ?? "Belum ada data" }}</p>
                <p class="text-sm text-gray-5">Dibuat pada: {{ museum.tanggal_dibuat ?? "Tidak diketahui" }}</p>
                <p class="text-sm text-gray-5">Pengelola : {{ museum.lembaga_penanggungjawab }}</p>
              </div>
              <NuxtLink class="btn bg-orange text-white text-center py-1" :to="'/museum/' + museum.id">Lihat</NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div class="my-10 flex flex-col items-center justify-evenly w-full">
        <h3 class="text-center mb-5" ref="collectionTag">Daftar Koleksi Museum</h3>
        <h5 class="text-center mb-5">Total Koleksi Museum: {{ pageTotal }}</h5>
        <div v-if="collectionList?.length === 0">
          <p>Sedang memuat koleksi...</p>
        </div>
        <div class="museum-collection" v-else>
          <div v-for="museum in collectionList" class="max-w-50 text-center flex flex-col gap-2">
            <CollectionGLAMItems v-bind="museum" type_collection="museum" />
          </div>
        </div>
        <div class="flex items-center justify-center gap-3 w-full mt-8">
          <button class="btn bg-orange text-white py-0" @click="getMuseumPaginationData('previous')"
            :disabled="currentPage === 0">Sebelumnya</button>
          <p>{{ currentPage == 0 ? "1" : Math.ceil((currentPage / 12) + 1) }} / {{ Math.ceil(pageTotal / 12) }}</p>
          <button class="btn bg-orange text-white py-0" @click="getMuseumPaginationData('next')"
            :disabled="Math.ceil((currentPage / 12) + 1) === Math.ceil(pageTotal / 12)">Selanjutnya</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.museum-collection {
  --at-apply: flex flex-col gap-3 sm:(grid grid-cols-3) lg:(grid grid-cols-4 gap-10);
}

.navigation-area {
  --at-apply: flex items-center justify-center gap-3 w-full mt-8;
}

section {
  --at-apply: max-w-7xl ma;
}
</style>
