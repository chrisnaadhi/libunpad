<script setup>
const data = ref("Sistem Administrasi Pusat Pengelolaan Pengetahuan");
const date = new Date();
</script>

<template>
  <section>
    <h3 class="text-center mt-5 font-bold noPrint">{{ data }}</h3>
    <slot />
    <div class="my-5 text-center noPrint">
      <p>
        &copy; 2020 - {{ date.getFullYear() }} | Grha Kandaga Universitas
        Padjadjaran
      </p>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");

* {
  font-family: "Open Sans";
}

p {
  --at-apply: italic;
}
</style>
