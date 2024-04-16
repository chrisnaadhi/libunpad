<script setup>
const unggahMandiri = ref("Unggah Mandiri Karya Ilmiah");
const { data } = useAuth();
const getKelengkapanData = await fetchDspaceItemLogs(data.value.user.email);
const userETD = getKelengkapanData[0];

console.log(userETD);
</script>

<template>
  <section>
    <h1 class="my-10">{{ unggahMandiri }}</h1>
    <div class="grid grid-cols-2 justify-center">
      <div class="flex justify-center">
        <NuxtImg src="/illustration/undraw_Social.png" format="webp" width="256px" height="256px" />
      </div>
      <div>
        <h3>Unggah Mandiri</h3>
        <p v-show="userETD?.submitted === 'false' || userETD?.submitted === undefined">
          Silahkan klik tombol Unggah untuk mulai mengunggah karya ilmiah anda. Jika anda memerlukan bantuan atau petunjuk silahkan klik tombol panduan atau hubungi Pustakawan kami melalui media sosial dan kontak yang berada di halaman ini.
        </p>
        <div class="my-3">
          <div class="bg-green-5 text-white mb-5 rounded text-sm py-2" v-show="userETD?.submitted === 'true'">
            <p>Anda sudah mengunggah Karya Ilmiah, silahkan cek halaman keanggotaan untuk melihatnya.</p>
          </div>
          <div class="flex gap-3 w-full">
            <NuxtLink href="/pengajuan/unggah-mandiri/panduan" class="btn bg-orange text-white py-1 w-full" v-show="userETD?.submitted === 'false' || userETD?.submitted === undefined">
              Panduan
            </NuxtLink>
            <NuxtLink href="/pengajuan/unggah-mandiri/submit" class="btn bg-orange text-white py-1 w-full" v-if="userETD?.submitted === 'false'  || userETD?.submitted === undefined">
              Unggah
            </NuxtLink>
            <NuxtLink href="/keanggotaan" class="btn bg-orange text-white py-1 w-full" v-else-if="userETD?.submitted === 'true'">
              Lihat Data Unggah Anda
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mb-10 max-w-2xl ma">
      <h4>Kelengkapan dan Persetujuan</h4>
      <p>Sebelum melakukan unggah mandiri Tugas Akhir / Karya Ilmiah dalam bentuk Skripsi, Tesis, Disertasi atau Tugas
        Akhir lainnya yang sudah disetujui oleh Program Studi, diharapkan anda dapat melihat lembar persetujuan dalam
        publikasi Tugas Akhir di Repository Karya Ilmiah milik Universitas Padjadjaran.</p>
      <p>Lembar persetujuan dan ketentuan terhadap publikasi dapat dilihat melalui tombol Persetujuan berikut :</p>
      <div class="py-2 flex items-center justify-center gap-4">
        <NuxtLink href="/pengajuan/unggah-mandiri/persetujuan" class="btn bg-orange text-white">
          Persetujuan
        </NuxtLink>
        <NuxtLink href="#" class="btn bg-orange text-white">
          Bantuan
        </NuxtLink>
      </div>
      <p>Apabila ada pertanyaan atau kendala lain yang dihadapi dalam melakukan proses unggah mandiri, dipersilahkan
        untuk mengklik tombol Bantuan.</p>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma text-center;
}

p {
  --at-apply: italic;
}
</style>
