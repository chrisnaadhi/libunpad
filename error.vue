<script setup>
defineProps(["error"]);
const route = useRoute();

const handleClearError = () => {
  clearError({ redirect: "/" });
};
</script>

<template>
  <main class="main-wrapper">
    <NavigationBar />
    <section class="content">
      <h1 class="text-9xl">{{ error.statusCode }}</h1>
      <p class="italic">{{ error.message }}</p>
      <div v-if="error.statusCode === 404">
        <h3 class="text-3xl font-400">
          Sepertinya kamu <span class="font-600 text-red-6">tersesat</span> di
          website Kandaga!
        </h3>
      </div>
      <div v-if="error.statusCode === 403">
        <h3 class="text-3xl font-400">
          Kamu
          <span class="font-600 text-red-6">tidak memiliki akses</span> untuk
          mengunjungi halaman ini!
        </h3>
      </div>
      <div v-else-if="error.statusCode === 500">
        <h3 class="text-3xl font-400">
          Sepertinya Sistem Kandaga sedang
          <span class="font-600 text-red-6">terkendala</span>, silahkan hubungi
          Administrator!
        </h3>
      </div>
      <p class="py-5">
        Jangan Khawatir! Kamu bisa kembali ke beranda atau login kembali agar
        kamu dapat menjelajahi website Kandaga. Jika kamu merasa ini adalah
        sebuah kesalahan dan halaman ini memang benar ada, silahkan hubungi
        administrator kandaga agar dapat kami tanggulangi dengan segera.
      </p>
      <pre> Kamu ada di halaman: {{ route.fullPath }}</pre>
      <div class="flex justify-center my-5 gap-5">
        <NuxtLink to="/login">
          <button
            type="button"
            class="btn border-1 border-orange bg-orange text-white"
          >
            Kembali ke Login
          </button>
        </NuxtLink>
        <button
          @click="handleClearError"
          type="button"
          class="btn border-1 border-orange-4 hover:(bg-orange-4 text-white) transition-all-500"
        >
          Kembali ke Beranda
        </button>
      </div>
    </section>
    <FooterSection />
  </main>
</template>

<style scoped>
.main-wrapper {
  --at-apply: bg-gray-50 flex flex-col min-h-screen m-0;
}

.content {
  --at-apply: flex-1 text-center my-10 max-w-4xl ma;
}
</style>
