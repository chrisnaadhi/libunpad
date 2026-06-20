<script setup>
const { t } = useI18n();
const { getItems } = useDirectusItems();

const listCourses = await getItems({
  collection: "daftar_courses",
  filter: {
    status: {
      _eq: "published",
    },
  },
  sort: "-date_created",
});

listCourses.sort(
  (a, b) =>
    new Date(b.date_created).getTime() - new Date(a.date_created).getTime(),
);

const currentPage = ref(1);
const perPage = ref(9);
const perPageOptions = [6, 9, 12, 18];

const totalCourses = computed(() => listCourses.length);
const totalPages = computed(() =>
  Math.ceil(totalCourses.value / perPage.value),
);

const fromCourse = computed(() =>
  totalCourses.value === 0 ? 0 : (currentPage.value - 1) * perPage.value + 1,
);
const toCourse = computed(() =>
  Math.min(currentPage.value * perPage.value, totalCourses.value),
);

const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return listCourses.slice(start, start + perPage.value);
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  pages.push(1);
  if (current > 3) pages.push("…");
  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(total - 1, current + 1);
    i++
  ) {
    pages.push(i);
  }
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    if (import.meta.client) window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function changePerPage(val) {
  perPage.value = val;
  currentPage.value = 1;
}

definePageMeta({
  layout: "default",
  title: "Postgrad Academy - Universitas Padjadjaran",
});

useSeoMeta({
  title: "Postgrad Academy - Universitas Padjadjaran",
  description:
    "Explore curated courses at Postgrad Academy Universitas Padjadjaran",
  ogTitle: "Postgrad Academy - Universitas Padjadjaran",
  ogDescription: "Curated courses for postgraduate excellence at Kandaga Unpad",
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-100"
  >
    <!-- Hero Section -->
    <div class="container mx-auto px-4 pt-16 pb-10 md:pt-24 md:pb-14">
      <div class="max-w-3xl mx-auto text-center">
        <div class="mb-4 animate-bounce-slow">
          <div
            class="i-mdi-school-outline w-20 h-20 mx-auto text-kandaga opacity-80"
          />
        </div>
        <span
          class="inline-block px-4 py-1 bg-orange-100 text-kandaga rounded-full text-sm font-semibold mb-5"
        >
          {{ $t("postgradHeroSubtitle") }}
        </span>
        <h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-5">
          {{ $t("postgradHeroTitle") }}
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-unpad to-gray-700"
          >
            Kandaga
          </span>
        </h1>
        <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          {{ $t("postgradHeroDescription") }}
        </p>

        <!-- Stats Row -->
        <div
          v-if="totalCourses > 0"
          class="mt-8 inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md border border-gray-100"
        >
          <div class="i-mdi-book-multiple-outline w-5 h-5 text-kandaga" />
          <span class="font-semibold text-gray-800">{{ totalCourses }}</span>
          <span class="text-gray-500 text-sm">{{
            $t("postgradTotalCourses")
          }}</span>
        </div>
      </div>
    </div>

    <!-- Controls Bar -->
    <div v-if="totalCourses > 0" class="container mx-auto px-4 mb-8">
      <div
        class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl px-6 py-4 shadow-md border border-gray-100"
      >
        <!-- Showing info -->
        <p class="text-sm text-gray-500">
          {{
            $t("postgradShowingResults", {
              from: fromCourse,
              to: toCourse,
              total: totalCourses,
            })
          }}
        </p>

        <!-- Per page selector -->
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500 whitespace-nowrap"
            >{{ $t("postgradPerPage") }}:</span
          >
          <div class="flex gap-2">
            <button
              v-for="opt in perPageOptions"
              :key="opt"
              @click="changePerPage(opt)"
              :class="[
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                perPage === opt
                  ? 'bg-gradient-to-r from-unpad to-gray-700 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-kandaga',
              ]"
            >
              {{ opt }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Course Grid -->
    <div class="container mx-auto px-4 pb-10">
      <div class="max-w-7xl mx-auto">
        <div
          v-if="paginatedCourses.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="course in paginatedCourses"
            :key="course.id"
            class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group"
          >
            <!-- Thumbnail -->
            <div class="relative overflow-hidden">
              <NuxtImg
                :src="directusImageUrl(course.thumbnail)"
                format="webp"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-1">
              <h3
                class="font-bold text-gray-800 text-lg mb-3 leading-snug line-clamp-2"
              >
                {{ course.judul }}
              </h3>
              <p class="text-sm text-gray-500 leading-relaxed flex-1">
                {{ trimDescription(course.deskripsi, 120) }}
              </p>

              <div class="mt-5">
                <a
                  :href="course.link_course"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-gradient-to-r from-unpad to-gray-700 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-sm"
                >
                  <span>{{ $t("postgradViewCourse") }}</span>
                  <div class="i-mdi-open-in-new w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="flex flex-col items-center justify-center py-24 text-center"
        >
          <div class="i-mdi-book-off-outline w-20 h-20 text-gray-300 mb-6" />
          <h3 class="text-xl font-semibold text-gray-500 mb-2">
            {{ $t("postgradNoCourses") }}
          </h3>
        </div>

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <!-- Prev -->
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-700 hover:border-kandaga hover:text-kandaga shadow-sm"
          >
            <div class="i-mdi-chevron-left w-5 h-5" />
            {{ $t("postgradPrevPage") }}
          </button>

          <!-- Page numbers -->
          <div class="flex items-center gap-1.5">
            <template v-for="page in visiblePages" :key="page">
              <span
                v-if="page === '…'"
                class="w-9 h-9 flex items-center justify-center text-gray-400 text-sm"
              >
                …
              </span>
              <button
                v-else
                @click="goToPage(page)"
                :class="[
                  'w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200',
                  currentPage === page
                    ? 'bg-gradient-to-r from-unpad to-gray-700 text-white shadow-md scale-110'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-kandaga hover:text-kandaga',
                ]"
              >
                {{ page }}
              </button>
            </template>
          </div>

          <!-- Next -->
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-white border border-gray-200 text-gray-700 hover:border-kandaga hover:text-kandaga shadow-sm"
          >
            {{ $t("postgradNextPage") }}
            <div class="i-mdi-chevron-right w-5 h-5" />
          </button>
        </div>

        <!-- Page X of Y label -->
        <p v-if="totalPages > 1" class="mt-4 text-center text-sm text-gray-400">
          {{ currentPage }} {{ $t("postgradPageOf") }} {{ totalPages }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
