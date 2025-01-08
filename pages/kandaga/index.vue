<script setup>
const val = ref('Kandaga')
</script>

<template>
  <section>
    <h2 class="text-center mt-5 font-semibold">{{ val }}</h2>
    <div class="flex flex-col items-center justify-center text-justify">
      <p>Kandaga Universitas Padjadjaran (Unpad) merupakan portal yang menyediakan berbagai sumber informasi dan layanan
        bagi seluruh civitas academica Unpad, termasuk mahasiswa, dosen, tenaga kependidikan, dan alumni. Kandaga
        dikelola oleh Kantor Pengelolaan Perpustakaan Unpad dan menjadi portal resmi Perpustakaan Pusat Unpad. Kandaga Unpad merupakan portal sumber informasi bagi seluruh civitas akademika Unpad maupun masyarakat diluar Unpad. Kandaga membantu mahasiswa, dosen, dan tenaga kependidikan untuk mengakses informasi, meningkatkan kualitas penelitian dan pendidikan, meningkatkan efisiensi dan efektivitas kerja, serta meningkatkan kolaborasi dalam ranah penelitian dan pendidikan.</p>
      <div class="my-5">
        <h3 class="text-center mb-5">Fungsi Utama Kandaga</h3>
        <div class="flex flex-col gap-4 md:(grid grid-cols-4 justify-center)">
          <div class="flex flex-col items-center text-center gap-3">
            <div class="i-mdi-accelerometer text-orange w-30 h-30" />
            <h5>
              Akses ke sumber informasi
            </h5>
            <p class="text-xs text-justify">Kandaga menyediakan akses ke koleksi buku, jurnal ilmiah, artikel berita, skripsi, tesis, dan karya ilmiah lainnya yang dihasilkan oleh sivitas akademika Unpad.</p>
          </div>
          <div class="flex flex-col items-center text-center gap-3">
            <div class="i-mdi-folder-search text-orange w-30 h-30" />
            <h5>
              Penelusuran Informasi
            </h5>
            <p class="text-xs text-justify">Kandaga menawarkan fitur penelusuran yang dapat membantu pengguna menemukan informasi yang mereka butuhkan dengan cepat dan mudah.</p>
          </div>
          <div class="flex flex-col items-center text-center gap-3">
            <div class="i-mdi-book-alphabet text-orange w-30 h-30" />
            <h5>
              Menyediakan layanan digital
            </h5>
            <p class="text-xs text-justify">Kandaga menyediakan berbagai layanan digital, seperti peminjaman buku elektronik (e-book), akses ke jurnal elektronik (e-journal), dan layanan referensi virtual.</p>
          </div>
          <div class="flex flex-col items-center text-center gap-3">
            <div class="i-mdi-home-city text-orange w-30 h-30" />
            <h5>
              Menjadi ruang kolaborasi
            </h5>
            <p class="text-xs text-justify">Kandaga menyediakan platform bagi sivitas akademika Unpad untuk berkolaborasi dalam lingkup pendidikan, penelitian dan pengabdian kepada masyarakat.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-5xl ma;
}
</style>