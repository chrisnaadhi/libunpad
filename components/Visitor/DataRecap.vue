<script setup>
const displayTab = ref(["Data Hari Ini", "Data Per Hari", "Data Per Bulan"]);
const displayNow = ref("Data Hari Ini");

const toggleTab = (selectedTab) => {
  displayNow.value = selectedTab;
};
</script>

<template>
  <article>
    <section class="tabs">
      <div
        v-for="tab in displayTab"
        class="tab"
        :class="tab === displayNow ? 'tab-active' : ''"
        @click="toggleTab(tab)"
      >
        {{ tab }}
      </div>
    </section>
    <section class="main-content" v-show="displayNow === 'Data Hari Ini'">
      <div class="card">
        <VisitorRecapToday />
      </div>
      <div class="card">
        <VisitorRecapMonth />
      </div>
    </section>
    <section class="main-content" v-show="displayNow === 'Data Per Hari'">
      <VisitorRecapDisplayDaily />
    </section>
    <section class="main-content" v-show="displayNow === 'Data Per Bulan'">
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

.tab-active {
  --at-apply: bg-orange-4;
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
