<template>
  <div
    class="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-100"
  >
    <div class="container mx-auto px-4 py-16 md:py-24">
      <!-- Did You Mean Section -->
      <div class="max-w-4xl mx-auto text-center mb-20">
        <div class="mb-8 animate-bounce-slow">
          <div
            class="i-mdi-help-circle-outline w-24 h-24 mx-auto text-kandaga opacity-80"
          />
        </div>

        <h1 class="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          {{ $t("coursesDidYouMean") }}
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-unpad to-gray-700"
          >
            {{ $t("coursesPostgradAcademy") }}
          </span>
          ?
        </h1>

        <p class="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {{ $t("coursesPostgradDescription") }}
        </p>

        <NuxtLink
          to="/postgradacademy"
          class="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-unpad to-gray-700 text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 transform"
        >
          <span>{{ $t("coursesYesTakeMeThere") }}</span>
          <div class="i-mdi-arrow-right w-6 h-6" />
        </NuxtLink>
      </div>

      <!-- Divider -->
      <div class="max-w-4xl mx-auto mb-20">
        <div class="flex items-center gap-4">
          <div
            class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
          ></div>
          <span class="text-gray-400 font-medium">{{ $t("coursesOr") }}</span>
          <div
            class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
          ></div>
        </div>
      </div>

      <!-- Luhung Section -->
      <div class="max-w-5xl mx-auto">
        <div
          class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
        >
          <div class="grid md:grid-cols-2 gap-0">
            <!-- Left Side - Content -->
            <div
              class="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-orange-50"
            >
              <div class="mb-6">
                <span
                  class="inline-block px-4 py-1 bg-orange-100 text-kandaga rounded-full text-sm font-semibold mb-4"
                >
                  {{ $t("coursesLearningPlatform") }}
                </span>
                <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {{ $t("coursesDiscoverLuhung") }}
                  <span class="text-kandaga">Luhung</span>
                </h2>
                <p class="text-gray-600 text-lg mb-6 leading-relaxed">
                  {{ $t("coursesLuhungDescription") }}
                </p>
              </div>

              <div class="space-y-4 mb-8">
                <div class="flex items-start gap-3">
                  <div
                    class="i-mdi-check-circle w-6 h-6 text-green-500 flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 class="font-semibold text-gray-800">
                      {{ $t("coursesDiverseCatalog") }}
                    </h3>
                    <p class="text-gray-600 text-sm">
                      {{ $t("coursesDiverseCatalogDesc") }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div
                    class="i-mdi-check-circle w-6 h-6 text-green-500 flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 class="font-semibold text-gray-800">
                      {{ $t("coursesFlexibleLearning") }}
                    </h3>
                    <p class="text-gray-600 text-sm">
                      {{ $t("coursesFlexibleLearningDesc") }}
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <div
                    class="i-mdi-check-circle w-6 h-6 text-green-500 flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 class="font-semibold text-gray-800">
                      {{ $t("coursesExpertInstructors") }}
                    </h3>
                    <p class="text-gray-600 text-sm">
                      {{ $t("coursesExpertInstructorsDesc") }}
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="https://luhung.unpad.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-3 px-8 py-4 bg-kandaga text-white font-semibold rounded-xl hover:bg-unpad hover:shadow-xl transition-all duration-300 group w-fit"
              >
                <span>{{ $t("coursesExploreLuhung") }}</span>
                <div
                  class="i-mdi-open-in-new w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
              </a>
            </div>

            <!-- Right Side - Logo & Visual -->
            <div
              class="relative p-8 md:p-12 flex items-center justify-center bg-gradient-to-br from-unpad to-gray-700"
            >
              <div class="absolute inset-0 opacity-10">
                <div
                  class="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"
                ></div>
                <div
                  class="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"
                ></div>
              </div>

              <div class="relative z-10 text-center">
                <div
                  class="bg-white rounded-2xl p-8 shadow-2xl mb-6 transform hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src="https://luhung.unpad.ac.id/wp-content/uploads/2025/05/logo-luhung.png"
                    alt="Luhung Unpad Logo"
                    class="w-full max-w-xs mx-auto"
                    loading="lazy"
                  />
                </div>
                <div class="text-white">
                  <h3 class="text-2xl font-bold mb-2">
                    {{ $t("coursesLuhungUnpad") }}
                  </h3>
                  <p class="text-orange-100">
                    {{ $t("coursesLuhungTagline") }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Info Cards -->
        <div class="grid md:grid-cols-3 gap-6 mt-12">
          <div
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div
              class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4"
            >
              <div class="i-mdi-book-open-page-variant w-6 h-6 text-kandaga" />
            </div>
            <h3 class="font-bold text-gray-800 mb-2">
              {{ $t("coursesOnlineCourses") }}
            </h3>
            <p class="text-gray-600 text-sm">
              {{ $t("coursesOnlineCoursesDesc") }}
            </p>
          </div>

          <div
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div
              class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4"
            >
              <div class="i-mdi-certificate w-6 h-6 text-unpad" />
            </div>
            <h3 class="font-bold text-gray-800 mb-2">
              {{ $t("coursesCertifications") }}
            </h3>
            <p class="text-gray-600 text-sm">
              {{ $t("coursesCertificationsDesc") }}
            </p>
          </div>

          <div
            class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div
              class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4"
            >
              <div class="i-mdi-account-group w-6 h-6 text-gray-700" />
            </div>
            <h3 class="font-bold text-gray-800 mb-2">
              {{ $t("coursesCommunity") }}
            </h3>
            <p class="text-gray-600 text-sm">
              {{ $t("coursesCommunityDesc") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
  title: "Courses - Universitas Padjadjaran",
});

useSeoMeta({
  title: "Courses - Universitas Padjadjaran",
  description:
    "Explore postgraduate programs at Postgrad Academy or discover online courses at Luhung Universitas Padjadjaran",
  ogTitle: "Courses - Universitas Padjadjaran",
  ogDescription: "Your gateway to academic excellence and lifelong learning",
});
</script>

<style scoped>
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}
</style>
