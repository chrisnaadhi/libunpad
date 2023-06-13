<script setup>
const layananPerpustakaan = ref([
  {
    namaLayanan: "Layanan Koleksi",
    deskripsi:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum nesciunt minima molestias consequuntur iste, dignissimos vel molestiae quo deleniti voluptas. Aliquid quidem libero, sapiente officiis qui nobis eius quisquam laboriosam dolore! Ratione reprehenderit accusamus porro rem aliquam impedit. Quam amet ratione ullam quod exercitationem ex reprehenderit minima porro doloremque optio!",
  },
  {
    namaLayanan: "Layanan Multimedia",
    deskripsi:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet harum, debitis dolor consectetur unde culpa. Porro, similique. Quisquam officiis rem blanditiis autem magni saepe explicabo vel. Vel iusto consequuntur dignissimos a voluptatum quo possimus rerum dolor ipsam nesciunt nemo ipsum blanditiis, placeat quisquam omnis hic maiores ex pariatur, doloremque labore?",
  },
  {
    namaLayanan: "Layanan Informasi",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur enim harum suscipit libero eos non sequi fuga reprehenderit, similique voluptatem fugiat ut repellat aliquam provident cumque reiciendis quisquam eum ea, excepturi odio aspernatur, ab vitae minus. Provident voluptas ut minus perspiciatis amet? Voluptate reprehenderit vitae tempore nihil tenetur voluptatem id.",
  },
  {
    namaLayanan: "Layanan Tata Usaha dan Administrasi",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero saepe reiciendis sed, in veritatis aut, facere incidunt odit dolores quaerat nihil doloribus corrupti suscipit, ipsa vero numquam rerum laudantium adipisci dolorem obcaecati nulla? Qui voluptas et impedit fugiat, maiores sit soluta natus, harum dolorem quas blanditiis dolor possimus aut neque!",
  },
  {
    namaLayanan: "Layanan Sarana dan Prasarana",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt omnis, iusto quia, iste vitae aut odit aperiam voluptatibus odio nostrum voluptas maxime facere reprehenderit. Cumque ab sit sunt ullam maiores fuga autem soluta nesciunt vel explicabo rem, iure debitis ipsa at? Sunt delectus enim unde nam repudiandae possimus impedit molestiae.",
  },
  {
    namaLayanan: "Layanan Pengolahan dan Preservasi Koleksi",
    deskripsi:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, impedit dignissimos. Ipsam quisquam ipsa, rem cum in dignissimos recusandae numquam. Eveniet expedita ullam fugiat veniam labore cumque perspiciatis, atque eius consequuntur exercitationem ab quae esse magnam fuga iusto odio! Esse optio molestias exercitationem ut, error illo necessitatibus tenetur repellat atque?",
  },
  {
    namaLayanan: "Layanan Research Supports",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laborum optio laboriosam, architecto aspernatur earum officiis molestiae vel quo similique tempora quibusdam quod magnam soluta voluptatem veritatis eligendi. Ex, dicta. Placeat quidem ut fugiat eaque fugit eveniet incidunt. Magnam recusandae sunt sit magni eligendi porro non vitae eum molestias quod!",
  },
  {
    namaLayanan: "Layanan Academic Tools",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, iusto ut. Dolorum iusto fugit porro itaque, minus laborum iste, quidem beatae rerum culpa reiciendis ipsam? Quis eaque dolores debitis ad non cum sequi similique nobis dolore veniam, dolorem modi eum inventore perferendis natus, adipisci porro at, officia ipsum molestiae maxime.",
  },
  {
    namaLayanan: "Layanan Learning Center",
    deskripsi:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo nam maxime sed odio autem repellat. Sunt laudantium laborum doloremque! At ex aspernatur consectetur, dolorum suscipit perferendis deleniti iure, eligendi veniam laboriosam unde mollitia facilis! Officiis quaerat in recusandae reprehenderit perspiciatis? Quisquam repellendus unde delectus placeat quidem inventore maxime provident minima.",
  },
]);
</script>

<template>
  <section class="layer">
    <h1>Panduan Untuk Civitas dan Pengguna Platform Kandaga</h1>
    <p class="max-w-xl text-justify">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia
      sapiente laborum saepe vero enim quae voluptas. Nihil eos, aliquam labore
      at nam suscipit culpa quisquam eveniet animi aut a adipisci ipsum
      voluptatem quasi vitae laboriosam.
    </p>
    <div class="w-full">
      <GenericBaseCard class="bg-orange-3 px-4 py-2">
        <h3 class="text-center">Layanan dan Fasilitas</h3>
      </GenericBaseCard>
    </div>
    <div class="w-full grid grid-cols-3 gap-4">
      <GenericBaseCard
        v-for="item in layananPerpustakaan"
        class="bg-gray-2 p-6"
      >
        <h3 class="text-left">{{ item.namaLayanan }}</h3>
        <p>{{ item.deskripsi }}</p>
        <div class="w-full my-3">
          <NuxtLink to="/koleksi" class="btn bg-orange">Cek</NuxtLink>
        </div>
      </GenericBaseCard>
    </div>
  </section>
</template>

<style scoped>
.layer {
  --at-apply: max-w-7xl ma flex flex-col items-center justify-center gap-4 py-5;
}
</style>
