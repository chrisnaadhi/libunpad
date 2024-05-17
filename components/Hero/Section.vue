<script setup>
const { locale } = useI18n();
const { getItems, getItemById } = useDirectusItems();
const config = useRuntimeConfig();

const getHighlight = await getItems({
  collection: "highlight_berita_depan",
})

const getBerita = await getItemById({
  collection: "artikel",
  id: getHighlight?.berita_highlight
})

const getThumbnail = (id) => {
  return `${config.public.directus.url}assets/${id}`
}
</script>

<template>
  <section class="max-w-6xl ma bg-white mb-0 h-full lg:(mb-15)">
    <div class="img-background" :style="`background-image: url(${getThumbnail(getBerita.gambar_unggulan)})`" />
    <div class="hero-space">
      <div class="hero-left">
        <div class="text-2xl font-600 md:text-4xl text-gray-700 ">
          <span class="uglam">KANDAGA</span>
        </div>
        <p class="text-sm md:text-xl font-500 text-gray-700 font-italic">
          <span class="text-orange-6 font-600">Universitas Padjadjaran</span>'s
          Gallery, Library, Archives & Museum (GLAMS)
        </p>
        <p class="py-2 text-sm xl:(mr-6 pr-8 px-20)">
          {{ $t("homeDescription") }}
        </p>
      </div>
      <!-- <div class="hero-right">
        <HeroCarousel />
      </div> -->
    </div>
    <div class="relative z-2 mt max-w-5xl ma mt--10 mb--6 px-10 z-4">
      <GenericSearch />
      <div class="flex justify-center w-full text-center xl:justify-start">
        <NuxtLink :to="locale === 'en' ? '/en/search' : '/search'" class="btn tentang w-full">
          {{ $t("searchPage") }}
        </NuxtLink>
        <NuxtLink :to="locale === 'en' ? '/en/koleksi' : '/koleksi'" class="btn bantuan w-full">
          {{ $t("ourCollection") }}
        </NuxtLink>
      </div>
      <div class="mt-5 px-3 bg-orange-50 text-dark text-center py-2 lg:(mt-30 rounded-full)">
        <p class="font-semibold">Berita Pilihan :</p>
        <NuxtLink class="px-2 transition-all-500 rounded hover:(bg-orange text-white py-0)"
          :href="beritaType(getBerita)">
          {{ getBerita.judul }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-space {
  --at-apply: bg-white opacity-85 flex flex-col-reverse max-w-7xl relative z-3 rounded-bl-xl rounded-br-xl pt-5 py-0 xl:(flex-row items-center justify-center py-5);
}

.img-background {
  background-image: url('/images/kandaga-bg.webp');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  --at-apply: h-md w-full left-0 absolute z-0 mt--3 opacity-70 lg:h-lg;
  box-shadow: 0 0 8px 8px rgb(255, 255, 255) inset;
}

.hero-left {
  --at-apply: flex flex-col items-center text-center justify-center px-10 pb-10;
}

.hero-right {
  --at-apply: mt-6 xl:mt-0 flex items-center justify-center;
}

.uglam {
  --at-apply: bg-clip-text text-transparent text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-700 bg-gradient-to-br from-orange-500 to-gray-500;
  font-family: "Cormorant Garamond", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.tentang {
  --at-apply: bg-orange text-xs px-2 py-2 text-white font-600 no-underline mr-2 md:(px-6);
}

.bantuan {
  --at-apply: bg-white text-xs px-2 border px-6 py-2 text-gray-7 font-600 no-underline ml-2 transition-all-500 md:(px-6) hover:(bg-gray-6 text-white border-gray);
}
</style>
