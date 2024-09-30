<script setup>
const i18n = useI18n();
const { getItems } = useDirectusItems();

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

const getKoleksiHayati = await getItems({
  collection: "koleksi_tumbuhan",
  params: {
    limit: 12,
    filter: {
      status: "published",
    },
    sort: "register_number",
  },
});

const getKolektorHayati = await getItems({
  collection: "collector_hayati",
});

const findCollector = (id) => {
  const collector = getKolektorHayati.find((collector) => collector.id === id);
  return collector.full_name;
};
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
      <div>
        <h4 class="text-center py-5">Daftar Koleksi Hayati</h4>
      </div>
      <div class="flex gap-5">
        <div class="bg-orange-50 p-5 rounded-xl">
          <h6 class="text-center">Filter Koleksi</h6>
          <div class="input-block">
            <label for="keyword">Kata Kunci :</label>
            <input type="search" name="keyword" />
          </div>
        </div>
        <div class="w-full">
          <div class="grid grid-cols-4 gap-4">
            <div
              class="bg-orange-50 p-5 rounded-xl"
              v-for="data in getKoleksiHayati"
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
              <div class="py-5 flex flex-col gap-2 justify-between">
                <NuxtLink
                  :href="'/koleksi-hayati/tumbuhan/' + data.id"
                  class="no-underline text-orange hover:text-orange-6"
                >
                  <h4>{{ data.local_name ?? "Unknown" }}</h4>
                </NuxtLink>
                <div>
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
