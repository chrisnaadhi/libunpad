<script setup>
const { getItems } = useDirectusItems();
const route = useRoute();
const dayjs = useDayjs();

// Fetch everything in one single, safe composable call
const { data: postData } = await useAsyncData(
  `lens-post-${route.params.slug}`,
  async () => {
    // 1. Fetch the post
    const posts = await getItems({
      collection: "kandaga_lens",
      params: {
        filter: {
          slug: { _eq: route.params.slug },
          status: { _eq: "published" },
        },
        limit: 1,
      },
    });

    const post = posts?.[0];
    if (!post) {
      throw createError({
        statusCode: 404,
        statusMessage: "Konten tidak ditemukan",
      });
    }

    // 2. Fetch the profile (if it exists)
    let profile = null;
    if (post.profile) {
      const profiles = await getItems({
        collection: "kandaga_lens_profile",
        params: {
          filter: { id: { _eq: post.profile } },
          limit: 1,
        },
      });
      profile = profiles?.[0] || null;
    }

    // 3. Fetch related posts
    const relatedPosts = await getItems({
      collection: "kandaga_lens",
      params: {
        filter: {
          status: { _eq: "published" },
          category: { _eq: post.category },
          id: { _neq: post.id },
        },
        sort: "-date_created",
        limit: 3,
      },
    });

    // Return all data together
    return { post, profile, relatedPosts };
  }
);

// Extract safely using computed properties
const post = computed(() => postData.value?.post);
const profile = computed(() => postData.value?.profile);
const relatedPosts = computed(() => postData.value?.relatedPosts);

const getCategoryBadge = (cat) => {
  const map = {
    layanan: {
      label: "Layanan",
      icon: "i-mdi-briefcase-outline",
      cls: "bg-green-1 text-green-7 border-green-2",
    },
    informasi: {
      label: "Informasi",
      icon: "i-mdi-information-outline",
      cls: "bg-blue-1 text-blue-7 border-blue-2",
    },
    edukasi_literasi: {
      label: "Edukasi",
      icon: "i-mdi-book-open-outline",
      cls: "bg-amber-1 text-amber-7 border-amber-2",
    },
    pengumuman: {
      label: "Pengumuman",
      icon: "i-mdi-bullhorn-outline",
      cls: "bg-red-1 text-red-7 border-red-2",
    },
    acara: {
      label: "Acara",
      icon: "i-mdi-calendar-star-outline",
      cls: "bg-purple-1 text-purple-7 border-purple-2",
    },
    fasilitas: {
      label: "Fasilitas",
      icon: "i-mdi-office-building-outline",
      cls: "bg-cyan-1 text-cyan-7 border-cyan-2",
    },
  };
  return (
    map[cat] || {
      label: cat,
      icon: "i-mdi-tag-outline",
      cls: "bg-gray-1 text-gray-6 border-gray-2",
    }
  );
};

