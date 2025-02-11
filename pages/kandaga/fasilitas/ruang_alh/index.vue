<script setup>
definePageMeta({
  middleware: ["authentication-check"],
});

const { status, data, signOut } = useAuth();
const { getItems } = useDirectusItems();
const getAllDataBarangALH = await getItems({
  collection: "data_barang_alh",
});

const getJumlahDataBarang = getAllDataBarangALH.reduce((acc, item) => {
  acc[item.kategori_spesifik] = (acc[item.kategori_spesifik] || 0) + 1;
  return acc;
}, {});
</script>

<template>
  <section>
    <div class="text-center my-5 flex flex-col items-center">
      <h1>Daftar Barang ALH</h1>
      <img
        v-if="data?.user?.image"
        :src="data?.user?.image ?? '/images/no-image.jpg'"
        class="w-10 h-10 rounded-full cursor-pointer"
        alt="Foto User"
        referrerpolicy="no-referrer"
      />
      <h5>👋 Halo, {{ data.user.name }}</h5>
      <p>Daftar barang yang ada di ruang ALH</p>
    </div>
    <div class="bg-yellow-1 rounded-xl p-5 my-5">
      <h6>Jumlah Barang</h6>
      <p>Laptop: {{ getJumlahDataBarang.laptop }}</p>
      <p>Voice Recorder: {{ getJumlahDataBarang.voice_recorder }}</p>
      <p>Meja Makan Kayu: {{ getJumlahDataBarang.meja_makan_kayu }}</p>
      <p>Kursi Zeis: {{ getJumlahDataBarang.kursi_zeis }}</p>
      <p>Scanner: {{ getJumlahDataBarang.scanner }}</p>
      <p>Alat Kantor Lainnya: {{ getJumlahDataBarang.alat_kantor_lainnya }}</p>
      <p>PC: {{ getJumlahDataBarang.pc }}</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="barang in getAllDataBarangALH"
        :key="barang.id"
        class="bg-yellow-50 rounded-xl p-5"
      >
        <p
          class="bg-unpad text-white max-w-40 ma text-center rounded-xl py-1 px-5"
        >
          #{{ barang.nomor_asset }}
        </p>
        <h4 class="text-center my-5">{{ barang.deskripsi }}</h4>
        <div
          :class="
            barang.status_barang === 'tersedia'
              ? 'bg-green-500 text-white'
              : barang.status_barang === 'dipinjam'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-5 text-dark'
          "
          class="p-3 rounded-xl text-center"
        >
          {{ barang.status_barang }}
        </div>
        <div class="grid grid-cols-2 gap-2 my-5">
          <div>
            <p>Dipinjam Oleh :</p>
            <h6>{{ barang.pengguna ?? "-" }}</h6>
          </div>
          <div>
            <p>Penanggungjawab :</p>
            <h6>{{ barang.penanggung_jawab }}</h6>
          </div>
          <div>
            <p>Dipinjam pada :</p>
            <h6>
              {{
                barang.tanggal_peminjaman
                  ? displayTanggalIndonesia(barang.tanggal_peminjaman)
                  : "-"
              }}
            </h6>
          </div>
          <div>
            <p>Dikembalikan pada :</p>
            <h6>
              {{
                barang.tanggal_pengembalian
                  ? displayTanggalIndonesia(barang.tanggal_pengembalian)
                  : "-"
              }}
            </h6>
          </div>
        </div>
        <div>
          <h6>Keperluan Peminjaman :</h6>
          <p>{{ barang.tujuan_penggunaan ?? "-" }}</p>
        </div>
        <div class="mt-10">
          <h6>Metadata Barang</h6>
          <div>
            <div class="grid grid-cols-3 gap-2 text-sm">
              <p>Kategori Spesifik</p>
              <p class="col-span-2">: {{ barang.kategori_spesifik }}</p>
            </div>
            <div class="grid grid-cols-3 gap-2 text-sm">
              <p>Kategori Asset</p>
              <p class="col-span-2">: {{ barang.kategori_asset }}</p>
            </div>
            <div class="grid grid-cols-3 gap-2 text-sm">
              <p>Tanggal Perolehan</p>
              <p class="col-span-2">
                :
                {{
                  barang.tanggal_perolehan
                    ? displayTanggalIndonesia(barang.tanggal_perolehan)
                    : "-"
                }}
              </p>
            </div>
            <div class="grid grid-cols-3 gap-2 text-sm">
              <p>Supplier</p>
              <p class="col-span-2">: {{ barang.supplier }}</p>
            </div>
            <div class="grid grid-cols-3 gap-2 text-sm">
              <p>Harga</p>
              <p class="col-span-2">: {{ barang.harga }}</p>
            </div>
            <div class="grid grid-cols-3 gap-2 text-sm">
              <p>Unit Kerja</p>
              <p class="col-span-2">: {{ barang.unit_kerja }}</p>
            </div>
            <div class="grid grid-cols-3 gap-2 text-sm">
              <p>Gedung</p>
              <p class="col-span-2">: {{ barang.gedung }}</p>
            </div>
            <div class="grid grid-cols-3 gap-2 text-sm">
              <p>Kode Ruangan</p>
              <p class="col-span-2">: {{ barang.kode_ruangan }}</p>
            </div>
            <div class="grid grid-cols-3 gap-2 text-sm">
              <p>Nama Ruangan</p>
              <p class="col-span-2">: {{ barang.nama_ruangan }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <pre>{{ getAllDataBarangALH }}</pre> -->
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma py-10;
}
</style>
