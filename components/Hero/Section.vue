<template>
  <section class="bg-gray-50 max-w-screen mb-15">
    <div
      class="mx-12 flex flex-col-reverse xl:(flex flex-row max-w-7xl ma justify-between p-15)"
    >
      <div
        class="flex flex-col items-center text-center xl:(text-left items-unset)"
      >
        <h2 class="text-2xl md:text-4xl text-gray-700">Selamat Datang di</h2>
        <h1 class="uglam text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          KANDAGA UNPAD
        </h1>
        <p class="text-xl md:text-2xl font-medium text-gray-700">
          Pusat Pengelolaan Pengetahuan Universitas Padjadjaran
        </p>
        <p class="py-2 mr-6 text-sm">
          Deskripsi disini seperti Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Molestiae vel sint, animi dolorum error adipisci id
          fuga praesentium tenetur nemo!
        </p>
        <GenericSearch />
        <div class="container flex justify-start w-full">
          <a href="#" class="btn tentang">Tentang Kami</a>
          <a href="#" class="btn bantuan">Bantuan</a>
        </div>
      </div>
      <div class="mt-6 xl:mt-0 flex items-center justify-center">
        <div class="hero-img w-full h-32 xl:h-86 xl:w-md"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-img {
  background-image: url("https://media3.giphy.com/media/7E8lI6TkLrvvAcPXso/200.gif");
  /* width: 450px;
  height: 300px; */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: 0 0 18px 18px white inset;
}

.uglam {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500;
}

.tentang {
  @apply bg-blue-500 px-6 py-2 text-white no-underline mr-2 w-full md:w-auto;
}

.bantuan {
  @apply bg-green-500 px-6 py-2 text-white no-underline ml-2 w-full md:w-auto;
}
</style>
