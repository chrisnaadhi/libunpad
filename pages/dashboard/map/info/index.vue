<script setup>
const config = useRuntimeConfig();

const { data: dataKoordinator } = await useFetch(
  fetchUrlKoordinator("16D809CF-F29D-45E3-99FA-2878C563C51A"),
  useHeaderToken()
);

const { data: dataPegawai } = await useFetch(
  fetchUrlPegawai("info"),
  useHeaderToken()
);

const getProfileImage = computed(() => {
  return `${config.public.directus.url}assets/${dataKoordinator.data.avatar}`;
});

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <section class="flex flex-col items-center justify-center">
    <h1>Divisi Pengelolaan Pengetahuan - Pusat Pengelolaan Pengetahuan</h1>
    <div class="flex my-5 items-center">
      <img v-if="dataKoordinator.data.avatar" :src="getProfileImage" alt="" />
      <div v-else class="i-mdi-account-circle text-9xl"></div>
      <div>
        <h1>
          {{ dataKoordinator.data.first_name }}
          {{ dataKoordinator.data.last_name }}
        </h1>
        <p class="text-nip">{{ dataKoordinator.data.nomor_induk }}</p>
        <p class="text-title">{{ dataKoordinator.data.title }}</p>
      </div>
    </div>
    <div class="list-card">
      <GenericBaseCard v-for="pegawai in dataPegawai.data" class="card-pegawai">
        <div class="i-mdi-account-circle text-7xl"></div>
        <div class="text-left col-span-3">
          <h2>{{ pegawai.first_name }} {{ pegawai.last_name }}</h2>
          <p class="text-nip">{{ pegawai.nomor_induk }}</p>
          <p class="text-title">{{ pegawai.title }}</p>
          <div class="mt-5">
            <NuxtLink
              class="btn bg-orange text-white"
              :to="'/dashboard/map/info/' + pegawai.id"
            >
              Cek
            </NuxtLink>
          </div>
        </div>
      </GenericBaseCard>
    </div>
    <div class="my-5">
      <NuxtLink to="/dashboard/map" class="btn bg-orange-2 text-sm">
        Back to List
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.text-nip {
  --at-apply: text-sm italic text-gray;
}

.text-title {
  --at-apply: italic text-gray-7;
}

.list-card {
  --at-apply: flex flex-col w-full md:(grid grid-cols-2 max-w-6xl) lg:(grid-cols-3) gap-4;
}

.card-pegawai {
  --at-apply: bg-orange-50 grid grid-cols-4 gap-2 items-center justify-center;
}
</style>
