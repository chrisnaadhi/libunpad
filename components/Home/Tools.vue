<script setup lang="ts">
const { locale } = useI18n();
const { data: tools } = await useFetch("/api/v1/tools");
</script>

<template>
  <section class="tools-section">
    <!-- Section header -->
    <div class="tools-header">
      <div class="section-badge">
        <div class="i-mdi-toolbox w-3.5 h-3.5" />
        Tools & Layanan
      </div>
      <h2 class="tools-title">{{ $t("toolsHomeTitle") }}</h2>
      <p class="tools-desc">{{ $t("toolsHomeDescription") }}</p>
    </div>

    <!-- Tools grid -->
    <div class="tools-grid">
      <NuxtLink
        v-for="tool in tools"
        :key="tool.slug"
        :to="tool.slug"
        class="tool-card"
      >
        <div class="tool-icon-strip">
          <div :class="tool.icon + ' w-7 h-7'" />
        </div>
        <div class="tool-body">
          <template v-if="locale === 'id'">
            <h3 class="tool-name">{{ tool.namaTools }}</h3>
            <p class="tool-desc">{{ tool.deskripsi }}</p>
          </template>
          <template v-else-if="locale === 'en'">
            <h3 class="tool-name">{{ tool.namaToolsEN }}</h3>
            <p class="tool-desc">{{ tool.deskripsiEN }}</p>
          </template>
          <template v-else>
            <p class="tool-desc">Format bahasa belum tersedia.</p>
          </template>
          <span class="tool-cta">
            {{ locale === "en" ? "View" : "Lihat" }}
            <span class="i-mdi-arrow-right w-3.5 h-3.5" />
          </span>
        </div>
      </NuxtLink>
    </div>

    <!-- Footer link -->
    <div class="text-center mt-10">
      <NuxtLink to="/panduan" class="tools-more-link">
        Lihat selengkapnya layanan yang dapat membantu keperluan akademik anda
        <span class="i-mdi-arrow-right w-4 h-4" />
      </NuxtLink>
    </div>

    <!-- Hidden icon preload -->
    <div class="hidden">
      <div class="i-mdi-pencil" />
      <div class="i-mdi-spanner" />
      <div class="i-mdi-books" />
      <div class="i-mdi-settings" />
    </div>
  </section>
</template>

<style scoped>
.tools-section {
  --at-apply: max-w-7xl mx-auto px-4 py-16;
}

.tools-header {
  --at-apply: text-center max-w-2xl mx-auto mb-12;
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

.tools-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
}

.tools-desc {
  --at-apply: text-gray-500 text-sm sm: text-base;
}

.tools-grid {
  --at-apply: grid grid-cols-1 sm: grid-cols-2 lg: grid-cols-4 gap-5;
}

.tool-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 1.25rem;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.06);
  border: 2px solid transparent;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.tool-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(249, 177, 41, 0.2);
  border-color: #f9b129;
}

.tool-icon-strip {
  background: linear-gradient(135deg, #f9b129 0%, #ffd060 100%);
  color: #1a0f00;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.tool-body {
  --at-apply: flex flex-col flex-1 px-4 py-4 gap-2;
}

.tool-name {
  --at-apply: font-700 text-base text-gray-800;
}

.tool-desc {
  --at-apply: text-xs text-gray-500 leading-relaxed flex-1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tool-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #f9b129;
  margin-top: 0.5rem;
  transition: gap 0.2s ease;
}

.tool-card:hover .tool-cta {
  gap: 0.4rem;
}

.tools-more-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  color: #666;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.tools-more-link:hover {
  color: #f9b129;
}
</style>
