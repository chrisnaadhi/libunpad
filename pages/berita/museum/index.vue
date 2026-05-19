<script setup>
const { getItems } = useDirectusItems();
const title = ref("Berita terkait Museum");

const dataArtikelMuseum = await getItems({
  collection: "artikel",
  params: {
    filter: {
      kategori: "museum",
      status: "published",
    },
  },
});
</script>

<template>
  <main>
    <div class="page-hero">
      <div class="page-hero-glow" />
      <div class="relative z-1">
        <div class="section-badge">
          <div class="i-mdi-bank w-3.5 h-3.5" />
          Museum
        </div>
        <h1 class="page-hero-title">Berita Museum</h1>
        <p class="page-hero-desc">
          Berita yang berkaitan seputar Museum dan pengelolaannya.
        </p>
      </div>
    </div>

    <div class="list-wrap">
      <template v-if="dataArtikelMuseum.length > 0">
        <div class="article-grid">
          <GenericArticleCard
            v-for="item in dataArtikelMuseum"
            :key="item.id"
            :featured-img="item.gambar_unggulan"
            :description="item.konten_artikel"
            :link-slug="beritaType(item)"
            :title="item.judul"
            :date-created="item.date_created"
          />
        </div>
      </template>
      <div v-else class="empty-state">
        <div
          class="i-mdi-newspaper-remove w-12 h-12 mx-auto mb-3"
          style="color: #ccc"
        />
        <p>Belum ada berita mengenai Museum.</p>
      </div>
    </div>

    <div class="text-center pb-16">
      <NuxtLink to="/berita" class="back-btn">
        <div class="i-mdi-arrow-left w-4 h-4" />
        Kembali ke Berita
      </NuxtLink>
    </div>
  </main>
</template>

<style scoped>
.page-hero {
  position: relative;
  padding: 5rem 1.5rem 4rem;
  background: linear-gradient(160deg, #06060e 0%, #160f03 50%, #06060e 100%);
  overflow: hidden;
  text-align: center;
}

.page-hero-glow {
  position: absolute;
  top: -8rem;
  left: 50%;
  transform: translateX(-50%);
  width: 36rem;
  height: 24rem;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(249, 177, 41, 0.18) 0%,
    transparent 70%
  );
  pointer-events: none;
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
  margin: 0 auto;
}

.list-wrap {
  max-width: 80rem;
  margin: 0 auto;
  padding: 3rem 1rem;
}

.article-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .article-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .article-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.empty-state {
  text-align: center;
  padding: 4rem 0;
  color: #bbb;
  font-style: italic;
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
