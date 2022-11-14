<template>
  <section class="container ma bg-gray-50 mb-15">
    <div class="hero-space">
      <div class="hero-left">
        <h2 class="text-xl font-700 md:text-4xl text-gray-700">
          Selamat Datang di
        </h2>
        <h1 class="uglam text-5xl font-700 sm:text-7xl md:text-8xl lg:text-9xl">
          KANDAGA
        </h1>
        <p class="text-sm md:text-xl font-500 text-gray-700 font-italic">
          <span class="text-orange-6">Universitas Padjadjaran</span>'s Gallery,
          Library, Archive, Museum & Repository
        </p>
        <p class="py-2 text-xs xl:(mr-6)">
          Deskripsi disini seperti Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Molestiae vel sint, animi dolorum error adipisci id
          fuga praesentium tenetur nemo!
        </p>
        <GenericSearch />
        <div class="container flex justify-center w-full xl:justify-start">
          <NuxtLink to="/visitor" class="btn tentang">Visitor</NuxtLink>
          <NuxtLink to="/koleksi" class="btn bantuan">Koleksi</NuxtLink>
        </div>
      </div>
      <div class="mt-6 xl:mt-0 flex items-center justify-center">
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
  background-image: url("/images/lib.gif");
  /* width: 450px;
  height: 300px; */
  background-repeat: no-repeat;
  background-position: right;
  background-size: cover;
  box-shadow: 0 0 18px 18px white inset;
  --at-apply: hidden xl:block;
}

.hero-space {
  --at-apply: flex flex-col-reverse mx-3 max-w-7xl xl:(flex-row items-center justify-center ma p-15);
}

.hero-left {
  --at-apply: flex flex-col items-center text-center xl:(text-left items-unset);
}

.uglam {
  --at-apply: bg-clip-text text-transparent bg-gradient-to-br from-orange-500 to-gray-500;
  font-family: "Kanit", system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.tentang {
  --at-apply: bg-orange-500 px-6 py-2 text-white no-underline mr-2 md:w-auto;
}

.bantuan {
  --at-apply: bg-dark-500 px-6 py-2 text-white no-underline ml-2 md:w-auto;
}
</style>
