<script setup>
const { getItems, updateItem } = useDirectusItems();
const { getUserById } = useDirectusUsers();
const config = useRuntimeConfig();

const date = new Date();
const jumlahPengunjung = ref(null);
const loadInputJumlahPengunjung = ref(false);
const updateText = ref("Simpan")
const dataJamTambahan = ref();
const extendToday = extendedEveningServiceTime();
const hariIni = new Intl.DateTimeFormat("id-id", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
}).format(date);

const getExtendedTimeVisitor = await getItems({
  collection: "data_kunjungan",
  params: {
    filter: {
      date_created: {
        _between: extendToday,
      },
    },
    meta: "filter_count",
  },
});

const getPetugasExtendedTimeService = await getItems({
  collection: "piket_layanan",
  params: {
    filter: {
      tanggal: {
        _eq: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      },
    },
  },
});

const profilPetugas = await getUserById({
  id:
    getPetugasExtendedTimeService[0]?.petugas_pertama ??
    "6090A4D5-BD85-423D-9231-E50E705CFD22",
});

const getDataJamLayananTambahan = async () => {
  const getData = await getItems({
    collection: "piket_layanan",
    params: {
      filter: {
        tanggal: {
          _eq: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        },
      },
    },
  });

  dataJamTambahan.value = await getData[0]
}

const updateJumlahPengunjung = async () => {
  if (jumlahPengunjung.value) {
    loadInputJumlahPengunjung.value = true;
    await updateItem({
      collection: "piket_layanan",
      id: getPetugasExtendedTimeService[0]?.id,
      item: {
        jumlah_kunjungan: jumlahPengunjung.value,
      },
    }).then(() => {
      getDataJamLayananTambahan();
      updateText.value = "Berhasil Disimpan!";
      jumlahPengunjung.value = null;
      setTimeout(() => {
        updateText.value = "Simpan";
        loadInputJumlahPengunjung.value = false;
      }, 2000);
    });
  } else {
    alert("Jumlah Pengunjung tidak boleh kosong!");
  }
}

onMounted(async () => {
  await getDataJamLayananTambahan();
});
</script>

<template>
  <div class="text-center bg-gray-200 rounded-xl p-5">
    <h2>Data Pengunjung di Jam Tambahan</h2>
    <div class="w-full flex flex-col gap-3 gap-5">
      <div>
        <h5>{{ hariIni }}</h5>
        <h5>{{ jamPiketPegawai(date.getDay()) }}</h5>

        <h3>
          Petugas Piket:
          <span class="font-600 text-orange-6">
            {{
          getPetugasExtendedTimeService[0] === undefined
            ? "Tidak ada Petugas"
            : `${profilPetugas.first_name} ${profilPetugas.last_name}`
        }}
          </span>
        </h3>
        <h1>
          {{
            getExtendedTimeVisitor.meta.filter_count === 0
              ? "Belum ada Data!"
              : getExtendedTimeVisitor.meta.filter_count
          }}
        </h1>
        <p class="italic" v-show="getExtendedTimeVisitor.meta.filter_count !== 0">
          orang
        </p>
      </div>
      <div class="max-w-2xl ma">
        <h5>Silahkan tuliskan jumlah data kunjungan yang sudah anda hitung secara manual pada form dibawah ini lalu klik <span class="text-orange-6 font-semibold">Simpan</span> untuk menyimpan data laporan kunjungan.</h5>
        
        <form @submit.prevent="updateJumlahPengunjung" class="max-w-xl ma flex flex-col items-center gap-3 mb-5">
          <input type="number" v-model="jumlahPengunjung" class="w-full p-2 border border-gray-400 rounded-lg"
            placeholder="Jumlah Pengunjung" />
          <button type="submit" class="bg-orange-6 w-full text-white p-2 rounded-lg"
            :disabled="loadInputJumlahPengunjung">
            {{ updateText }}
          </button>
        </form>
        <p v-if="dataJamTambahan?.jumlah_kunjungan">Data kunjungan yang sudah tersimpan di database: <span class="font-semibold text-green-6"> {{ dataJamTambahan?.jumlah_kunjungan ?? "Data Kunjungan Manual belum diinput." }} orang</span></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  --at-apply: font-600 text-4xl text-orange-5;
}

h3 {
  --at-apply: text-xl;
}
</style>
