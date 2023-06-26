import { defineStore } from "pinia";

export const processInputVirtualKeyboard = (dataForm: any) => {
  const addCharacters = (uppercaseState: any, key: any) => {
    if (uppercaseState) {
      dataForm.value += key.toUpperCase();
    } else {
      dataForm.value += key;
    }
  };
  const delCharacter = () => {
    if (!dataForm.value) return;
    dataForm.value = dataForm.value.slice(0, -1);
  };

  return { addCharacters, delCharacter };
};

export const uppercaseOpt = () => useState<boolean>("uppercase", () => false);

export const previewModalRepository = defineStore("modalRepository", () => {
  const showModal = ref(false);
  const numberSelected = ref("110110190107");
  const viewModal = (npm: string) => {
    showModal.value = !showModal.value;
  };

  return {
    showModal,
    viewModal,
    numberSelected,
  };
});
