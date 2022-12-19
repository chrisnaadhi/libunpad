<template>
  <section class="max-w-7xl ma my-8">
    <h1 class="text-center text-3xl font-600">Jelajahi Koleksi Kami</h1>
    <div class="cards">
      <article class="card-collection">
        <NuxtImg
          src="/images/museum.jpg"
          class="w-full h-full object-cover rounded opacity-25 hover:opacity-50"
        />
      </article>
      <article class="card-collection">
        <NuxtImg
          src="/images/museum.jpg"
          class="w-full h-full object-cover rounded opacity-25 hover:opacity-50"
        />
      </article>
    </div>
    <div class="cards">
      <article class="card-collection">
        <NuxtImg
          src="/images/museum.jpg"
          class="w-full h-full object-cover rounded opacity-25 hover:opacity-50"
        />
      </article>
      <article class="card-collection">
        <NuxtImg
          src="/images/museum.jpg"
          class="w-full h-full object-cover rounded opacity-25 hover:opacity-50"
        />
      </article>
    </div>
  </section>
</template>

<style scoped>
.cards {
  --at-apply: flex items-center justify-between flex-col mx-5 sm:flex-row md:mx-0;
}
.card-collection {
  --at-apply: relative w-full bg-dark m-3 h-24 rounded-lg text-center;
}
</style>
