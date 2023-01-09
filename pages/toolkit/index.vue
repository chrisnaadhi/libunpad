<script setup>
const tools = ["KandagaQR Generator"];
</script>

<template>
  <main>
    <div v-for="tool in tools">
      <h1>{{ tool }}</h1>
    </div>
  </main>
</template>

<style scoped>
main {
  --at-apply: flex items-center justify-center;
}
</style>
