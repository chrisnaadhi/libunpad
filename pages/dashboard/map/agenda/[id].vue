<script setup>
definePageMeta({
  layout: "dashboard",
});

const { getItems } = useDirectusItems();
const route = useRoute();

const fetchAgenda = await getItems(fetchAgendaKegiatan(route.params.id));
</script>

<template>
  <section class="text-center">
    <h1>Hello {{ route.params.id }}!</h1>
    <div>
      <GenericBaseCard>
        <h1>Hello World</h1>
      </GenericBaseCard>
    </div>
    <div class="mt-5">
      <NuxtLink to="/dashboard/map/agenda" class="btn bg-orange-2">
        Back to Agenda
      </NuxtLink>
    </div>
    {{ fetchAgenda }}
  </section>
</template>

<style scoped>
section {
  --at-apply: text-center;
}
</style>
