<template>
  <div class="overflow-x-auto">
    <table class="w-full text-sm">
      <thead class="bg-gray-50 border-b border-gray-2">
        <slot name="tablehead" />
      </thead>
      <tbody>
        <slot name="tablebody" />
      </tbody>
    </table>
  </div>
</template>
