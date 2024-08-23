<script setup>
definePageMeta({
  layout: "kunjungan",
  middleware: ["directus-auth"],
});
const { getItems, createItems, getItemById, updateItem } = useDirectusItems()
const val = ref('Manajemen Loker Kandaga');
const displayConfirmation = ref(false);
const loadPengembalianState = ref(false);
const idLoker = ref(null);
const chosenLoker = ref(null);
const nomorLoker = ref(null);
const allLokerData = ref(null);
const availableLokerData = ref(null);
const usedLokerData = ref(null);
const brokenLokerData = ref(null);
const fixedLokerData = ref(null);
const latestLoker = ref(null);
const manualTextInfo = ref("Input peminjaman secara manual")

const npmManual = ref("");
const namaManual = ref("");
const idLokerManual = ref("");

const getAllLokerData = async () => {
  allLokerData.value = await getItems({
    collection: 'list_kesediaan_loker',
    params: {
      limit: 156
    }
  })

  usedLokerData.value = await getItems({
    collection: 'list_kesediaan_loker',
    params: {
      filter: {
        status_loker: {
          _eq: 'sedang_dipinjam'
        }
      },
      limit: 156
    }
  })

  brokenLokerData.value = await getItems({
    collection: 'list_kesediaan_loker',
    params: {
      filter: {
        status_loker: {
          _eq: 'rusak'
        }
      },
      limit: 156
    }
  })

  fixedLokerData.value = await getItems({
    collection: 'list_kesediaan_loker',
    params: {
      filter: {
        status_loker: {
          _eq: 'perbaikan'
        }
      },
      limit: 156
    }
  })
}

const getAvailableLoker = async () => {
  availableLokerData.value = await getItems({
    collection: 'list_kesediaan_loker',
    params: {
      filter: {
        status_loker: {
          _eq: 'dapat_dipinjam'
        }
      },
      limit: 150
    }
  })
}

const getLatestLokerData = async () => {
  const [first] = await getItems({
    collection: 'list_peminjaman_loker',
    params: {
      limit: 1,
      sort: '-date_created',
    }
  })

  latestLoker.value = await first;
}

const confirmationDisplay = async (id) => {
  displayConfirmation.value = true;
  await getItemById({
    collection: 'list_kesediaan_loker',
    id: id
  }).then(async (res) => {
    console.log(res)
    nomorLoker.value = res.nomor_loker;
    chosenLoker.value = res.id

    await getItems({
      collection: 'list_peminjaman_loker',
      params: {
        filter: {
          nomor_loker: {
            _eq: chosenLoker.value
          },
        },
        // sort: '-date_created',
        limit: 1
      }
    }).then(async (res) => {
      idLoker.value = res[0]?.id;
      console.log(res)
      console.log("Chosen ID Loker : " + chosenLoker.value)
      console.log("ID Loker : " + idLoker.value)
      console.log("Nomor Loker : " + nomorLoker.value)
    })
  })
}

const pengembalianKunci = async () => {
  loadPengembalianState.value = true;

  console.log(chosenLoker.value)
  console.log(idLoker.value)

  await updateItem({
    collection: 'list_kesediaan_loker',
    id: chosenLoker.value,
    item: {
      status_loker: 'dapat_dipinjam',
      nama_peminjam: null,
      npm_peminjam: null,
    }
  }).then(async () => {
    loadPengembalianState.value = false;
    const date = new Date();
    await updateItem({
      collection: 'list_peminjaman_loker',
      id: idLoker.value,
      item: {
        dikembalikan_pada: dateToISOLikeButLocal(date)
      }
    }).then(() => {
      getAllLokerData();
      getLatestLokerData();
      getAvailableLoker();
      idLoker.value = null;
      chosenLoker.value = null;
      nomorLoker.value = null;
      displayConfirmation.value = false;
    })
  })
}

const refreshLatestDataPeminjam = () => {
  getAllLokerData();
  getLatestLokerData();
  getAvailableLoker();
}

