<script setup>
const data = ref("Tentang Kandaga");
</script>

<template>
  <main>
    <div class="page-hero">
      <div class="page-hero-glow" />
      <div class="relative z-1 text-center">
        <div class="section-badge">
          <div class="i-mdi-information-outline w-3.5 h-3.5" />
          Profil
        </div>
        <h1 class="page-hero-title">{{ data }}</h1>
      </div>
    </div>

    <div class="content-wrap">
      <p class="about-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
        eveniet a animi officia accusantium necessitatibus voluptate quas
        cupiditate sapiente velit, quaerat sint? Ut id deserunt assumenda
        inventore magni magnam! Perspiciatis, aut aperiam voluptates doloremque
        architecto vel tempore, accusamus sit eveniet dolorum fugiat et ipsam,
        asperiores sint debitis in excepturi! Distinctio!
      </p>
    </div>

    <div class="cards-wrap">
      <div class="cards-grid">
        <GenericBaseCard v-for="_ in 6" :key="_">
          <p class="card-placeholder">Hello, there!</p>
        </GenericBaseCard>
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
  margin-bottom: 0;
}

.content-wrap {
  max-width: 56rem;
  margin: 0 auto;
  padding: 3rem 1.5rem 2rem;
}

.about-text {
  font-size: 1rem;
  line-height: 1.9;
  color: #444;
  text-align: justify;
  font-style: italic;
}

.cards-wrap {
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
}

@media (min-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card-placeholder {
  padding: 2.5rem 0.5rem;
  text-align: center;
  font-style: italic;
  color: #888;
}
</style>
