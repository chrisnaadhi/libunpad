<script setup>
const val = ref("Fasilitas Kandaga");

const { getItems } = useDirectusItems();

const getFasilitasKandaga = await getItems({
  collection: "fasilitas_kandaga",
  params: {
    filter: {
      status: "published",
    },
    sort: "-date_created",
  },
});
</script>

<template>
  <main>
    <div class="page-hero">
      <div class="page-hero-glow" />
      <div class="relative z-1 text-center">
        <div class="section-badge">
          <div class="i-mdi-floor-plan w-3.5 h-3.5" />
          Kandaga
        </div>
        <h1 class="page-hero-title">{{ val }}</h1>
        <p class="page-hero-desc">
          Informasi mengenai Fasilitas yang tersedia di Kandaga
        </p>
      </div>
    </div>

    <div class="content-wrap">
      <div class="facility-grid">
        <div
          v-for="facility in getFasilitasKandaga"
          :key="facility.id"
          class="facility-card"
        >
          <div class="facility-img-wrap">
            <NuxtImg
              :src="directusImageUrl(facility.foto_fasilitas)"
              class="facility-img"
              format="webp"
              quality="50"
            />
            <div class="facility-img-overlay">
              <p class="facility-desc">{{ facility.deskripsi }}</p>
            </div>
          </div>
          <div class="facility-info">
            <h4 class="facility-name">{{ facility.nama_fasilitas }}</h4>
            <p class="facility-floor">
              <span class="i-mdi-layers w-3.5 h-3.5" />
              Lantai {{ facility.lantai }} Gd. Kandaga
            </p>
          </div>
        </div>
      </div>
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
  font-style: italic;
}

.content-wrap {
  max-width: 80rem;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}

.facility-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .facility-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .facility-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.facility-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
  border: 2px solid transparent;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.facility-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(249, 177, 41, 0.15);
  border-color: #f9b129;
}

.facility-img-wrap {
  position: relative;
  width: 100%;
  height: 14rem;
  overflow: hidden;
}

.facility-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.facility-card:hover .facility-img {
  transform: scale(1.05);
}

.facility-img-overlay {
  position: absolute;
  inset: 0;
  background: rgba(6, 6, 14, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  opacity: 0;
  transition: opacity 0.35s ease;
}

.facility-card:hover .facility-img-overlay {
  opacity: 1;
}

.facility-desc {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.82rem;
  line-height: 1.65;
  text-align: center;
  font-style: italic;
}

.facility-info {
  padding: 1rem 1.25rem 1.25rem;
  text-align: center;
}

.facility-name {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.35rem;
}

.facility-floor {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  color: #999;
  font-style: italic;
}
</style>
