<script setup>
const data = ref("Kontak Kami");
</script>

<template>
  <section>
    <h2 class="text-center">Kontak Kami</h2>
    <div class="flex justify-between mb-10">
      <div class="w-full">
        <h3 class="text-center">Hubungi Kami</h3>
        <form action="">
          <div class="input-block">
            <label for="nama">Nama Lengkap :</label>
            <input type="text" name="nama" id="nama" />
          </div>
          <div class="input-block">
            <label for="email">E-mail :</label>
            <input type="email" name="email" id="" />
          </div>
          <div class="input-block">
            <label for="pesan">Pesan :</label>
            <textarea name="pesan" id="pesan" rows="10"></textarea>
          </div>
          <button type="submit" class="btn w-full text-white">Kirim</button>
        </form>
      </div>
      <div class="w-full">
        <h3 class="text-center">Medsos Disini</h3>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}

input,
textarea {
  --at-apply: border-1 border-orange rounded py-2 px-1;
}

p {
  --at-apply: italic;
}
</style>
