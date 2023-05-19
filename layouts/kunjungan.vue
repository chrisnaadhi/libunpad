<script setup>
useHead({
  title: "Visitor Kandaga | Universitas Padjadjaran",
});
</script>

<template>
  <main class="main-wrapper">
    <section class="content">
      <slot />
    </section>

    <section class="footer">
      <FooterSection :show-list="false" />
    </section>
  </main>
</template>

<style scoped>
.main-wrapper {
  background-image: url("/images/background-image-visitor.png");
  background-position: center;
  background-size: cover;
  --at-apply: bg-gray-50 flex flex-col min-h-screen;
}

.content {
  --at-apply: flex-1;
}

.footer {
  --at-apply: min-h-10;
}
</style>
