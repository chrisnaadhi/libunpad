<script setup>
defineProps({
  title: {
    type: String,
  },
  definition: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  titleDesc: {
    type: Object,
  },
  branding: {
    type: String,
  },
});
</script>

<template>
  <section>
    <div class="py-5">
      <div class="header-section">
        <div class="max-w-2xl w-full">
          <h1 class="text-4xl">
            {{ title }}<span class="text-base"> (EN)</span>
          </h1>
          <p>
            <span class="italic">
              {{ definition }}
            </span>
            <br />
            {{ titleDesc.value }}
          </p>
          <GenericSearch />
        </div>
        <div>
          <NuxtImg
            :src="'/illustration/' + imageUrl"
            height="250px"
            format="webp"
          />
        </div>
      </div>
    </div>
    <div class="max-w-6xl ma bg-gray-50 rounded-lt-lg rounded-rt-lg p-4">
      <div class="p-4">
        <h1 class="text-4xl text-center">{{ branding ?? title }}</h1>
        <p class="text-justify">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi
          repellat tempora assumenda unde cum. Voluptate architecto labore amet,
          quis facere omnis, fugiat in reprehenderit praesentium consectetur et
          facilis sint officia tempore ut, excepturi repellendus dolorum
          doloremque deleniti delectus ab corporis at modi obcaecati? Blanditiis
          nobis ut eveniet quis, dolores dolore aperiam maiores facilis
          voluptatem totam eius tempora nisi veniam mollitia, consequuntur
          dolorem. Architecto numquam aspernatur ad iusto. Dolorem suscipit
          corporis dicta excepturi, quod dolores veniam iste iusto consectetur
          facere. Iste aspernatur omnis laudantium expedita placeat explicabo.
          Et harum optio consectetur suscipit maxime deserunt voluptates
          molestiae voluptate provident. Ea, itaque voluptates!
        </p>
      </div>
      <div class="p-4 flex flex-col items-center">
        <h3>Koleksi {{ title }} Pilihan Kami</h3>
        <div class="grid grid-cols-2 gap-4 lg:flex">
          <NuxtImg
            v-for="num in 4"
            src="/images/no-image.jpg"
            class="drop-shadow-lg rounded-lg"
            height="100%"
            width="180px"
            format="webp"
          >
            {{ num }}
          </NuxtImg>
        </div>
      </div>
      <div class="p-4">
        <h3>Cara memanfaatkan koleksi {{ title }} kami</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat,
          laborum!
        </p>
        <ul>
          <ol v-for="order in 10">
            {{
              order
            }}. Daftar Langkah yang dilaksanakan
          </ol>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
h3 {
  --at-apply: text-center text-xl;
}

section {
  --at-apply: w-full px-8 xl:px-0;
}

.header-section {
  --at-apply: max-w-5xl ma flex flex-col-reverse xl:flex-row items-center justify-between;
}
</style>
