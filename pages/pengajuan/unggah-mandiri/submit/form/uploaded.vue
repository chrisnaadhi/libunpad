<script setup>
const state = ref('Data Tugas Akhir Anda berhasil diunggah!')
const timeState = ref(5);

onMounted(() => {
  setInterval(() => {
    return timeState.value > 0 ? timeState.value -= 1 : timeState.value = 0
  }, 1000)
  setTimeout(async () => {
    await navigateTo("/keanggotaan")
  }, 6000)
})

</script>

<template>
  <section>
    <div class="my-25 text-center">
      <h2>{{ state }}</h2>
      <p>Anda akan diarahkan ke halaman keanggotaan dalam {{ timeState }} detik...</p>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}

p {
  --at-apply: italic;
}
</style>