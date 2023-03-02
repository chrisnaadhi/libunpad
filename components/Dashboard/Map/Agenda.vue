<script setup>
const { getItems } = useDirectusItems();
const route = useRoute();

const programList = [
  {
    nama: "Pengumpulan Karya Cipta Karya Ilmiah Unpad",
    slug: "pengumpulan_karya_ilmiah",
    fungsi: await getItems(fetchAgendaKegiatan("pengumpulan_karya_ilmiah")),
  },
  {
    nama: "Pengembangan Data Riset Management",
    slug: "pengembangan_drm",
    fungsi: await getItems(fetchAgendaKegiatan("pengembangan_drm")),
  },
  {
    nama: "Penguasaan literasi informasi, digital dan metaverse bagi mahasiswa dan dosen",
    slug: "limdm",
    fungsi: await getItems(fetchAgendaKegiatan("limdm")),
  },
  {
    nama: "Pengembangan sistem management GLAM",
    slug: "pengembangan_glam",
    fungsi: await getItems(fetchAgendaKegiatan("pengembangan_glam")),
  },
  {
    nama: "Pemenuhan Sumber Informasi Ilmiah",
    slug: "pemenuhan_sumber_informasi",
    fungsi: await getItems(fetchAgendaKegiatan("pemenuhan_sumber_informasi")),
  },
  {
    nama: "Peningkatan standar digital perpustakaan",
    slug: "standar_digital_perpustakaan",
    fungsi: await getItems(fetchAgendaKegiatan("standar_digital_perpustakaan")),
  },
  {
    nama: "Pengembangan kapasitas Dosen",
    slug: "kapasitas_dosen",
    fungsi: await getItems(fetchAgendaKegiatan("kapasitas_dosen")),
  },
  {
    nama: "Pemenuhan sumber dan fasilitas riset dan pendidikan serta diseminasi",
    slug: "fasilitas_perpustakaan",
    fungsi: await getItems(fetchAgendaKegiatan("fasilitas_perpustakaan")),
  },
  {
    nama: "Peningkatan standardisasi internasional institusi GLAM",
    slug: "standar_internasional_glam",
    fungsi: await getItems(fetchAgendaKegiatan("standar_internasional_glam")),
  },
  {
    nama: "Peningkatan Sertifikasi Tendik",
    slug: "sertifikasi_tendik",
    fungsi: await getItems(fetchAgendaKegiatan("sertifikasi_tendik")),
  },
  {
    nama: "Diseminasi Program unggulan PPP Unpad",
    slug: "program_unggulan",
    fungsi: await getItems(fetchAgendaKegiatan("program_unggulan")),
  },
  {
    nama: "Pengembangan Museum Memorabilia unpad",
    slug: "pengembangan_museum",
    fungsi: await getItems(fetchAgendaKegiatan("pengembangan_museum")),
  },
  {
    nama: "Bulan Literasi",
    slug: "bulan_literasi",
    fungsi: await getItems(fetchAgendaKegiatan("bulan_literasi")),
  },
];
</script>

<template>
  <section>
    <div class="card" v-for="list in programList">
      <h1>{{ list.nama }}</h1>
      <p>Total Agenda: {{ list.fungsi?.meta?.filter_count }}</p>
      <div class="my-4">
        <NuxtLink
          class="btn bg-gray-50"
          :to="`/dashboard/map/agenda/${list.slug}`"
        >
          Detail
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: grid grid-cols-3 gap-4;
}

.card {
  --at-apply: bg-orange-1 px-4 py-2 rounded-xl min-h-20;
}
</style>
