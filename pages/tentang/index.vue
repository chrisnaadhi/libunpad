<script setup>
const data = ref("Tentang Kandaga");
</script>

<template>
  <section class="text-center">
    <section class="max-w-3xl ma">
      <h1>{{ data }}</h1>
      <p class="text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        eveniet a animi officia accusantium necessitatibus voluptate quas
        cupiditate sapiente velit, quaerat sint? Ut id deserunt assumenda
        inventore magni magnam! Perspiciatis, aut aperiam voluptates doloremque
        architecto vel tempore, accusamus sit eveniet dolorum fugiat et ipsam,
        asperiores sint debitis in excepturi! Distinctio!
      </p>
    </section>

    <section class="max-w-7xl ma grid grid-cols-3 gap-2 py-10">
      <GenericBaseCard class="bg-blue" v-for="_ in 6">
        <p class="px-2 py-10">Hello, there!</p>
      </GenericBaseCard>
    </section>
  </section>
</template>

<style scoped>
p {
  --at-apply: italic;
}
</style>
