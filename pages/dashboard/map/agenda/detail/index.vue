<script setup>
onMounted(() => {
  setTimeout(() => {
    return navigateTo("/dashboard/map");
  }, 3000);
});
</script>

<template>
  <h1>You'll be redirected to each map of tasks...</h1>
</template>

<style scoped>
h1 {
  --at-apply: text-2xl;
}
</style>
