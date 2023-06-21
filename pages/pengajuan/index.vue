<script setup>
const { data } = useAuth();
const user = useDirectusUser();
const { data: fetchService } = await useFetch("/api/v1/layanan");
</script>

<template>
  <main class="max-w-7xl ma">
    <section class="my-10 text-center">
      <h1 class="font-600 text-4xl">{{ $t("pengajuanTitle") }}</h1>
      <section class="profile">
        <div>
          <img src="/images/lambang-unpad.png" class="w-32 md:w-64" />
        </div>
        <div class="text-justify w-full">
          <h1 class="text-2xl font-600">
            Halo,
            {{
              user
                ? `${user.first_name}!`
                : data
                ? data?.user?.name
                : "Pengunjung"
            }}
          </h1>
          <p>
            {{ $t("pengajuanDescription") }}
          </p>
        </div>
      </section>
      <section class="card-group">
        <GenericBaseCard v-for="layanan in fetchService" class="card-item">
          <div>
            <h1 class="text-center text-2xl">
              {{ layanan.namaLayanan }}
            </h1>
            <p class="text-sm pb-2">{{ layanan.deskripsiLayanan }}</p>
          </div>
          <div class="flex justify-center gap-2">
            <NuxtLink :to="layanan.slug" class="w-full">
              <button class="btn bg-orange text-xs text-white w-full">
                Ajukan
              </button>
            </NuxtLink>
            <NuxtLink
              :to="layanan.slug.includes('#') ? '/#' : layanan.slug + '/data'"
              class="w-full"
            >
              <button class="btn bg-orange text-xs text-white w-full">
                Data Pengajuan
              </button>
            </NuxtLink>
          </div>
        </GenericBaseCard>
      </section>
    </section>
  </main>
</template>

<style scoped>
input {
  --at-apply: border border-black rounded my-1;
}

.profile {
  --at-apply: flex flex-col items-center justify-center gap-4 max-w-lg ma py-10 px-5 md:flex-row;
}

.card-group {
  --at-apply: container ma flex flex-col gap-4 p-4 md:(grid grid-cols-2) lg:(grid-cols-3);
}

.card-item {
  --at-apply: bg-white p-6 flex flex-col justify-between shadow-lg shadow-orange/20 top-0 hover:(top--2 shadow-orange/50);
  transition: top ease 0.5s;
}
</style>
