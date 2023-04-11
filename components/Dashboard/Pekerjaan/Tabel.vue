<script setup>
import { tugasPagination } from "@/composables/utilsFunction";
const { getItems } = useDirectusItems();
const { getUsers } = useDirectusUsers();

const route = useRoute();
const dataKerja = ref();
const pageStore = tugasPagination();

const dataPekerjaan = await getItems({
  collection: "pekerjaan_harian",
  params: {
    filter: {
      pegawai: {
        _eq: "$CURRENT_USER",
      },
    },
    sort: "date_created",
    meta: "filter_count",
  },
});

const maxedTask = computed(() => {
  const maxVal =
    pageStore.offsetVal / pageStore.baseVal + 1 ===
    Math.ceil(dataPekerjaan.meta.filter_count / pageStore.baseVal);
  if (maxVal) {
    return true;
  } else {
    return false;
  }
});

const fetchDataPekerjaan = async (val) => {
  if (val === "next") {
    pageStore.offsetVal += pageStore.baseVal;
  } else if (val === "prev") {
    pageStore.offsetVal -= pageStore.baseVal;
  } else {
    pageStore.offsetVal = pageStore.offsetVal;
  }
  try {
    dataKerja.value = await getItems({
      collection: "pekerjaan_harian",
      params: {
        filter: {
          pegawai: {
            _eq: "$CURRENT_USER",
          },
        },
        sort: "date_created",
        offset: pageStore.offsetVal,
        limit: pageStore.baseVal,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const dataUser = await getUsers();

const searchPetugas = (idPetugas) => {
  const petugas = dataUser.find((nama) => nama.id === idPetugas);
  if (!petugas) {
    return "Belum diproses";
  }
  const objPetugas = Object.assign({}, petugas);
  return `${objPetugas.first_name} ${objPetugas.last_name}`;
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

onMounted(async () => {
  if (pageStore.offsetVal === 0) {
    dataKerja.value = await getItems({
      collection: "pekerjaan_harian",
      params: {
        filter: {
          pegawai: {
            _eq: "$CURRENT_USER",
          },
        },
        sort: "date_created",
        offset: 0,
        limit: pageStore.baseVal,
      },
    });
  } else {
    fetchDataPekerjaan();
  }
});
</script>

<template>
  <section>
    <!-- <div class="my-2">
      Filter :
      <span class="filter-list">Semua</span>
      <span class="filter-list">Pending</span>
      <span class="filter-list">Belum</span>
      <span class="filter-list">Sedang</span>
      <span class="filter-list">Selesai</span>
    </div> -->
    <table class="w-full">
      <thead>
        <tr>
          <th>Tipe</th>
          <th>Nama Tugas</th>
          <th>Deskripsi Tugas</th>
          <th>Pemberi Tugas</th>
          <th>Tanggal Dibuat</th>
          <th>Tanggal Diperbarui</th>
          <th>Status Tugas</th>
          <th>Update Tugas</th>
        </tr>
      </thead>
      <tbody v-for="data in dataKerja" :key="data.id">
        <tr>
          <td>{{ data.kriteria_tugas }}</td>
          <td>{{ data.nama_tugas }}</td>
          <td class="max-w-4xl">
            {{ trimDescription(data.deskripsi_tugas, 50) }}
          </td>
          <td>{{ searchPetugas(data.user_created) }}</td>
          <td>{{ convertTimeZone(data.date_created) }}</td>
          <td>{{ convertTimeZone(data.date_updated) }}</td>
          <td :class="statusTugasColor(data.status)" class="font-600">
            {{ displayStatusTugas(data.status) }}
          </td>
          <td>
            <NuxtLink
              :to="route.fullPath + '/' + data.id"
              class="btn bg-orange-2 py-1 px-3"
              >Update</NuxtLink
            >
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex flex-col items-center">
      <p>
        {{ pageStore.pageTask }} /
        {{
          dataPekerjaan.meta.filter_count === 0
            ? 1
            : Math.ceil(dataPekerjaan.meta.filter_count / pageStore.baseVal)
        }}
      </p>
      <div class="flex justify-center gap-2">
        <button
          class="btn"
          :class="
            pageStore.offsetVal === 0
              ? 'bg-gray-2 cursor-not-allowed'
              : 'bg-blue-2'
          "
          :disabled="pageStore.offsetVal === 0"
          @click="fetchDataPekerjaan('prev')"
        >
          Sebelumnya
        </button>
        <button
          class="btn"
          :class="maxedTask ? 'bg-gray-2 cursor-not-allowed' : 'bg-blue-2'"
          @click="fetchDataPekerjaan('next')"
          :disabled="maxedTask"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  </section>
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
  --at-apply: p-3 text-center;
}

.filter-list {
  --at-apply: mx-2 bg-gray-3 px-2 py-1 rounded cursor-pointer;
}
</style>
