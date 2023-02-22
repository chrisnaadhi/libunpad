<script setup>
const { getItems } = useDirectusItems();
const config = useRuntimeConfig();

const route = useRoute();
const dataKerja = ref();
const offsetVal = ref(0);
const baseVal = ref(4);

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
    offsetVal.value / baseVal.value + 1 ===
    Math.ceil(dataPekerjaan.meta.filter_count / baseVal.value);
  if (maxVal) {
    return true;
  } else {
    return false;
  }
});

const pageTask = computed(() => {
  if (offsetVal.value === 0) {
    return 1;
  } else if (offsetVal.value >= 1) {
    return offsetVal.value / baseVal.value + 1;
  } else {
    return "Something is breaking in offset value";
  }
});

const fetchDataPekerjaan = async (val) => {
  if (val === "next") {
    offsetVal.value += baseVal.value;
  } else if (val === "prev") {
    offsetVal.value -= baseVal.value;
  } else {
    offsetVal.value = 0;
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
        offset: offsetVal.value,
        limit: baseVal.value,
      },
    });
  } catch (error) {
    console.log(error);
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

onMounted(async () => {
  if (offsetVal.value === 0) {
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
        limit: baseVal.value,
      },
    });
  } else {
    console.log("nah");
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
            {{ data.deskripsi_tugas }}
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
        {{ pageTask }} /
        {{ Math.ceil(dataPekerjaan.meta.filter_count / baseVal) }}
      </p>
      <div class="flex justify-center gap-2">
        <button
          class="btn"
          :class="
            offsetVal === 0 ? 'bg-gray-2 cursor-not-allowed' : 'bg-blue-2'
          "
          :disabled="offsetVal === 0"
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
