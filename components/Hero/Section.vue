<script setup>
const { locale } = useI18n();
</script>

<template>
  <section class="container ma bg-white mb-15 h-full">
    <div class="img-background" />
    <div class="hero-space">
      <div class="hero-left">
        <h2 class="text-xl md:text-4xl text-gray-700">
          {{ $t("introWelcome") }}
        </h2>
        <h1 class="uglam text-5xl font-700 sm:text-7xl md:text-8xl lg:text-9xl">
          KANDAGA
        </h1>
        <p class="text-sm md:text-xl font-500 text-gray-700 font-italic">
          <span class="text-orange-6 font-600">Universitas Padjadjaran</span>'s
          Gallery, Library, Record Management & Museum (GLAMS)
        </p>
        <p class="py-2 text-sm xl:(mr-6 pr-8)">
          {{ $t("homeDescription") }}
        </p>
      </div>
      <!-- <div class="hero-right">
        <HeroCarousel />
      </div> -->
    </div>
    <div class="relative z-2 mt">
      <GenericSearch />
      <div class="container flex justify-center w-full xl:justify-start">
        <NuxtLink
          :to="locale === 'en' ? '/en/search' : '/search'"
          class="btn tentang"
        >
          {{ $t("searchPage") }}
        </NuxtLink>
        <NuxtLink
          :to="locale === 'en' ? '/en/koleksi' : '/koleksi'"
          class="btn bantuan"
        >
          {{ $t("ourCollection") }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-space {
  --at-apply: bg-white opacity-70 flex flex-col-reverse mx-3 max-w-7xl relative z-3 xl:(flex-row items-center justify-center py-5 mx-65);
}

.img-background {
  background-image: url('images/kandaga-bg.webp');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  --at-apply: h-full max-h-lg w-full left-0 absolute z-1 opacity-25;
}

.hero-left {
  --at-apply: flex flex-col items-center text-center justify-center px-10 pb-20;
}

.hero-right {
  --at-apply: mt-6 xl:mt-0 flex items-center justify-center;
}

.uglam {
  --at-apply: bg-clip-text text-transparent bg-gradient-to-br from-orange-500 to-gray-500;
  font-family: "Kanit", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.tentang {
  --at-apply: bg-orange px-6 py-2 text-white font-600 no-underline mr-2 md:w-auto;
}

.bantuan {
  --at-apply: bg-gray-2 border px-6 py-2 text-gray-7 font-600 no-underline ml-2 transition-all-500 md:w-auto hover:(bg-gray-6 text-white);
}
</style>
