<script setup>
useHead({
  meta: [
    {
      name: "description",
      content:
        "Kandaga Library Situs Resmi Perpustakaan Universitas Padjadjaran yang menyediakan layanan informasi dan referensi bagi seluruh sivitas akademika Universitas Padjadjaran dan juga masyarakat umum.",
    },
    {
      property: "og:title",
      content:
        "Kandaga Library - Perpustakaan Universitas Padjadjaran | Kandaga Unpad",
    },
    {
      property: "og:description",
      content:
        "Situs GLAM (Gallery, Library, Archive & Museums) dari Kandaga Pusat Pengelolaan Pengetahuan Universitas Padjadjaran. Situs ini menjadi pintu pencarian dan penyajian koleksi yang dimiliki oleh Universitas Padjadjaran yang dapat diakses oleh seluruh kalangan masyarakat.",
    },
    {
      property: "og:image",
      content: "/images/kandaga-bg.webp",
    },
  ],
  title:
    "Kandaga Library - Perpustakaan Universitas Padjadjaran | Kandaga Unpad",
});

onMounted(() => {
  var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date();
  (function () {
    var s1 = document.createElement("script"),
      s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/659caafc8d261e1b5f50f7e0/1hjlvnreg";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
  })();
});
</script>

<template>
  <main class="main-wrapper">
    <NavigationBar />
    <section class="content" id="main-content">
      <ModalMobileMenu />
      <slot />
    </section>

    <section class="block transition-all-500 xl:hidden">
      <NavigationBottomBar />
    </section>

    <section class="footer" role="contentinfo">
      <FooterSection :show-list="true" />
    </section>
  </main>
</template>

<style scoped>
.main-wrapper {
  --at-apply: bg-white flex flex-col min-h-screen m-0;
}

.content {
  --at-apply: flex-1;
}

.locale-display {
  --at-apply: flex flex-col gap-2 p-2 my-2 rounded bg-orange-3 max-w-12 -translate-y-1;
}

.v-enter-active {
  --at-apply: transition-all-500 ease;
}

.v-leave-active {
  --at-apply: transition-all-800 ease-out opacity-2;
}

.v-enter-from,
.v-leave-to {
  --at-apply: transition-all-500 ease-out opacity-0 translate-y-2;
}

.locale-banner {
  --at-apply: bg-orange-3 text-sm text-white rounded px-2 ml-2 hidden;
}

.locale-flag {
  --at-apply: cursor-pointer;
}

.locale-flag:hover + .locale-banner {
  --at-apply: block -translate-y-1;
}

.footer {
  --at-apply: min-h-10 mb-16 xl:mb-0;
}
</style>
