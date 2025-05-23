<script setup>
const { currentTime } = useCurrentTime();
const { locale } = useI18n();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const viewStateGallery = ref(false);
const viewStateLibrary = ref(false);
const viewStateArchive = ref(false);
const viewStateMuseum = ref(false);
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
        :to="locale === 'id' ? '/library' : '/en/library'"
        class="content"
        @mouseenter="viewStateLibrary = true"
        @mouseleave="viewStateLibrary = false"
      >
        <div
          v-show="viewStateLibrary === false"
          class="flex flex-col items-center"
        >
          <p class="use-banner">Platform</p>
          <div class="i-mdi-bookshelf w-24 h-24" />
          <h1>Library</h1>
        </div>

        <div v-show="viewStateLibrary === true" class="max-w-50">
          <p class="use-banner-hover">Library</p>
          <p class="text-xs">{{ $t("libraryDescription") }}</p>
        </div>
      </NuxtLink>
      <NuxtLink
        :to="locale === 'id' ? '/koleksi/repository' : '/en/koleksi/repository'"
        class="content"
        @mouseenter="viewStateGallery = true"
        @mouseleave="viewStateGallery = false"
      >
        <div
          v-show="viewStateGallery === false"
          class="flex flex-col items-center"
        >
          <p class="use-banner">Platform</p>
          <div class="i-mdi-book-education w-24 h-24" />
          <h1>Repository</h1>
        </div>

        <div
          v-show="viewStateGallery === true"
          class="flex flex-col items-center max-w-50"
        >
          <p class="use-banner-hover">Repository</p>
          <p class="text-xs">{{ $t("repositoryDescription") }}</p>
        </div>
      </NuxtLink>
      <NuxtLink
        :to="
          locale === 'id' ? '/panduan/akses-jurnal' : '/en/panduan/akses-jurnal'
        "
        class="content"
        @mouseenter="viewStateArchive = true"
        @mouseleave="viewStateArchive = false"
      >
        <div
          v-show="viewStateArchive === false"
          class="flex flex-col items-center"
        >
          <p class="use-banner">Platform</p>
          <div class="i-mdi-archive-sync w-24 h-24" />
          <h1>E-Resources</h1>
        </div>

        <div
          v-show="viewStateArchive === true"
          class="max-w-50 flex flex-col items-center"
        >
          <p class="use-banner-hover">E-Resources</p>
          <p class="text-xs">{{ $t("eJournalDescription") }}</p>
        </div>
      </NuxtLink>
      <NuxtLink
        :to="locale === 'id' ? '/kandaga' : '/en/kandaga/fasilitas'"
        class="content"
        @mouseenter="viewStateMuseum = true"
        @mouseleave="viewStateMuseum = false"
      >
        <div
          v-show="viewStateMuseum === false"
          class="flex flex-col items-center"
        >
          <p class="use-banner">Platform</p>
          <div class="i-mdi-bank w-24 h-24" />
          <h1>Fasilitas</h1>
        </div>

        <div
          v-show="viewStateMuseum === true"
          class="max-w-50 flex flex-col items-center"
        >
          <p class="use-banner-hover">Fasilitas</p>
          <p class="text-xs">{{ $t("facilityDescription") }}</p>
        </div>
      </NuxtLink>
    </section>
    <section
      class="max-w-6xl w-full px-5 flex flex-col gap-4 mt-3 md:(grid grid-cols-2) xl:(flex flex-row justify-center px-8)"
    >
      <NuxtLink
        :to="locale === 'id' ? '/gallery' : '/en/gallery'"
        class="extra-content"
      >
        <div class="i-mdi-theater w-8 h-8" />
        <h6>Gallery</h6>
      </NuxtLink>
      <NuxtLink
        :to="locale === 'id' ? '/museum' : '/en/museum'"
        class="extra-content"
      >
        <div class="i-mdi-theater w-8 h-8" />
        <h6>Museum</h6>
      </NuxtLink>
      <NuxtLink
        :to="locale === 'id' ? '/koleksi-hayati' : '/en/koleksi-hayati'"
        class="extra-content"
      >
        <div class="i-mdi-leaf w-8 h-8" />
        <h6>Koleksi Hayati</h6>
      </NuxtLink>
      <NuxtLink class="extra-content" to="/e-teater">
        <div class="i-mdi-book-education w-8 h-8"></div>
        <h6>E-Teater</h6>
      </NuxtLink>
    </section>
    <section class="w-full flex items-center justify-center">
      <NuxtLink to="/pengajuan" class="lib-content">
        <div class="i-mdi-file-document-edit w-8 h-8"></div>
        <h4>Library, Learning and Administration Services</h4>
      </NuxtLink>
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
  --at-apply: bg-white w-full flex flex-col items-center mt-12 md:mt-25;
}

.background-block {
  --at-apply: w-full text-dark bg-white py-5 flex flex-col items-center justify-center px-5 cursor-default z-2 xl:(w-6xl mt--16 rounded-xl) hover:(bg-yellow-5 text-white);
}

.background-block:hover .tanggal {
  --at-apply: bg-gray-1 text-dark;
}

.tanggal {
  --at-apply: mb-4 py-2 px-4 mt--5 min-w-32 font-600 bg-unpad text-white rounded-b-lg;
}

.content-wrapper {
  --at-apply: mt-5 max-w-6xl flex flex-1 flex-wrap justify-evenly items-center md:mt-8 xl:(mt-2 flex-nowrap);
}

.content {
  --at-apply: bg-white min-w-65 grow min-h-65 mx-10 my-2 rounded-md flex flex-col items-center justify-center cursor-pointer text-dark no-underline sm:(w-xs mx-5) xl:(w-1/5 mx-2);
}

.content:hover {
  --at-apply: bg-unpad text-white;
}

.use-banner {
  --at-apply: text-xs mb-1 bg-unpad text-white px-4 rounded;
}

.use-banner-hover {
  --at-apply: max-w-30 ma text-xs mb-2 bg-white text-unpad px-4 rounded;
}

.content:hover>.use-banner {
  --at-apply: bg-white text-unpad;
}

.extra-content {
  --at-apply: bg-white p-5 flex items-center justify-center rounded w-full text-dark no-underline hover:(bg-unpad text-white);
}

.lib-content {
  --at-apply: flex flex-col items-center mt-5 mb-10 bg-white text-dark no-underline p-3 mx-5 rounded xl:(w-272) hover:(bg-unpad text-white);
}


h1 {
  --at-apply: text-2xl;
}
</style>
