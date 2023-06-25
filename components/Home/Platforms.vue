<script setup>
const { currentTime } = useCurrentTime();
const { locale } = useI18n();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
</script>

<template>
  <div class="dummy">
    <div class="background-block">
      <div class="tanggal">
        <p>{{ currentTime.toLocaleDateString("id-ID", options) }}</p>
      </div>
      <h1 class="text-2xl font-600 sm:text-4xl">
        {{ $t("usingPlatform") }}
      </h1>
      <p>{{ $t("usingPlatformDescription") }}</p>
    </div>
    <section class="content-wrapper">
      <NuxtLink
        :to="locale === 'id' ? '/gallery' : '/en/gallery'"
        class="content"
      >
        <p class="use-banner">Platform</p>
        <div class="i-mdi-theater w-24 h-24" />
        <h1>Gallery</h1>
      </NuxtLink>
      <NuxtLink
        :to="locale === 'id' ? '/library' : '/en/library'"
        class="content"
      >
        <p class="use-banner">Platform</p>
        <div class="i-mdi-bookshelf w-24 h-24" />
        <h1>Library</h1>
      </NuxtLink>
      <NuxtLink
        :to="locale === 'id' ? '/records' : '/en/records'"
        class="content"
      >
        <p class="use-banner">Platform</p>
        <div class="i-mdi-archive-sync w-24 h-24" />
        <h1>Records</h1>
      </NuxtLink>
      <NuxtLink
        :to="locale === 'id' ? '/museum' : '/en/museum'"
        class="content"
      >
        <p class="use-banner">Platform</p>
        <div class="i-mdi-bank w-24 h-24" />
        <h1>Museum</h1>
      </NuxtLink>
    </section>
    <section
      class="max-w-7xl flex flex-col gap-4 mt-3 md:(grid grid-cols-2) xl:(flex flex-row justify-center)"
    >
      <NuxtLink
        :to="locale === 'id' ? '/koleksi/repository' : '/en/koleksi/repository'"
        class="extra-content"
      >
        <div class="i-mdi-book-education w-8 h-8" />
        <h6>Repository</h6>
      </NuxtLink>
      <NuxtLink
        :to="locale === 'id' ? '/herbarium' : '/en/herbarium'"
        class="extra-content"
      >
        <div class="i-mdi-leaf w-8 h-8" />
        <h6>Herbarium</h6>
      </NuxtLink>
      <NuxtLink class="extra-content">
        <div class="i-mdi-map-search w-8 h-8"></div>
        <h6>Indigenous Knowledge</h6>
      </NuxtLink>
      <NuxtLink class="extra-content">
        <div class="i-mdi-book-education w-8 h-8"></div>
        <h6>Learning Center</h6>
      </NuxtLink>
    </section>
    <section class="lib-content">
      <div class="i-mdi-file-document-edit w-8 h-8"></div>
      <h4>Library, Learning and Administration Services</h4>
    </section>
  </div>
</template>

<style scoped>
.dummy {
  text-align: center;
  background-image: url("/images/background-platform.webp");
  background-position: center;
  background-size: cover;
  box-shadow: 0px 25px 15px rgb(255, 255, 255) inset, 0px -25px 15px rgb(255, 255, 255) inset;
  --at-apply: bg-white w-full flex flex-col items-center;
}

.background-block {
  --at-apply: w-full text-dark bg-white py-5 transition-all-500 flex flex-col items-center justify-center px-5 cursor-default xl:(w-6xl mt--16 rounded-xl) hover:(bg-orange-5 text-white transition-all-500) ;
}

.background-block:hover .tanggal {
  --at-apply: bg-gray-1 text-dark transition-all-500;
}

.tanggal {
  --at-apply: mb-4 py-2 px-4 mt--5 min-w-32 font-600 bg-orange text-white transition-all-500 rounded-b-lg;
}

.content-wrapper {
  --at-apply: mt-5 max-w-6xl flex flex-1 flex-wrap justify-evenly items-center md:mt-8 xl:(mt-2 flex-nowrap);
}

.content {
  --at-apply: bg-white min-w-65 grow min-h-65 mx-10 my-2 rounded-md flex flex-col items-center justify-center transition-all-500 cursor-pointer sm:(w-xs mx-5) xl:(w-1/5 mx-2);
}

.content:hover {
  --at-apply: bg-orange text-white;
}
.use-banner {
  --at-apply: text-xs bg-orange text-white px-4 rounded;
}

.content:hover > .use-banner {
  --at-apply: transition-all-500 bg-white text-orange;
}

.extra-content {
  --at-apply: bg-white p-5 flex items-center justify-center rounded min-w-65 transition-all-500 hover:(bg-orange text-white);
}

.lib-content {
  --at-apply: flex flex-col items-center mt-5 mb-10 bg-white p-4 mx-10 rounded transition-all xl:(w-272) hover:(bg-orange text-white);
}


h1 {
  --at-apply: text-2xl;
}
</style>
