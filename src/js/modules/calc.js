const calc = (size, material, options, promocode, result, state) => {
  const sizeBlock = document.querySelector(size);
  const materialBlock = document.querySelector(material);
  const optionsBlock = document.querySelector(options);
  const promoCodeBlock = document.querySelector(promocode);
  const resultBlock = document.querySelector(result);

  let sum = 0;

  const calcFunc = () => {
    sum = Math.round(
      +sizeBlock.value * +materialBlock.value + +optionsBlock.value
    );

    if (sizeBlock.value == "" || materialBlock.value == "") {
      resultBlock.textContent =
        "Пожалуйста, выберите размер и материал картины";
    } else if (promoCodeBlock.value === "IWANTPOPART") {
      resultBlock.textContent = Math.round(sum * 0.7);
      state.price = Math.round(sum * 0.7);
    } else {
      resultBlock.textContent = sum;
      state.price = sum;
    }
  };

  const changeSelectForm = (key, value) => {
    return (state[key] = value);
  };

  sizeBlock.addEventListener("change", function () {
    changeSelectForm(this.id, this.options[this.selectedIndex].text);
    calcFunc();
    console.log(state);
  });
  materialBlock.addEventListener("change", function () {
    changeSelectForm(this.id, this.options[this.selectedIndex].text);
    calcFunc();
    console.log(state);
  });
  optionsBlock.addEventListener("change", function () {
    changeSelectForm(this.id, this.options[this.selectedIndex].text);
    calcFunc();
    console.log(state);
  });
  promoCodeBlock.addEventListener("input", function () {
    changeSelectForm("promocode", this.value);
    calcFunc();
    console.log(state);
  });
};

export default calc;
