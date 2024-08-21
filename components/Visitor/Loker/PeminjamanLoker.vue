<script setup>
defineProps(["name"])

const emit = defineEmits(["peminjaman", "requestPeminjaman", "tutupPeminjamanLoker"]);
const peminjamanLokerStore = prosesPeminjamanLoker()
</script>

<template>
  <div class="modal-display">
    <Transition>
      <section class="max-w-2xl bg-white p-10 rounded-lg">
        <div v-if="peminjamanLokerStore.showLokerData === false && peminjamanLokerStore.isFull === false" class="flex flex-col items-center justify-center">
          <h1 class="text-2xl font-600 text-center">Apakah <br/> <span class="text-orange-6 font-bold"> {{ name ?? "Anda" }} </span><br/> ingin meminjam Loker ?</h1>
          <p class="pt-2 text-center">
            Jika Anda ingin meminjam loker untuk menyimpan barang anda silahkan klik tombol 
          </p>
          <span class="bg-orange text-white px-6 py-1 rounded-md">
            Ya</span>
          <p class="text-center pb-2">Bagi pengunjung dari luar Universitas Padjadjaran silahkan siapkan KTP untuk proses
            peminjaman loker. Silahkan hubungi petugas kami jika ada yang ingin ditanyakan.</p>
          <div class="flex w-full gap-3">
            <button class="btn bg-orange text-white w-full" @click="emit('requestPeminjaman')">Ya</button>
            <button class="btn bg-red text-white w-full" @click="emit('tutupPeminjamanLoker')">Tidak</button>
          </div>
        </div>
        <div v-else-if="peminjamanLokerStore.showLokerData === true && peminjamanLokerStore.isFull === false">
          <h1>Nomor Loker Anda:</h1>
          <h1 class="text-4xl font-bold text-orange-6">{{ peminjamanLokerStore.nomorLoker }}</h1>
          <p>{{ peminjamanLokerStore.namaPeminjam }}</p>
          <p>{{ peminjamanLokerStore.npmPeminjam }}</p>
          <button @click="emit('tutupPeminjamanLoker')">Tutup</button>
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
  --at-apply: absolute z-1 inset-0 flex items-center justify-center w-full h-screen bg-gray-500/80;
}
</style>
