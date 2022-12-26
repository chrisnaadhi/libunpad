<script setup></script>

<template>
  <section class="menu-bar">
    <div class="menu-element">
      <div class="i-mdi-home bg-orange w-6 h-6" />
      <NuxtLink to="/">
        <p>Beranda</p>
      </NuxtLink>
    </div>
    <div class="menu-element">
      <div class="i-mdi-book-sync bg-orange w-6 h-6" />
      <NuxtLink to="/pengajuan">
        <p>Layanan</p>
      </NuxtLink>
    </div>
    <div class="middle-menu">
      <NuxtLink to="/search">
        <img
          src="/images/lambang-unpad.png"
          class="unpad-icon"
          alt="Logo Unpad"
        />
      </NuxtLink>
    </div>
    <div class="menu-element">
      <div class="i-mdi-newspaper-variant-multiple bg-orange w-6 h-6" />
      <NuxtLink to="/">
        <p>Berita</p>
      </NuxtLink>
    </div>
    <div class="menu-element">
      <div class="i-mdi-help-box-multiple bg-orange w-6 h-6" />
      <NuxtLink to="/">
        <p>Bantuan</p>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.menu-bar {
  --at-apply: flex justify-evenly w-full fixed bottom-0 py-2 bg-gray-50 z-3;
}

.menu-element {
  --at-apply: flex flex-col items-center cursor-pointer;
}

.unpad-icon {
  --at-apply: w-20 h-20 bg-white p-3 mt--10 rounded-full cursor-pointer;
}

p {
  --at-apply: text-xs;
}
</style>
