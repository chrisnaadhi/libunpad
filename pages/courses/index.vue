<script setup>
const val = ref("Daftar Kursus");
</script>

<template>
  <section>
    <div class="max-w-3xl ma text-center py-5">
      <h2>{{ val }}</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, libero!
        Vel labore doloribus impedit corporis commodi unde. Sint ex praesentium
        nemo? Dolore hic similique laudantium molestiae fuga minima quos! Ipsam
        dolore dolores quaerat odio veritatis necessitatibus provident tempore
        nihil iure, explicabo consequuntur autem placeat amet, debitis maiores
        excepturi. A, debitis quia neque illum, voluptates similique explicabo
        ea quaerat mollitia, voluptatum maiores culpa veritatis quas. Sequi, sed
        reiciendis illum iste necessitatibus reprehenderit ullam voluptatem
        praesentium sapiente.
      </p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-4">
      <GenericBaseCard class="bg-orange-1 p-8" v-for="i in 12">
        <NuxtImg
          src="/images/9396112_3023.jpg"
          format="webp"
          class="rounded h-xs w-full object-cover mb-5"
        />
        <h5>Judul Course {{ i }}</h5>
        <p class="text-sm text-gray-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          doloribus vero cum explicabo placeat delectus quam debitis non animi
          dolore, consequatur maxime voluptate tempora eum reiciendis magni ut.
          Omnis ipsum voluptate eum quam consectetur consequatur rem dolorum
          enim aperiam id .....
        </p>
        <div class="mt-5 flex">
          <NuxtLink to="#" class="btn w-full text-center bg-unpad text-white">
            Lihat
          </NuxtLink>
        </div>
      </GenericBaseCard>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}

p {
  --at-apply: italic;
}
</style>
