<script setup>
const { getSingletonItem } = useDirectusItems();
const { getThumbnail: img } = useDirectusFiles();

const val = ref("Regulasi Kandaga");
const regulasiKandaga = await getSingletonItem({
  collection: "regulasi_kandaga",
});
</script>

<template>
  <main>
    <div class="page-hero">
      <div
        v-if="regulasiKandaga.featured_image"
        class="page-hero-bg"
        :style="`background-image: url(${handleAssets(regulasiKandaga.featured_image)})`"
      />
      <div class="page-hero-overlay" />
      <div class="relative z-1 text-center">
        <div class="section-badge">
          <div class="i-mdi-gavel w-3.5 h-3.5" />
          Kandaga
        </div>
        <h1 class="page-hero-title">{{ val }}</h1>
        <p class="page-hero-desc">
          Peraturan dan Regulasi yang sudah ditetapkan oleh Pusat Pengelolaan
          Pengetahuan Unpad
        </p>
        <p class="page-hero-date">
          {{ displayTanggalIndonesia(regulasiKandaga.date_created) }}
        </p>
      </div>
    </div>

    <div class="content-wrap">
      <div
        id="contents"
        v-html="regulasiKandaga.konten"
        class="prose-content"
      />
    </div>
  </main>
</template>

<style scoped>
.page-hero {
  position: relative;
  padding: 5rem 1.5rem 4rem;
  background: linear-gradient(160deg, #06060e 0%, #160f03 50%, #06060e 100%);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
}

.page-hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    rgba(6, 6, 14, 0.88) 0%,
    rgba(22, 15, 3, 0.88) 100%
  );
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
  background: rgba(249, 177, 41, 0.1);
  border: 1px solid rgba(249, 177, 41, 0.2);
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  margin-bottom: 1rem;
}

.page-hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: white;
  margin-bottom: 0.75rem;
}

.page-hero-desc {
  color: rgba(255, 255, 255, 0.55);
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  max-width: 40rem;
  margin: 0 auto 0.5rem;
  font-style: italic;
}

.page-hero-date {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.35);
  font-style: italic;
}

.content-wrap {
  max-width: 56rem;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}

.prose-content {
  background: white;
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
  font-size: 1rem;
  line-height: 1.8;
  color: #2a2a2a;
}

.prose-content :deep(h1),
.prose-content :deep(h2),
.prose-content :deep(h3) {
  font-weight: 700;
  color: #1a1a1a;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose-content :deep(p) {
  margin-bottom: 1rem;
}

.prose-content :deep(a) {
  color: #f9b129;
  text-decoration: underline;
}

.prose-content :deep(ul),
.prose-content :deep(ol) {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.prose-content :deep(img) {
  border-radius: 0.75rem;
  max-width: 100%;
}

@media (max-width: 640px) {
  .prose-content {
    padding: 1.5rem;
  }
}
</style>
