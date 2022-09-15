<script setup>
const emit = defineEmits(["display"]);
defineProps({
  userName: String,
});
</script>

<template>
  <div
    class="absolute z-1 inset-0 flex items-center justify-center w-full h-screen bg-gray-500/80"
    @click.self="emit('display')"
  >
    <Transition>
      <section class="flex flex-col items-center justify-center bg-white p-10">
        <h1 class="text-4xl font-600">Selamat Datang {{ userName }}</h1>
        <p class="py-2">
          Selamat berkunjung di Pusat Pengelolaan Pengetahuan UNPAD
        </p>
        <button class="btn bg-orange" @click="emit('display')">Tutup</button>
      </section>
    </Transition>
  </div>
</template>
