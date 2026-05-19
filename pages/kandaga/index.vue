<script setup>
const val = ref("Kandaga");
</script>

<template>
  <main>
    <div class="page-hero">
      <div class="page-hero-glow" />
      <div class="relative z-1 text-center">
        <div class="section-badge">
          <div class="i-mdi-home-city w-3.5 h-3.5" />
          Tentang
        </div>
        <h1 class="page-hero-title">{{ val }}</h1>
        <p class="page-hero-desc">
          Portal sumber informasi dan layanan bagi seluruh civitas academica
          Unpad
        </p>
      </div>
    </div>

    <div class="content-wrap">
      <p class="about-text">
        Kandaga Universitas Padjadjaran (Unpad) merupakan portal yang
        menyediakan berbagai sumber informasi dan layanan bagi seluruh civitas
        academica Unpad, termasuk mahasiswa, dosen, tenaga kependidikan, dan
        alumni. Kandaga dikelola oleh Kantor Pengelolaan Perpustakaan Unpad dan
        menjadi portal resmi Perpustakaan Pusat Unpad. Kandaga Unpad merupakan
        portal sumber informasi bagi seluruh civitas akademika Unpad maupun
        masyarakat diluar Unpad. Kandaga membantu mahasiswa, dosen, dan tenaga
        kependidikan untuk mengakses informasi, meningkatkan kualitas penelitian
        dan pendidikan, meningkatkan efisiensi dan efektivitas kerja, serta
        meningkatkan kolaborasi dalam ranah penelitian dan pengabdian kepada
        masyarakat.
      </p>
    </div>

    <div class="functions-wrap">
      <div class="text-center mb-10">
        <div class="section-badge" style="display: inline-flex">
          <div class="i-mdi-star-four-points w-3.5 h-3.5" />
          Fungsi Utama
        </div>
        <h2 class="functions-title">Fungsi Utama Kandaga</h2>
      </div>
      <div class="functions-grid">
        <div class="function-card">
          <div class="function-icon">
            <div class="i-mdi-accelerometer w-8 h-8" />
          </div>
          <h5 class="function-name">Akses ke sumber informasi</h5>
          <p class="function-desc">
            Kandaga menyediakan akses ke koleksi buku, jurnal ilmiah, artikel
            berita, skripsi, tesis, dan karya ilmiah lainnya yang dihasilkan
            oleh sivitas akademika Unpad.
          </p>
        </div>
        <div class="function-card">
          <div class="function-icon">
            <div class="i-mdi-folder-search w-8 h-8" />
          </div>
          <h5 class="function-name">Penelusuran Informasi</h5>
          <p class="function-desc">
            Kandaga menawarkan fitur penelusuran yang dapat membantu pengguna
            menemukan informasi yang mereka butuhkan dengan cepat dan mudah.
          </p>
        </div>
        <div class="function-card">
          <div class="function-icon">
            <div class="i-mdi-book-alphabet w-8 h-8" />
          </div>
          <h5 class="function-name">Menyediakan layanan digital</h5>
          <p class="function-desc">
            Kandaga menyediakan berbagai layanan digital, seperti peminjaman
            buku elektronik (e-book), akses ke jurnal elektronik (e-journal),
            dan layanan referensi virtual.
          </p>
        </div>
        <div class="function-card">
          <div class="function-icon">
            <div class="i-mdi-home-city w-8 h-8" />
          </div>
          <h5 class="function-name">Menjadi ruang kolaborasi</h5>
          <p class="function-desc">
            Kandaga menyediakan platform bagi sivitas akademika Unpad untuk
            berkolaborasi dalam lingkup pendidikan, penelitian dan pengabdian
            kepada masyarakat.
          </p>
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
}

.content-wrap {
  max-width: 56rem;
  margin: 0 auto;
  padding: 3rem 1.5rem 0;
}

.about-text {
  font-size: 1rem;
  line-height: 1.9;
  color: #444;
  text-align: justify;
}

.functions-wrap {
  max-width: 80rem;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}

.functions-title {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 0;
}

.functions-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .functions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .functions-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.function-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: white;
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  border: 2px solid transparent;
  gap: 0.75rem;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.function-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 28px rgba(249, 177, 41, 0.14);
  border-color: #f9b129;
}

.function-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.875rem;
  background: rgba(249, 177, 41, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f9b129;
  flex-shrink: 0;
}

.function-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1a1a;
}

.function-desc {
  font-size: 0.78rem;
  color: #777;
  line-height: 1.7;
  text-align: justify;
}
</style>