const peminjamanManual = async () => {
  manualTextInfo.value = "Mohon tunggu, sedang memproses data..."

  if (npmManual.value === "" || namaManual.value === "" || idLokerManual.value === "") {
    manualTextInfo.value = "Mohon isi semua data dengan benar!"
    setTimeout(() => {
      manualTextInfo.value = "Input peminjaman secara manual"
    }, 3000);
  } else {
    const cekJikaSudahMeminjam = await getItems({
      collection: "list_kesediaan_loker",
      params: {
        filter: {
          _or: [
            {
              nama_peminjam: {
                _eq: namaManual.value,
              },
            },
            {
              npm_peminjam: {
                _eq: npmManual.value,
              },
            },
          ],
        }
      }
    })
    if (cekJikaSudahMeminjam.length === 0) {
      await updateItem({
        collection: 'list_kesediaan_loker',
        id: idLokerManual.value,
        item: {
          status_loker: 'sedang_dipinjam',
          nama_peminjam: namaManual.value,
          npm_peminjam: npmManual.value,
        }
      }).then(async () => {
        await createItems({
          collection: "list_peminjaman_loker",
          items: {
            nomor_loker: idLokerManual.value,
            nama_peminjam: namaManual.value,
            nomor_induk: npmManual.value,
          },
        }).then(() => {
          getAllLokerData();
          getLatestLokerData();
          getAvailableLoker();
          manualTextInfo.value = "Peminjaman Manual berhasil!"
          idLokerManual.value = "";
          namaManual.value = "";
          npmManual.value = "";
          setTimeout(() => {
            manualTextInfo.value = "Input peminjaman secara manual"
          }, 2000);
        })

      })
    } else {
      manualTextInfo.value = "Pengunjung ini sudah meminjam loker!"
      setTimeout(() => {
        manualTextInfo.value = "Input peminjaman secara manual"
      }, 2000);
    }
  }
}

const changeLokerState = async (state, id) => {
  await updateItem({
    collection: 'list_kesediaan_loker',
    id: id,
    item: {
      status_loker: state
    }
  }).then(() => {
    getAllLokerData();
    getLatestLokerData();
    getAvailableLoker();
    idLoker.value = null;
    chosenLoker.value = null;
    nomorLoker.value = null;
    displayConfirmation.value = false;
  })
}

setTimeout(() => {
  getAvailableLoker();
  getLatestLokerData();
  getAllLokerData();
}, 1000 * 60 * 30)

onMounted(() => {
  getAvailableLoker();
  getLatestLokerData();
  getAllLokerData();
})
</script>

