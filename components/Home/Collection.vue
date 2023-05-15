<template>
  <section class="max-w-7xl ma my-8">
    <h1 class="text-center text-3xl font-600">
      {{ $t("exploreOurCollection") }}
    </h1>
    <div class="cards">
      <article class="card-collection">
        <h1 class="heading-display">{{ $t("exploreCollectionItem1") }}</h1>
        <NuxtImg src="/images/museum.jpg" class="image-display" />
      </article>
      <article class="card-collection">
        <h1 class="heading-display">{{ $t("exploreCollectionItem2") }}</h1>
        <NuxtImg src="/images/museum.jpg" class="image-display" />
      </article>
    </div>
    <div class="cards">
      <article class="card-collection">
        <h1 class="heading-display">{{ $t("exploreCollectionItem3") }}</h1>
        <NuxtImg src="/images/museum.jpg" class="image-display" />
      </article>
      <article class="card-collection">
        <h1 class="heading-display">{{ $t("exploreCollectionItem4") }}</h1>
        <NuxtImg src="/images/museum.jpg" class="image-display" />
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

.image-display {
  --at-apply: w-full h-full object-cover rounded opacity-40 transition-all-500;
}

.card-collection:hover > .image-display {
  --at-apply: opacity-15;
}

.heading-display {
  --at-apply: absolute text-white z-1 left-0 right-0 pt-10 text-xl;
}
</style>
