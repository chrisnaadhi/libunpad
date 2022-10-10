<template>
  <section class="bg-blue p-5 rounded-xl shadow-md">
    <div class="flex">
      <div class="ma md:(max-w-40 m-0)">
        <div
          class="display-block xl:display-none absolute p-2 text-md font-600 bg-green rounded"
        >
          <slot name="banner" />
        </div>
        <slot name="cover" />
      </div>
      <div class="display-none xl:display-block ml-5">
        <div class="p-2 text-xs font-600 bg-green rounded">
          <slot name="banner" />
        </div>
        <slot name="deskripsi" />
      </div>
    </div>
    <div class="flex flex-col justify-between xl:(mt-2 flex-row)">
      <slot name="action" />
    </div>
  </section>
</template>
