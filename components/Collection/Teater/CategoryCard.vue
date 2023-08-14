<script setup>
const data = ref("Vue Composition API");
</script>

<template>
  <div class="shadow-lg shadow-gray-3">
    <div class="top-card">
      <div class="bg-orange absolute z-1 m-3 px-3 py-1 rounded-full">
        <p class="text-white text-sm">Literasi</p>
      </div>
      <NuxtImg
        src="/images/9396112_3023.jpg"
        class="relative w-full object-cover rounded-tr-lg rounded-tl-lg"
      />
    </div>

    <div class="bg-orange-50 rounded-br-lg rounded-bl-lg p-4 text-left">
      <h4 class="italic font-semibold text-orange">Judul</h4>
      <p>Author</p>
      <p class="text-justify text-sm">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quam
        voluptas accusantium perferendis fugiat molestiae.
      </p>
      <div class="mt-3 flex text-center">
        <NuxtLink
          to="/e-teater/#"
          class="btn w-full py-1 px-5 bg-orange text-white text-sm no-underline"
        >
          Lihat
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
section {
  --at-apply: w-full;
}

.top-card {
  --at-apply: ;
}

p {
  --at-apply: italic;
}
</style>
