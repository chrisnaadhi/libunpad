<template>
  <section class="max-w-7xl ma">
    <h1 class="text-center">Jelajahi Koleksi Kami</h1>
    <div class="cards">
      <article class="card-collection">1</article>
      <article class="card-collection">2</article>
    </div>
    <div class="cards">
      <article class="card-collection">3</article>
      <article class="card-collection">4</article>
    </div>
  </section>
</template>

<style scoped>
.cards {
  --at-apply: flex items-center justify-between flex-col mx-5 sm:flex-row md:mx-0;
}
.card-collection {
  --at-apply: w-full bg-orange-4 m-3 h-24 rounded-lg text-center;
}
</style>
