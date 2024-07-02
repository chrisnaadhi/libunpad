<script setup>
const { getSingletonItem } = useDirectusItems();

const val = ref('Regulasi Kandaga')
const regulasi = await getSingletonItem({
  collection: "regulasi_kandaga"
})

console.log(regulasi)
</script>

<template>
  <section>
    <div>
      <span v-html="regulasi.konten" />
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma py-10 text-center;
}

p {
  --at-apply: italic;
}
</style>