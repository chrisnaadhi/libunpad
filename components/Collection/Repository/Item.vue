<script setup>
defineProps({
  npm: String,
  fileCover: String,
  fileAbstrak: String,
  fileDaftarIsi: String,
  fileBab1: String,
  fileBab2: String,
  fileBab3: String,
  fileBab4: String,
  fileBab5: String,
  fileBab6: String,
  fileLampiran: String,
  filePustaka: String,
  fileSurat: String,
  fileSuratIsi: String,
  filePengesahan: String,
  filePresentasi: String,
  fileFullText: String,
  judul: String,
  author: String,
  abstrak: String,
  bahasa: String,
  keywords: String,
  tglUpload: Date,
  idPustaka: Number,
  stPublikasi: Boolean,
  verifikasi: Boolean,
});

const limitText = (text) => {
  return text.substring(0, 100);
};
</script>

<template>
  <section>
    <section class="flex gap-5">
      <div class="w-70 text-center">
        <div class="cover-section">
          <p class="text-xs italic px-2">{{ judul }}...</p>
          <p class="text-xs font-semibold">{{ author }}</p>
          <NuxtImg
            src="/images/lambang-unpad.png"
            format="webp"
            height="75px"
          />
          <p class="text-xs">Perpustakaan Universitas Padjadjaran</p>
        </div>
        <div class="mt-5">
          <h5 class="bg-gray-5 text-white">Kata Kunci</h5>
          <div class="bg-orange-1">
            <p class="text-sm p-2 italic">
              {{ keywords }}
            </p>
          </div>
        </div>
      </div>
      <div class="w-full">
        <div>
          <h3 class="italic text-gray-6">
            {{ judul }}
          </h3>
          <h5>{{ author }} - {{ npm }}</h5>
          <p class="italic">Nama Prodi - Nama Fakultas</p>
          <h6>Abstrak:</h6>
          <p class="text-sm text-justify">
            {{ abstrak }}
          </p>
        </div>
      </div>
    </section>
    <section class="flex flex-col gap-10 lg:flex-row">
      <div class="mt-5 mx-2">
        <h2 class="my-5">Berkas</h2>
        <table class="w-full lg:w-100">
          <thead>
            <th>Nama Berkas</th>
            <th>Akses Berkas</th>
          </thead>
          <tbody>
            <tr class="text-left">
              <td class="font-semibold w-35">Cover</td>
              <td>{{ fileCover ?? "Tidak tersedia" }}</td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Abstrak</td>
              <td>{{ fileAbstrak ?? "Tidak tersedia" }}</td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Daftar Isi</td>
              <td>{{ fileDaftarIsi ?? "Tidak tersedia" }}</td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Bab 1</td>
              <td>{{ fileBab1 ?? "Tidak tersedia" }}</td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Bab 2</td>
              <td>{{ fileBab2 ?? "Tidak tersedia" }}</td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Bab 3</td>
              <td>{{ fileBab3 ?? "Tidak tersedia" }}</td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Bab 4</td>
              <td>{{ fileBab4 ?? "Tidak tersedia" }}</td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Bab 5</td>
              <td>{{ fileBab5 ?? "Tidak tersedia" }}</td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Bab 6</td>
              <td>{{ fileBab6 ?? "Tidak tersedia" }}</td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Lampiran</td>
              <td>{{ fileLampiran ?? "Tidak tersedia" }}</td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Daftar Pustaka</td>
              <td>{{ filePustaka ?? "Tidak tersedia" }}</td>
            </tr>
            <tr class="text-left">
              <td class="font-semibold w-35">Full Text</td>
              <td>{{ fileFullText ?? "Tidak tersedia" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-5 mx-5">
        <h2 class="my-5">Metadata</h2>
        <div class="grid grid-cols-none lg:grid-cols-5 my-5 gap-4">
          <div class="w-25">
            <h6>Judul</h6>
          </div>
          <div class="col-span-4">
            <p>{{ judul ?? "Belum Ada Data" }}</p>
          </div>

          <div class="w-25">
            <h6>Abstrak</h6>
          </div>
          <div class="col-span-4">
            <p>{{ abstrak ?? "Belum Ada Data" }}</p>
          </div>

          <div class="w-25">
            <h6>Bahasa</h6>
          </div>
          <div class="col-span-4">
            <p>{{ bahasa ?? "Belum Ada Data" }}</p>
          </div>

          <div class="w-25">
            <h6>Keywords</h6>
          </div>
          <div class="col-span-4">
            <p>{{ keywords ?? "Belum Ada Data" }}</p>
          </div>

          <div class="w-25">
            <h6>Tanggal Upload</h6>
          </div>
          <div class="col-span-4">
            <p>{{ tglUpload ?? "Belum Ada Data" }}</p>
          </div>

          <div class="w-25">
            <h6>Publikasi</h6>
          </div>
          <div class="col-span-4">
            <p>{{ stPublikasi ?? "Belum Ada Data" }}</p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-6xl ma;
}

.cover-section {
  --at-apply: bg-white max-w-55 ma border-2 border-orange min-h-75 rounded
    text-center flex flex-col items-center justify-around;
}

table {
  --at-apply: text-center;
}

th {
  --at-apply: font-semibold bg-orange-3 border-1 border-orange px-5;
}

td {
  --at-apply: px-2 py-1 border-1 border-orange;
}
</style>