useHead(computed(() => ({
  title: `${post.value?.title || ''} — Kandaga Lens`,
  meta: [
    { name: "description", content: post.value?.excerpt || post.value?.title || '' },
    { property: "og:title", content: post.value?.title || '' },
    { property: "og:description", content: post.value?.excerpt || '' },
    ...(post.value?.thumbnail
      ? [{ property: "og:image", content: handleAssets(post.value.thumbnail) }]
      : []),
  ],
})));
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Back bar -->
    <div class="bg-white border-b border-gray-2 sticky top-0 z-5 shadow-sm">
      <div class="max-w-4xl ma px-4 py-3 flex items-center gap-3">
        <NuxtLink to="/lens"
          class="inline-flex items-center gap-1.5 text-sm font-600 text-gray-6 hover:text-unpad transition-colors-200">
          <div class="i-mdi-arrow-left w-4.5 h-4.5" />
          Kandaga Lens
        </NuxtLink>
        <div class="text-gray-3">/</div>
        <span class="text-sm text-gray-4 truncate">{{
          trimTitle(post.title, 50)
          }}</span>
      </div>
    </div>

    <div class="max-w-4xl ma px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">
        <!-- ── Main content ── -->
        <article class="space-y-6">
          <!-- Thumbnail -->
          <div v-if="post.thumbnail" class="rounded-2xl overflow-hidden aspect-video w-full bg-gray-1 shadow-sm">
            <NuxtImg :src="handleAssets(post.thumbnail)" :alt="post.title" class="w-full h-full object-cover"
              loading="eager" width="900" height="506" format="webp" quality="85" />
          </div>

          <!-- Post meta + title -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-2 p-6">
            <!-- Badges row -->
            <div class="flex flex-wrap items-center gap-2 mb-4">
              <span class="inline-flex items-center gap-1.5 text-xs font-700 px-3 py-1 rounded-full border"
                :class="getCategoryBadge(post.category).cls">
                <div :class="[getCategoryBadge(post.category).icon, 'w-3.5 h-3.5']" />
                {{ getCategoryBadge(post.category).label }}
              </span>
              <span v-if="post.is_featured"
                class="inline-flex items-center gap-1 text-xs font-700 px-3 py-1 rounded-full bg-amber-1 text-amber-7 border border-amber-2">
                <div class="i-mdi-star w-3.5 h-3.5" />
                Unggulan
              </span>
              <!-- Audience chips -->
              <span v-for="aud in post.audience" :key="aud"
                class="text-xs bg-gray-1 text-gray-5 px-2.5 py-1 rounded-full capitalize border border-gray-2">
                {{ aud }}
              </span>
            </div>

            <h1 class="text-xl sm:text-2xl font-800 text-gray-8 m-0 mb-3 leading-snug">
              {{ post.title }}
            </h1>

            <p v-if="post.excerpt"
              class="text-sm sm:text-base text-gray-5 leading-relaxed m-0 mb-4 pb-4 border-b border-gray-1">
              {{ post.excerpt }}
            </p>

            <!-- Post info row -->
            <div class="flex flex-wrap gap-4 text-xs text-gray-4">
              <span class="flex items-center gap-1.5">
                <div class="i-mdi-calendar-outline w-4 h-4" />
                {{ dayjs(post.date_created).format("DD MMMM YYYY") }}
              </span>
              <a v-if="post.instagram_post_url" :href="post.instagram_post_url" target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-1.5 text-pink-6 hover:text-pink-7 transition-colors-200 font-600">
                <div class="i-mdi-instagram w-4 h-4" />
                Lihat di Instagram
              </a>
            </div>
          </div>

          <!-- Content body -->
          <div class="bg-white rounded-2sxl shadow-sm border border-gray-2 p-6">
            <ClientOnly>
              <div class="lens-content prose max-w-none" v-html="post.contents" />
            </ClientOnly>
          </div>

          <!-- Tags -->
          <div v-if="post.tags?.length" class="bg-white rounded-2xl shadow-sm border border-gray-2 p-5">
            <div class="flex items-center gap-2 mb-3">
              <div class="i-mdi-tag-multiple-outline w-4 h-4 text-unpad" />
              <h3 class="text-sm font-700 text-gray-7 m-0">Tags</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in post.tags" :key="tag"
                class="text-xs bg-unpad/10 text-unpad border border-unpad/20 px-3 py-1 rounded-full font-600 capitalize">
                #{{ tag }}
              </span>
            </div>
          </div>

          <!-- Related posts -->
          <div v-if="relatedPosts?.length" class="space-y-3">
            <div class="flex items-center gap-2 text-xs font-700 text-gray-5 uppercase tracking-wider">
              <div class="i-mdi-link-variant w-4 h-4" />
              Konten Terkait
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <NuxtLink v-for="related in relatedPosts" :key="related.id" :to="`/lens/content/${related.slug}`"
                class="related-card group">
                <div class="h-28 overflow-hidden rounded-t-xl bg-gray-1">
                  <NuxtImg v-if="related.thumbnail" :src="handleAssets(related.thumbnail)" :alt="related.title"
                    class="w-full h-full object-cover transition-transform-500 group-hover:scale-105" loading="lazy"
                    width="300" height="169" format="webp" quality="75" />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <div class="i-mdi-image-outline w-8 h-8 text-gray-3" />
                  </div>
                </div>
                <div class="p-3">
                  <p
                    class="text-xs font-700 text-gray-7 line-clamp-2 leading-snug group-hover:text-unpad transition-colors-200">
                    {{ related.title }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </article>

        <!-- ── Sidebar ── -->
        <aside class="space-y-5 lg:sticky lg:top-20">
          <!-- Profile card -->
          <div v-if="profile" class="bg-white rounded-2xl shadow-sm border border-gray-2 overflow-hidden">
            <div class="bg-gradient-to-br from-unpad to-kandaga px-5 pt-5 pb-10 text-center">
              <div class="w-16 h-16 rounded-full overflow-hidden ma mb-3 ring-3 ring-white/50">
                <NuxtImg v-if="profile.profile_photo" :src="handleAssets(profile.profile_photo)" :alt="profile.name"
                  class="w-full h-full object-cover" width="64" height="64" format="webp" />
                <div v-else class="w-full h-full bg-white/20 flex items-center justify-center">
                  <div class="i-mdi-domain w-8 h-8 text-white" />
                </div>
              </div>
              <h3 class="text-white font-800 text-sm m-0 leading-tight">
                {{ profile.name }}
              </h3>
              <p class="text-white/70 text-xs mt-1">
                @{{ profile.abbreviation }}
              </p>
            </div>

            <div class="-mt-8 mx-4 mb-4 bg-white rounded-xl shadow-sm border border-gray-1 p-4 space-y-3">
              <p v-if="profile.deskripsi" class="text-xs text-gray-5 leading-relaxed">
                {{ trimDescription(profile.deskripsi, 120) }}
              </p>

              <div v-if="profile.location" class="flex items-start gap-2 text-xs text-gray-5">
                <div class="i-mdi-map-marker-outline w-4 h-4 text-unpad flex-shrink-0 mt-0.5" />
                <span>{{ profile.location }}</span>
              </div>

              <div v-if="profile.contact_email" class="flex items-center gap-2 text-xs text-gray-5">
                <div class="i-mdi-email-outline w-4 h-4 text-unpad flex-shrink-0" />
                <a :href="`mailto:${profile.contact_email}`" class="hover:text-unpad transition-colors-200 truncate">
                  {{ profile.contact_email }}
                </a>
              </div>

              <div class="flex gap-2 pt-1">
                <a v-if="profile.instagram_url" :href="profile.instagram_url" target="_blank" rel="noopener noreferrer"
                  class="flex items-center justify-center w-8 h-8 rounded-lg bg-pink-50 text-pink-6 hover:bg-pink-100 transition-colors-200">
                  <div class="i-mdi-instagram w-4.5 h-4.5" />
                </a>
                <a v-if="profile.x_url" :href="profile.x_url" target="_blank" rel="noopener noreferrer"
                  class="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-gray-7 hover:bg-gray-100 transition-colors-200">
                  <div class="i-mdi-twitter w-4.5 h-4.5" />
                </a>
                <a v-if="profile.website_url" :href="profile.website_url" target="_blank" rel="noopener noreferrer"
                  class="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-6 hover:bg-blue-100 transition-colors-200">
                  <div class="i-mdi-web w-4.5 h-4.5" />
                </a>
              </div>

              <NuxtLink :to="`/lens/p/${profile.abbreviation}`"
                class="btn w-full bg-unpad text-white text-xs font-700 hover:opacity-90 transition-opacity text-center block mt-2">
                Lihat Semua Konten
              </NuxtLink>
            </div>
          </div>

          <!-- Service hours -->
          <div v-if="profile?.service_hours" class="bg-white rounded-2xl shadow-sm border border-gray-2 p-5">
            <div class="flex items-center gap-2 mb-3">
              <div class="i-mdi-clock-outline w-4.5 h-4.5 text-unpad" />
              <h3 class="text-sm font-700 text-gray-8 m-0">Jam Layanan</h3>
            </div>
            <p class="text-xs text-gray-5 leading-relaxed whitespace-pre-line">
              {{ profile.service_hours }}
            </p>
          </div>

          <!-- Back to Lens -->
          <NuxtLink to="/lens"
            class="btn w-full bg-gray-1 text-gray-6 text-sm font-600 hover:bg-gray-2 transition-colors-200 text-center flex items-center justify-center gap-2">
            <div class="i-mdi-telescope w-4 h-4" />
            Kembali ke Lens
          </NuxtLink>
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* prettier-ignore */
.related-card {
  --at-apply: bg-white rounded-xl border border-gray-2 overflow-hidden cursor-pointer transition-all-300 hover:border-unpad hover:shadow-sm hover:-translate-y-0.5;
}

/* Content typography overrides */
.lens-content :deep(p) {
  --at-apply: mb-4 text-sm text-gray-7 leading-relaxed;
}

/* prettier-ignore */
.lens-content :deep(a) {
  --at-apply: text-unpad underline hover:opacity-80;
}

.lens-content :deep(h1),
.lens-content :deep(h2),
.lens-content :deep(h3) {
  --at-apply: font-700 text-gray-8 mt-6 mb-3;
}

.lens-content :deep(ul),
.lens-content :deep(ol) {
  --at-apply: pl-5 mb-4 space-y-1 text-sm text-gray-7;
}

.lens-content :deep(img) {
  --at-apply: rounded-xl max-w-full my-4;
}

.lens-content :deep(iframe) {
  --at-apply: w-full rounded-xl my-4;
}
</style>
