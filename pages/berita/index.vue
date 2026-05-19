<script setup>
const { getItems } = useDirectusItems();

const imageBg = "https://www.svgrepo.com/show/9244/newspaper-report.svg";
const platform = [
  {
    nama: "Kandaga",
    deskripsi: "Berita umum seputar Grha Kandaga",
    slug: "all",
  },
  {
    nama: "Gallery",
    deskripsi: "Berita mengenai Galeri Kandaga",
    slug: "gallery",
  },
  {
    nama: "Library",
    deskripsi: "Berita mengenai Perpustakaan Kandaga",
    slug: "library",
  },
  {
    nama: "Archive",
    deskripsi: "Berita mengenai Arsip Publik yang dikelola Kandaga",
    slug: "archive",
  },
  {
    nama: "Museum",
    deskripsi: "Berita mengenai Museum Kandaga",
    slug: "museum",
  },
];

const getHighlightArticle = await getItems({
  collection: "artikel",
  params: {
    limit: 1,
    sort: "-date_created",
    filter: {
      status: "published",
    },
  },
});

const highlightArticle = getHighlightArticle[0];

const getNewestArticle = await getItems({
  collection: "berita_kunjungan",
  params: {
    limit: 4,
    sort: "-date_created",
    offset: 1,
    filter: {
      status: "published",
    },
  },
});

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

const beritaKandaga = [...getAllArticle, ...getAllBeritaKunjungan].sort(
  (a, b) =>
    new Date(b.date_created).getTime() - new Date(a.date_created).getTime(),
);
const servedBerita = beritaKandaga.slice(0, 3);

const getGalleryArticle = await getItems(fetchArticleCategory("gallery"));
const getLibraryArticle = await getItems(fetchArticleCategory("library"));
const getArchiveArticle = await getItems(fetchArticleCategory("archive"));
const getMuseumArticle = await getItems(fetchArticleCategory("museum"));

platform[0]["collection"] = servedBerita;
platform[1]["collection"] = getGalleryArticle;
platform[2]["collection"] = getLibraryArticle;
platform[3]["collection"] = getArchiveArticle;
platform[4]["collection"] = getMuseumArticle;
</script>

<template>
  <main>
    <!-- Page hero -->
    <div class="page-hero">
      <div class="page-hero-glow" />
      <div class="relative z-1">
        <div class="section-badge">
          <div class="i-mdi-newspaper w-3.5 h-3.5" />
          Berita & Kegiatan
        </div>
        <h1 class="page-hero-title">{{ $t("newsTitleHeader") }}</h1>
        <p class="page-hero-desc">{{ $t("newsDescriptionHeader") }}</p>
      </div>
    </div>

    <!-- Featured spotlight -->
    <div class="spotlight-wrap">
      <div class="spotlight-inner">
        <!-- Featured article -->
        <NuxtLink :to="beritaType(highlightArticle)" class="featured-card">
          <NuxtImg
            class="featured-img"
            :src="handleAssets(highlightArticle?.gambar_unggulan)"
          />
          <div class="featured-overlay">
            <span class="highlight-badge">
              <div class="i-mdi-star w-3.5 h-3.5" />
              Berita Highlight
            </span>
            <h2 class="featured-title">
              {{ trimTitle(highlightArticle?.judul, 90) }}
            </h2>
            <p class="featured-excerpt">
              {{ trimDescription(highlightArticle?.konten_artikel, 160) }}
            </p>
          </div>
        </NuxtLink>

        <!-- Recent 2×2 grid -->
        <div class="recent-grid">
          <NuxtLink
            v-for="article in getNewestArticle"
            :key="article.id"
            :to="beritaType(article)"
            class="recent-card"
          >
            <div class="recent-img-wrap">
              <NuxtImg
                :src="handleAssets(article?.gambar_unggulan)"
                class="recent-img"
              />
            </div>
            <div class="recent-body">
              <h3 class="recent-title">{{ trimTitle(article?.judul, 55) }}</h3>
              <p class="recent-excerpt">
                {{ trimDescription(article?.konten_berita, 80) }}
              </p>
              <span class="recent-read-more">
                Baca selengkapnya
                <span class="i-mdi-arrow-right w-3 h-3" />
              </span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Platform sections -->
    <div class="platforms-content">
      <section v-for="plat in platform" :key="plat.slug" class="platform-block">
        <div class="platform-block-header">
          <div class="section-badge">
            <div class="i-mdi-newspaper w-3.5 h-3.5" />
            {{ plat.nama }}
          </div>
          <h2 class="platform-block-title">{{ plat.nama }}</h2>
          <p class="platform-block-desc">{{ plat.deskripsi }}</p>
        </div>
        <template v-if="plat.collection.length > 0">
          <div class="platform-block-grid">
            <GenericArticleCard
              v-for="item in plat.collection"
              :key="item.id"
              :featured-img="item.gambar_unggulan"
              :description="item.konten_artikel ?? item.konten_berita"
              :link-slug="beritaType(item)"
              :title="item.judul"
              :date-created="item.date_created"
            />
          </div>
          <div class="platform-block-more">
            <NuxtLink :to="'/berita/' + plat.slug" class="more-link">
              Lihat selengkapnya
              <span class="i-mdi-arrow-right w-3.5 h-3.5" />
            </NuxtLink>
          </div>
        </template>
        <div v-else class="platform-empty">
          <div
            class="i-mdi-newspaper-remove w-10 h-10 mx-auto mb-3"
            style="color: #ccc"
          />
          <p>Belum ada berita mengenai {{ plat.nama }}.</p>
        </div>
      </section>
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

