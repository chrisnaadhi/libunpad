<script setup>
const welcome = ref("Jelajahi Koleksi Kami");
</script>

<template>
  <main>
    <section class="ma sticky top-0">
      <NavigationBar />
    </section>

    <section class="text-center">
      <p>Pusat Pengelolaan Pengetahuan UNPAD</p>
      <h1>{{ welcome }}</h1>
      <p>Cari Koleksi Fisik, Elektronik dan lainnya.</p>
    </section>

    <CollectionIndexContent />

    <section>
      <FooterSection />
    </section>
  </main>
</template>

<style scoped>
h1 {
  --at-apply: text-5xl font-600 my-14;
}

hr {
  --at-apply: ;
}
</style>
