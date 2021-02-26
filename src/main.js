loadData().then(addEvent);

async function loadData() {
  const data = await (await fetch("/data/data.json")).json();
  render(data.items);
  return data.items;
}

function render(items) {
  const $ul = document.querySelector(".list");
  $ul.innerHTML = "";
  const li = document
    .importNode(document.querySelector("template").content, true)
    .querySelector("li");
  for (let i = 0; i < items.length; i++) {
    img = li.querySelector("img");
    img.src = items[i].image;
    img.alt = items[i].type;
    span = li.querySelector("span");
    span.textContent = `${items[i].gender}, ${items[i].size}`;
    $ul.appendChild(li.cloneNode(true));
  }
}
function addEvent(items) {
  const $sort = document.querySelector(".sort");
  const $logo = document.querySelector("img");
  $sort.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      render(items.filter((item) => item.type === e.target.alt));
    } else if (e.target.tagName === "BUTTON") {
      render(items.filter((item) => item.color === e.target.classList[1]));
    }
  });
  $logo.addEventListener("click", (e) => {
    render(items);
  });
}
