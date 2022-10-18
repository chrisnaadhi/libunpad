<script setup>
const props = defineProps(["filePath"]);
const pdfViewer = ref();

useHead({
  script: [
    {
      src: "https://mozilla.github.io/pdf.js/build/pdf.js",
      body: false,
    },
  ],
});

onMounted(() => {
  const pdfjsLib = window["pdfjs-dist/build/pdf"];
});
</script>

<template>
  <div>
    <embed
      src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      width="720px"
      height="240px"
    />
  </div>
</template>
