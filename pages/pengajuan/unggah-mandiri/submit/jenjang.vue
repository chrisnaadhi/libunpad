<script setup>
  const data = ref('Jenjang Pendidikan')
</script>

<template>
  <section>
    <h2>Pilih {{ data }}</h2>
    <div>
      <div>
        <NuxtImg src="/images/toga/toga_sarjana.png" class="w-md h-sm object-cover" />
        <div>
          <NuxtLink>
            Sarjana
          </NuxtLink>
        </div>
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