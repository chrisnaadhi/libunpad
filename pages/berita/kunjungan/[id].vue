<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const { getItems } = useDirectusItems();
const { getUserById } = useDirectusUsers();

const berita = await getItems({
  collection: "berita_kunjungan",
  params: {
    search: route.params.id,
    limit: 1,
  },
});

if (berita?.length === 0) await navigateTo("/error", { redirectCode: 404 });

const getPenulis = await getUserById({
  id: berita[0].user_created,
});

const namaPenulis = `${getPenulis.first_name} ${getPenulis.last_name}`;
</script>

<template>
  <section>
    <div class="header" :style="`background-image: url(${config.public.directus.url + 'assets/' + berita[0].gambar_unggulan
      })`">
      <div class="absolute mt--10 w-full h-full bg-dark/75"></div>
      <div class="flex flex-col items-center z-1">
        <h6>Berita</h6>
        <h1 class="text-center">{{ berita[0].judul }}</h1>
        <NuxtImg :src="getPenulis.avatar
            ? config.public.directus.url + 'assets/' + getPenulis.avatar
            : '/images/no-image.jpg'
          " class="my-3 h-24 w-24 object-cover bg-orange-50 border-3 border-orange rounded-full"></NuxtImg>
        <h4>Penulis: {{ namaPenulis }}</h4>
        <p class="font-semibold italic">
          Diterbitkan: {{ convertTimeZone(berita[0].date_created) }}
        </p>
        <p class="text-sm" v-show="berita[0].kategori">Kategori: {{ berita[0].kategori }}</p>
        <div class="text-center">
          <p class="text-sm">
            Tag:
            <span class="italic" v-if="berita[0].tag_artikel" v-for="tag in berita[0].tag_artikel">
              {{ tag }},
            </span>
            <span class="italic" v-else-if="berita[0].tag_berita" v-for="tag in berita[0].tag_berita">
              {{ tag }},
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="max-w-7xl ma">
      <article>
        <h1 class="text-center mb-5">{{ berita[0].judul }}</h1>
        <span class="text-justify" v-html="berita[0].konten_artikel ?? berita[0].konten_berita"></span>
        <p class="italic text-sm mt-5">
          Diperbaharui pada:
          {{ convertTimeZone(berita[0].date_updated) }}
        </p>
      </article>
      <div class="my-5 text-center">
        <NuxtLink class="btn bg-orange py-1 px-4 text-white" to="/berita">
          Kembali ke Berita
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.header {
  --at-apply: relative flex flex-col items-center py-10 text-white;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

article {
  --at-apply: bg-orange-50 rounded-2xl p-15 my-5 mx-3;
}
</style>