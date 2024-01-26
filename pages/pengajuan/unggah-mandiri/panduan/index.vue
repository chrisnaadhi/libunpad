<script setup>
const data = ref("Panduan Unggah Mandiri");
</script>

<template>
  <section>
    <p>{{ data }}</p>
    <div>
      <NuxtLink href="/pengajuan/unggah-mandiri">Kembali ke Pengajuan</NuxtLink>
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
</style>
