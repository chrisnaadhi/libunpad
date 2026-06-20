<script setup>
const { getItems } = useDirectusItems();
const dayjs = useDayjs();
import { onMounted, onBeforeUnmount, computed } from "vue";

const [{ data: lensData }, { data: profilesData }] = await Promise.all([
  useAsyncData("lens-posts", () =>
    getItems({
      collection: "kandaga_lens",
      params: {
        filter: { status: "published" },
        sort: "-date_created",
        limit: 100,
      },
    }),
  ),
  useAsyncData("lens-profiles", () =>
    getItems({
      collection: "kandaga_lens_profile",
      params: {
        filter: { status: "published" },
        sort: "name",
      },
    }),
  ),
]);

// Build profile lookup map
const profileMap = computed(() => {
  const map = {};
  profilesData.value?.forEach((p) => {
    map[p.id] = p;
  });
  return map;
});

// Filter state
const selectedCategory = ref("all");
const selectedAudience = ref("all");
const selectedProfile = ref("all");
const searchQuery = ref("");
const showMobileFilter = ref(false);
const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});

onBeforeUnmount(() => {
  showMobileFilter.value = false;
});

// Lock body scroll when mobile drawer is open
watch(showMobileFilter, (val) => {
  if (import.meta.client) {
    document.body.style.overflow = val ? "hidden" : "";
  }
});

const categories = [
  { key: "all", label: "Semua", icon: "i-mdi-view-grid-outline" },
  { key: "layanan", label: "Layanan", icon: "i-mdi-briefcase-outline" },
  { key: "informasi", label: "Informasi", icon: "i-mdi-information-outline" },
  { key: "edukasi_literasi", label: "Edukasi", icon: "i-mdi-school-outline" },
  { key: "pengumuman", label: "Pengumuman", icon: "i-mdi-bullhorn-outline" },
  { key: "acara", label: "Acara", icon: "i-mdi-calendar-star-outline" },
];

const audienceOptions = [
  { key: "all", label: "Semua Audiens" },
  { key: "mahasiswa", label: "Mahasiswa" },
  { key: "dosen", label: "Dosen" },
  { key: "tendik", label: "Tenaga Kependidikan" },
  { key: "umum", label: "Umum" },
];

const filteredPosts = computed(() => {
  let posts = lensData.value || [];
  if (selectedCategory.value !== "all")
    posts = posts.filter((p) => p.category === selectedCategory.value);
  if (selectedAudience.value !== "all")
    posts = posts.filter(
      (p) =>
        Array.isArray(p.audience) &&
        p.audience.includes(selectedAudience.value),
    );
  if (selectedProfile.value !== "all")
    posts = posts.filter((p) => p.profile === selectedProfile.value);
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        (Array.isArray(p.tags) &&
          p.tags.some((t) => t.toLowerCase().includes(q))),
    );
  }
  return posts;
});

const featuredPosts = computed(() =>
  (lensData.value || []).filter((p) => p.is_featured).slice(0, 4),
);

const resetFilters = () => {
  selectedCategory.value = "all";
  selectedAudience.value = "all";
  selectedProfile.value = "all";
  searchQuery.value = "";
};

const getCategoryBadge = (cat) => {
  const map = {
    layanan: {
      label: "Layanan",
      icon: "i-mdi-briefcase-outline",
      cls: "bg-green-50 text-green-700 border-green-200",
    },
    informasi: {
      label: "Informasi",
      icon: "i-mdi-information-outline",
      cls: "bg-blue-50 text-blue-700 border-blue-200",
    },
    edukasi_literasi: {
      label: "Edukasi",
      icon: "i-mdi-book-open-outline",
      cls: "bg-amber-50 text-amber-700 border-amber-200",
    },
    pengumuman: {
      label: "Pengumuman",
      icon: "i-mdi-bullhorn-outline",
      cls: "bg-red-50 text-red-700 border-red-200",
    },
    acara: {
      label: "Acara",
      icon: "i-mdi-calendar-star-outline",
      cls: "bg-purple-50 text-purple-700 border-purple-200",
    },
    fasilitas: {
      label: "Fasilitas",
      icon: "i-mdi-office-building-outline",
      cls: "bg-cyan-50 text-cyan-700 border-cyan-200",
    },
  };
  return (
    map[cat] || {
      label: cat,
      icon: "i-mdi-tag-outline",
      cls: "bg-gray-100 text-gray-600 border-gray-200",
    }
  );
};

