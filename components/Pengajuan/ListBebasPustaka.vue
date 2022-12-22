<script setup>
import {
  displayKeperluanSurat,
  displayStatusPengajuanSurat,
  displayMessage,
  displayPersyaratan,
} from "~/composables/user";

const config = useRuntimeConfig();
const { getItems } = useDirectusItems();

const dataPengajuan = await getItems({
  collection: "pengajuan_surat_bebas_pustaka",
  params: {
    sort: "-date_created",
    limit: "20",
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
    return "Administrator Kandaga";
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
  return `${formatted} ${timeFormat} WIB`;
};

const tableHead = [
  "NPM",
  "Nama Lengkap",
  "Email",
  "Keperluan",
  "Persyaratan",
  "Tanggal Pengajuan",
  "Tanggal Diproses",
  "Status Pengajuan",
  "Petugas",
];
</script>

<template>
  <section class="overflow-x-auto relative">
    <table class="w-full border-collapse border text-sm border-slate-400">
      <thead class="bg-orange-2">
        <tr>
          <th
            v-for="elem in tableHead"
            scope="col"
            class="table-border font-600"
          >
            {{ elem }}
          </th>
        </tr>
      </thead>
      <tbody v-for="data in dataPengajuan">
        <tr class="bg-white text-center">
          <td class="table-border">{{ data.npm }}</td>
          <td class="table-border">
            {{ data.nama_lengkap }}
          </td>
          <td class="table-border">
            {{ data.email }}
          </td>
          <td class="table-border">
            {{ displayKeperluanSurat(data.keperluan) }}
          </td>
          <td class="table-border">
            {{ displayPersyaratan(data.persyaratan) }}
          </td>
          <td class="table-border">
            {{ convertTimeZone(data.date_created) }}
          </td>
          <td class="table-border">
            <span v-if="!data.date_updated">Belum diproses</span>
            <span v-else>{{ convertTimeZone(data.date_updated) }}</span>
          </td>
          <td class="table-border">
            <span
              :class="displayMessage(data.status_pengajuan)"
              class="font-600"
            >
              {{ displayStatusPengajuanSurat(data.status_pengajuan) }}
            </span>
          </td>
          <td class="table-border">
            {{ searchPetugas(data.user_updated) }}
          </td>
        </tr>
      </tbody>
    </table>
    {{ searchPetugas("09B23E6C-1F49-4392-B0C4-090E2051FF57") }}
  </section>
</template>

<style scoped>
.table-border {
  --at-apply: border border-orange p-1;
}
</style>
