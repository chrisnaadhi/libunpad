<script setup>
const data = ref("E-Teater");
</script>

<template>
  <section>
    <div class="max-w-3xl ma">
      <div class="flex flex-col items-center justify-center gap-3 mx-5">
        <h1 class="e-teater">{{ data }}</h1>
        <p class="italic">
          E-Teater merupakan portal digital dari Teater Pengetahuan yang ada di
          Universitas Padjadjaran. Pengelolaan E-Teater dilakukan oleh Pusat
          Pengelolaan Pengetahuan yang sekaligus menjadi portal diseminasi
          informasi terhadap konten-konten ilmiah populer yang ditayangkan di
          Teater Pengetahuan Universitas Padjadjaran.
        </p>
        <NuxtImg
          src="/images/teater3.png"
          class="rounded-xl object-cover w-full h-50"
        />
      </div>
    </div>
    <div class="my-15">
      <div>
        <h2>Teater Pengetahuan</h2>
        <div class="flex gap-5 mt-3">
          <div class="w-full">
            <NuxtImg src="/images/teater1.png" class="w-100% rounded-xl" />
          </div>
          <div class="w-full">
            <div class="flex justify-center gap-3">
              <NuxtImg src="/images/teater2.png" class="w-48% rounded-lg" />
              <NuxtImg src="/images/teater1.png" class="w-48% rounded-lg" />
            </div>
            <p class="text-justify px-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas,
              laboriosam. Et ducimus nam, voluptatum placeat recusandae ipsa sit
              architecto reiciendis dolorem officia reprehenderit itaque eos
              accusantium explicabo atque, consequatur tempore fugiat? Nesciunt
              atque architecto sunt, ad at laudantium. Dolore voluptate,
              eligendi blanditiis fugiat aliquid corrupti rem doloremque sunt
              reprehenderit necessitatibus animi, architecto ipsa eum quasi.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="my-10">
      <h2>Koleksi E-Teater</h2>
      <div class="grid grid-cols-4 gap-3 mt-2">
        <div class="literasi" v-for="num in 10">Literasi {{ num }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma text-center my-5;
}

.e-teater {
  --at-apply: font-semibold text-5xl bg-clip-text text-transparent
    bg-gradient-to-br from-orange-500 to-gray-500;
}

.literasi {
  --at-apply: bg-blue h-15 text-white flex items-center justify-center rounded;
}

.mid-content {
  --at-apply: flex items-center justify-center;
}
</style>
