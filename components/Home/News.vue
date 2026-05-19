<script setup>
const { getItems } = useDirectusItems();

const getAllArticle = await getItems({
  collection: "artikel",
  params: {
    limit: 3,
    sort: "-date_created",
    filter: {
      status: "published",
    },
  },
});

const getAllBeritaKunjungan = await getItems({
  collection: "berita_kunjungan",
  params: {
    limit: 3,
    sort: "-date_created",
    filter: {
      status: "published",
    },
  },
});

const gabunganBerita = [...getAllArticle, ...getAllBeritaKunjungan];
</script>

<template>
  <section class="news-section">
    <!-- Header -->
    <div class="news-header">
      <div class="section-badge">
        <div class="i-mdi-newspaper w-3.5 h-3.5" />
        Berita & Kegiatan
      </div>
      <h2 class="news-title">{{ $t("newsTitleHeader") }}</h2>
    </div>

    <!-- News grid -->
    <div class="news-grid">
      <GenericArticleCard
        v-for="item in gabunganBerita.slice(0, 3)"
        :key="item.id"
        :featured-img="item.gambar_unggulan"
        :description="item.konten_berita ?? item.konten_artikel"
        :link-slug="beritaType(item)"
        :title="item.judul"
        :date-created="item.date_created"
      />
    </div>

    <!-- See more -->
    <div class="text-center mt-8">
      <NuxtLink to="/berita" class="news-more-btn">
        Lihat berita lainnya
        <span class="i-mdi-arrow-right w-4 h-4" />
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.news-section {
  --at-apply: max-w-7xl mx-auto px-4 py-16;
}

.news-header {
  --at-apply: text-center mb-10;
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
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  margin-bottom: 0.75rem;
}

.news-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #1a1a1a;
}

.news-grid {
  --at-apply: grid grid-cols-1 md: grid-cols-3 gap-6;
}

.news-more-btn {
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

.news-more-btn:hover {
  background: #f9b129;
  color: #1a0f00;
  transform: translateY(-2px);
}
</style>
