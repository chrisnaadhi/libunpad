<script setup>
const i18n = useI18n();

const { data: bookCollection } = await useFetch("/api/v1/koleksi/ulims?search=unpad");

const libraryObj = {
  title: "Library",
  definition: "(noun) /'laɪ.brer.i/",
  imageUrl: "undraw_Books.png",
  titleDesc: computed(() => i18n.t("libraryDescription")),
};

const defaultImage = "/images/no-image.jpg";
const path = useRoute();
</script>

<template>
  <section>
    <GenericBaseGlamLayout v-bind="libraryObj" />
    <div class="max-w-6xl ma bg-gray-1 rounded-lg rounded-rt-lg p-4">
      <div class="p-4">
        <h1 class="text-4xl text-center">{{ libraryObj.title }}</h1>
        <p class="text-justify">
          {{ libraryObj.titleDesc.value }}
        </p>
      </div>
      <div class="p-4 flex flex-col items-center">
        <h3>Koleksi {{ libraryObj.title }} Pilihan Kami</h3>
        <div class="my-5 flex flex-col gap-5 w-full lg:(grid grid-cols-2 gap-3)">
          <div class="bg-white p-5 rounded flex w-full h-full gap-5" v-for="koleksi in bookCollection.results">
            <NuxtLink :to="'/library/biblio/' + koleksi?.biblioId">
              <NuxtImg
                :src="koleksi?.image === undefined || koleksi?.image === null || koleksi?.image === '' ? '/images/default_cover.png' : `https://kandaga.unpad.ac.id:8010/lib/minigalnano/createthumb.php?filename=images/docs/${koleksi.image}&width=240`"
                class="w-full h-40 object-cover rounded-lg lg:(w-50 h-60) transition duration-300 ease-in-out hover:scale-110" />
            </NuxtLink>
            <div class="flex flex-col justify-between gap-3 w-full h-full">
              <div class="flex flex-col gap-3">
                <NuxtLink :to="'/library/biblio/' + koleksi?.biblioId" class="no-underline w-full">
                  <h4 class="bg-orange-1 px-3 rounded text-orange" :title="koleksi?.title">{{
      trimTitle(koleksi?.title, 25) }}</h4>
                </NuxtLink>
                <div class="flex w-full gap-4 pl-2">
                  <div>
                    <p class="font-semibold text-gray-5">Penulis</p>
                    <p class="font-semibold text-gray-5">ISBN</p>
                    <p class="font-semibold text-gray-5">Klasifikasi</p>
                    <p class="font-semibold text-gray-5">Lokasi</p>
                  </div>
                  <div>
                    <p>: {{ koleksi?.author ?? "Belum ada data" }}</p>
                    <p>: {{ koleksi?.isbnIssn ?? "Tidak diketahui" }}</p>
                    <p>: {{ koleksi?.classification ?? "Belum ada data" }}</p>
                    <p>: {{ koleksi?.node ?? "Belum ada data" }}</p>
                  </div>
                </div>
              </div>

              <NuxtLink class="btn bg-orange text-white text-center py-1" :to="`https://kandaga.unpad.ac.id:8010/index.php?p=show_detail&id=${koleksi?.biblioId}`" target="_blank">
                Lihat</NuxtLink>
            </div>
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