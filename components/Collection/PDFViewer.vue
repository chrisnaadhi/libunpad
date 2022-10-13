<script setup>
const props = defineProps(["filePath"]);

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
