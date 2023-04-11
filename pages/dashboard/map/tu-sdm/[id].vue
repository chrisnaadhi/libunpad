<script setup>
const route = useRoute();
const { getItems } = useDirectusItems();

const tugasPegawai = await getItems(fetchTugasPegawai(route.params.id));
const profilPegawai = await fetchProfilPegawai(route.params.id);

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <section>
    <h1>
      {{ profilPegawai.data.first_name }} {{ profilPegawai.data.last_name }}
    </h1>
    <p class="text-gray italic">{{ profilPegawai.data.nomor_induk }}</p>
    <h4>{{ profilPegawai.data.title }}</h4>
    <div class="grid grid-cols-3 gap-4 py-5">
      <div v-for="task in tugasPegawai" class="bg-orange-50 rounded p-2">
        <h3>{{ task.nama_tugas }}</h3>
        <p>
          Tanggal Penugasan: {{ task.tanggal_penugasan ?? "Belum ditugaskan" }}
        </p>
        <p>
          Tanggal Deadline: {{ task.tanggal_deadline ?? "Belum ditentukan" }}
        </p>
        <p>Progress: {{ task.perkembangan_rencana ?? "Tidak ada progress" }}</p>
        <p>
          Rencana:
          {{ task.jumlah_rencana ?? "Tidak ada target rencana" }}
        </p>
      </div>
    </div>
    <div class="mt-5">
      <NuxtLink to="/dashboard/map/tu-sdm" class="btn bg-orange text-white">
        Back to List
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
h1 {
  --at-apply: text-4xl;
}

section {
  --at-apply: flex flex-col items-center max-w-7xl ma;
}
</style>
