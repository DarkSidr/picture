const filter = () => {
  const menu = document.querySelector(".portfolio-menu");
  const items = menu.querySelectorAll("li");
  const wrapper = document.querySelector(".portfolio-wrapper");
  const markAll = wrapper.querySelectorAll(".all");
  const no = document.querySelector(".portfolio-no");

  const typeFilter = (markType) => {
    markAll.forEach((mark) => {
      mark.style.display = "none";
      mark.classList.remove("animated", "fadeIn");
    });

    no.style.display = "none";
    no.classList.remove("animated", "fadeIn");

    if (markType.length > 0) {
      markType.forEach((mark) => {
        mark.style.display = "block";
        mark.classList.add("animated", "fadeIn");
      });
    } else {
      no.style.display = "block";
      no.classList.add("animated", "fadeIn");
    }
  };

  const tabs = (menuSelectorWrapper, contentSelectorWrapper, selecorItem) => {
    const btn = menuSelectorWrapper.querySelector(selecorItem);
    const contents = contentSelectorWrapper.querySelectorAll(selecorItem);
    btn.addEventListener("click", () => {
      console.log(contents.length);
      typeFilter(contents.length > 0 ? contents : no);
    });
  };

  tabs(menu, wrapper, ".all");
  tabs(menu, wrapper, ".lovers");
  tabs(menu, wrapper, ".chef");
  tabs(menu, wrapper, ".girl");
  tabs(menu, wrapper, ".guy");
  tabs(menu, wrapper, ".grandmother");
  tabs(menu, wrapper, ".granddad");

  menu.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.tagName == "LI") {
      items.forEach((btn) => btn.classList.remove("active"));
      target.classList.add("active");
    }
  });
};

export default filter;
