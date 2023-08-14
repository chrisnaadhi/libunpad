<script setup>
defineProps({
  title: {
    type: String,
  },
  definition: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  titleDesc: {
    type: Object,
  },
  branding: {
    type: String,
  },
  collectionObj: {
    type: Object,
  },
  linkCollection: {
    type: String,
  },
});

const defaultImage = "/images/no-image.jpg";
const path = useRoute();
</script>

<template>
  <section>
    <div class="py-5">
      <div class="header-section">
        <div class="max-w-2xl w-full">
          <h1 class="text-4xl">
            {{ title }}<span class="text-base"> (EN)</span>
          </h1>
          <p>
            <span class="italic">
              {{ definition }}
            </span>
            <br />
            {{ titleDesc.value }}
          </p>
          <GenericSearch />
        </div>
        <div>
          <NuxtImg
            :src="'/illustration/' + imageUrl"
            height="250px"
            format="webp"
          />
        </div>
      </div>
    </div>
    <div class="max-w-6xl ma bg-gray-1 rounded-lg rounded-rt-lg p-4">
      <div class="p-4">
        <h1 class="text-4xl text-center">{{ branding ?? title }}</h1>
        <p class="text-justify">
          {{ titleDesc.value }}
        </p>
      </div>
      <div class="p-4 flex flex-col items-center">
        <h3>Koleksi {{ title }} Pilihan Kami</h3>
        <div class="grid grid-cols-2 gap-4 lg:flex">
          <NuxtLink
            v-for="val in collectionObj?.results ?? 4"
            :to="collectionObj ? '/koleksi/buku/' + val.slugs : path.path"
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

<style scoped>
h3 {
  --at-apply: text-center text-xl;
}

section {
  --at-apply: w-full px-8 pb-5 xl:px-0;
}

.header-section {
  --at-apply: max-w-5xl ma flex flex-col-reverse xl:flex-row items-center justify-between;
}
</style>
