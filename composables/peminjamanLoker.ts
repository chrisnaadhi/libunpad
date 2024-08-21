import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const prosesPeminjamanLoker = defineStore("prosesPeminjamanLoker", () => {
  const nomorLoker = ref("");
  const namaPeminjam = ref("");
  const npmPeminjam = ref("");
  const showLokerData = ref(false);

  const prosesPeminjaman = async () => {
    // some code here
  }
})