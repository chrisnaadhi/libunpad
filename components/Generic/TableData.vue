<template>
  <table class="w-full border-collapse border text-sm border-slate-400">
    <thead class="bg-orange-2">
      <slot name="tablehead" />
    </thead>
    <tbody>
      <slot name="tablebody" />
    </tbody>
  </table>
</template>

<style scoped>
.table-border {
  --at-apply: border border-orange p-1;
}
</style>
