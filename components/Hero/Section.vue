<template>
  <section class="bg-white dark:bg-gray-800 max-w-screen">
    <div class="max-w-7xl ma py-24 flex justify-between p-24">
      <div class="">
        <h2 class="text-4xl text-gray-700">Selamat Datang di</h2>
        <h1 class="uglam text-7xl">U-GLAM UNPAD</h1>
        <p class="text-3xl">Pusat Pengelolaan Pengetahuan UNPAD</p>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search here..."
          class="my-5 py-2 px-1 w-100 rounded border-blue-4 border-style-solid"
        />
        <div>
          <a href="#">Tentang Kami</a>
          <a href="#">Bantuan</a>
        </div>
      </div>
      <div>
        <div class="hero-img"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-img {
  background-image: url("https://media3.giphy.com/media/7E8lI6TkLrvvAcPXso/200.gif");
  width: 450px;
  height: 300px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: 0 0 18px 18px white inset;
}

.uglam {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500;
}
</style>
