<template>
  <form action="">
    <div class="flex mb-5 mt-2">
      <div class="relative">
        <div class="absolute top-4 left-3">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-orange-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          class="w-full md:w-180 xl:w-160 h-14 pl-10 pr-20 border-1 border-orange-5 rounded-lg focus:(shadow-md outline-none)"
        />
        <div class="absolute top-2 right-2">
          <button class="btn bg-orange-500 text-white">Search</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped></style>
