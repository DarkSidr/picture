import { postData } from "../services/requests";
import clearFormState from "./clearFormState";
import dots from "../services/dots";
import clearInputs from "../services/clearInputs";
const forms = (state) => {
  const form = document.querySelectorAll("form");
  const upload = document.querySelectorAll('[name="upload"]');

  const message = {
    loading: "Загрузка...",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
    spiner: "assets/img/spinner.gif",
    ok: "assets/img/ok.png",
    fail: "assets/img/fail.png",
  };

  const path = {
    designer: "assets/server.php",
    question: "assets/question.php",
  };

  const clearSelect = () => {
    const allSelect = document.querySelectorAll(".calc_form select");
    allSelect.forEach((item) => {
      item.selectedIndex = 0;
    });
  };

  upload.forEach((item) => {
    item.addEventListener("input", () => {
      dots(item);
    });
  });

  form.forEach((item) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      item.parentNode.appendChild(statusMessage);

      item.classList.add("animated", "fadeOutUp");
      setTimeout(() => {
        item.style.display = "none";
      }, 400);

      let statusImg = document.createElement("img");
      statusImg.setAttribute("src", message.spiner);
      statusImg.classList.add("animated", "fadeInUp");
      statusMessage.appendChild(statusImg);

      let textMessage = document.createElement("div");
      textMessage.textContent = message.loading;
      statusMessage.appendChild(textMessage);

      const formData = new FormData(item);
      let api;

      if (item.closest(".calc")) {
        for (let key in state) {
          formData.append(key, state[key]);
        }
      }
      item.closest(".popup-design") || item.classList.contains("calc_form")
        ? (api = path.designer)
        : (api = path.question);

      postData(api, formData)
        .then((res) => {
          console.log(res);
          statusImg.setAttribute("src", message.ok);
          textMessage.textContent = message.success;
        })
        .catch(() => {
          statusImg.setAttribute("src", message.fail);
          textMessage.textContent = message.failure;
        })
        .finally(() => {
          clearSelect();
          clearInputs();
          clearFormState(state);
          setTimeout(() => {
            statusMessage.remove();
            item.style.display = "block";
            item.classList.remove("fadeOutUp");
            item.classList.add("fadeInUp");
            document.querySelector(".calc-price").textContent =
              "Для расчета нужно выбрать размер картины и материал картины";
          }, 5000);
        });
    });
  });
};

export default forms;
