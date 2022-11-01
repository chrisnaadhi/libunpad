<script setup>
const displayTab = [""];
const displayNow = ref();

const toggleTab = (selectedTab) => {
  displayNow.value = selectedTab;
};
</script>

<template>
  <article>
    <section class="tabs">
      <div v-for="tab in 3" class="tab">
        {{ tab }}
      </div>
    </section>
    <section class="main-content" v-show="false">
      <div class="card">
        <VisitorRecapToday />
      </div>
      <div class="card">
        <VisitorRecapMonth />
      </div>
    </section>
    <section class="main-content" v-show="true">
      <VisitorRecapDisplayDaily />
    </section>
    <section class="main-content" v-show="false">
      <VisitorRecapDisplayMonthly />
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

.tabs {
  --at-apply: max-w-6xl ma flex items-center justify-between gap-3;
}

.tab {
  --at-apply: bg-orange-2 w-full text-center py-2 my-2 rounded-lg;
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
