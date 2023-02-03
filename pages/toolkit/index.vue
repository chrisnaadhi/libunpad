<script setup>
const route = useRoute();
const tools = [
  {
    nama: "KandagaQR Generator",
    link: route.fullPath + "/kandagaqr",
    deskripsi:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa, consequuntur?",
  },
  {
    nama: "Paraphrase Kit",
    link: route.fullPath + "/#",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, quia!",
  },
  {
    nama: "DDC Classification",
    link: route.fullPath + "#",
    deskripsi:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, in?",
  },
];
</script>

<template>
  <main>
    <GenericBaseCard class="bg-orange min-h-45" v-for="tool in tools">
      <h1>{{ tool.nama }}</h1>
      <p>{{ tool.deskripsi }}</p>
      <NuxtLink :to="tool.link" class="btn bg-white text-orange">
        Pakai
      </NuxtLink>
    </GenericBaseCard>
  </main>
</template>

<style scoped>
main {
  --at-apply: flex items-center justify-center container ma gap-4 py-5;
}

h1 {
  --at-apply: text-2xl text-white;
}

p {
  --at-apply: text-white mb-5;
}
</style>
