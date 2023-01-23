import dots from "../services/dots";
import { postData } from "../services/requests";
import clearInputs from "../services/clearInputs";
const drop = () => {
  // drag *
  // dragend *
  // dragenter - объект над dropArea
  // dragexit *
  // dragleave - объект перетащили за пределы dropArea
  // dragover - объект зависает над dropArea
  //dragstart *
  // drop - объект отправлен в dropArea
  // * события которые срабатывают на самом файле

  const fileInputs = document.querySelectorAll('[name="upload"]');

  ["dragenter", "dragleave", "dragover", "drop"].forEach((eventName) => {
    fileInputs.forEach((input) => {
      input.addEventListener(eventName, preventDefaults, false);
    });
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function highlight(item) {
    item.closest(".file_upload").style.border = "5px solid yellow";
    item.closest(".file_upload").style.backgroundColor = "rgba(0,0,0, .7)";
  }

  function unhighlight(item) {
    item.closest(".file_upload").style.border = "none";
    if (item.closest(".calc_form")) {
      item.closest(".file_upload").style.backgroundColor = "#fff";
    } else if (item.closest(".main_form")) {
      item.closest(".file_upload").style.backgroundColor = "#f7e7e6";
    } else {
      item.closest(".file_upload").style.backgroundColor = "#ededed";
    }
  }

  ["dragenter", "dragover"].forEach((eventName) => {
    fileInputs.forEach((input) => {
      input.addEventListener(
        eventName,
        () => {
          highlight(input);
        },
        false
      );
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    fileInputs.forEach((input) => {
      input.addEventListener(
        eventName,
        () => {
          unhighlight(input);
        },
        false
      );
    });
  });

  fileInputs.forEach((input) => {
    input.addEventListener("drop", (e) => {
      input.files = e.dataTransfer.files;
      dots(input);
      if (input.closest(".main_form")) {
        let formData = new FormData();
        formData.append("file", input.files[0]);
        postData("assets/server.php", formData)
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            clearInputs();
          });
      }
    });
  });
};

export default drop;
