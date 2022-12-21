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
          <div class="i-mdi-spanner icon-holder" />
        </div>
        <div class="right-content">
          <div class="contents-display">
            <h1 class="tools-heading">Mendeley</h1>
            <p class="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              voluptatum minus blanditiis cupiditate quidem deleniti mollitia
              cum aperiam nisi veniam?
            </p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="left-content">
          <div class="i-mdi-pencil icon-holder" />
        </div>
        <div class="right-content">
          <div class="contents-display">
            <h1 class="tools-heading">Turnitin</h1>
            <p class="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
              beatae et temporibus reiciendis hic fugit laboriosam dolores amet
              corrupti culpa!
            </p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="left-content">
          <div class="i-mdi-books icon-holder" />
        </div>
        <div class="right-content">
          <div class="contents-display">
            <h1 class="tools-heading">Pintu Unpad</h1>
            <p class="text-xs">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptate quam minima ad natus nobis itaque quibusdam ipsam labore
              voluptates impedit.
            </p>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="left-content">
          <div class="i-mdi-settings icon-holder" />
        </div>
        <div class="right-content">
          <div class="contents-display">
            <h1 class="tools-heading">Research Assist</h1>
            <p class="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              doloremque debitis quis rerum voluptas expedita molestiae, cum
              pariatur sed repudiandae.
            </p>
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
  --at-apply: bg-orange-3 h-full w-12 rounded-l-lg flex items-end justify-end;
}

.right-content {
  --at-apply: bg-orange h-full w-full rounded-r-lg;
}

.icon-holder {
  --at-apply: bg-orange-1 w-12 h-12 absolute mr--4 mb-2 transition-all-500;
}

.content:hover > .left-content {
  --at-apply: transition-all-500 bg-orange-5;
}

.contents-display {
  --at-apply: h-full flex flex-col px-2 items-center justify-center;
}

.tools-heading {
  --at-apply: text-dark font-600 text-2xl;
}
</style>
