<script setup>
import {
  displayKeperluanSurat,
  displayStatusPengajuanSurat,
  displayPersyaratan,
} from "~/composables/user";

const config = useRuntimeConfig();
const { getItems } = useDirectusItems();
const pageState = ref(0);
const listData = ref(null);

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
      limit: 10,
    },
  });
}

const totalData = await getItems({
  collection: "pengajuan_surat_bebas_pustaka",
});

const gapData = Math.floor(totalData.length / 10) * 10;

if (listData.value === null) {
  listData.value = fetchDataPengajuan();
}

const nextData = () => {
  if (pageState.value < gapData) {
    pageState.value += 10;
    fetchDataPengajuan();
  }
};

const prevData = () => {
  if (pageState !== 0) {
    pageState.value -= 10;
    fetchDataPengajuan();
  }
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
      return "text-red-5";
    case "proses":
      return "text-amber-5";
    case "selesai":
      return "text-green-5";
  }
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
  "Proses",
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
    <table class="w-full border-collapse border text-sm border-slate-400" v-if="totalData.length > 0">
      <thead class="bg-orange-2">
        <tr>
          <th v-if="publicData" v-for="elem in tableHead" scope="col" class="table-border font-600">
            {{ elem }}
          </th>
          <th v-else v-for="elem in tableHeadPublic" scope="col" class="table-border font-600">
            {{ elem }}
          </th>
        </tr>
      </thead>
      <tbody v-for="data in listData">
        <tr class="bg-white text-center">
          <td class="table-border w-10">{{ data.npm }}</td>
          <td class="table-border w-50">
            {{ data.nama_lengkap }}
          </td>
          <td class="table-border w-30" v-show="publicData">
            {{ data.email }}
          </td>
          <td class="table-border w-30">
            {{ displayKeperluanSurat(data.keperluan) }}
          </td>
          <td class="table-border w-30">
            {{ displayPersyaratan(data.persyaratan) }}
          </td>
          <td class="table-border w-30" v-show="publicData">
            {{ convertTimeZone(data.date_created) }}
          </td>
          <td class="table-border w-40" v-show="publicData">
            <span v-if="!data.date_updated">Belum diproses</span>
            <span v-else>{{ convertTimeZone(data.date_updated) }}</span>
          </td>

          <td class="table-border w-40">
            <span :class="displayMessage(data.status_pengajuan)" class="font-600">
              {{ displayStatusPengajuanSurat(data.status_pengajuan) }}
            </span>
          </td>
          <td class="table-border w-30">
            {{ searchPetugas(data.user_updated) }}
          </td>
          <td class="table-border" v-show="publicData">
            <NuxtLink :to="'https://repository.unpad.ac.id:8050/admin/content/pengajuan_surat_bebas_pustaka/' +
              data.id
              " class="btn bg-orange text-white py-0" target="_blank">
              Cek
            </NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p>Belum ada Data!</p>
    </div>
    <div class="flex items-center justify-center gap-1 mt-3" v-show="totalData.length > 10">
      <button class="btn py-0 px-5" @click="prevData" :class="pageState === 0 ? 'disable-btn' : 'enable-btn'"
        :disabled="pageState === 0">
        Prev
      </button>
      <div>
        {{ pageState < 10 ? "1" : (pageState + 10) / 10 }} / {{ (Number(gapData) + 10) / 10 }}
      </div>
      <button class="btn bg-orange py-0 px-5" @click="nextData"
        :class="pageState < gapData ? 'enable-btn' : 'disable-btn'" :disable="pageState <= gapData">
        Next
      </button>
    </div>
  </section>
</template>

<style scoped>
.table-border {
  --at-apply: border border-orange p-1;
}

.disable-btn {
  --at-apply: bg-gray-3 text-dark cursor-not-allowed;
}

.enable-btn {
  --at-apply: bg-orange text-white;
}
</style>
