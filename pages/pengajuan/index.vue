<script setup>
const { data } = useAuth();
const user = useDirectusUser();
const { data: fetchService } = await useFetch("/api/v1/layanan");
</script>

<template>
  <main class="min-h-screen bg-gray-50">

    <!-- Hero Banner -->
    <div class="bg-gradient-to-br from-unpad to-kandaga">
      <div class="max-w-5xl ma px-4 py-10">
        <div class="flex flex-col items-center gap-4 text-center">
          <!-- Avatar -->
          <div class="relative shrink-0">
            <img
              v-if="user"
              :src="user.avatar
                ? `https://kandaga.unpad.ac.id/backoffice/assets/${user.avatar}.jpg`
                : 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'"
              :alt="user?.first_name"
              class="w-24 h-24 object-cover rounded-2xl border-4 border-white/60 shadow-lg"
            />
            <NuxtImg
              v-else-if="data?.user?.image"
              :src="data.user.image"
              class="w-24 h-24 rounded-2xl border-4 border-white/60 shadow-lg object-cover"
            />
            <div
              v-else
              class="w-24 h-24 rounded-2xl border-4 border-white/60 shadow-lg bg-white/20 flex items-center justify-center"
            >
              <div class="i-mdi-account-circle w-14 h-14 text-white/60" />
            </div>
          </div>
          <!-- Identity -->
          <div>
            <p class="text-white/70 text-sm font-medium uppercase tracking-widest mb-0.5">
              Layanan Perpustakaan
            </p>
            <h1 class="text-white text-2xl sm:text-3xl font-800 leading-tight">
              Halo,
              {{
                user
                  ? `${user.first_name}!`
                  : data
                  ? data?.user?.name
                  : "Pengunjung!"
              }}
            </h1>
            <p class="text-white/80 text-sm mt-1 max-w-md">
              {{ $t("pengajuanDescription") }}
            </p>
          </div>
          <!-- Keanggotaan button -->
          <NuxtLink
            to="/keanggotaan"
            class="btn bg-white/20 hover:bg-white/30 text-white border border-white/30 text-sm py-1.5 px-5 transition-all-200"
          >
            {{ $t("membership") }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Service Grid -->
    <div class="max-w-5xl ma px-4 py-8">
      <h2 class="text-lg font-700 text-gray-7 mb-5">{{ $t("pengajuanTitle") }}</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="layanan in fetchService"
          :key="layanan.slug"
          class="service-card"
          :class="{ 'opacity-60': !layanan.isActive }"
        >
          <!-- Card Header -->
          <div class="service-card-header">
            <img :src="layanan.ikonLayanan" class="w-9 h-9 object-contain shrink-0" />
            <h3 class="text-sm font-700 text-gray-8 leading-tight">
              {{ layanan.namaLayanan }}
            </h3>
          </div>
          <!-- Description -->
          <div
            class="text-sm text-gray-6 leading-relaxed flex-1 px-5 py-4"
            v-html="layanan.deskripsiLayanan"
          />
          <!-- Actions -->
          <div class="px-5 pb-5 flex gap-2">
            <NuxtLink :to="layanan.isActive ? layanan.slug : '#'" class="flex-1">
              <button
                class="btn text-xs w-full py-2 transition-all-200"
                :class="layanan.isActive ? 'bg-unpad text-white hover:bg-unpad/90' : 'bg-gray-2 text-gray-4 cursor-not-allowed'"
                :disabled="!layanan.isActive"
              >
                {{ layanan.slug.includes("unggah-mandiri") ? "Unggah" : "Ajukan" }}
              </button>
            </NuxtLink>
            <NuxtLink :to="layanan.isActive ? layanan.secondSlug : '#'" class="flex-1">
              <button
                class="btn text-xs w-full py-2 transition-all-200"
                :class="layanan.isActive ? 'bg-white text-unpad border border-unpad hover:bg-unpad/5' : 'bg-gray-2 text-gray-4 cursor-not-allowed'"
                :disabled="!layanan.isActive"
              >
                {{ layanan.slug.includes("unggah-mandiri") ? "Status Unggah" : "Data Pengajuan" }}
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Contact Strip -->
      <div class="mt-8 info-box bg-white">
        <div class="i-mdi-help-circle-outline w-5 h-5 shrink-0 text-unpad mt-0.5" />
        <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 text-sm">
          <span class="font-semibold text-gray-7">Punya pertanyaan? Hubungi kami:</span>
          <a
            href="mailto:perpustakaan@unpad.ac.id"
            class="text-unpad hover:underline"
          >perpustakaan@unpad.ac.id</a>
          <a
            href="https://wa.me/6282315798979"
            class="text-unpad hover:underline"
          >+62 823-1579-8979</a>
        </div>
      </div>
    </div>

  </main>
</template>

<style scoped>
.service-card {
  --at-apply: bg-white rounded-2xl border border-gray-2 shadow-sm overflow-hidden flex flex-col transition-shadow-300 hover:shadow-md;
}

.service-card-header {
  --at-apply: flex items-center gap-3 px-5 py-4 border-b border-gray-1 bg-gray-50;
}

.info-box {
  --at-apply: flex items-start gap-3 border border-gray-2 rounded-xl px-5 py-4;
}
</style>
