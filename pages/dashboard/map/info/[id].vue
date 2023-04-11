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
    <h3>
      {{ profilPegawai.data.first_name }} {{ profilPegawai.data.last_name }}
    </h3>
    <p class="text-gray italic">{{ profilPegawai.data.nomor_induk }}</p>
    <h4>{{ profilPegawai.data.title }}</h4>
    <div class="grid grid-cols-3 gap-4 py-5" v-if="tugasPegawai">
      <div v-for="task in tugasPegawai" class="bg-orange-50 rounded p-2">
        <h1>{{ task.nama_tugas }}</h1>
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
    <div v-else>
      <h3>Tidak ada data pekerjaan</h3>
    </div>
    <p>{{ tugasPegawai }}</p>
    <div class="mt-5">
      <NuxtLink to="/dashboard/map/info" class="btn bg-orange text-white">
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
