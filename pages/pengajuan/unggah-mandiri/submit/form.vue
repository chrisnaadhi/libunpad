<script setup>
const data = ref('Form Unggah Mandiri')
</script>

<template>
  <section>
    <h3 class="text-center">{{ data }}</h3>
    <form @submit|prevent="">
      <div>
        <label for=""></label>
      </div>
    </form>
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