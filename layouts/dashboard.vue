<script setup>
useHead({
  title: "Dashboard Kandaga",
});
</script>

<template>
  <main class="flex min-h-screen">
    <section class="vertical-menu">
      <div class="flex items-center justify-center gap-1 py-4">
        <img src="/images/lambang-unpad.png" class="w-7" alt="" />
        <h1 class="text-center text-2xl text-orange">Kandaga</h1>
      </div>

      <ul class="pl-2">
        <li class="icon-block">
          <NuxtLink to="/dashboard" class="flex">
            <div class="i-mdi-home-outline icon-item" />
            Dashboard
          </NuxtLink>
        </li>
        <li class="icon-block">
          <NuxtLink to="/dashboard/anggota" class="flex">
            <div class="i-mdi-account-group icon-item" />
            Anggota
          </NuxtLink>
        </li>
        <li class="icon-block">
          <NuxtLink to="/dashboard/pengajuan" class="flex">
            <div class="i-mdi-folder-arrow-up-down icon-item" />
            Pengajuan
          </NuxtLink>
        </li>
        <li class="icon-block">
          <NuxtLink to="/dashboard" class="flex">
            <div class="i-mdi-archive-star icon-item" />
            Menu Sana
          </NuxtLink>
        </li>
        <li class="icon-block">
          <NuxtLink to="/dashboard" class="flex">
            <div class="i-mdi-sword-cross icon-item" />
            Menu Sini
          </NuxtLink>
        </li>
      </ul>
      <ul>
        <li v-for="each in 50">{{ each }}</li>
      </ul>
    </section>
    <section class="relative w-full h-4xl ml-45">
      <slot />
    </section>
  </main>
</template>

<style scoped>
.vertical-menu {
  --at-apply: bg-gray-1 min-w-45 fixed overflow-y-auto top-0 bottom-0;
  scrollbar-width: none;
}

.vertical-menu::-webkit-scrollbar {
  display: none;
}

.icon-block {
  --at-apply: flex items-center my-5 transition-all-500 cursor-pointer hover:(text-orange);
}

.icon-item {
  --at-apply: bg-gray-4 mr-2;
}
</style>
