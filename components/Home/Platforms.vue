<script setup>
const { locale } = useI18n();
</script>

<template>
  <section class="platforms-wrap">
    <!-- Subtle background texture -->
    <div class="platforms-bg" />

    <!-- Section header -->
    <div class="relative z-1 text-center max-w-2xl mx-auto mb-12 px-4">
      <div class="section-badge">
        <div class="i-mdi-view-grid w-3.5 h-3.5" />
        Platform Kami
      </div>
      <h2 class="section-title">{{ $t("usingPlatform") }}</h2>
      <p class="text-gray-500 text-sm sm:text-base">
        {{ $t("usingPlatformDescription") }}
      </p>
    </div>

    <!-- Main platforms grid -->
    <div class="relative z-1 max-w-6xl mx-auto px-4 mb-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <NuxtLink :to="locale === 'id' ? '/library' : '/en/library'" class="platform-card">
        <div class="platform-icon-bg">
          <div class="i-mdi-bookshelf w-8 h-8" />
        </div>
        <div>
          <h3 class="platform-name">Library</h3>
          <p class="platform-desc">{{ $t("libraryDescription") }}</p>
        </div>
        <div class="platform-arrow i-mdi-arrow-right-circle w-5 h-5" />
      </NuxtLink>

      <NuxtLink :to="locale === 'id' ? '/koleksi/repository' : '/en/koleksi/repository'" class="platform-card">
        <div class="platform-icon-bg">
          <div class="i-mdi-book-education w-8 h-8" />
        </div>
        <div>
          <h3 class="platform-name">Repository</h3>
          <p class="platform-desc">{{ $t("repositoryDescription") }}</p>
        </div>
        <div class="platform-arrow i-mdi-arrow-right-circle w-5 h-5" />
      </NuxtLink>

      <NuxtLink :to="locale === 'id' ? '/lens' : '/en/lens'
        " class="platform-card">
        <div class="platform-icon-bg">
          <div class="i-mdi-archive-sync w-8 h-8" />
        </div>
        <div>
          <h3 class="platform-name">Kandaga Lens</h3>
          <p class="platform-desc">{{ $t("lensDescription") }}</p>
        </div>
        <div class="platform-arrow i-mdi-arrow-right-circle w-5 h-5" />
      </NuxtLink>

      <NuxtLink :to="locale === 'id' ? '/kandaga' : '/en/kandaga/fasilitas'" class="platform-card">
        <div class="platform-icon-bg">
          <div class="i-mdi-bank w-8 h-8" />
        </div>
        <div>
          <h3 class="platform-name">Fasilitas</h3>
          <p class="platform-desc">{{ $t("facilityDescription") }}</p>
        </div>
        <div class="platform-arrow i-mdi-arrow-right-circle w-5 h-5" />
      </NuxtLink>
    </div>

    <!-- Secondary services row -->
    <div class="relative z-1 max-w-6xl mx-auto px-4 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
      <NuxtLink :to="locale === 'id' ? '/gallery' : '/en/gallery'" class="extra-card">
        <div class="i-mdi-image-multiple w-5 h-5" />
        <span>Gallery</span>
      </NuxtLink>
      <NuxtLink :to="locale === 'id' ? '/museum' : '/en/museum'" class="extra-card">
        <div class="i-mdi-bank w-5 h-5" />
        <span>Museum</span>
      </NuxtLink>
      <NuxtLink :to="locale === 'id' ? '/koleksi-hayati' : '/en/koleksi-hayati'" class="extra-card">
        <div class="i-mdi-leaf w-5 h-5" />
        <span>Koleksi Hayati</span>
      </NuxtLink>
      <NuxtLink to="/e-teater" class="extra-card">
        <div class="i-mdi-theater w-5 h-5" />
        <span>E-Teater</span>
      </NuxtLink>
    </div>

    <!-- Admin services banner -->
    <div class="relative z-1 max-w-6xl mx-auto px-4">
      <NuxtLink to="/pengajuan" class="admin-banner">
        <div class="admin-icon-wrap">
          <div class="i-mdi-file-document-edit w-6 h-6" />
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="font-700 text-base">
            Library, Learning & Administration Services
          </h4>
          <p class="text-sm opacity-60 mt-1">
            Ajukan layanan administrasi perpustakaan secara online
          </p>
        </div>
        <div class="i-mdi-chevron-right w-6 h-6 opacity-60 shrink-0" />
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.platforms-wrap {
  position: relative;
  padding: 5rem 0;
  background: #fafafa;
}

.platforms-bg {
  position: absolute;
  inset: 0;
  background-image: url("/images/background-platform.webp");
  background-position: center;
  background-size: cover;
  opacity: 0.04;
  z-index: 0;
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
  margin-bottom: 1rem;
}

.section-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
}

.platform-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  border: 2px solid #f0f0f0;
  border-radius: 1.25rem;
  padding: 1.5rem;
  text-decoration: none;
  color: #1a1a1a;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.platform-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(249, 177, 41, 0.18);
  border-color: #f9b129;
}

.platform-icon-bg {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.875rem;
  background: rgba(249, 177, 41, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f9b129;
  transition:
    background 0.25s ease,
    color 0.25s ease;
}

.platform-card:hover .platform-icon-bg {
  background: #f9b129;
  color: white;
}

.platform-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.375rem;
}

.platform-desc {
  font-size: 0.75rem;
  color: #888;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.platform-arrow {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  color: #ddd;
  transition:
    color 0.25s ease,
    transform 0.25s ease;
}

.platform-card:hover .platform-arrow {
  color: #f9b129;
  transform: translateX(3px);
}

.extra-card {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  background: white;
  border: 1.5px solid #ebebeb;
  border-radius: 0.875rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #444;
  font-weight: 600;
  font-size: 0.875rem;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.extra-card:hover {
  background: #1a1a2e;
  color: white;
  border-color: #1a1a2e;
  transform: translateY(-2px);
}

.admin-banner {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #1a1a2e;
  color: white;
  border-radius: 1.25rem;
  padding: 1.25rem 1.5rem;
  text-decoration: none;
  transition:
    background 0.25s ease,
    transform 0.25s ease;
}

.admin-banner:hover {
  background: #f9b129;
  color: #1a0f00;
  transform: translateY(-2px);
}

.admin-icon-wrap {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.625rem;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background 0.25s ease;
}

.admin-banner:hover .admin-icon-wrap {
  background: rgba(26, 15, 0, 0.12);
}
</style>
