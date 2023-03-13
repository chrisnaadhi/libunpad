<script setup></script>

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
    <section class="max-w-6xl ma mb-5">
      <VisitorRecapExtendTime />
    </section>
    <section class="text-center">
      <VisitorRecapMonthly />
    </section>
  </article>
</template>

<style scoped>
article {
  --at-apply: my-5;
}

h3 {
  --at-apply: text-2xl font-600 text-center;
}

.main-content {
  --at-apply: max-w-6xl ma flex flex-col sm:flex-row items-center justify-between text-center;
}

.card {
  --at-apply: bg-gray-200 my-5 py-5 px-8 rounded-lg max-w-140;
}

.baris {
    --at-apply: flex justify-between pt-2;
}
</style>
