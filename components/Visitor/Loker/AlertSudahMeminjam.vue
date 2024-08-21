<script setup>
  const val = ref('Nomor Loker')
</script>

<template>
  <div class="modal-display">
    <Transition>
      <section class="max-w-2xl bg-white p-10 rounded-lg">
        <h1 class="text-red font-bold text-3xl">Anda sudah meminjam Loker!</h1>
      </section>
    </Transition>
  </div>
</template>

<style scoped>
.modal-display {
  --at-apply: absolute z-1 inset-0 flex items-center justify-center w-full h-screen bg-gray-500/80;
}
</style>