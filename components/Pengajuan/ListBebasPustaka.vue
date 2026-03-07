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
      return "bg-red-50 text-red-7 border border-red-2";
    case "proses":
      return "bg-amber-50 text-amber-7 border border-amber-2";
    case "selesai":
      return "bg-green-50 text-green-7 border border-green-2";
    default:
      return "bg-gray-1 text-gray-5 border border-gray-2";
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
  "Tanggal Diproses",
  "Petugas",
];
</script>

<template>
  <section class="overflow-x-auto">
    <table class="w-full text-sm" v-if="totalData.length > 0">
      <thead class="bg-gray-50 border-b border-gray-2">
        <tr>
          <th v-if="publicData" v-for="elem in tableHead" class="th-cell">{{ elem }}</th>
          <th v-else v-for="elem in tableHeadPublic" class="th-cell">{{ elem }}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="td-row" v-for="data in listData" :key="data.id">
          <td class="td-cell font-medium text-gray-8">{{ data.npm }}</td>
          <td class="td-cell">{{ data.nama_lengkap }}</td>
          <td class="td-cell" v-show="publicData">{{ data.email }}</td>
          <td class="td-cell">{{ displayKeperluanSurat(data.keperluan) }}</td>
          <td class="td-cell">{{ displayPersyaratan(data.persyaratan) }}</td>
          <td class="td-cell text-xs text-gray-5" v-show="publicData">{{ convertTimeZone(data.date_created) }}</td>
          <td class="td-cell">
            <span :class="displayMessage(data.status_pengajuan)" class="status-pill">
              {{ displayStatusPengajuanSurat(data.status_pengajuan) }}
            </span>
          </td>
          <td class="td-cell text-xs text-gray-5">
            <span v-if="!data.date_updated">—</span>
            <span v-else>{{ convertTimeZone(data.date_updated) }}</span>
          </td>
          <td class="td-cell">{{ searchPetugas(data.user_updated) }}</td>
          <td class="td-cell" v-show="publicData">
            <NuxtLink
              :to="'https://repository.unpad.ac.id:8050/admin/content/pengajuan_surat_bebas_pustaka/' + data.id"
              class="btn bg-unpad text-white text-xs py-1 px-3"
              target="_blank"
            >
              Cek
            </NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="flex flex-col items-center py-10 text-center">
      <div class="i-mdi-file-outline w-10 h-10 text-gray-3 ma mb-3" />
      <p class="text-gray-4 italic">Belum ada data pengajuan.</p>
    </div>
    <div
      class="flex items-center justify-center gap-2 px-4 py-4 border-t border-gray-1"
      v-show="totalData.length > 10"
    >
      <button
        class="btn py-1.5 px-5 text-sm"
        @click="prevData"
        :class="pageState === 0 ? 'disable-btn' : 'enable-btn'"
        :disabled="pageState === 0"
      >
        ← Sebelumnya
      </button>
      <span class="text-sm text-gray-5 font-medium">
        {{ pageState < 10 ? "1" : (pageState + 10) / 10 }} / {{ (Number(gapData) + 10) / 10 }}
      </span>
      <button
        class="btn py-1.5 px-5 text-sm"
        @click="nextData"
        :class="pageState < gapData ? 'enable-btn' : 'disable-btn'"
        :disabled="pageState >= gapData"
      >
        Selanjutnya →
      </button>
    </div>
  </section>
</template>

<style scoped>
.th-cell {
  --at-apply: px-4 py-3 text-left text-xs font-700 text-gray-5 uppercase tracking-wider whitespace-nowrap;
}

.td-row {
  --at-apply: border-b border-gray-1 hover:bg-gray-50 transition-colors-150;
}

.td-cell {
  --at-apply: px-4 py-3 text-gray-7 whitespace-nowrap;
}

.status-pill {
  --at-apply: inline-block text-xs font-600 px-2.5 py-0.5 rounded-full;
}

.disable-btn {
  --at-apply: bg-gray-1 text-gray-4 border border-gray-2 cursor-not-allowed;
}

.enable-btn {
  --at-apply: bg-unpad text-white;
}
</style>
