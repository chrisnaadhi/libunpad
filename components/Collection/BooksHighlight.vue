<script setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
const route = useRoute();
const autoValue = ref(true);

const { data: bookItems } = await useFetch("/api/v1/koleksi/buku");
const { data: unpadBooks } = await useFetch("/api/v1/koleksi/pustaka", {
  query: { glam_type: "library", status: "published", access_level: "public" },
});
const options = {
  rewind: true,
  autoplay: autoValue.value,
  interval: 2500,
};
</script>

<template>
  <section class="books-collection">
    <div class="my-5 flex flex-col gap-5 w-full lg:(grid grid-cols-3 gap-3)">
      <div
        class="bg-gray-1 p-5 rounded flex w-full h-full gap-5"
        v-for="koleksi in unpadBooks?.data"
        :key="koleksi?.id"
      >
        <NuxtLink :to="'/koleksi/pustaka/' + koleksi?.id">
          <NuxtImg
            :src="koleksi?.thumbnail ?? '/images/default_cover.png'"
            class="w-full h-40 object-cover rounded-lg lg:(w-50 h-60) transition duration-300 ease-in-out hover:scale-110"
            :alt="koleksi?.title"
          />
        </NuxtLink>
        <div class="flex flex-col justify-between gap-3 w-full h-full">
          <div class="flex flex-col gap-3">
            <NuxtLink
              :to="'/koleksi/pustaka/' + koleksi?.id"
              class="no-underline w-full"
            >
              <h4
                class="bg-yellow-1 px-3 rounded text-unpad"
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
            class="btn bg-unpad text-white text-center py-1"
            :to="'/koleksi/pustaka/' + koleksi?.id"
          >
            Lihat</NuxtLink
          >
        </div>
      </div>
    </div>
  </section>
  <Splide :options="options" class="inline md:hidden">
    <SplideSlide v-for="buku in bookItems.results">
      <CollectionBookCard
        :key="buku.id"
        :title="buku.judul"
        :author="buku.author"
        :description="buku.description"
        :banner="buku.tipe"
        :cover="buku.cover"
        :url-book="route.path + '/buku/' + buku?.slugs"
        :banner-color="backgroundBanner(buku.tipe)"
      />
    </SplideSlide>
  </Splide>
</template>

<style scoped>
.books-collection {
  --at-apply: ma grid hidden sm:(grid-cols-2) md:(inline grid-cols-3);
}

.splide__pagination__page.is-active {
  --at-apply: bg-unpad;
}

.splide__pagination__page {
  --at-apply: bg-gray;
}

.splide__arrow {
  --at-apply: bg-yellow-3;
}
</style>
