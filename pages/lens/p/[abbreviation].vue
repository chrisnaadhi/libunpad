<script setup>
const { getItems } = useDirectusItems();
const route = useRoute();
const dayjs = useDayjs();

const profiles = await getItems({
  collection: "kandaga_lens_profile",
  params: {
    filter: { abbreviation: { _eq: route.params.abbreviation }, status: { _eq: "published" } },
    limit: 1,
  },
})

const profile = profiles?.[0]
if (!profile) throw createError({ statusCode: 404, statusMessage: "Profil tidak ditemukan" })

const postsData = await getItems({
  collection: "kandaga_lens",
  params: {
    filter: { profile: { _eq: profile.id }, status: { _eq: "published" } },
    sort: "-date_created",
    limit: 50,
  },
})

const selectedCategory = ref("all")

const categories = [
  { key: "all", label: "Semua", icon: "i-mdi-view-grid-outline" },
  { key: "layanan", label: "Layanan", icon: "i-mdi-briefcase-outline" },
  { key: "informasi", label: "Informasi", icon: "i-mdi-information-outline" },
  { key: "edukasi_literasi", label: "Edukasi", icon: "i-mdi-school-outline" },
  { key: "pengumuman", label: "Pengumuman", icon: "i-mdi-bullhorn-outline" },
  { key: "acara", label: "Acara", icon: "i-mdi-calendar-star-outline" },
];

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
      icon: "i-mdi-school-outline",
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

const filteredPosts = computed(() => {
  if (selectedCategory.value === "all") return postsData || []
  return (postsData || []).filter(p => p.category === selectedCategory.value)
})

const categoryCounts = computed(() => {
  const counts = {}
    ; (postsData || []).forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1 })
  return counts
})

