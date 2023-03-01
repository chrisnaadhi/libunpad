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
    <div class="grid grid-cols-3 gap-4">
      <div v-for="task in tugasPegawai" class="bg-orange-50 rounded p-2">
        <h1>{{ task.nama_tugas }}</h1>
        <p>Progress: {{ task.perkembangan_rencana ?? "Tidak ada progress" }}</p>
        <p>
          Rencana:
          {{ task.jumlah_rencana ?? "Tidak ada target rencana" }}
        </p>
      </div>
    </div>
    <div class="mt-5">
      <NuxtLink to="/dashboard/map/km" class="btn bg-orange text-white">
        Back to List
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: flex flex-col items-center max-w-7xl ma;
}
</style>
