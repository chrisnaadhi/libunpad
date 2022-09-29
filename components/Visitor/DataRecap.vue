<template>
  <article>
    <section class="main-content">
      <div class="card">
        <VisitorRecapToday />
      </div>
      <div class="card">
        <VisitorRecapMonth />
      </div>
    </section>
    <section class="text-center">
      <VisitorRecapMonthly />
    </section>
  </article>
</template>

<style scoped>
h3 {
  --at-apply: text-2xl font-600 text-center;
}

.main-content {
  --at-apply: max-w-7xl ma flex flex-col sm:flex-row items-center justify-center text-center;
}

.card {
  --at-apply: bg-gray-200 mx-5 my-5 py-5 px-8 rounded-lg min-w-xl max-w-xl;
}

.baris {
    --at-apply: flex justify-between pt-2;
}
</style>