const formatDate = (date) => {
  if (import.meta.client) {
    return dayjs(date).fromNow();
  }
  return dayjs(date).format("DD MMMM YYYY");
};

useHead({
  title: "Kandaga Lens — Temukan Informasi Kandaga",
  meta: [
    {
      name: "description",
      content:
        "Jelajahi dan temukan informasi, layanan, dan panduan dari Kandaga Unpad.",
    },
  ],
});
</script>

<template>
  <!-- Hero Banner -->
  <section
    class="bg-gradient-to-br from-unpad to-kandaga pt-12 pb-20 relative z-10"
  >
    <div class="max-w-7xl ma px-4 text-center">
      <div
        class="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-700 px-3 py-1 rounded-full mb-3 tracking-widest uppercase"
      >
        <div class="i-mdi-telescope w-3.5 h-3.5" />
        Kandaga Lens
      </div>
      <h1
        class="text-white text-3xl sm:text-4xl font-800 m-0 mb-2 leading-tight"
      >
        Temukan Informasi Kandaga
      </h1>
      <p class="text-white/85 text-sm sm:text-base max-w-xl ma mb-6">
        Portal penemuan informasi, layanan, dan panduan dari Kandaga serta
        unit-unit Universitas Padjadjaran.
      </p>
      <!-- Search bar -->
      <div class="max-w-lg ma relative">
        <div
          class="i-mdi-magnify absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        />
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Cari informasi, layanan, panduan..."
          class="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-transparent shadow-lg text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-white/50"
        />
      </div>
    </div>
  </section>

  <!-- Sticky Category Chips Bar -->
  <div
    class="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm -mt-8 rounded-t-2xl"
  >
    <div class="max-w-7xl ma px-4">
      <div class="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-600 whitespace-nowrap border transition-all-200 flex-shrink-0"
          :class="
            selectedCategory === cat.key
              ? 'bg-unpad text-white border-unpad shadow-md'
              : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-unpad hover:text-unpad'
          "
          @click="selectedCategory = cat.key"
        >
          <div :class="[cat.icon, 'w-4 h-4']" />
          {{ cat.label }}
        </button>
      </div>
    </div>
  </div>

  <!-- Main Layout -->
  <main class="max-w-7xl ma px-4 py-6">
    <div
      class="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[240px_1fr_300px] gap-8 items-start"
    >
      <!-- ── Left Filter Sidebar (Desktop) ── -->
      <aside class="hidden lg:block sticky top-24">
        <div
          class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-24"
        >
          <h2
            class="text-base font-700 text-gray-800 m-0 pb-4 mb-4 border-b border-gray-100 flex items-center gap-2"
          >
            <div class="i-mdi-filter-variant w-5 h-5 text-unpad" />
            Filter Konten
          </h2>

          <!-- Audience Filter -->
          <div class="mb-6">
            <p
              class="text-xs font-700 text-gray-500 uppercase tracking-wider mb-3"
            >
              Audiens
            </p>
            <div class="flex flex-col gap-1">
              <button
                v-for="opt in audienceOptions"
                :key="opt.key"
                class="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all-200 text-left"
                :class="
                  selectedAudience === opt.key
                    ? 'bg-unpad text-white font-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                "
                @click="selectedAudience = opt.key"
              >
                {{ opt.label }}
                <div
                  v-if="selectedAudience === opt.key"
                  class="i-mdi-check-circle w-4 h-4"
                ></div>
              </button>
            </div>
          </div>

          <!-- Unit Filter -->
          <div class="mb-6">
            <p
              class="text-xs font-700 text-gray-500 uppercase tracking-wider mb-3"
            >
              Unit / Profil
            </p>
            <div
              class="flex flex-col gap-1 max-h-60 overflow-y-auto pr-1 scrollbar-hide"
            >
              <button
                class="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all-200 text-left"
                :class="
                  selectedProfile === 'all'
                    ? 'bg-unpad text-white font-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                "
                @click="selectedProfile = 'all'"
              >
                Semua Unit
                <div
                  v-if="selectedProfile === 'all'"
                  class="i-mdi-check-circle w-4 h-4"
                ></div>
              </button>
              <button
                v-for="profile in profilesData"
                :key="profile.id"
                class="flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all-200 text-left"
                :class="
                  selectedProfile === profile.id
                    ? 'bg-unpad text-white font-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50'
                "
                @click="selectedProfile = profile.id"
              >
                {{ profile.name }}
                <div
                  v-if="selectedProfile === profile.id"
                  class="i-mdi-check-circle w-4 h-4"
                ></div>
              </button>
            </div>
          </div>

          <button
            class="w-full bg-gray-100 text-gray-600 text-sm font-600 py-2 rounded-lg hover:bg-gray-200 transition-colors-200 flex items-center justify-center gap-1.5"
            @click="resetFilters"
          >
            <div class="i-mdi-refresh w-4 h-4" />
            Reset Filter
          </button>
        </div>
      </aside>

      <!-- ── Center Feed ── -->
      <section class="min-w-0">
        <!-- Mobile Filter Bar -->
        <div class="flex items-center justify-between mb-6 lg:hidden">
          <p class="text-sm text-gray-500 font-600">
            <span class="text-unpad font-700">{{ filteredPosts.length }}</span>
            Konten
          </p>
          <button
            class="flex items-center gap-1.5 bg-unpad text-white text-sm font-600 px-4 py-2 rounded-full shadow-sm"
            @click="showMobileFilter = true"
          >
            <div class="i-mdi-tune-variant w-4 h-4" />
            Filter
          </button>
        </div>

        <!-- Action Zone (Featured Posts Horizontal Scroll) -->
        <div
          v-if="
            featuredPosts.length &&
            selectedCategory === 'all' &&
            selectedAudience === 'all' &&
            selectedProfile === 'all' &&
            !searchQuery
          "
          class="mb-8"
        >
          <div class="flex items-center gap-2 mb-4">
            <div class="w-1 h-5 bg-amber-400 rounded-full"></div>
            <h2 class="text-lg font-700 text-gray-800 m-0">
              Konten Unggulan & Aksi
            </h2>
          </div>

          <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
            <NuxtLink
              v-for="post in featuredPosts"
              :key="post.id"
              :to="`/lens/content/${post.slug}`"
              class="flex-shrink-0 w-72 h-44 rounded-2xl overflow-hidden relative group snap-start shadow-md"
            >
              <NuxtImg
                v-if="post.thumbnail"
                :src="handleAssets(post.thumbnail)"
                :alt="post.title"
                class="absolute inset-0 w-full h-full object-cover transition-transform-500 group-hover:scale-110"
                loading="lazy"
                width="288"
                height="176"
                format="webp"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
              ></div>
              <div
                class="absolute top-3 left-3 inline-flex items-center gap-1 text-xs font-700 px-2.5 py-1 rounded-full bg-amber-100 text-unpad"
              >
                <div class="i-mdi-star w-3 h-3" />
                Unggulan
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p class="text-sm font-700 leading-snug line-clamp-2">
                  {{ post.title }}
                </p>
                <div class="flex items-center gap-2 mt-2 text-xs opacity-90">
                  <div class="i-mdi-clock-outline w-3 h-3"></div>
                  {{ formatDate(post.date_created) }}
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <!-- Desktop Feed Count -->
        <div class="hidden lg:flex items-center justify-between mb-6">
          <h2 class="text-xl font-700 text-gray-800 m-0">Jelajahi Informasi</h2>
          <p class="text-sm text-gray-500 font-600">
            Menampilkan
            <span class="text-unpad font-700">{{ filteredPosts.length }}</span>
            konten
          </p>
        </div>

        <!-- Post Grid -->
        <div
          v-if="filteredPosts.length"
          class="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <NuxtLink
            v-for="post in filteredPosts"
            :key="post.id"
            :to="`/lens/content/${post.slug}`"
            class="post-card group"
          >
            <!-- Thumbnail -->
            <div
              class="relative h-48 overflow-hidden rounded-t-2xl bg-gray-100"
            >
              <NuxtImg
                v-if="post.thumbnail"
                :src="handleAssets(post.thumbnail)"
                :alt="post.title"
                class="w-full h-full object-cover transition-transform-500 group-hover:scale-105"
                loading="lazy"
                width="600"
                height="337"
                format="webp"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100"
              >
                <div class="i-mdi-image-outline w-12 h-12 text-gray-300" />
              </div>

              <span
                class="absolute top-3 left-3 inline-flex items-center gap-1 text-xs font-700 px-2.5 py-1 rounded-full border backdrop-blur-md shadow-sm"
                :class="getCategoryBadge(post.category).cls"
              >
                <div
                  :class="[getCategoryBadge(post.category).icon, 'w-3 h-3']"
                />
                {{ getCategoryBadge(post.category).label }}
              </span>
            </div>

            <!-- Card Body -->
            <div class="p-5 flex flex-col flex-1 bg-white rounded-b-2xl">
              <h3
                class="text-base font-700 text-gray-800 leading-snug line-clamp-2 group-hover:text-unpad transition-colors-200 mb-2"
              >
                {{ post.title }}
              </h3>
              <p
                v-if="post.excerpt"
                class="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1 mb-4"
              >
                {{ post.excerpt }}
              </p>

              <div
                class="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto"
              >
                <div class="flex items-center gap-2 flex-1 min-w-0">
                  <div
                    class="w-6 h-6 rounded-full bg-unpad/10 flex items-center justify-center flex-shrink-0"
                  >
                    <span class="text-xs font-700 text-unpad">{{
                      profileMap[post.profile]?.abbreviation?.charAt(0) || "K"
                    }}</span>
                  </div>
                  <span class="text-xs text-gray-500 font-600 truncate">
                    {{ profileMap[post.profile]?.name || "Kandaga" }}
                  </span>
                </div>
                <span
                  class="text-xs text-gray-400 flex-shrink-0 flex items-center gap-1"
                >
                  <div class="i-mdi-clock-outline w-3 h-3"></div>
                  {{ formatDate(post.date_created) }}
                </span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="flex flex-col items-center py-20 px-6 text-center bg-white rounded-2xl border border-dashed border-gray-200"
        >
          <div class="i-mdi-inbox-outline w-16 h-16 text-gray-300 ma mb-4" />
          <p class="text-gray-700 font-700 text-lg mb-1">
            Tidak ada konten ditemukan
          </p>
          <p class="text-gray-400 text-sm mb-6">
            Coba ubah filter atau kata kunci pencarian Anda.
          </p>
          <button
            class="bg-unpad text-white px-6 py-2 rounded-full text-sm font-600 flex items-center gap-1.5"
            @click="resetFilters"
          >
            <div class="i-mdi-refresh w-4 h-4"></div>
            Reset Filter
          </button>
        </div>
      </section>

      <!-- ── Right Widgets Sidebar (XL only) ── -->
      <aside class="hidden xl:block sticky top-24 space-y-6">
        <!-- Unit Profiles Widget -->
        <div
          class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div
            class="flex items-center gap-2 px-5 py-4 border-b border-gray-100"
          >
            <div class="w-1 h-5 bg-amber-400 rounded-full"></div>
            <h3 class="text-sm font-700 text-gray-800 m-0">Unit Terkait</h3>
          </div>
          <div class="p-2">
            <NuxtLink
              v-for="profile in profilesData"
              :key="profile.id"
              :to="`/lens/p/${profile.abbreviation}`"
              class="flex items-center gap-3 p-3 rounded-xl transition-colors-200 hover:bg-gray-50 group"
            >
              <div
                class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-unpad/10 flex items-center justify-center"
              >
                <NuxtImg
                  v-if="profile.profile_photo"
                  :src="handleAssets(profile.profile_photo)"
                  :alt="profile.name"
                  class="w-full h-full object-cover"
                  width="40"
                  height="40"
                  format="webp"
                  loading="lazy"
                />
                <div v-else class="i-mdi-domain w-5 h-5 text-unpad"></div>
              </div>
              <div class="min-w-0 flex-1">
                <p
                  class="text-xs font-700 text-gray-700 truncate group-hover:text-unpad transition-colors-200"
                >
                  {{ profile.name }}
                </p>
                <p class="text-xs text-gray-400">@{{ profile.abbreviation }}</p>
              </div>
              <div
                class="i-mdi-chevron-right w-4 h-4 text-gray-300 group-hover:text-unpad transition-colors-200"
              />
            </NuxtLink>
          </div>
        </div>
      </aside>
    </div>
  </main>

  <!-- ── Mobile Filter Drawer (Bottom Sheet) ── -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="showMobileFilter"
        class="fixed inset-0 bg-black/50 z-40 lg:hidden"
        @click="showMobileFilter = false"
      ></div>
    </Transition>

    <Transition name="slide-up">
      <div
        v-if="showMobileFilter"
        class="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 lg:hidden max-h-[85vh] flex flex-col"
      >
        <div
          class="p-5 border-b border-gray-100 flex items-center justify-between"
        >
          <div
            class="w-10 h-1 bg-gray-200 rounded-full absolute top-2 left-1/2 -translate-x-1/2"
          ></div>
          <h2 class="text-lg font-700 text-gray-800 m-0">Filter Konten</h2>
          <button
            class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
            @click="showMobileFilter = false"
          >
            <div class="i-mdi-close w-4 h-4 text-gray-600"></div>
          </button>
        </div>

        <div class="p-5 overflow-y-auto flex-1 space-y-6">
          <!-- Audience -->
          <div>
            <p
              class="text-xs font-700 text-gray-500 uppercase tracking-wider mb-3"
            >
              Audiens
            </p>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="opt in audienceOptions"
                :key="opt.key"
                class="px-4 py-2.5 rounded-xl text-sm font-600 border transition-all-200"
                :class="
                  selectedAudience === opt.key
                    ? 'bg-unpad text-white border-unpad'
                    : 'bg-gray-50 text-gray-600 border-gray-200'
                "
                @click="selectedAudience = opt.key"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>

          <!-- Unit -->
          <div>
            <p
              class="text-xs font-700 text-gray-500 uppercase tracking-wider mb-3"
            >
              Unit / Profil
            </p>
            <div class="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              <button
                class="px-4 py-2.5 rounded-xl text-sm font-600 border transition-all-200"
                :class="
                  selectedProfile === 'all'
                    ? 'bg-unpad text-white border-unpad'
                    : 'bg-gray-50 text-gray-600 border-gray-200'
                "
                @click="selectedProfile = 'all'"
              >
                Semua Unit
              </button>
              <button
                v-for="profile in profilesData"
                :key="profile.id"
                class="px-4 py-2.5 rounded-xl text-sm font-600 border transition-all-200 truncate"
                :class="
                  selectedProfile === profile.id
                    ? 'bg-unpad text-white border-unpad'
                    : 'bg-gray-50 text-gray-600 border-gray-200'
                "
                @click="selectedProfile = profile.id"
              >
                {{ profile.abbreviation?.toUpperCase() }}
              </button>
            </div>
          </div>
        </div>

        <div class="p-5 border-t border-gray-100 flex gap-3">
          <button
            class="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 font-600 text-sm"
            @click="resetFilters"
          >
            Reset
          </button>
          <button
            class="flex-[2] py-3 rounded-xl bg-unpad text-white font-700 text-sm shadow-md"
            @click="showMobileFilter = false"
          >
            Terapkan Filter
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Custom Card Styling */
.post-card {
  --at-apply: bg-white rounded-2xl border border-gray-100 overflow-hidden flex
    flex-col cursor-pointer transition-all-300;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}
.post-card:hover {
  --at-apply: border-unpad/20;
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
}

/* Hide Scrollbar */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Transitions for Mobile Drawer */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
