<script setup lang="ts">
const { data } = await useFetch("/api/test");
</script>

<template>
  <div class="wrapper">
    <div class="bg-orange ma mt--17 max-w-150 my-1 py-3 sm:rounded-lg">
      <h1 class="text-2xl font-700 md:text-3xl">
        Tuntaskan Penelitianmu secara Daring
      </h1>
    </div>
    <p class="text-sm mt-3 pb-3 md:text-base xl:text-lg">
      Manfaatkan layanan dan alat-alat yang telah kami langgan secara daring,
      untuk mempercepat proses pekerjaan dan penelitian anda.
    </p>
    <div class="container content-wrapper">
      <div class="content">
        <div class="left-content">
          <div />
        </div>
        <div class="right-content">
          <div>
            <h1>Tools 1</h1>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="left-content">
          <div />
        </div>
        <div class="right-content">
          <div>
            <h1>Tools 2</h1>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="left-content">
          <div />
        </div>
        <div class="right-content">
          <div>
            <h1>Tools 3</h1>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="left-content">
          <div />
        </div>
        <div class="right-content">
          <div>
            <h1>Tools 4</h1>
          </div>
        </div>
      </div>
    </div>
    <a href="#" class="text-gray-6 text-sm hover:(text-orange-5 underline)"
      >Lihat selengkapnya layanan dan alat yang dapat kami tawarkan →</a
    >
  </div>
</template>

<style scoped>
.wrapper {
  --at-apply: py-10 max-w-7xl ma text-center bg-gray-2 rounded-xl mt-15;
}

.content-wrapper {
  --at-apply: max-w-6xl flex flex-1 flex-wrap ma justify-center xl:(flex-nowrap);
}

.content {
  --at-apply: relative w-full flex grow h-48 m-5 rounded-md top-0 hover:(top--4) md:(w-1/5);
  transition: top ease 0.5s;
}

.left-content {
  --at-apply: bg-orange-2 h-full w-12 rounded-l-lg;
}

.right-content {
  --at-apply: bg-orange-3 h-full w-full rounded-r-lg;
}
</style>
