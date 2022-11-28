<script setup>
const user = useDirectusUser();
const dataPengajuan = ref("default");

if (!user.value) {
  await navigateTo("/login");
}

const isVerified = ref(false);
</script>

<template>
  <main>
    <section class="my-10 text-center">
      <h1 class="font-600 text-4xl">Administrasi dan Pengajuan</h1>
      <div class="flex flex-col items-center">
        <select name="pengajuan" id="" v-model="dataPengajuan">
          <option value="default" selected disabled>
            Pilih jenis pengajuan
          </option>
          <option value="1">Satu</option>
          <option value="2">Dua</option>
          <option value="3">Tiga</option>
          <option value="4">Empat</option>
          <option value="5">Lima</option>
          <option value="6">Enam</option>
          <option value="7">Tujuh</option>
          <option value="8">Delapan</option>
          <option value="9">Sembilan</option>
          <option value="10">Sepuluh</option>
        </select>
        <button>Submit</button>
      </div>
    </section>
    <p>{{ user }}</p>
    <p>{{ dataPengajuan }}</p>
  </main>
</template>

<style scoped>
input {
  --at-apply: border border-black rounded my-1;
}
button {
  --at-apply: bg-blue rounded py-2 px-4;
}
</style>
