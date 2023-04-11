<script setup>
import {
  displayKeperluanSurat,
  displayStatusPengajuanSurat,
  displayPersyaratan,
} from "~/composables/user";

const config = useRuntimeConfig();
const { getItems } = useDirectusItems();
const pageState = ref(0);
const listData = ref();

defineProps({
  publicData: {
    type: Boolean,
    default: false,
  },
});

async function fetchDataPengajuan() {
  listData.value = await getItems({
    collection: "pengajuan_surat_bebas_pustaka",
    params: {
      sort: "-date_created",
      offset: pageState.value,
    },
  });
}

const dataPengajuan = await getItems({
  collection: "pengajuan_surat_bebas_pustaka",
  params: {
    sort: "-date_created",
    offset: pageState.value,
  },
});

const nextData = () => {
  pageState.value += 25;
  fetchDataPengajuan();
};

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
  return `${formatted} ${timeFormat} WIB`;
};

const displayMessage = (value) => {
  switch (value) {
    case "pengajuan":
      return "text-red";
    case "proses":
      return "text-amber";
    case "selesai":
      return "text-green";
  }
};

fetchDataPengajuan();

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

const tableHeadPublic = [
  "NPM",
  "Nama Lengkap",
  "Keperluan",
  "Persyaratan",
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
            v-if="publicData"
            v-for="elem in tableHead"
            scope="col"
            class="table-border font-600"
          >
            {{ elem }}
          </th>
          <th
            v-else
            v-for="elem in tableHeadPublic"
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
          <td class="table-border" v-show="publicData">
            {{ data.email }}
          </td>
          <td class="table-border">
            {{ displayKeperluanSurat(data.keperluan) }}
          </td>
          <td class="table-border">
            {{ displayPersyaratan(data.persyaratan) }}
          </td>
          <td class="table-border" v-show="publicData">
            {{ convertTimeZone(data.date_created) }}
          </td>
          <td class="table-border" v-show="publicData">
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
  </section>
</template>

<style scoped>
.table-border {
  --at-apply: border border-orange p-1;
}
</style>