useHead({
  title: `${profile.name} — Kandaga Lens`,
  meta: [{ name: "description", content: profile.deskripsi || `Konten dari ${profile.name}` }],
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Back bar -->
    <div class="bg-white border-b border-gray-2 shadow-sm">
      <div class="max-w-5xl ma px-4 py-3">
        <NuxtLink to="/lens"
          class="inline-flex items-center gap-1.5 text-sm font-600 text-gray-6 hover:text-unpad transition-colors-200">
          <div class="i-mdi-arrow-left w-4.5 h-4.5" />
          Kandaga Lens
        </NuxtLink>
      </div>
    </div>

    <div v-if="!profile" class="bg-gradient-to-br from-unpad to-kandaga pt-12 pb-20 animate-pulse">
      <div class="max-w-5xl ma px-4 text-center space-y-3">
        <div class="w-24 h-24 rounded-full bg-white/20 ma"></div>
        <div class="h-6 bg-white/20 rounded w-48 ma"></div>
        <div class="h-4 bg-white/20 rounded w-32 ma"></div>
      </div>
    </div>
    <!-- Profile hero banner -->
    <div v-else class="bg-gradient-to-br from-unpad to-kandaga pt-12 pb-20">
      <div class="max-w-5xl ma px-4 text-center">
        <!-- Profile photo -->
        <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ma mb-4 ring-4 ring-white/30 shadow-lg">
          <NuxtImg v-if="profile.profile_photo" :src="handleAssets(profile.profile_photo)" :alt="profile.name"
            class="w-full h-full object-cover" width="96" height="96" format="webp" />
          <div v-else class="w-full h-full bg-white/20 flex items-center justify-center">
            <div class="i-mdi-domain w-12 h-12 text-white" />
          </div>
        </div>
        <h1 class="text-white text-2xl sm:text-3xl font-800 m-0 mb-2 leading-tight">
          {{ profile.name }}
        </h1>
        <p class="text-white/70 text-sm mb-4">@{{ profile.abbreviation }}</p>
        <p v-if="profile.deskripsi" class="text-white/85 text-sm sm:text-base max-w-xl ma leading-relaxed mb-6">
          {{ profile.deskripsi }}
        </p>

        <!-- Social links -->
        <div class="flex justify-center gap-3">
          <a v-if="profile.instagram_url" :href="profile.instagram_url" target="_blank" rel="noopener noreferrer"
            class="btn bg-white/20 hover:bg-white/30 text-white border border-white/30 inline-flex items-center gap-2 text-sm font-600">
            <div class="i-mdi-instagram w-4.5 h-4.5" />
            Instagram
          </a>
          <a v-if="profile.website_url" :href="profile.website_url" target="_blank" rel="noopener noreferrer"
            class="btn bg-white/20 hover:bg-white/30 text-white border border-white/30 inline-flex items-center gap-2 text-sm font-600">
            <div class="i-mdi-web w-4.5 h-4.5" />
            Website
          </a>
        </div>
      </div>
    </div>

    <!-- Floating info card -->
    <div v-if="profile" class="max-w-5xl ma px-4 -mt-8 relative z-10 mb-8">
      <div class="bg-white rounded-2xl shadow-lg border border-gray-1">
        <div class="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-1">
          <!-- Total konten -->
          <div class="flex items-center gap-3 px-6 py-4">
            <div class="w-10 h-10 rounded-xl bg-unpad/10 flex items-center justify-center flex-shrink-0">
              <div class="i-mdi-newspaper-variant-outline w-5 h-5 text-unpad" />
            </div>
            <div>
              <p class="text-xl font-800 text-gray-8 m-0">
                {{ postsData?.length || 0 }}
              </p>
              <p class="text-xs text-gray-5 m-0">Total Konten</p>
            </div>
          </div>
          <!-- Location -->
          <div v-if="profile.location" class="flex items-center gap-3 px-6 py-4">
            <div class="w-10 h-10 rounded-xl bg-unpad/10 flex items-center justify-center flex-shrink-0">
              <div class="i-mdi-map-marker-outline w-5 h-5 text-unpad" />
            </div>
            <div class="min-w-0">
              <p class="text-sm font-700 text-gray-7 m-0 truncate">
                {{ profile.location }}
              </p>
              <p class="text-xs text-gray-5 m-0">Lokasi</p>
            </div>
          </div>
          <!-- Contact -->
          <div class="flex items-center gap-3 px-6 py-4">
            <div class="w-10 h-10 rounded-xl bg-unpad/10 flex items-center justify-center flex-shrink-0">
              <div class="i-mdi-email-outline w-4.5 h-4.5 text-unpad" />
            </div>
            <div class="min-w-0">
              <a v-if="profile.contact_email" :href="`mailto:${profile.contact_email}`"
                class="text-sm font-700 text-unpad hover:opacity-80 transition-opacity truncate block">
                {{ profile.contact_email }}
              </a>
              <p class="text-xs text-gray-5 m-0">Email</p>
            </div>
          </div>
        </div>
        <!-- Service hours -->
        <div v-if="profile.service_hours"
          class="px-6 py-4 border-t border-gray-1 flex items-start gap-3 bg-amber-50 rounded-b-2xl">
          <div class="i-mdi-clock-outline w-4.5 h-4.5 text-amber-6 flex-shrink-0 mt-0.5" />
          <p class="text-xs text-amber-7 leading-relaxed m-0 whitespace-pre-line">
            {{ profile.service_hours }}
          </p>
        </div>
      </div>
    </div>

    <!-- Content section -->
    <div class="max-w-5xl ma px-4 pb-12">
      <!-- Section header -->
      <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <div
            class="inline-flex items-center gap-2 text-xs font-700 text-unpad uppercase tracking-wider bg-unpad/10 px-3 py-1 rounded-full mb-2">
            <div class="i-mdi-view-grid-outline w-3.5 h-3.5" />
            Konten dari unit ini
          </div>
          <h2 class="text-xl font-800 text-gray-8 m-0">Semua Konten</h2>
        </div>
        <p class="text-sm text-gray-5">{{ filteredPosts.length }} konten</p>
      </div>

      <!-- Category filter chips -->
      <div class="flex gap-2 overflow-x-auto pb-2 mb-6">
        <button v-for="cat in categories" :key="cat.key"
          class="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-600 whitespace-nowrap border transition-all-200 flex-shrink-0"
          :class="selectedCategory === cat.key
            ? 'bg-unpad text-white border-unpad'
            : 'bg-white text-gray-6 border-gray-2 hover:border-unpad hover:text-unpad'
            " @click="selectedCategory = cat.key">
          {{ cat.label }}
          <span v-if="cat.key !== 'all' && categoryCounts[cat.key]" class="text-xs opacity-70">
            {{ categoryCounts[cat.key] }}
          </span>
        </button>
      </div>

      <!-- Posts grid -->
      <div v-if="filteredPosts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink v-for="post in filteredPosts" :key="post.id" :to="`/lens/content/${post.slug}`"
          class="profile-post-card group">
          <!-- Thumbnail -->
          <div class="relative h-44 overflow-hidden rounded-t-xl bg-gray-1">
            <NuxtImg v-if="post.thumbnail" :src="handleAssets(post.thumbnail)" :alt="post.title"
              class="w-full h-full object-cover transition-transform-500 group-hover:scale-105" loading="lazy"
              width="400" height="225" format="webp" quality="80" />
            <div v-else class="w-full h-full flex items-center justify-center">
              <div class="i-mdi-image-outline w-10 h-10 text-gray-3" />
            </div>
            <!-- Category badge -->
            <span
              class="absolute top-3 left-3 inline-flex items-center gap-1 text-xs font-700 px-2.5 py-1 rounded-full border"
              :class="getCategoryBadge(post.category).cls">
              <div :class="[getCategoryBadge(post.category).icon, 'w-3 h-3']" />
              {{ getCategoryBadge(post.category).label }}
            </span>
            <span v-if="post.is_featured"
              class="absolute top-3 right-3 w-7 h-7 rounded-full bg-amber-4 flex items-center justify-center shadow-sm">
              <div class="i-mdi-star w-4 h-4 text-white" />
            </span>
          </div>

          <!-- Card body -->
          <div class="p-4 flex flex-col flex-1">
            <h3
              class="text-sm font-700 text-gray-8 leading-snug line-clamp-2 group-hover:text-unpad transition-colors-200 mb-2">
              {{ post.title }}
            </h3>
            <p v-if="post.excerpt" class="text-xs text-gray-5 leading-relaxed line-clamp-2 flex-1 mb-3">
              {{ post.excerpt }}
            </p>
            <div class="flex items-center justify-between pt-3 border-t border-gray-1 mt-auto">
              <div class="flex flex-wrap gap-1">
                <span v-for="aud in (post.audience || []).slice(0, 2)" :key="aud"
                  class="text-xs bg-gray-1 text-gray-4 px-2 py-0.5 rounded-full capitalize">
                  {{ aud }}
                </span>
              </div>
              <ClientOnly>
                <span class="text-xs text-gray-4">{{
                  formatDate(post.date_created)
                }}</span>
              </ClientOnly>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-else class="flex flex-col items-center py-16 text-center">
        <div class="i-mdi-inbox-outline w-12 h-12 text-gray-3 ma mb-3" />
        <p class="text-gray-5 font-600">Belum ada konten dalam kategori ini.</p>
        <button v-if="selectedCategory !== 'all'" class="btn bg-unpad text-white mt-4 text-sm font-600"
          @click="selectedCategory = 'all'">
          Lihat Semua Konten
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-post-card {
  --at-apply: bg-white rounded-xl border border-gray-2 overflow-hidden flex flex-col cursor-pointer transition-all-300 hover:border-unpad hover:shadow-md hover:-translate-y-0.5;
}
</style>
