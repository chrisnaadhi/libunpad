<script setup>
const user = useDirectusUser();
const { data: fetchService } = await useFetch("/api/v1/layanan");
</script>

<template>
  <main>
    <section class="my-10 text-center">
      <h1 class="font-600 text-4xl">Administrasi dan Pengajuan</h1>
      <section class="profile">
        <div>
          <img src="/images/lambang-unpad.png" class="w-xl" />
        </div>
        <div class="text-justify">
          <h1 class="text-2xl font-600">
            Halo, {{ user ? `${user.first_name}!` : "Pengunjung" }}
          </h1>
          <p>
            Jika kamu membutuhkan berkas administrasi dari Perpustakaan Pusat
            Unpad untuk keperluan akademik silahkan ajukan melalui salah satu
            kolom pengajuan berikut. Petunjuk mengenai pengisian form pengajuan
            dapat dilihat melalui tautan berikut.
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
              <button class="btn bg-orange text-xs w-full">Ajukan</button>
            </NuxtLink>
            <NuxtLink :to="layanan.slug + '/data'" class="w-full">
              <button class="btn bg-orange text-xs w-full">
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
  --at-apply: flex items-center justify-center gap-4 max-w-lg ma py-10;
}

.card-group {
  --at-apply: container ma flex flex-col gap-4 p-4 md:(grid grid-cols-2) lg:(grid-cols-3);
}

.card-item {
  --at-apply: bg-white flex flex-col justify-between shadow-lg shadow-orange/20 top-0 hover:(top--2 shadow-orange/50);
  transition: top ease 0.5s;
}
</style>
