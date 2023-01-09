<script setup>
const route = useRoute();
</script>

<template>
  <section class="text-center">
    <h1 class="text-3xl">
      Look like you're <span class="font-600 text-red">lost</span> in our
      Website!
    </h1>
    <p>
      Don't worry just back to homepage it will give you safe and sound
      environment
    </p>
    <pre> You are here: {{ route.fullPath }}</pre>
    <NuxtLink to="/koleksi">
      <button class="btn bg-red text-white">Back</button>
    </NuxtLink>
  </section>
</template>
