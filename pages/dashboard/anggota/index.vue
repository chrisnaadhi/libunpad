<script>
definePageMeta({
  layout: "dashboard",
});

const { data: fetchRepo } = await useFetch(
  "https://repository.unpad.ac.id/custom/dirtakel",
  {
    mode: "no-cors",
  }
);
</script>

<template>
  <section>
    <h1>Heyo this is anggota</h1>
    <NuxtLink to="/dashboard">Back to Dashboard</NuxtLink>
    <p>{{ fetchRepo }}</p>
  </section>
</template>

<style scoped></style>
