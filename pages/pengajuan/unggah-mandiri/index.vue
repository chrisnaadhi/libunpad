<script setup>
const data = ref("Unggah Mandiri Karya Ilmiah");
</script>

<template>
  <section>
    <h1 class="my-10">{{ data }}</h1>
    <div class="grid grid-cols-2 justify-center">
      <div class="flex justify-center">
        <NuxtImg src="/illustration/undraw_Social.png" format="webp" width="256px" height="256px" />
      </div>
      <div>
        <h3>Unggah Mandiri</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
          corporis praesentium necessitatibus molestiae at. Dolorem, doloribus
          provident alias a nihil, laboriosam libero dolor suscipit quia quaerat
          quam ullam soluta unde dolore fugit, reiciendis animi atque dolorum
          iusto? Tenetur sunt accusamus aliquid non beatae veniam voluptatum
          modi. Delectus provident inventore itaque!
        </p>
        <div class="my-3">
          <div class="flex gap-3 w-full">
            <NuxtLink href="/pengajuan/unggah-mandiri/panduan" class="btn bg-orange text-white py-1 w-full">
              Panduan
            </NuxtLink>
            <NuxtLink href="/pengajuan/unggah-mandiri/submit" class="btn bg-orange text-white py-1 w-full">
              Unggah
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
