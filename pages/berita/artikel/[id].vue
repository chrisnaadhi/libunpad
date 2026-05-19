<script setup>
const route = useRoute();
const config = useRuntimeConfig();
const { getItems } = useDirectusItems();
const { getUserById } = useDirectusUsers();

const berita = await getItems({
  collection: "artikel",
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
  <main>
    <!-- Hero with featured image -->
    <div
      class="article-hero"
      :style="`background-image: url(${config.public.directus.url}assets/${berita[0].gambar_unggulan})`"
    >
      <div class="article-hero-overlay" />
      <div class="article-hero-content">
        <div class="article-eyebrow">
          <span class="section-badge">
            <div class="i-mdi-newspaper w-3.5 h-3.5" />
            Berita
          </span>
          <span v-if="berita[0].kategori" class="category-pill">
            {{ berita[0].kategori }}
          </span>
        </div>
        <h1 class="article-hero-title">{{ berita[0].judul }}</h1>
        <div class="article-author-row">
          <NuxtImg
            :src="
              getPenulis.avatar
                ? config.public.directus.url + 'assets/' + getPenulis.avatar
                : '/images/no-image.jpg'
            "
            class="author-avatar"
          />
          <div>
            <p class="author-name">{{ namaPenulis }}</p>
            <p class="author-date">
              {{ convertTimeZone(berita[0].date_created) }}
            </p>
          </div>
        </div>
        <div v-if="berita[0].tag_artikel?.length" class="tags-row">
          <span
            v-for="tag in berita[0].tag_artikel"
            :key="tag"
            class="tag-pill"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <!-- Article content -->
    <div class="article-wrap">
      <article class="article-body">
        <div
          class="article-prose"
          v-html="berita[0].konten_artikel ?? berita[0].konten_berita"
        />
        <p class="updated-note">
          <span class="i-mdi-clock-edit-outline w-3.5 h-3.5" />
          Diperbaharui pada: {{ convertTimeZone(berita[0].date_updated) }}
        </p>
      </article>
      <div class="text-center pb-16">
        <NuxtLink to="/berita" class="back-btn">
          <div class="i-mdi-arrow-left w-4 h-4" />
          Kembali ke Berita
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.article-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: flex-end;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.article-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(6, 6, 18, 0.35) 0%,
    rgba(6, 6, 18, 0.6) 50%,
    rgba(6, 6, 18, 0.96) 100%
  );
}

.article-hero-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 56rem;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.article-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.section-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #f9b129;
  background: rgba(249, 177, 41, 0.15);
  border: 1px solid rgba(249, 177, 41, 0.3);
  padding: 0.4rem 1rem;
  border-radius: 9999px;
}

.category-pill {
  display: inline-flex;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: capitalize;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 0.35rem 0.875rem;
  border-radius: 9999px;
}

.article-hero-title {
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 800;
  color: white;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
}

.article-author-row {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  margin-bottom: 1rem;
}

.author-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  object-fit: cover;
  border: 2px solid #f9b129;
  flex-shrink: 0;
}

.author-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.2rem;
}

.author-date {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-pill {
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  text-transform: lowercase;
}

.article-wrap {
  max-width: 56rem;
  margin: 0 auto;
  padding: 2.5rem 1rem;
}

.article-body {
  background: white;
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

@media (max-width: 640px) {
  .article-body {
    padding: 1.5rem;
  }
}

.article-prose {
  font-size: 1rem;
  line-height: 1.8;
  color: #2a2a2a;
  text-align: justify;
}

.article-prose :deep(h1),
.article-prose :deep(h2),
.article-prose :deep(h3) {
  color: #1a1a1a;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.article-prose :deep(p) {
  margin-bottom: 1rem;
}

.article-prose :deep(img) {
  border-radius: 0.75rem;
  max-width: 100%;
  height: auto;
}

.article-prose :deep(a) {
  color: #f9b129;
  text-decoration: underline;
}

.updated-note {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: #bbb;
  font-style: italic;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #1a1a2e;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0.625rem 1.75rem;
  border-radius: 9999px;
  text-decoration: none;
  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.back-btn:hover {
  background: #f9b129;
  color: #1a0f00;
  transform: translateY(-2px);
}
</style>
