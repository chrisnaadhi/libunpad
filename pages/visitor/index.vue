<script setup>
const { data, refresh } = useFetch("/api/visitor/visit");
</script>

<template>
  <Head>
    <Title>Daftar Kunjungan Universitas Padjadjaran</Title>
  </Head>
  <main class="h-2xl mt-28px flex flex-col items-center justify-center max-w">
    <h1>Daftar Kunjungan</h1>
    {{ data }}
    <h3>Pusat Pengelolaan Pengetahuan Unpad</h3>
    <form action="/api/visitor/visit" method="POST">
      <div class="input-block">
        <label for="nomor">NPM / Nama Lengkap :</label>
        <input type="text" id="nomor" />
      </div>

      <div class="input-block">
        <label for="lembaga">Nama Institusi :</label>
        <input type="text" id="lembaga" />
      </div>

      <button type="submit" class="btn text-white bg-orange w-full">
        Masuk
      </button>
    </form>
  </main>
  <FooterSection />
</template>

<style scoped>
h1 {
  --at-apply: text-4xl;
}
input {
  --at-apply: border w-2xl;
}
.input-block {
  --at-apply: flex flex-col my-5;
}
</style>
