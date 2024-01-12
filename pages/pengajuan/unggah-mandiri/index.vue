<script setup>
const data = ref("Unggah Mandiri Karya Ilmiah");
</script>

<template>
  <section>
    <h1 class="my-10">{{ data }}</h1>
    <div class="grid grid-cols-2 justify-center">
      <div class="flex justify-center">
        <NuxtImg src="/illustration/undraw_Social.png" format="webp" />
      </div>
      <div>
        <h3>Unggah Mandiri</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
          corporis praesentium necessitatibus molestiae at. Dolorem, doloribus
          provident alias a nihil, laboriosam libero dolor suscipit quia quaerat
          quam ullam soluta unde dolore fugit, reiciendis animi atque dolorum
          iusto? Tenetur sunt accusamus aliquid non beatae veniam voluptatum
          modi. Delectus provident inventore itaque!
        </p>
        <div class="my-3">
          <div class="flex gap-3 w-full">
            <NuxtLink
              href="unggah-mandiri/panduan/"
              class="btn bg-orange text-white py-1 w-full"
            >
              Panduan
            </NuxtLink>
            <NuxtLink
              href="unggah-mandiri/submit/"
              class="btn bg-orange text-white py-1 w-full"
            >
              Unggah
            </NuxtLink>
          </div>
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
