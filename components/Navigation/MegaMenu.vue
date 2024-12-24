<script setup>
const defaultDescription =
  "Kandaga merupakan branding dari Perpustakaan Pusat di Universitas Padjadjaran. Kandaga menjadi portal dan layanan dari Perpustakaan Pusat untuk memenuhi kebutuhan kegiatan belajar dan mengajar mahasiswa serta dosen. Kandaga memberikan layanan dan fasilitas yang bisa dimanfaatkan oleh seluruh mahasiswa, dosen serta tenaga kependidikan.";

defineProps({
  imgFile: String,
  description: String,
});
</script>

<template>
  <section>
    <div class="flex items-start justify-between gap-4">
      <NuxtImg
        src="/images/kandaga-bg.webp"
        format="webp"
        class="max-w-full max-h-50 object-cover rounded-xl"
      />
      <div>
        <slot />
        <p>
          {{ description ?? defaultDescription }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
p {
  --at-apply: italic;
}
</style>
