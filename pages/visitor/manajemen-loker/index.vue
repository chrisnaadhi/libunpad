<script setup>
definePageMeta({
  layout: "kunjungan",
});
const { getItems, getItemById, updateItem } = useDirectusItems()
const val = ref('Manajemen Loker');
const displayConfirmation = ref(false);
const loadPengembalianState = ref(false);
const idLoker = ref(null);
const chosenLoker = ref(null);
const allLokerData = ref(null);

const getAllLokerData = async () => {
  allLokerData.value = await getItems({
    collection: 'data_kesediaan_loker',
    params: {
      limit: 150
    }
  })
}

const confirmationDisplay = async (id) => {
  displayConfirmation.value = true;
  await getItemById({
    collection: 'data_kesediaan_loker',
    id
  }).then(async (res) => {
    chosenLoker.value = res.nomor_loker;

    await getItems({
      collection: 'data_peminjaman_loker',
      params: {
        filter: {
          nomor_loker: {
            _eq: res.nomor_loker
          },
        }
      }
    }).then(async (res) => {
      idLoker.value = res[0].id;
    })
  })
}

const pengembalianKunci = async () => {
  loadPengembalianState.value = true;

  await updateItem({
    collection: 'data_kesediaan_loker',
    id: chosenLoker.value,
    item: {
      status_loker: 'dapat_dipinjam',
      nama_peminjam: null,
      npm_peminjam: null,
    }
  }).then(async () => {
    loadPengembalianState.value = false;
    await updateItem({
      collection: 'data_peminjaman_loker',
      id: idLoker.value,
      item: {
        dikembalikan_pada: new Date().toISOString().split('.')[0]
      }
    }).then(async () => {
      await getAllLokerData();
      idLoker.value = null;
      chosenLoker.value = null;
      displayConfirmation.value = false;
    })

  })

}

onMounted(() => {
  getAllLokerData();
})
</script>

<template>
  <div>
    <div class="absolute mt--15">
      <Transition>
        <ModalBase v-if="displayConfirmation">
          <div class="bg-white px-15 py-5 rounded-lg text-center">
            <h5>Apakah anda yakin ingin mengembalikan kunci dengan nomor loker:</h5>
            <h1 class="text-7xl text-orange font-bold">{{ chosenLoker }}</h1>
            <div class="flex gap-5 mt-5">
              <button class="bg-orange-5 w-full text-white btn" @click="pengembalianKunci()">Ya</button>
              <button class="bg-red-5 w-full text-white btn" @click="displayConfirmation = false">Tidak</button>
            </div>
          </div>
        </ModalBase>
      </Transition>
    </div>
    <section class="relative">
      <h1>{{ val }}</h1>
      <div class="grid grid-cols-5 gap-3">
        <div v-for="data in allLokerData" class="loker-card">
          <p class="font-semibold">No. Loker :</p>
          <h1 class="font-bold text-orange text-7xl">{{ data.nomor_loker }}</h1>
          <div v-if="data.status_loker === 'dapat_dipinjam'">
            <p class="bg-green-5 text-white status-loker">Bisa Dipinjam</p>
            <div>
              <p>Nama Peminjam: </p>
              <p class="font-semibold text-green-6">{{ data.nama_peminjam ?? "Belum ada Data" }}</p>
              <p>NPM Peminjam: </p>
              <p class="font-semibold text-green-6">{{ data.npm_peminjam ?? "Belum ada Data" }}</p>

              <p>Terakhir dipinjam:</p>
              <p class="text-xs">{{ convertTimeZone(data.date_updated) ?? "Belum pernah dipinjam" }}</p>
            </div>
          </div>
          <div v-else-if="data.status_loker === 'sedang_dipinjam'">
            <p class="bg-yellow-5 status-loker">Sedang Dipinjam</p>
            <div>
              <p>Nama Peminjam: </p>
              <p class="font-semibold text-yellow-5">{{ data.nama_peminjam ?? "Belum ada Data" }}</p>
              <p>NPM Peminjam: </p>
              <p class="font-semibold text-yellow-5">{{ data.npm_peminjam ?? "Belum ada Data" }}</p>
              <p>Terakhir dipinjam:</p>
              <p class="text-xs">{{ convertTimeZone(data.date_updated) ?? "Belum pernah dipinjam" }}</p>
            </div>
          </div>
          <div v-else-if="data.status_loker === 'perbaikan'">
            <p class="bg-dark-5 text-white status-loker">Sedang diperbaiki</p>
            <div>
              <p>Nama Peminjam: </p>
              <p class="font-semibold text-red-6">Dalam Perbaikan</p>
              <p>NPM Peminjam: </p>
              <p class="font-semibold text-red-6">Dalam Perbaikan</p>
              <p>Terakhir dipinjam:</p>
              <p class="text-xs">{{ convertTimeZone(data.date_updated) ?? "Belum pernah dipinjam" }}</p>
            </div>
          </div>
          <div v-else-if="data.status_loker === 'rusak'">
            <p class="bg-red-5 text-white status-loker">Rusak!</p>
            <div>
              <p>Nama Peminjam: </p>
              <p class="font-semibold text-red-6">Rusak</p>
              <p>NPM Peminjam: </p>
              <p class="font-semibold text-red-6">Rusak</p>
              <p>Terakhir dipinjam:</p>
              <p class="text-xs">{{ convertTimeZone(data.date_updated) ?? "Belum pernah dipinjam" }}</p>
            </div>
          </div>
          <div v-else>
            <p>Sepertinya anda membuat kesalahan, silahkan hubungi Chrisna Adhi Pranoto.</p>
          </div>
          <div class="pt-3">
            <button class="w-full bg-orange-5 text-white py-3 rounded-lg" v-if="data.status_loker === 'sedang_dipinjam'"
              @click="confirmationDisplay(data.id)">{{ loadPengembalianState === false ? "Pengembalian Kunci" : "Proses Pengembalian..." }}</button>
            <button class="w-full bg-gray-3 text-dark py-3 rounded-lg cursor-not-allowed" v-else>Kunci Tersedia</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}

.loker-card {
  --at-apply: bg-white p-4 rounded-lg shadow-md text-center;
}

.status-loker {
  --at-apply: py-2 rounded-lg text-center;
}
</style>