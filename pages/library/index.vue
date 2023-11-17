<script setup>
const i18n = useI18n();

const { data } = await useFetch("/api/v1/koleksi/buku");

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
        <div class="grid grid-cols-2 gap-4 lg:flex">
          <NuxtLink
            v-for="val in libraryObj?.results ?? 4"
            :to="libraryObj ? '/koleksi/buku/' + val.slugs : path.path"
          >
            <NuxtImg
              :src="val.cover ?? defaultImage"
              class="drop-shadow-lg rounded-lg"
              height="100%"
              width="180px"
              format="webp"
            >
            </NuxtImg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
