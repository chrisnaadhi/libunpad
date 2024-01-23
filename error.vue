<script setup>
defineProps(["error"]);
const route = useRoute();

const handleClearError = () => {
  clearError({ redirect: "/" });
};
</script>

<template>
  <Head>
    <Title>{{ error.statusCode }}</Title>
  </Head>
  <main class="main-wrapper">
    <NavigationBar />
    <section class="content">
      <div class="flex items-center justify-center">
        <NuxtImg
          src="/illustration/undraw_Warning.png"
          height="128px"
          width="128px"
          format="webp"
        />
      </div>
      <h1 class="text-9xl">{{ error.statusCode }}</h1>
      <p class="italic">{{ error.message }}</p>
      <div v-if="error.statusCode === 401">
        <h3>
          Password yang anda masukkan
          <span class="font-600 text-red-6">salah</span>, pastikan untuk
          memasukkan password yang sesuai. Silahkan klik tombol login.
        </h3>
      </div>
      <div v-if="error.statusCode === 404">
        <h3>
          Sepertinya kamu <span class="font-600 text-red-6">tersesat</span> di
          website Kandaga!
        </h3>
      </div>
      <div v-if="error.statusCode === 403">
        <h3>
          Kamu
          <span class="font-600 text-red-6">tidak memiliki akses</span> untuk
          mengunjungi halaman ini!
        </h3>
      </div>
      <div v-else-if="error.statusCode === 500">
        <h3>
          Sepertinya Sistem Kandaga sedang
          <span class="font-600 text-red-6">terkendala</span>, silahkan hubungi
          Administrator!
        </h3>
      </div>
      <pre> Kamu ada di halaman: {{ route.fullPath }} </pre>
      <p class="py-5" v-show="error.statusCode === 404">
        Jangan Khawatir! Saat ini Kandaga memiliki website baru, silahkan
        kunjungi tautan berikut untuk mengakses website baru Kandaga :
      </p>
      <div>
        <NuxtLink
          href="https://kandaga.unpad.ac.id:3000"
          class="btn bg-orange text-white rounded-xl"
        >
          Website Kandaga
        </NuxtLink>
      </div>
    </section>
    <FooterSection />
  </main>
</template>

<style scoped>
h3 {
  --at-apply: text-3xl font-400;
}

.main-wrapper {
  --at-apply: bg-white flex flex-col min-h-screen m-0;
}

.content {
  --at-apply: flex-1 text-center my-10 max-w-4xl ma;
}
</style>
