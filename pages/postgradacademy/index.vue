<script setup>
const val = ref("Daftar Kursus");
const { getItems } = useDirectusItems();
const listCourses = await getItems({
  collection: "daftar_courses",
  filter: {
    status: {
      _eq: "published",
    },
  },
});
</script>

<template>
  <section>
    <div class="max-w-3xl ma text-center py-5">
      <h2>{{ val }}</h2>
      <p>Daftar Kursus yang dikurasi oleh Kandaga Universitas Padjadjaran.</p>
    </div>
    <div
      v-if="listCourses.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-4"
    >
      <GenericBaseCard class="bg-orange-1 p-8" v-for="course in listCourses">
        <NuxtImg
          :src="directusImageUrl(course.thumbnail)"
          format="webp"
          class="rounded h-xs w-full object-cover mb-5"
        />
        <h5>{{ course.judul }}</h5>
        <p class="text-sm text-gray-6">
          {{ trimDescription(course.deskripsi, 150) }}
        </p>
        <div class="mt-5 flex">
          <NuxtLink
            :to="course.link_course"
            target="_blank"
            class="btn w-full text-center bg-unpad text-white"
          >
            Lihat Course
          </NuxtLink>
        </div>
      </GenericBaseCard>
    </div>
    <div v-else class="text-center py-10 text-red">
      <p class="text-gray-6">Tidak ada kursus yang tersedia saat ini.</p>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma;
}

p {
  --at-apply: italic;
}
</style>
