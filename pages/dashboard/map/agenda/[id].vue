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
    <h1>
      Program: <br /><span class="text-2xl font-600">
        {{ displayAgendaKegiatan(route.params.id) }}
      </span>
    </h1>
    <div class="grid grid-cols-3 gap-2 my-3">
      <GenericBaseCard
        v-for="agenda in fetchAgenda.data"
        class="border border-orange"
      >
        <h1 class="text-xl">{{ agenda.nama_kegiatan }}</h1>
        <p class="text-sm">
          Status Kegiatan:<br />
          <span
            :class="colorStatusAgenda(agenda.status_kegiatan)"
            class="badge"
          >
            {{ displayStatusAgenda(agenda.status_kegiatan) }}
          </span>
        </p>
        <div class="mt-5">
          <NuxtLink
            :to="`/dashboard/map/agenda/detail/${agenda.id}`"
            class="btn bg-orange-2"
          >
            Detail
          </NuxtLink>
        </div>
      </GenericBaseCard>
    </div>
    <div class="mt-5">
      <NuxtLink to="/dashboard/map/agenda" class="btn bg-orange-2">
        Back to Agenda
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: text-center;
}

.badge {
  --at-apply: px-2 text-white rounded my-1;
}
</style>
