<script setup>
defineProps(["name"])

const emit = defineEmits(["peminjaman", "requestPeminjaman"]);
</script>

<template>
  <div class="modal-display" @click.self="emit('peminjaman')">
    <Transition>
      <section class=" max-w-2xl bg-white p-10 rounded-lg">
        <div class="flex flex-col items-center justify-center">
          <h1 class="text-2xl font-600">Apakah {{ name }} ingin meminjam Loker ?</h1>
          <p class="py-2 text-center">
            Jika {{ name }} ingin meminjam loker untuk menyimpan tas silahkan klik tombol <span class="font-semibold">
              "Ya"</span>. <br> Bagi pengunjung dari luar Universitas Padjadjaran silahkan siapkan KTP untuk proses
            peminjaman loker. Silahkan hubungi petugas kami jika ada yang ingin ditanyakan.
          </p>
          <div class="flex w-full gap-3">
            <button class="btn bg-orange text-white w-full" @click="emit('requestPeminjaman')">Ya</button>
            <button class="btn bg-red text-white w-full" @click="emit('peminjaman')">Tidak</button>
          </div>
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
