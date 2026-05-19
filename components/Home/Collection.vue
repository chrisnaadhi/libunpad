<script setup>
const { t } = useI18n();
</script>

<template>
  <section class="collection-section">
    <!-- Header -->
    <div class="collection-header">
      <div class="section-badge">
        <div class="i-mdi-archive w-3.5 h-3.5" />
        Koleksi Kami
      </div>
      <h2 class="collection-title">{{ $t("exploreOurCollection") }}</h2>
    </div>

    <!-- 2×2 collection grid -->
    <div class="collection-grid">
      <article class="collection-card">
        <NuxtImg
          src="/images/museum.jpg"
          class="collection-img"
          loading="lazy"
          width="800"
          height="600"
          format="webp"
          quality="80"
          alt=""
        />
        <div class="collection-overlay collection-overlay-1">
          <h3 class="collection-name">{{ $t("exploreCollectionItem1") }}</h3>
          <div class="collection-cta-label">
            <span>Jelajahi</span>
            <span class="i-mdi-arrow-right w-4 h-4" />
          </div>
        </div>
      </article>

      <article class="collection-card">
        <NuxtImg
          src="/images/museum.jpg"
          class="collection-img"
          loading="lazy"
          width="800"
          height="600"
          format="webp"
          quality="80"
          alt=""
        />
        <div class="collection-overlay collection-overlay-2">
          <h3 class="collection-name">{{ $t("exploreCollectionItem2") }}</h3>
          <div class="collection-cta-label">
            <span>Jelajahi</span>
            <span class="i-mdi-arrow-right w-4 h-4" />
          </div>
        </div>
      </article>

      <article class="collection-card">
        <NuxtImg
          src="/images/museum.jpg"
          class="collection-img"
          loading="lazy"
          width="800"
          height="600"
          format="webp"
          quality="80"
          alt=""
        />
        <div class="collection-overlay collection-overlay-3">
          <h3 class="collection-name">{{ $t("exploreCollectionItem3") }}</h3>
          <div class="collection-cta-label">
            <span>Jelajahi</span>
            <span class="i-mdi-arrow-right w-4 h-4" />
          </div>
        </div>
      </article>

      <article class="collection-card">
        <NuxtImg
          src="/images/museum.jpg"
          class="collection-img"
          loading="lazy"
          width="800"
          height="600"
          format="webp"
          quality="80"
          alt=""
        />
        <div class="collection-overlay collection-overlay-4">
          <h3 class="collection-name">{{ $t("exploreCollectionItem4") }}</h3>
          <div class="collection-cta-label">
            <span>Jelajahi</span>
            <span class="i-mdi-arrow-right w-4 h-4" />
          </div>
        </div>
      </article>
    </div>

    <!-- CTA -->
    <div class="text-center mt-8">
      <NuxtLink to="/search" class="explore-btn">
        {{ $t("exploreAllCollections") }}
        <span class="i-mdi-arrow-right w-4 h-4" />
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.collection-section {
  padding: 4rem 0 5rem;
  background: #f5f5f7;
}

.collection-header {
  --at-apply: text-center max-w-2xl mx-auto mb-10 px-4;
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

.collection-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #1a1a1a;
}

.collection-grid {
  --at-apply: max-w-6xl mx-auto px-4 grid grid-cols-1 sm: grid-cols-2 gap-4;
}

.collection-card {
  position: relative;
  height: 16rem;
  border-radius: 1.125rem;
  overflow: hidden;
  cursor: pointer;
}

@media (min-width: 640px) {
  .collection-card {
    height: 18rem;
  }
}

.collection-card:hover .collection-img {
  transform: scale(1.06);
}

.collection-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.collection-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 1.5rem;
  transition: background 0.35s ease;
}

.collection-overlay-1 {
  background: linear-gradient(
    160deg,
    rgba(12, 8, 3, 0.55) 0%,
    rgba(249, 177, 41, 0.12) 40%,
    rgba(6, 4, 1, 0.9) 100%
  );
}
.collection-overlay-2 {
  background: linear-gradient(
    160deg,
    rgba(3, 8, 20, 0.55) 0%,
    rgba(10, 40, 80, 0.1) 40%,
    rgba(2, 5, 15, 0.9) 100%
  );
}
.collection-overlay-3 {
  background: linear-gradient(
    160deg,
    rgba(15, 3, 3, 0.55) 0%,
    rgba(60, 10, 10, 0.1) 40%,
    rgba(10, 2, 2, 0.9) 100%
  );
}
.collection-overlay-4 {
  background: linear-gradient(
    160deg,
    rgba(3, 15, 3, 0.55) 0%,
    rgba(10, 50, 10, 0.1) 40%,
    rgba(2, 10, 2, 0.9) 100%
  );
}

.collection-card:hover .collection-overlay {
  background: linear-gradient(
    160deg,
    rgba(249, 177, 41, 0.35) 0%,
    rgba(8, 6, 2, 0.88) 100%
  );
}

.collection-name {
  font-size: 1.375rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.75rem;
  line-height: 1.2;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.collection-cta-label {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #f9b129;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.collection-card:hover .collection-cta-label {
  opacity: 1;
  transform: translateY(0);
}

.explore-btn {
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

.explore-btn:hover {
  background: #f9b129;
  color: #1a0f00;
  transform: translateY(-2px);
}
</style>
