// Fetch the items from the JSON file
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const $list = document.querySelector(".list");
  $list.innerHTML = items.map((item) => createHTMLString(item)).join("");
  setEventListeners(items);
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
      <li data-type="${item.type}" data-color="${item.color}">
          <img src="${item.image}" alt="${item.type}" />
          <span>${item.gender}, ${item.size}</span>
      </li>
      `;
}

function onButtonClick(event) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;
  if (key == null || value == null) {
    return;
  }
  updateItems(key, value);
}
function updateItems(key, value) {
  const items = document.querySelector(".list").children;
  Array.prototype.forEach.call(items, (item) => {
    if (item.dataset[key] !== value) {
      item.classList.add("hidden");
    } else {
      item.classList.remove("hidden");
    }
  });
}
function setEventListeners(items) {
  const $logo = document.querySelector("img");
  $logo.addEventListener("click", displayAll);
  const $buttons = document.querySelector(".sort");
  $buttons.addEventListener("click", onButtonClick);
}
function displayAll() {
  const items = document.querySelector(".list").children;
  Array.prototype.forEach.call(items, (item) => {
    item.classList.remove("hidden");
  });
}
// main
loadItems()
  .then((items) => {
    displayItems(items);
  })
  .catch(console.log);
