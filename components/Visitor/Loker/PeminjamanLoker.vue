<script setup>
defineProps(["name"]);

const emit = defineEmits([
  "peminjaman",
  "requestPeminjaman",
  "tutupPeminjamanLoker",
]);
const peminjamanLokerStore = prosesPeminjamanLoker();

const listRuangan = [
  {
    id: 1,
    nama: "Ruang Sirkulasi",
    thumbnailId: "/images/Visitor/sirkulasi.jpg",
  },
  {
    id: 2,
    nama: "Ruang Tugas Akhir",
    thumbnailId: "/images/Visitor/skripsi-sample.jpg",
  },
  {
    id: 3,
    nama: "Ruang Populer",
    thumbnailId: "/images/Visitor/populer.jpg",
  },
  {
    id: 4,
    nama: "Ruang Referensi",
    thumbnailId: "/images/Visitor/referensi.jpg",
  },
];
</script>

<template>
  <div class="modal-display">
    <Transition>
      <section class="max-w-3xl bg-white px-10 py-5 rounded-lg">
        <div
          v-if="
            peminjamanLokerStore.showLokerData === false &&
            peminjamanLokerStore.isFull === false
          "
          class="flex flex-col items-center justify-center"
        >
          <h1 class="text-2xl font-600 text-center">
            Apakah <br />
            <span class="text-orange-6 font-bold"> {{ name ?? "Anda" }} </span
            ><br />
            ingin meminjam Loker ?
          </h1>
          <div class="grid grid-cols-2 gap-15 mt-4">
            <div class="text-center">
              <h6>
                Anda Wajib menggunakan Loker jika anda ingin ke Ruangan ini :
              </h6>
              <div class="grid grid-cols-2 gap-3 justify-center my-2">
                <div
                  v-for="ruangan in listRuangan"
                  class="w-full flex flex-col items-center gap-1"
                >
                  <NuxtImg
                    :src="ruangan.thumbnailId"
                    class="w-full h-24 object-cover rounded-xl"
                  />
                  <p
                    class="text-sm w-full px-3 py-1 rounded bg-unpad text-white"
                  >
                    {{ ruangan.nama }}
                  </p>
                </div>
              </div>
              <p class="text-gray-5 text-sm italic">Klik tombol dibawah ini</p>
              <button
                class="btn bg-green-5 text-white w-full"
                @click="emit('requestPeminjaman')"
              >
                Ya
              </button>
            </div>
            <div class="flex flex-col items-center justify-between text-center">
              <h6>
                Jika tidak ke ruangan yang ada di gambar sebelah maka anda bisa
                klik tombol Tidak.
              </h6>
              <NuxtImg
                src="/illustration/undraw_Login.png"
                class="w-full h-70 object-cover"
              />
              <p class="text-gray-5 text-sm italic">Klik tombol dibawah ini</p>
              <button
                class="btn bg-red text-white w-full"
                @click="emit('tutupPeminjamanLoker')"
              >
                Tidak
              </button>
            </div>
          </div>
          <p class="text-center text-sm italic pb-2">
            Bagi
            <span class="font-semibold">pengunjung dari luar</span> Universitas
            Padjadjaran silahkan
            <span class="font-semibold">siapkan KTP</span> untuk proses
            peminjaman loker. <br />
            Silahkan hubungi petugas kami jika ada yang ingin ditanyakan.
          </p>
        </div>
        <div
          v-else-if="
            peminjamanLokerStore.showLokerData === true &&
            peminjamanLokerStore.isFull === false
          "
          class="show-loker-info"
        >
          <h3 class="font-semibold">Nomor Loker Anda :</h3>
          <h1 class="text-8xl font-bold text-orange-6">
            {{ peminjamanLokerStore.nomorLoker ?? "Error" }}
          </h1>
          <p class="font-semibold text-gray-5">
            {{ peminjamanLokerStore.namaPeminjam }}
          </p>
          <p class="font-semibold text-gray-5">
            {{ peminjamanLokerStore.npmPeminjam }}
          </p>
          <p class="text-sm font-semibold text-dark">
            Silahkan ambil kunci loker anda ke petugas kami.
          </p>
          <div class="bg-red-2 w-full rounded-lg mt-5">
            <h6 class="bg-red-6 py-2 text-white text-center rounded-t-lg">
              Informasi Penting!
            </h6>
            <p class="info-content">
              Mohon untuk menjaga kunci dengan baik, jangan sampai tertinggal
              atau hilang! Kehilangan / Tidak mengembalikan kunci ke Petugas
              akan dikenai denda sebesar :
            </p>
            <p class="fine-price-info">Rp. 50.000</p>
            <p class="info-content">
              Silahkan hubungi petugas kami jika anda terkendala dengan
              peminjaman loker.
            </p>
          </div>
          <button
            @click="emit('tutupPeminjamanLoker')"
            class="btn bg-red-5 text-white mt-5"
          >
            Tutup
          </button>
        </div>
        <div v-else-if="peminjamanLokerStore.isFull === true">
          <h1>Maaf, Loker Penuh</h1>
          <p>Silahkan hubungi petugas kami untuk informasi lebih lanjut</p>
          <button @click="emit('tutupPeminjamanLoker')">Tutup</button>
        </div>
      </section>
    </Transition>
  </div>
</template>

<style>
.modal-display {
  --at-apply: absolute z-1 inset-0 flex items-center justify-center w-full
    h-full bg-gray-500/80;
}

.show-loker-info {
  --at-apply: flex flex-col items-center justify-center w-screen max-w-xs;
}

.info-content {
  --at-apply: px-5 py-2 text-center text-sm;
}

.fine-price-info {
  --at-apply: bg-red-6 px-2 py-1 font-semibold rounded-lg text-white text-xl
    text-center max-w-30 ma;
}
</style>
