<script setup>
definePageMeta({
  layout: "kunjungan",
});
</script>

<template>
  <main>
    <section>
      <GenericMonthlyCalendar />
    </section>
    <section>
      <NuxtLink to="/visitor/data" class="btn bg-orange">
        Kembali ke Data Visitor
      </NuxtLink>
    </section>
  </main>
</template>

<style scoped>
section {
  --at-apply: max-w-6xl ma my-5 text-center;
}
</style>
