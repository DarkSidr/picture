const dots = (item) => {
  let dots;
  let arr = item.files[0].name.split(".");
  arr[0].length > 6 ? (dots = "...") : (dots = ".");
  const name = arr[0].substring(0, 6) + dots + arr[1];
  item.previousElementSibling.textContent = name;
};

export default dots;
