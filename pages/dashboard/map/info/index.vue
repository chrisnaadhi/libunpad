<script setup>
const route = useRoute();

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <section class="flex flex-col items-center">
    <h1>Divisi Pengelolaan Pengetahuan - Pusat Pengelolaan Pengetahuan</h1>
    <div class="flex my-5">
      <div class="i-mdi-account-circle text-9xl"></div>
      <div>
        <h1>Sri Rakhmiyati, S.Sos., M.I.Kom</h1>
        <p class="text-nip">197009302001122001</p>
        <p class="text-title">Penanggung Jawab Divisi Institusi Informasi</p>
        <p>10 Tugas</p>
      </div>
    </div>
    <div class="list-card">
      <GenericBaseCard v-for="num in 12" class="card-pegawai">
        <div class="i-mdi-account-circle text-7xl"></div>
        <div>
          <h1>Nama Lengkap:{{ num }}</h1>
          <p class="text-nip">NIP</p>
          <p class="text-title">Jabatan</p>
          <p>{{ num }} Tugas</p>
        </div>
      </GenericBaseCard>
    </div>
    <div class="my-5">
      <NuxtLink to="/dashboard/map" class="btn bg-orange-2">
        Back to List
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.text-nip {
  --at-apply: text-sm italic text-gray;
}

.text-title {
  --at-apply: italic text-gray-7;
}

.list-card {
  --at-apply: flex flex-col w-full md:(grid grid-cols-2 max-w-6xl) lg:(grid-cols-4) gap-4;
}

.card-pegawai {
  --at-apply: bg-orange-50 flex gap-2 items-center;
}
</style>
