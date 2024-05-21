<script setup>
const header = ref("Unggah Mandiri Karya Ilmiah ETD");
</script>

<template>
  <section>
    <div class="text-center px-4 lg:px-2">
      <h1>{{ header }}</h1>
      <p class="text-justify">
        Sistem unggah mandiri karya skripsi, tesis, dan disertasi Kandaga adalah platform yang memungkinkan mahasiswa Universitas Padjadjaran untuk secara efisien mengunggah karya ilmiah mahasiswa secara mandiri. Sistem ini mempermudah proses pengunggahan serta memastikan keamanan dan integritas setiap karya akademik yang diserahkan melalui platform Kandaga. Saat ini hanya Unggah Skripsi / Tesis / Disertasi yang dapat digunakan secara mandiri, untuk unggahan karya ilmiah dalam format lain (Jurnal, Capstone Project, Memorandum Hukum dsb.) akan segera dilayankan tahun ini.
      </p>
      <div class="flex items-center justify-center my-3 gap-3">
        <NuxtLink href="/pengajuan/unggah-mandiri/submit/form" class="w-full">
          <button class="btn w-full bg-green-6 text-white">Unggah Skripsi / Tesis / Disertasi</button>
        </NuxtLink>
        <NuxtLink class="btn w-full bg-gray-3 text-dark cursor-not-allowed">
          <button class="cursor-not-allowed">Unggah Karya Ilmiah dalam format lain</button>
        </NuxtLink>
      </div>
      <div>
        <NuxtLink href="/pengajuan/unggah-mandiri" class="btn bg-orange text-white py-0">
          &leftarrow; Kembali
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma py-15;
}

p {
  --at-apply: italic;
}
</style>
