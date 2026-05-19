<script setup>
const { locale } = useI18n();
const { getItems, getItemById } = useDirectusItems();
const config = useRuntimeConfig();

const getHighlight = await getItems({
  collection: "highlight_berita_depan",
});

const getBerita = await getItemById({
  collection: "artikel",
  id: getHighlight?.berita_highlight,
});

const getThumbnail = (id) => {
  return `${config.public.directus.url}assets/${id}`;
};

// Preload the LCP hero image so the browser discovers it early
useHead(
  computed(() => ({
    link: getBerita?.gambar_unggulan
      ? [
          {
            rel: "preload",
            as: "image",
            href: getThumbnail(getBerita.gambar_unggulan),
            fetchpriority: "high",
          },
        ]
      : [],
  })),
);
</script>

<template>
  <section class="hero-wrap">
    <!-- Background image — real img element so the browser preload scanner can discover it (LCP) -->
    <NuxtImg
      v-if="getBerita?.gambar_unggulan"
      :src="getThumbnail(getBerita.gambar_unggulan)"
      class="hero-bg-img"
      loading="eager"
      fetchpriority="high"
      width="1920"
      height="1080"
      format="webp"
      quality="80"
      alt=""
    />
    <!-- Dark gradient overlay -->
    <div class="hero-overlay" />
    <!-- Ambient glow accents -->
    <div class="hero-glow-tl" />
    <div class="hero-glow-br" />

    <!-- Main content -->
    <div class="hero-content">
      <!-- Institution badge -->
      <div class="hero-badge">
        <div class="i-mdi-school w-3.5 h-3.5" />
        Perpustakaan Universitas Padjadjaran
      </div>

      <!-- Title block -->
      <p class="hero-greeting">Selamat datang di</p>
      <h1 class="hero-title">KANDAGA</h1>
      <p class="hero-tagline">{{ $t("homeDescription") }}</p>

      <!-- Search bar -->
      <div class="hero-search-wrap">
        <GenericMainSearch />
        <div class="flex gap-3 mt-4 justify-center flex-wrap">
          <NuxtLink
            :to="locale === 'en' ? '/en/search' : '/search'"
            class="cta-primary"
          >
            {{ $t("searchPage") }}
          </NuxtLink>
          <NuxtLink
            :to="locale === 'en' ? '/en/koleksi' : '/koleksi'"
            class="cta-secondary"
          >
            {{ $t("ourCollection") }}
          </NuxtLink>
        </div>
      </div>

      <!-- Stats row -->
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-num">500K+</span>
          <span class="stat-label">Koleksi</span>
        </div>
        <span class="stat-sep" />
        <div class="stat">
          <span class="stat-num">10K+</span>
          <span class="stat-label">E-Journal</span>
        </div>
        <span class="stat-sep" />
        <div class="stat">
          <span class="stat-num">10+</span>
          <span class="stat-label">Database</span>
        </div>
        <span class="stat-sep" />
        <div class="stat">
          <span class="stat-num">24/7</span>
          <span class="stat-label">Akses Digital</span>
        </div>
      </div>
    </div>

    <!-- News ticker strip at the bottom -->
    <div v-if="getBerita" class="news-strip">
      <span class="strip-label">
        <div class="i-mdi-bullhorn w-4 h-4" />
        Berita Pilihan
      </span>
      <span class="strip-divider" />
      <NuxtLink :href="beritaType(getBerita)" class="strip-link">
        {{ getBerita.judul }}
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.hero-wrap {
  position: relative;
  width: 100%;
  min-height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.06);
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    160deg,
    rgba(6, 6, 18, 0.95) 0%,
    rgba(22, 15, 3, 0.88) 50%,
    rgba(6, 6, 18, 0.93) 100%
  );
}

.hero-glow-tl {
  position: absolute;
  top: -10rem;
  left: -10rem;
  width: 40rem;
  height: 40rem;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(249, 177, 41, 0.2) 0%,
    transparent 70%
  );
  z-index: 1;
  pointer-events: none;
}

.hero-glow-br {
  position: absolute;
  bottom: -8rem;
  right: -8rem;
  width: 32rem;
  height: 32rem;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(249, 177, 41, 0.12) 0%,
    transparent 70%
  );
  z-index: 1;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 56rem;
  padding: 6rem 1.5rem;
  animation: fadeUp 0.8s ease-out both;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #f9b129;
  background: rgba(249, 177, 41, 0.1);
  border: 1px solid rgba(249, 177, 41, 0.25);
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(8px);
  animation: fadeUp 0.8s 0.1s ease-out both;
}

.hero-greeting {
  color: rgba(255, 255, 255, 0.55);
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 400;
  margin-bottom: 0.25rem;
  animation: fadeUp 0.8s 0.15s ease-out both;
}

.hero-title {
  font-family: "Cormorant Garamond", Georgia, "Times New Roman", serif;
  font-size: clamp(4.5rem, 14vw, 11rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
  background: linear-gradient(135deg, #f9b129 0%, #ffe08a 40%, #f9b129 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 48px rgba(249, 177, 41, 0.45));
  animation: fadeUp 0.8s 0.2s ease-out both;
}

.hero-tagline {
  color: rgba(255, 255, 255, 0.48);
  font-size: clamp(0.85rem, 1.5vw, 1.1rem);
  max-width: 42rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  animation: fadeUp 0.8s 0.25s ease-out both;
}

.hero-search-wrap {
  width: 100%;
  max-width: 42rem;
  position: relative;
  z-index: 20;
  animation: fadeUp 0.8s 0.35s ease-out both;
}

.cta-primary {
  display: inline-block;
  background: #f9b129;
  color: #1a0f00;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(249, 177, 41, 0.45);
}

.cta-secondary {
  display: inline-block;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  text-decoration: none;
  backdrop-filter: blur(8px);
  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.cta-secondary:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.15);
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 3.5rem;
  animation: fadeUp 0.8s 0.45s ease-out both;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-num {
  font-size: 1.75rem;
  font-weight: 900;
  color: #f9b129;
  line-height: 1;
}

.stat-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.38);
  margin-top: 0.3rem;
}

.stat-sep {
  display: block;
  width: 1px;
  height: 2.5rem;
  background: rgba(255, 255, 255, 0.12);
}

@media (max-width: 480px) {
  .stat-sep {
    display: none;
  }
}

.news-strip {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1.5rem;
  background: rgba(249, 177, 41, 0.95);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.strip-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 800;
  font-size: 0.7rem;
  color: #1a0f00;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
  flex-shrink: 0;
}

.strip-divider {
  display: block;
  width: 1px;
  height: 1.25rem;
  background: rgba(26, 15, 0, 0.2);
  flex-shrink: 0;
}

.strip-link {
  color: #1a0f00;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.strip-link:hover {
  text-decoration: underline;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
