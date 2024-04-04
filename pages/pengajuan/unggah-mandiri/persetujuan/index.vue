<script setup>
const data = ref('Halaman Peraturan dan Persetujuan')
</script>

<template>
  <section class="max-w-7xl ma py-5">
    <h1 class="text-center">{{ data }}</h1>
    <p class="text-justify py-2">
      Universitas Padjadjaran memiliki upaya yang komprehensif terkait karya ilmiah mahasiswa, mulai dari
      mendokumentasikan hasil tugas akhir dalam berbagai program pendidikan (Sarjana, Magister, Doktor, Profesi,
      Spesialis, Subspesialis, Sarjana Terapan, Magister Terapan, Doktor Terapan), hingga melestarikan sebagai kekayaan
      intelektual milik universitas. Tujuan utamanya adalah untuk meningkatkan daya guna karya ilmiah Unpad dengan
      menghadirkan data dan informasi bermanfaat bagi masyarakat, sambil memperkuat peranan Pusat Pengelolaan
      Pengetahuan sebagai pusat dokumentasi dan penyebaran informasi. Langkah ini juga berfokus pada kemudahan
      penelusuran informasi hasil penelitian mahasiswa, memastikan ketersediaan, akses, dan pemanfaatan jangka panjang
      oleh penulis dan institusi. Melalui kegiatan Serah Simpan Karya Ilmiah, Universitas Padjadjaran bertujuan untuk
      menyimpan secara aman karya ilmiah mahasiswa dalam format digital, menjadikannya lebih mudah diakses tanpa batasan
      tempat dan waktu, dan mengamplifikasi dampak dari karya ilmiah tersebut. Direktorat Pendidikan dan
      Internasionalisasi, melalui Pusat Pengelolaan Pengetahuan, bertanggung jawab atas pengelolaan, analisis,
      eksplorasi, dan penyesuaian fitur karya ilmiah mahasiswa serta repositori institusi.
    </p>
    <p class="text-justify py-2">
      Pusat Pengelolaan Pengetahuan di Universitas Padjadjaran memiliki tanggung jawab utama dalam menjalankan fungsi
      perpustakaan terkait kegiatan Serah Simpan Karya Ilmiah mahasiswa. Setiap karya ilmiah yang dihasilkan oleh
      mahasiswa Unpad diwajibkan diserahkan ke Direktorat Pendidikan dan Internasionalisasi melalui Pusat Pengelolaan
      Pengetahuan untuk disimpan dalam sistem repositori institusi. Sebagaimana diatur dalam Pasal 4 ayat 2, Unpad
      memiliki hak cipta atas karya ilmiah yang dihasilkan. Karya ilmiah dalam bentuk elektronik akan ditampilkan dalam
      laman repositori Unpad yang dapat diakses di <NuxtLink href="/koleksi/repository">Koleksi Repository</NuxtLink>,
      dengan pengecualian tertentu yang akan ditampilkan sesuai dengan ketentuan yang berlaku.
    </p>
    <div class="py-2">
      <h5>Ketentuan, Peraturan dan Kebijakan Universitas Padjadjaran terhadap Koleksi Karya Tugas Akhir :</h5>
      <div class="flex gap-2 w-full text-center">
        <NuxtLink class="link-btn w-full" href="#">
          Ketentuan
        </NuxtLink>
        <NuxtLink class="link-btn w-full" href="#">
          Peraturan Serah Simpan
        </NuxtLink>
        <NuxtLink class="link-btn w-full" href="#">
          Kebijakan Publikasi
        </NuxtLink>
      </div>
    </div>  
    <div class="mt-3 flex justify-center">
      <NuxtLink href="/pengajuan/unggah-mandiri" class="link-btn">
        Kembali
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
p {
  --at-apply: italic;
}

.link-btn {
  --at-apply: btn bg-orange text-white py-1;
}
</style>