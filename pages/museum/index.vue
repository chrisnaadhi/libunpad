<script setup>
const i18n = useI18n();

const museumObj = {
  title: "Museum",
  definition: "(noun) /mjuːˈziː.əm/",
  imageUrl: "undraw_search_app.png",
  titleDesc: computed(() => i18n.t("museumDescription")),
  museumDesc: "Museum GLAM atau yang lebih dikenal dengan Memorabilia Universitas GLAM yang diinisiasi pada Tahun 2019 dan dibuka untuk umum pada tahun 2022 yang terletak Gedung Grha Kandag lt 1 Institusi Informasi Pusat Pengelolaan Pengetahuan. Memorabilia sendiri mengacu pada Kamus Besar Bahasa Memorabilia GLAM ini menyimpan kenangan yang berbentuk ke-UNPAD-an, benda-benda kecil yang mengandung banyak sejarah di dalamnya. Memorabilia GLAM memegang peranan penting dalam regenerasi program yang ada karena dapat memberikan berbagai manfaat sosial dan budaya yang signifikan untuk lokasi dan tujuan dimana museum ini ditetapkan atau didirikan, contohnya ialah sebagai tempat menyimpan ‘memori’ bersama yang terbuka untuk Civitas Akademika maupun alumni karena digunakan sebagai bukti penyimpan kenang-kenangan orang-orang yang pernah berada di Lingkungan Universitas Padjadjaran, baik budaya mereka, mimpi bahkan harapan mereka sekalipun sehingga menimbulkan kesadaran untuk mengakui identitas dan rasa saling memiliki satu sama lain. ",
  branding: "GLAM's Memorabilia",
};

const defaultImage = "/images/no-image.jpg";
const path = useRoute();
</script>

<template>
  <section>
    <GenericBaseGlamLayout v-bind="museumObj" />
    <div class="max-w-6xl ma bg-gray-1 rounded-lg rounded-rt-lg p-4">
      <div class="p-4">
        <h1 class="text-4xl text-center">{{ museumObj.title }}</h1>
        <p class="text-justify">
          {{ museumObj.museumDesc }}
        </p>
      </div>
      <div class="p-4 flex flex-col items-center">
        <h3>Koleksi {{ museumObj.title }} Pilihan Kami</h3>
        <div class="grid grid-cols-2 gap-4 lg:flex">
          <NuxtLink v-for="val in museumObj?.results ?? 4" :to="museumObj ? '/koleksi/buku/' + val.slugs : path.path">
            <NuxtImg :src="val.cover ?? defaultImage" class="drop-shadow-lg rounded-lg" height="100%" width="180px"
              format="webp">
            </NuxtImg>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
