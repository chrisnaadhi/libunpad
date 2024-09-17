import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const prosesPeminjamanLoker = defineStore("prosesPeminjamanLoker", () => {
  const nomorLoker = ref(null);
  const namaPeminjam = ref("Chrisna Adhi Pranoto");
  const npmPeminjam = ref("210210160084");
  const konfirmasiPeminjam = ref(false);
  const showLokerData = ref(false);
  const isFull = ref(false);

  return {
    nomorLoker,
    namaPeminjam,
    npmPeminjam,
    konfirmasiPeminjam,
    showLokerData,
    isFull
  };
})