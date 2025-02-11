<script setup>
const { getItems } = useDirectusItems();

defineProps({
  publicData: {
    type: Boolean,
    default: false,
  },
});

const dataPeminjam = await getItems({
  collection: "peminjaman_ruangan",
  params: {
    sort: "-date_created",
    offset: 0,
  },
});

const displayStatusPeminjaman = (val) => {
  switch (val) {
    case "pending":
      return "bg-gray";
    case "approved":
      return "bg-green";
    case "cancel":
      return "bg-red";
    default:
      return "bg-unpad";
  }
};
const displayNamaRuangan = (val) => {
  switch (val) {
    case "ruang_the_gade":
      return "Ruang Pegadaian Lt. 1";
    case "plaza_kandaga":
      return "Plaza Kandaga Lt. 1";
    case "ruang_kelas_2":
      return "Ruang Kelas Lt. 2";
    case "ruang_hybrid":
      return "Ruang Kelas Hybrid Lt. 4";
    case "ruang_alh":
      return "Ruang Assistive Learning Hub Lt. 4";
    case "teater_pengetahuan":
      return "Teater Pengetahuan Rektorat";
    default:
      return "Ruang Baru";
  }
};

const tableHeadPublic = [
  "Nama Lengkap",
  "Ruang Yang Dipinjam",
  "Tanggal Peminjaman",
  "Jam Peminjaman",
  "Status",
];
</script>

<template>
  <section class="py-5 px-3 lg:px-0">
    <GenericTableData>
      <template #tablehead>
        <tr>
          <th v-for="elem in tableHeadPublic" class="table-border font-600">
            {{ elem }}
          </th>
        </tr>
      </template>
      <template #tablebody>
        <tr class="bg-white" v-for="elem in dataPeminjam">
          <td class="table-border">{{ elem.nama_lengkap }}</td>
          <td class="table-border">
            {{ displayNamaRuangan(elem.nama_ruangan) }}
          </td>
          <td class="table-border">{{ elem.tanggal_peminjaman }}</td>
          <td class="table-border">
            {{ elem.jam_mulai_peminjaman }} - {{ elem.jam_selesai_peminjaman }}
          </td>
          <td
            class="table-border text-white"
            :class="displayStatusPeminjaman(elem.status_peminjaman)"
          >
            {{ elem.status_peminjaman }}
          </td>
        </tr>
      </template>
    </GenericTableData>
  </section>
</template>

<style scoped>
.table-border {
  --at-apply: border border-unpad p-1;
}
</style>
