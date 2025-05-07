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
        <tr class="bg-white" v-for="elem in listData">
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
    <div
      class="flex items-center justify-center gap-1 mt-3"
      v-show="totalData.length > 10"
    >
      <button
        class="btn py-0 px-5"
        @click="prevData"
        :class="pageState === 0 ? 'disable-btn' : 'enable-btn'"
        :disabled="pageState === 0"
      >
        Prev
      </button>
      <div>
        {{ pageState < 10 ? "1" : (pageState + 10) / 10 }} /
        {{ (Number(gapData) + 10) / 10 }}
      </div>
      <button
        class="btn bg-unpad py-0 px-5"
        @click="nextData"
        :class="pageState < gapData ? 'enable-btn' : 'disable-btn'"
        :disable="pageState <= gapData"
      >
        Next
      </button>
    </div>
  </section>
</template>

<style scoped>
.table-border {
  --at-apply: border border-unpad p-1;
}

.disable-btn {
  --at-apply: bg-gray-3 text-dark cursor-not-allowed;
}

.enable-btn {
  --at-apply: bg-unpad text-white;
}
</style>