/* Spotlight */
.spotlight-wrap {
  background: #f5f5f7;
  padding: 3rem 1rem;
}

.spotlight-inner {
  max-width: 80rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 1024px) {
  .spotlight-inner {
    grid-template-columns: 3fr 2fr;
  }
}

.featured-card {
  position: relative;
  display: block;
  border-radius: 1.25rem;
  overflow: hidden;
  min-height: 26rem;
  text-decoration: none;
}

.featured-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.featured-card:hover .featured-img {
  transform: scale(1.04);
}

.featured-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  background: linear-gradient(
    180deg,
    rgba(6, 6, 18, 0.1) 0%,
    rgba(6, 6, 18, 0.75) 55%,
    rgba(6, 6, 18, 0.97) 100%
  );
}

.highlight-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #1a0f00;
  background: #f9b129;
  padding: 0.3rem 0.85rem;
  border-radius: 9999px;
  margin-bottom: 1rem;
  width: fit-content;
}

.featured-title {
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 800;
  color: white;
  line-height: 1.25;
  margin-bottom: 0.75rem;
  transition: color 0.2s ease;
}

.featured-card:hover .featured-title {
  color: #f9b129;
}

.featured-excerpt {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.65;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recent-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  align-content: start;
}

.recent-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 0.875rem;
  overflow: hidden;
  text-decoration: none;
  border: 2px solid transparent;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.recent-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(249, 177, 41, 0.15);
  border-color: #f9b129;
}

.recent-img-wrap {
  height: 8rem;
  overflow: hidden;
  flex-shrink: 0;
}

.recent-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.recent-card:hover .recent-img {
  transform: scale(1.05);
}

.recent-body {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0.875rem;
  gap: 0.4rem;
}

.recent-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s ease;
}

.recent-card:hover .recent-title {
  color: #f9b129;
}

.recent-excerpt {
  font-size: 0.72rem;
  color: #999;
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.recent-read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  font-weight: 700;
  color: #f9b129;
  margin-top: 0.25rem;
}

/* Platform sections */
.platforms-content {
  max-width: 80rem;
  margin: 0 auto;
  padding: 3rem 1rem 4rem;
}

.platform-block {
  margin-bottom: 4rem;
  padding-bottom: 4rem;
  border-bottom: 1px solid #f0f0f0;
}

.platform-block:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.platform-block-header {
  margin-bottom: 1.5rem;
}

.platform-block-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 0.4rem;
}

.platform-block-desc {
  font-size: 0.875rem;
  color: #888;
}

.platform-block-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 768px) {
  .platform-block-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .platform-block-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.platform-block-more {
  text-align: right;
  margin-top: 1.25rem;
}

.more-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #f9b129;
  text-decoration: none;
  transition: gap 0.2s ease;
}

.more-link:hover {
  gap: 0.5rem;
}

.platform-empty {
  text-align: center;
  padding: 3rem 0;
  color: #bbb;
  font-style: italic;
}
</style>
