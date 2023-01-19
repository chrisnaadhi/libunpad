<script setup>
const { getItems } = useDirectusItems();
const config = useRuntimeConfig();

const route = useRoute();

const dataPekerjaan = await getItems({
  collection: "pekerjaan_harian",
  params: {
    filter: {
      pegawai: {
        _eq: "$CURRENT_USER",
      },
    },
    sort: "date_created",
  },
});
const { data: dataPetugas } = await useFetch(
  `${config.public.directus.url}users`,
  {
    headers: {
      Authorization: `Bearer ${config.public.directus.token}`,
    },
    pick: ["data", ["id", "first_name", "last_name"]],
  }
);

const searchPetugas = (idPetugas) => {
  const petugas = dataPetugas.value.data.find((nama) => nama.id === idPetugas);
  if (!petugas) {
    return "Belum diproses";
  }
  const objPetugas = Object.assign({}, petugas);
  return `${objPetugas.first_name} ${objPetugas.last_name}`;
};

const convertTimeZone = (time) => {
  const newDate = new Date(time);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatted = newDate.toLocaleDateString("id-ID", options);
  const timeFormat = newDate.toLocaleTimeString("id-ID", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  });
  if (!time) return "Belum diperbarui";
  return `${formatted} ${timeFormat}`;
};

const statusTugasColor = (val) => {
  switch (val) {
    case "belum":
      return "bg-red-3";
    case "proses":
      return "bg-yellow-3";
    case "selesai":
      return "bg-green-3";
    default:
      return "bg-gray-3";
  }
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>No.</th>
        <th>Nama Tugas</th>
        <th>Deskripsi Tugas</th>
        <th>Pemberi Tugas</th>
        <th>Tanggal Dibuat</th>
        <th>Tanggal Diperbarui</th>
        <th>Status Tugas</th>
        <th>Update Tugas</th>
      </tr>
    </thead>
    <tbody v-for="data in dataPekerjaan" :key="data.id">
      <tr>
        <td>{{ dataPekerjaan.indexOf(data) + 1 }}</td>
        <td>{{ data.nama_tugas }}</td>
        <td class="max-w-4xl">
          {{ data.deskripsi_tugas }}
        </td>
        <td>{{ searchPetugas(data.user_created) }}</td>
        <td>{{ convertTimeZone(data.date_created) }}</td>
        <td>{{ convertTimeZone(data.date_updated) }}</td>
        <td :class="statusTugasColor(data.status)" class="font-600">
          {{ displayStatusTugas(data.status) }}
        </td>
        <td>
          <NuxtLink :to="route.fullPath + '/' + data.id" class="btn bg-orange-2"
            >Update</NuxtLink
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table,
td,
th {
  --at-apply: border border-orange text-sm;
}

th {
  --at-apply: font-600 bg-orange-2;
}

th,
td {
  --at-apply: px-4 py-1 text-center;
}
</style>
