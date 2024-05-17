<script setup>
const i18n = useI18n();
const { getItems } = useDirectusItems();

const galleryObj = {
  title: i18n.t("galleryTitle"),
  definition: "(noun) /'gæl.ər.i/",
  imageUrl: "undraw_Picture.png",
  titleDesc: computed(() => i18n.t("galleryDescription")),
};

const getGalleryDataHighlight = await getItems({
  collection: "koleksi_gallery",
  params: {
    limit: 4
  }
})

const getAllGalleryCollection = await getItems({
  collection: "koleksi_gallery",
  params: {
    sort: "-date_created"
  }
})

const { getThumbnail: img } = useDirectusFiles();

const defaultImage = "/images/no-image.jpg";
const path = useRoute();
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
        <div class="my-5 grid grid-cols-2 gap-3">
          <div class="bg-white p-5 rounded flex w-full h-full gap-5" v-for="galeri in getGalleryDataHighlight">
            <NuxtImg :src="img(galeri.thumbnail)" class="w-50 h-60 object-cover rounded-lg" />
            <div class="flex flex-col justify-around gap-3 w-full">
              <div class="flex">
                <NuxtLink :to="'/gallery/' + galeri.id" class="no-underline">
                  <h4 class="bg-orange-1 px-3 rounded text-orange">{{ galeri.judul }}</h4>
                </NuxtLink>
              </div>
              <div class="flex flex-col w-full pl-2">
                <span v-html="galeri.keterangan_koleksi"></span>
                <p class="text-sm text-gray-5">Pembuat: {{ galeri.pembuat_koleksi ?? "Belum ada data" }}</p>
                <p class="text-sm text-gray-5">Dibuat pada: {{ galeri.tanggal_dibuat }}</p>
                <p class="text-sm text-gray-5">Pengelola : {{ galeri.lembaga_penanggungjawab }}</p>
              </div>
              <NuxtLink class="btn bg-orange text-white text-center py-1" :to="'/gallery/' + galeri.id">Lihat</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-10 flex flex-col items-center justify-evenly">
      <h3 class="text-center mb-5">Daftar Koleksi Galeri</h3>
      <div class="grid grid-cols-4 gap-10">
        <div v-for="galeri in getAllGalleryCollection" class="max-w-50 text-center flex flex-col gap-2">
          <NuxtImg :src="img(galeri.thumbnail)" class="w-50 h-80 object-cover rounded-xl" />
          <NuxtLink :to="'/gallery/' + galeri.id" class="no-underline bg-orange-50 font-semibold transition-all-500 rounded-md hover:(bg-orange text-white)" :title="galeri.judul">
            {{ trimTitle(galeri.judul, 20) }}
          </NuxtLink>
          <p class="text-sm text-gray mt--2">{{ galeri.tanggal_dibuat ?? "-" }}</p>
          <div>
            <NuxtLink class="bg-orange text-white px-4 py-0 text-sm rounded no-underline" :to="'/gallery/' + galeri.id">
              Lihat
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}
</style>