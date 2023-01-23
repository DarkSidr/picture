const clearInputs = () => {
  const inputs = document.querySelectorAll("input");
  const upload = document.querySelectorAll('[name="upload"]');
  inputs.forEach((item) => {
    item.value = "";
  });
  upload.forEach((item) => {
    item.previousElementSibling.textContent = "Файл не выбран";
  });
};
export default clearInputs;
