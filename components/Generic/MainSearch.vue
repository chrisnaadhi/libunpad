<script setup>
const defaultFacet = ref("main");

const chooseFacet = (name) => {
  defaultFacet.value = name;
};

const facets = [
  { key: "main", label: "Pencarian", icon: "i-mdi-magnify" },
  { key: "gallery", label: "Gallery", icon: "i-mdi-image-multiple" },
  { key: "library", label: "Library", icon: "i-mdi-bookshelf" },
  { key: "archive", label: "Archive", icon: "i-mdi-archive" },
  { key: "museum", label: "Museum", icon: "i-mdi-bank" },
];
</script>

<template>
  <div class="search-container">
    <!-- Tab pills -->
    <div class="search-tabs">
      <button
        v-for="facet in facets"
        :key="facet.key"
        class="tab-pill"
        :class="defaultFacet === facet.key ? 'tab-active' : 'tab-inactive'"
        @click="chooseFacet(facet.key)"
      >
        <div :class="facet.icon + ' w-3.5 h-3.5 shrink-0'" />
        <span>{{ facet.label }}</span>
      </button>
    </div>

    <!-- Search form area -->
    <div class="search-body">
      <Transition name="slide-up" mode="out-in">
        <div v-if="defaultFacet === 'main'" key="main">
          <GenericSearch />
        </div>
        <div v-else-if="defaultFacet === 'library'" key="library">
          <GenericLibrarySearch />
        </div>
        <div v-else-if="defaultFacet === 'gallery'" key="gallery">
          <GenericGallerySearch />
        </div>
        <div v-else-if="defaultFacet === 'archive'" key="archive">
          <GenericArchiveSearch />
        </div>
        <div v-else-if="defaultFacet === 'museum'" key="museum">
          <GenericMuseumSearch />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  position: relative;
  z-index: 50;
  width: 100%;
  border-radius: 1.25rem;
  overflow: visible;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.search-tabs {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 0.625rem 0.625rem 0;
  gap: 0.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.search-tabs::-webkit-scrollbar {
  display: none;
}

.tab-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 1rem;
  border-radius: 0.5rem 0.5rem 0 0;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
  border: none;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;
  flex-shrink: 0;
  letter-spacing: 0.02em;
}

.tab-active {
  background: rgba(249, 177, 41, 0.92);
  color: #1a0f00;
}

.tab-inactive {
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
}

.tab-inactive:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.85);
}

.search-body {
  padding: 0.875rem;
}

/* Override child input styling for the dark hero context */
:deep(.input-form) {
  background: rgba(255, 255, 255, 0.1);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 0.625rem;
}

:deep(.input-form::placeholder) {
  color: rgba(255, 255, 255, 0.4);
}

:deep(.input-form:focus) {
  background: rgba(255, 255, 255, 0.15);
  border-color: #f9b129;
  box-shadow: 0 0 0 3px rgba(249, 177, 41, 0.18);
  outline: none;
}

/* Override the submit button */
:deep(button[type="submit"]) {
  background: #f9b129;
  color: #1a0f00;
  font-weight: 700;
  border-radius: 0.5rem;
  border: none;
}

:deep(button[type="submit"]:hover) {
  background: #ffc84a;
}

/* Override dropdown result cards to match dark theme */
:deep(.content-result) {
  background: rgba(14, 12, 6, 0.96);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(249, 177, 41, 0.2);
  color: rgba(255, 255, 255, 0.85);
  border-radius: 0.75rem;
}

:deep(.content-result a),
:deep(.result-element a) {
  color: rgba(255, 255, 255, 0.85);
}

:deep(.content-result a:hover),
:deep(.result-element a:hover) {
  color: #f9b129;
}

:deep(.bg-orange-1) {
  background: rgba(249, 177, 41, 0.12);
  color: rgba(255, 255, 255, 0.6);
}

/* Library/Gallery/Archive/Museum inline dropdowns */
:deep(.bg-white.rounded-xl) {
  background: rgba(14, 12, 6, 0.96) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.85);
}

.slide-up-enter-active {
  transition:
    opacity 0.18s ease-out,
    transform 0.18s ease-out;
  transition-delay: 0.05s;
}

.slide-up-leave-active {
  transition:
    opacity 0.12s ease-in,
    transform 0.12s ease-in;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
