<script setup>
const { getItems } = useDirectusItems();
const pageState = ref(0);
const listData = ref(null);

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

async function fetchDataPeminjam() {
  listData.value = await getItems({
    collection: "peminjaman_ruangan",
    params: {
      sort: "-date_created",
      offset: pageState.value,
      limit: 10,
    },
  });
}

const totalData = await getItems({
  collection: "peminjaman_ruangan",
});

const gapData = Math.floor(totalData.length / 10) * 10;

if (listData.value === null) {
  listData.value = fetchDataPeminjam();
}

const nextData = () => {
  if (pageState.value < gapData) {
    pageState.value += 10;
    fetchDataPeminjam();
  }
};

const prevData = () => {
  if (pageState !== 0) {
    pageState.value -= 10;
    fetchDataPeminjam();
  }
};

const convertDate = (val) => {
  const date = new Date(val);
  return date.toLocaleDateString("id-ID");
};

const displayStatusPeminjaman = (val) => {
  switch (val) {
    case "pending":
      return "bg-gray-1 text-gray-6 border border-gray-3";
    case "approved":
      return "bg-green-50 text-green-7 border border-green-2";
    case "cancel":
      return "bg-red-50 text-red-7 border border-red-2";
    default:
      return "bg-blue-50 text-blue-7 border border-blue-2";
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
    case "ruang_teater":
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
  <section>
    <GenericTableData>
      <template #tablehead>
        <tr>
          <th v-for="elem in tableHeadPublic" class="th-cell">{{ elem }}</th>
        </tr>
      </template>
      <template #tablebody>
        <tr class="td-row" v-for="elem in listData" :key="elem.id">
          <td class="td-cell font-medium text-gray-8">{{ elem.nama_lengkap }}</td>
          <td class="td-cell">{{ displayNamaRuangan(elem.nama_ruangan) }}</td>
          <td class="td-cell">{{ elem.tanggal_peminjaman }}</td>
          <td class="td-cell">{{ elem.jam_mulai_peminjaman }} — {{ elem.jam_selesai_peminjaman }}</td>
          <td class="td-cell">
            <span :class="displayStatusPeminjaman(elem.status_peminjaman)" class="status-pill">
              {{ elem.status_peminjaman }}
            </span>
          </td>
        </tr>
      </template>
    </GenericTableData>
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
  --at-apply: inline-block text-xs font-600 px-2.5 py-0.5 rounded-full capitalize;
}

.disable-btn {
  --at-apply: bg-gray-1 text-gray-4 border border-gray-2 cursor-not-allowed;
}

.enable-btn {
  --at-apply: bg-unpad text-white;
}
</style>
