<template>
  <section class="container ma bg-gray-50 mb-15">
    <div class="hero-space">
      <div class="hero-left">
        <h2 class="text-xl md:text-4xl text-gray-700">Selamat Datang di</h2>
        <h1 class="uglam text-5xl font-700 sm:text-7xl md:text-8xl lg:text-9xl">
          KANDAGA
        </h1>
        <p class="text-sm md:text-xl font-500 text-gray-700 font-italic">
          <span class="text-orange-6 font-600">Universitas Padjadjaran</span>'s
          Gallery, Library, Archive, Museum & Repository
        </p>
        <p class="py-2 text-xs xl:(mr-6 pr-8)">
          Kandaga merupakan platform yang menyediakan katalog koleksi dan sistem
          penelusuran ke sumber-sumber informasi yang dimiliki dan dilanggan
          oleh Universitas Padjadjaran. Kandaga dikelola oleh Pusat Pengelolaan
          Pengetahuan Unpad.
        </p>
        <GenericSearch />
        <div class="container flex justify-center w-full xl:justify-start">
          <NuxtLink to="/search" class="btn tentang">Pencarian</NuxtLink>
          <NuxtLink to="/koleksi" class="btn bantuan">Koleksi</NuxtLink>
        </div>
      </div>
      <div class="hero-right">
        <div
          class="hero-img w-full h-32 xl:h-86 xl:w-md"
          title="GLAM Kandaga"
        ></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-img {
  background-image: url("/images/kandaga-bg.png");
  /* width: 450px;
  height: 300px; */
  background-repeat: no-repeat;
  background-position: right;
  background-size: cover;
  box-shadow: 0 0 15px 20px rgba(249, 250, 251) inset;
  --at-apply: hidden xl:block bg-gray-50;
}

.hero-space {
  --at-apply: flex flex-col-reverse mx-3 max-w-7xl xl:(flex-row items-center justify-center ma p-15);
}

.hero-left {
  --at-apply: flex flex-col items-center text-center xl:(text-left items-unset);
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
