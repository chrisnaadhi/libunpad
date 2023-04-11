<script setup>
const { getUsers, getUserById } = useDirectusUsers();

definePageMeta({
  layout: "dashboard",
  middleware: ["directus-auth"],
});
</script>

<template>
  <section>
    <h1>Daftar Keanggotaan</h1>
    <NuxtLink to="/dashboard">
      <button class="btn bg-orange text-white">Back to Dashboard</button>
    </NuxtLink>
  </section>
</template>

<style scoped></style>
