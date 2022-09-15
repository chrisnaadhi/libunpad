<script setup>
const emit = defineEmits(["display"]);
</script>

<template>
  <div
    class="absolute z-1 inset-0 flex items-center justify-center w-full h-screen bg-gray-500/80"
    @click.self="emit('display')"
  >
    <Transition>
      <section class="flex flex-col items-center justify-center bg-white p-10">
        <h1 class="text-4xl font-600">Keanggotaan anda belum Aktif!</h1>
        <p class="py-2">
          Silahkan hubungi pustakawan kami atau lakukan aktivasi mandiri ke
          https://lib.unpad.ac.id
        </p>
        <button class="btn bg-orange" @click="emit('display')">Tutup</button>
      </section>
    </Transition>
  </div>
</template>
