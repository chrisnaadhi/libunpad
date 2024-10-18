<script setup>
import { ref } from "vue";

const { getItems } = useDirectusItems();

const val = ref("Frequently Asked Questions");
const faqs = ref(
  await getItems({
    collection: "kandaga_faq",
    params: {
      status: "published",
      sort: "date_created",
    },
  })
);

const activeIndex = ref(null);

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<template>
  <section class="text-center">
    <h2 class="pt-5">{{ val }}</h2>
    <p>Informasi terkait Pertanyaan yang sering diajukan atau {{ val }}</p>
    <div class="my-5 px-5">
      <div class="w-full max-w-4xl mx-auto">
        <div v-for="faq in faqs" class="mb-4">
          <div>
            <button
              @click="toggle(faq.id)"
              class="w-full text-left p-4 bg-orange text-white font-semibold rounded-t-lg focus:outline-none flex items-center justify-between"
            >
              <div>
                {{ faq.question }}
              </div>
              <div>
                <div v-if="activeIndex !== faq.id">&#11208;</div>
                <div v-else>&#11206;</div>
              </div>
            </button>
          </div>

          <transition name="faq">
            <div
              v-show="activeIndex === faq.id"
              class="p-4 bg-gray-100 rounded-b-lg"
            >
              {{ faq.answer }}
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  --at-apply: max-w-7xl ma pb-70;
}

.faq-enter-active,
.faq-leave-active {
  transition: opacity 0.5s;
}
.faq-enter-from,
.faq-leave-to {
  opacity: 0;
}
</style>
