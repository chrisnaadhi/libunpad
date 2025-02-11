<template>
  <table class="w-full border-collapse border text-sm border-slate-400">
    <thead class="bg-yellow-2">
      <slot name="tablehead" />
    </thead>
    <tbody>
      <slot name="tablebody" />
    </tbody>
  </table>
</template>

<style scoped>
.table-border {
  --at-apply: border border-unpad p-1;
}
</style>
