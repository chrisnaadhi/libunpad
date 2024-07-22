<script setup>
const val = ref("Maintenance Mode");

useHead({
  title: "Maintenance Mode | Kandaga Universitas Padjadjaran",
});
</script>

<template>
  <section>
    <p class="pt-10">{{ val }}</p>
    <div class="flex flex-col items-center pb-10 max-w-3xl ma">
      <NuxtImg format="webp" src="/illustration/undraw_Maintenance.png" class="w-150" />
      <h2 class="text-red">{{ $t("maintenanceTitle") }}</h2>
      <p class="text-xl">{{ $t("maintenanceDescription") }}</p>
      <div class="flex gap-5">
        <NuxtLink class="flex flex-col items-center text-dark no-underline" to="https://instagram.com/kandagaunpad" target="_blank">
          <div class="i-mdi-instagram w-3em h-3em bg-pink"></div>
          <p>Instagram</p>
        </NuxtLink>
        <NuxtLink class="flex flex-col items-center text-dark no-underline" to="https://wa.me/6282315798979" target="_blank">
          <div class="i-mdi-whatsapp w-3em h-3em bg-green"></div>
          <p>Whatsapp</p>
        </NuxtLink>
        <NuxtLink class="flex flex-col items-center text-dark no-underline" to="mailto:pusat.pengetahuan@unpad.ac.id" target="_blank">
          <div class="i-mdi-gmail w-3em h-3em bg-red"></div>
          <p>Email</p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma text-center;
}

p {
  --at-apply: italic;
}
</style>
