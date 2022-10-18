<script setup>
const route = useRoute();
</script>

<template>
  <section>
    <h1>Look like you're lost in our Website!</h1>
    <p>
      Don't worry just back to homepage it will give you safe and sound
      environment
    </p>
    <pre> Your are here: {{ route.params.slug }}</pre>
    <NuxtLink to="/koleksi">
      <button>Back</button>
    </NuxtLink>
  </section>
</template>
