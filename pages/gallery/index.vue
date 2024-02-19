<script setup>
const i18n = useI18n();

const galleryObj = {
  title: "Gallery",
  definition: "(noun) /'gæl.ər.i/",
  imageUrl: "undraw_Picture.png",
  titleDesc: computed(() => i18n.t("galleryDescription")),
};

const defaultImage = "/images/no-image.jpg";
const path = useRoute();
</script>

<template>
  <section>
    <GenericBaseGlamLayout v-bind="galleryObj" />
    <div class="max-w-6xl ma bg-gray-1 rounded-lg rounded-rt-lg p-4">
      <div class="p-4">
        <h1 class="text-4xl text-center">{{ galleryObj.title }}</h1>
        <p class="text-justify">
          {{ galleryObj.titleDesc.value }}
        </p>
      </div>
      <div class="p-4 flex flex-col items-center">
        <h3>Koleksi {{ galleryObj.title }} Pilihan Kami</h3>
        <div class="grid grid-cols-2 gap-4 lg:flex">
          <NuxtLink v-for="val in galleryObj?.results ?? 4" :to="galleryObj ? '/koleksi/buku/' + val.slugs : path.path">
            <NuxtImg :src="val.cover ?? defaultImage" class="drop-shadow-lg rounded-lg" height="100%" width="180px"
              format="webp">
            </NuxtImg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
