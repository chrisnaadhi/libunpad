<script setup>
const userName = ref();
const ruangan = ref();
const isVerified = ref(false);
</script>

<template>
  <main>
    <section class="my-10">
      <h1>Administrasi dan Pengajuan</h1>
      {{ visitorState.nama }}
      <div class="flex flex-col items-center">
        <input type="text" name="nama" autocomplete="off" v-model="userName" />
        <input
          type="text"
          name="ruangan"
          autocomplete="off"
          v-model="ruangan"
        />
        <input type="checkbox" name="verified" v-model="isVerified" />
        <button @click="submitState">Submit</button>
      </div>
    </section>
    <FooterSection />
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
