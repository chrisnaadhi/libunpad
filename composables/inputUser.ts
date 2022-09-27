export const processInputVirtualKeyboard = (dataForm) => {
  const addCharacters = (uppercaseState, key) => {
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
