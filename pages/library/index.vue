<script setup>
const { t } = useI18n();

const { data: bookCollection } = await useFetch("/api/v1/koleksi/pustaka", {
  query: { glam_type: "library", status: "published", access_level: "public" },
});

const libraryObj = {
  title: computed(() => t("libraryTitle")),
  definition: "(noun) /'laɪ.brer.i/",
  imageUrl: "undraw_Books.png",
  titleDesc: computed(() => t("libraryDescription")),
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
        <div
          class="my-5 flex flex-col gap-5 w-full lg:(grid grid-cols-2 gap-3)"
        >
          <div
            class="bg-white p-5 rounded flex w-full h-full gap-5"
            v-for="koleksi in bookCollection?.data"
            :key="koleksi?.id"
          >
            <NuxtLink :to="'/koleksi/pustaka/' + koleksi?.id">
              <NuxtImg
                :src="koleksi?.thumbnail ?? '/images/default_cover.png'"
                class="w-full h-40 object-cover rounded-lg lg:(w-50 h-60) transition duration-300 ease-in-out hover:scale-110"
              />
            </NuxtLink>
            <div class="flex flex-col justify-between gap-3 w-full h-full">
              <div class="flex flex-col gap-3">
                <NuxtLink
                  :to="'/koleksi/pustaka/' + koleksi?.id"
                  class="no-underline w-full"
                >
                  <h4
                    class="bg-orange-1 px-3 rounded text-orange"
                    :title="koleksi?.title"
                  >
                    {{ trimTitle(koleksi?.title, 25) }}
                  </h4>
                </NuxtLink>
                <p class="text-sm text-gray-5 text-justify pl-2">
                  {{ koleksi?.description ? trimTitle(koleksi.description, 80) : "-" }}
                </p>
                <p class="text-xs text-gray-4 pl-2">{{ koleksi?.collection_code ?? "" }}</p>
              </div>

              <NuxtLink
                class="btn bg-orange text-white text-center py-1"
                :to="'/koleksi/pustaka/' + koleksi?.id"
              >
                Lihat</NuxtLink
              >
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
