<script setup>
const route = useRoute();
const { getItems } = useDirectusItems();
const { getUserById } = useDirectusUsers();
const data = ref("Literasi Informasi");

const url = useDirectusUrl();

const getLiterasiContent = await getItems({
  collection: "konten_literasi_informasi",
  params: {
    filter: {
      slug: route.params.slug,
    },
  },
});
const getAuthorData = await getUserById({
  id: getLiterasiContent[0].user_created,
});

const literasiContent = await getLiterasiContent[0];
const authorName = `${getAuthorData.first_name} ${getAuthorData.last_name}`;
</script>

<template>
  <section>
    <h5 class="text-orange text-center">{{ data }}</h5>
    <div>
      <div class="text-center">
        <h2 class="font-semibold">{{ literasiContent.judul }}</h2>
        <p>Dibuat pada: {{ convertTimeZone(literasiContent.date_created) }}</p>
        <p>Author: {{ authorName }}</p>
      </div>

      <div class="bg-orange-50 px-15 py-10 rounded">
        <div class="featured">
          <img :src="url + '/assets/' + literasiContent.featured_image" alt="Literasi Informasi"
            class="w-full max-h-xs object-cover" />
        </div>
        <span v-html="literasiContent.konten"></span>
      </div>
    </div>
    <div class="mt-5 text-center">
      <NuxtLink to="/panduan" class="btn bg-orange text-white">
        Kembali
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma pb-10;
}

.featured {
  --at-apply: mb-3;
}

p {
  --at-apply: italic;
}
</style>
