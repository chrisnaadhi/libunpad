<script setup>
const router = useRouter();
const config = useRuntimeConfig();
const submitter = getSubmitterData();
const val = ref('Kelengkapan Berkas Tugas Akhir');

const back = () => {
  router.go(-1);
}

const fetchData = (id) => {
  return config.public.dSpacePublic + '/core/communities/' + id
}

const getFakultas = await $fetch(fetchData(submitter.fakultas))
const getJenjang = await $fetch(fetchData(submitter.jenjang))
const getProdi = await $fetch(`${config.public.dSpacePublic}/core/collections/${submitter.programStudi}`)

definePageMeta({
  middleware: "authentication-check"
})

console.log("Fakultas: " + getFakultas)
console.log("Prodi: " + getProdi)
console.log("Jenjang: " + getJenjang)
</script>

<template>
  <section>
    <h3 class="text-center pt-5">{{ val }}</h3>
    <div class="flex flex-col items-center justify-center mt-4">
      <div class="heading-section">
        <h5>Biodata Pengunggah</h5>
      </div>
      <div class="flex gap-4 mt-4">
        <div>
          <p>Nama Lengkap</p>
          <p>NPM</p>
          <p>Email</p>
          <p>Jenjang</p>
          <p>Program Studi</p>
          <p>Fakultas</p>
        </div>
        <div>
          <p class="font-semibold">: {{ submitter.namaLengkap }}</p>
          <p class="font-semibold">: {{ submitter.npm }}</p>
          <p class="font-semibold">: {{ submitter.email }}</p>
          <p class="font-semibold">: {{ getJenjang.name }}</p>
          <p class="font-semibold">: {{ getProdi.name }}</p>
          <p class="font-semibold">: {{ getFakultas.name }}</p>
        </div>
      </div>
      <div class="w-full my-10 px-5">
        <div class="heading-section">
          <h5>Informasi Detil Tugas Akhir</h5>
        </div>
        <div>
          <div class="input-block">
            <label for="judul">Judul Tugas Akhir :</label>
            <input class="input-area" type="text" name="judul" id="judul" />
          </div>
          <div class="input-block">
            <label for="judul">Abstrak (Indonesia / Inggris) :</label>
            <textarea class="input-area" type="text" name="judul" id="judul" rows="15" />
          </div>
          <div>
            <div class="input-block">
              <label for="keyword">Kata Kunci :</label>
              <input type="text" name="keyword" id="keyword">
            </div>
            <div class="input-block">
              <label for="bahasa">Bahasa :</label>
              <input type="text" name="bahasa" id="bahasa">
            </div>
          </div>
          <div>
            <div class="input-block">
              <label for="pembimbing1">Pembimbing 1 :</label>
              <input type="text" name="pembimbing1" id="pembimbing1">
            </div>
            <div class="input-block">
              <label for="pembimbing2">Pembimbing 2 :</label>
              <input type="text" name="pembimbing2" id="pembimbing2">
            </div>
          </div>
        </div>
      </div>
      <div class="w-full my-10 px-5">
        <div class="heading-section">
          <h5>Data Berkas</h5>
        </div>
        <div class="flex flex-col w-full mt-5 lg:(flex-row gap-15)">
          <div class="w-full">
            <h4>Berkas Awal</h4>
            <div class="input-block">
              <label for="cover">Cover :</label>
              <input type="file" name="cover" id="cover" class="file-input">
            </div>
            <div class="input-block">
              <label for="abstrak">Abstrak (Indonesia & Inggris) :</label>
              <input type="file" name="abstrak" id="abstrak" class="file-input">
            </div>
            <div class="input-block">
              <label for="pernyataan">Lembar Pernyataan (yang sudah ditandatangani) :</label>
              <input type="file" name="pernyataan" id="pernyataan" class="file-input">
            </div>
            <div class="input-block">
              <label for="pengesahan">Lembar Pengesahan (yang sudah ditandatangani) :</label>
              <input type="file" name="pengesahan" id="pengesahan" class="file-input">
            </div>
            <div class="input-block">
              <label for="daftarisi">Daftar Isi :</label>
              <input type="file" name="daftarisi" id="daftarisi" class="file-input">
            </div>
            <div class="input-block">
              <label for="daftartabel">Daftar Tabel :</label>
              <input type="file" name="daftartabel" id="daftartabel" class="file-input">
            </div>
            <div class="input-block">
              <label for="daftargambar">Daftar Gambar :</label>
              <input type="file" name="daftargambar" id="daftargambar" class="file-input">
            </div>
            <div class="input-block">
              <label for="daftarlampiran">Daftar Lampiran :</label>
              <input type="file" name="daftarlampiran" id="daftarlampiran" class="file-input">
            </div>
            <div class="input-block">
              <label for="daftarlampiran">Surat Pernyataan Publikasi Karya Ilmiah:</label>
              <input type="file" name="daftarlampiran" id="daftarlampiran" class="file-input">
            </div>
            <div class="input-block">
              <label for="daftarlampiran">Surat Pernyataan Kesamaan Isi Dokumen :</label>
              <input type="file" name="daftarlampiran" id="daftarlampiran" class="file-input">
            </div>
          </div>
          <div class="w-full">
            <h4>Berkas Konten</h4>
            <div class="input-block">
              <label for="bab1">Bab 1 :</label>
              <input type="file" name="bab1" id="bab1" class="file-input">
            </div>
            <div class="input-block">
              <label for="bab2">Bab 2 :</label>
              <input type="file" name="bab2" id="bab2" class="file-input">
            </div>
            <div class="input-block">
              <label for="bab3">Bab 3 :</label>
              <input type="file" name="bab3" id="bab3" class="file-input">
            </div>
            <div class="input-block">
              <label for="bab4">Bab 4 :</label>
              <input type="file" name="bab4" id="bab4" class="file-input">
            </div>
            <div class="input-block">
              <label for="bab5">Bab 5 :</label>
              <input type="file" name="bab5" id="bab5" class="file-input">
            </div>
            <div class="input-block">
              <label for="bab6">Bab 6 :</label>
              <input type="file" name="bab6" id="bab6" class="file-input">
            </div>
            <div class="input-block">
              <label for="lampiran">Lampiran :</label>
              <input type="file" name="lampiran" id="lampiran" class="file-input">
            </div>
            <div class="input-block">
              <label for="daftarpustaka">Daftar Pustaka :</label>
              <input type="file" name="daftarpustaka" id="daftarpustaka" class="file-input">
            </div>
            <div class="input-block">
              <label for="fullteks">Full Teks :</label>
              <input type="file" name="fullteks" id="fullteks" class="file-input">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center my-10">
      <button @click="back" class="btn bg-orange text-white py-1">Kembali</button>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}

p {
  --at-apply: italic;
}

.heading-section {
  --at-apply: bg-orange text-white px-5 py-1 rounded w-full max-w-sm ma text-center;
}

.file-input {
  --at-apply: w-full bg-orange-50 border border-gray-300 cursor-pointer rounded-bl rounded-tl file:(bg-orange text-white px-3 py-2 mr-3 border-none cursor-pointer);
}
</style>