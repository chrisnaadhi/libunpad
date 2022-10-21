<script setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
const route = useRoute();
const autoValue = ref(true);

const { data: bookItems } = await useFetch("/api/v1/koleksi/buku");
const options = {
  rewind: true,
  autoplay: autoValue.value,
  interval: 2500,
};
</script>

<template>
  <section class="books-collection">
    <CollectionBookCard
      v-for="buku in bookItems.results"
      :key="buku.id"
      :title="buku.judul"
      :author="buku.author"
      :description="buku.description"
      :banner="buku.tipe"
      :cover="buku.cover"
      :url-book="route.path + '/buku/' + buku?.slugs"
      :banner-color="backgroundBanner(buku.tipe)"
    />
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
  --at-apply: container ma grid grid-gap-7 hidden sm:(grid-cols-2) md:(flex inline grid-cols-4);
}

.splide__pagination__page.is-active {
  --at-apply: bg-orange;
}

.splide__pagination__page {
  --at-apply: bg-gray;
}

.splide__arrow {
  --at-apply: bg-orange-3;
}
</style>
