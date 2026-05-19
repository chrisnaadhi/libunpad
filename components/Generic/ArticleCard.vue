<script setup>
const config = useRuntimeConfig();

defineProps({
  featuredImg: String,
  linkSlug: String,
  title: String,
  dateCreated: String,
  description: String,
});
</script>

<template>
  <article class="article-card">
    <div class="article-img-wrap">
      <NuxtImg
        :src="`${config.public.directus.url}assets/` + featuredImg"
        :alt="title"
        class="article-img"
        loading="lazy"
        width="640"
        height="400"
        format="webp"
        quality="80"
      />
    </div>
    <div class="article-body">
      <NuxtLink :to="linkSlug" class="article-title">
        {{ title }}
      </NuxtLink>
      <p class="article-excerpt">
        <span v-html="trimDescription(description, 150)"></span>
      </p>
      <div class="article-footer">
        <span class="article-date">
          <span class="i-mdi-calendar-outline w-3.5 h-3.5" />
          {{ displayTanggalIndonesia(dateCreated) }}
        </span>
        <NuxtLink :to="linkSlug" class="article-read-more">
          Baca selengkapnya
          <span class="i-mdi-arrow-right w-3.5 h-3.5" />
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
.article-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  border: 2px solid transparent;
  height: 100%;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.1);
  border-color: #f5f5f5;
}

.article-img-wrap {
  overflow: hidden;
  height: 12rem;
  flex-shrink: 0;
}

.article-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.article-card:hover .article-img {
  transform: scale(1.05);
}

.article-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.25rem 1.25rem 1rem;
  gap: 0.5rem;
}

.article-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  text-decoration: none;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s ease;
}

.article-title:hover {
  color: #f9b129;
}

.article-excerpt {
  font-size: 0.8rem;
  color: #888;
  line-height: 1.65;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f0f0f0;
}

.article-date {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.7rem;
  color: #bbb;
  font-style: italic;
}

.article-read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #f9b129;
  text-decoration: none;
  transition: gap 0.2s ease;
}

.article-read-more:hover {
  gap: 0.4rem;
}
</style>