<template>
  <div>
    <div class="absolute mt--25">
      <Transition>
        <ModalBase v-if="displayConfirmation">
          <div class="bg-white px-15 py-5 rounded-lg text-center">
            <h5>Apakah anda yakin ingin mengembalikan kunci dengan nomor loker:</h5>
            <h1 class="text-7xl text-orange font-bold">{{ nomorLoker }}</h1>
            <div class="flex gap-5 mt-5">
              <button class="bg-orange-5 w-full text-white btn" @click="pengembalianKunci()">Ya</button>
              <button class="bg-red-5 w-full text-white btn" @click="displayConfirmation = false">Tidak</button>
            </div>
          </div>
        </ModalBase>
      </Transition>
    </div>
    <section class="relative">
      <h1 class="text-center mt-10">{{ val }}</h1>
      <p class="text-center font-semibold">Data Peminjaman Loker akan otomatis terupdate setiap 30 menit.</p>
      <div class="flex flex-col items-center justify-center">
        <p>Untuk Kembali ke Dashboard klik tombol berikut :</p>
        <NuxtLink to="/dashboard">
          <button class="btn bg-orange text-white mb-5">Kembali ke Dashboard</button>
        </NuxtLink>
      </div>
      <div class="text-center flex items-center justify-center gap-4">
        <div class="loker-card">
          <p>Jumlah Loker yang dapat dipinjam: </p>
          <h1 class="font-bold text-green-5 text-7xl">{{ availableLokerData?.length ?? 0 }}</h1>
        </div>
        <div class="loker-card">
          <p>Jumlah Loker yang sedang dipinjam: </p>
          <h1 class="font-bold text-yellow-5 text-7xl">{{ usedLokerData?.length ?? 0 }}</h1>
        </div>
        <div class="loker-card">
          <p>Jumlah Loker yang sedang rusak: </p>
          <h1 class="font-bold text-red-5 text-7xl">{{ brokenLokerData?.length ?? 0 }}</h1>
        </div>
        <div class="loker-card">
          <p>Jumlah Loker yang sedang diperbaiki: </p>
          <h1 class="font-bold text-gray-5 text-7xl">{{ fixedLokerData?.length ?? 0 }}</h1>
        </div>

      </div>
      <div class="flex items-center justify-center gap-5 w-full">
        <div class="flex flex-col items-center justify-center my-10">
          <h5>Data Peminjam Terakhir</h5>
          <div class="flex flex-col w-lg h-72 items-center justify-center bg-white rounded-lg max-w-lg p-10 gap-3">
            <div class="flex items-center justify-center gap-5">
              <div class="flex flex-col items-center">
                <p class="bg-green-5 text-white status-loker px-5" v-if="latestLoker?.dikembalikan_pada">Sudah
                  Dikembalikan</p>
                <p class="bg-yellow-5 text-white status-loker px-5" v-else-if="latestLoker?.dikembalikan_pada === null">
                  Masih Dipinjam</p>
                <p class="bg-blue-5 text-white status-loker px-5" v-else>Sedang memuat data...</p>
                <p class="font-semibold">No. Loker :</p>
                <h1 class="font-bold text-orange text-7xl" v-if="latestLoker?.nomor_loker">{{ latestLoker?.nomor_loker
                  }}</h1>
                <h1 class="font-bold text-blue-5 text-7xl" v-if="!latestLoker?.nomor_loker">XXX</h1>
              </div>
              <div>
                <p>Nama Peminjam: </p>
                <p class="font-semibold text-orange-5">{{ latestLoker?.nama_peminjam ?? "Belum ada Data" }}</p>
                <p>NPM Peminjam: </p>
                <p class="font-semibold text-orange-5">{{ latestLoker?.nomor_induk ?? "Belum ada Data" }}</p>
                <p>Jam dipinjam:</p>
                <p class="text-sm font-semibold">{{ convertTimeZone(latestLoker?.date_created)
          ?? "Belum pernah dipinjam" }}</p>
              </div>
            </div>
            <div>
              <button class="btn bg-green-5 text-white" @click="refreshLatestDataPeminjam">Refresh Data</button>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center my-10">
          <h5>Peminjaman Manual</h5>
          <div class="flex flex-col w-lg h-72 bg-white rounded-lg max-w-lg px-10 py-5 gap-5">
            <div class="bg-gray-2 text-center py-1 rounded">
              <p>{{ manualTextInfo }}</p>
            </div>
            <form @submit.prevent="peminjamanManual" class="w-full flex flex-col gap-3">
              <div class="grid grid-cols-3 grid-flow-row-dense items-center">
                <label for="npm">NPM / Institusi :</label>
                <input type="text" class="border-1 border-orange rounded px-2 py-1 col-span-2" v-model="npmManual"
                  required>
              </div>
              <div class="grid grid-cols-3 grid-flow-row-dense items-center">
                <label for="npm">Nama Lengkap :</label>
                <input type="text" class="border-1 border-orange rounded px-2 py-1 col-span-2" v-model="namaManual"
                  required>
              </div>
              <div class="grid grid-cols-3 grid-flow-row-dense items-center">
                <label for="npm">Nomor Loker :</label>
                <select class="border-1 border-orange rounded px-2 py-1 col-span-2" v-model="idLokerManual" required>
                  <option v-for="loker in availableLokerData" :value="loker.id">{{ loker.nomor_loker }}</option>
                </select>
              </div>
              <button type="submit" @click.prevent="peminjamanManual" class="btn text-white">Pinjam</button>
            </form>
          </div>
        </div>
      </div>

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
            <p class="bg-yellow-5 text-white status-loker">Sedang Dipinjam</p>
            <div>
              <p>Nama Peminjam: </p>
              <p class="font-semibold text-orange-5">{{ data.nama_peminjam ?? "Belum ada Data" }}</p>
              <p>NPM Peminjam: </p>
              <p class="font-semibold text-orange-5">{{ data.npm_peminjam ?? "Belum ada Data" }}</p>
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
              @click="confirmationDisplay(data.id)">{{ loadPengembalianState ===
          false ? "Pengembalian Kunci" : "Proses Pengembalian..." }}</button>
            <button class="w-full bg-gray-3 text-dark py-3 rounded-lg cursor-not-allowed" v-else>Kunci Tersedia</button>
          </div>
          <div class="flex w-full items-center justify-center gap-1 mt-2">
            <button class="bg-red-5 text-white btn w-full text-xs" @click="changeLokerState('rusak', data.id)"
              :disabled="data.status_loker === 'rusak' || data.status_loker === 'sedang_dipinjam'">Rusak</button>
            <button class="bg-dark-5  text-white btn w-full text-xs" @click="changeLokerState('perbaikan', data.id)"
              :disabled="data.status_loker === 'perbaikan' || data.status_loker === 'sedang_dipinjam'">Perbaikan</button>
            <button class="bg-green-5  text-white btn w-full text-xs"
              @click="changeLokerState('dapat_dipinjam', data.id)"
              :disabled="data.status_loker === 'dapat_dipinjam' || data.status_loker === 'sedang_dipinjam'">Tersedia</button>
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

label {
  --at-apply: pb-0;
}

.loker-card {
  --at-apply: bg-white p-4 rounded-lg shadow-md text-center;
}

.status-loker {
  --at-apply: py-2 rounded-lg text-center;
}
</style>