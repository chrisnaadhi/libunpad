<script setup>
definePageMeta({
  layout: "dashboard",
});
const route = useRoute();
const router = useRouter();
const { getItemById } = useDirectusItems();

const detailAgenda = await getItemById({
  collection: "agenda_kegiatan",
  id: route.params.id,
});

const backButton = () => {
  router.back();
};
</script>

<template>
  <section>
    <p class="text-sm font-600 text-orange">
      {{ displayAgendaKegiatan(detailAgenda.program) }}
    </p>
    <h1 class="text-3xl">{{ detailAgenda.nama_kegiatan }}</h1>
    <div class="mt-1">
      <span
        class="badge"
        :class="colorStatusAgenda(detailAgenda.status_kegiatan)"
      >
        {{ displayStatusAgenda(detailAgenda.status_kegiatan) }}
      </span>
    </div>

    <div class="bg-orange-1 p-2 my-2 rounded">
      <p class="font-600">Rincian kegiatan:</p>
      <span v-html="detailAgenda.rincian_kegiatan"></span>
    </div>
    <div class="bg-orange-1 p-2 my-2 rounded">
      <p class="font-600">Keterangan kegiatan:</p>
      <p>{{ detailAgenda.keterangan ?? "Tidak ada keterangan" }}</p>
    </div>
    <div class="bg-orange-1 p-2 my-2 rounded">
      <p class="font-600">Lampiran Kegiatan:</p>
      <NuxtLink :to="detailAgenda.lampiran_kegiatan">
        {{ detailAgenda.lampiran_kegiatan ?? "Belum ada lampiran" }}
      </NuxtLink>
    </div>
    <div class="grid grid-cols-6">
      <div>
        <p>Target</p>
        <p>Penanggung Jawab</p>
      </div>
      <div class="col-span-5">
        <p>: {{ detailAgenda.target_kegiatan }}</p>
        <p>: {{ detailAgenda.penanggung_jawab }}</p>
      </div>
    </div>
    <div class="mt-5">
      <button class="btn bg-orange-1" @click="backButton">Kembali</button>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: ;
}

.badge {
  --at-apply: rounded px-2 text-white;
}
</style>
