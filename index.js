let extensions = [];

const container = document.getElementById("container");

function renderExtensions() {
  container.innerHTML = "";

  extensions.forEach((ext, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
  <div class="card-top">
    <img src="${ext.logo}" alt="${ext.name}" class="icon">
    <div>
      <h3>${ext.name}</h3>
      <p>${ext.description}</p>
    </div>
  </div>

  <div class="card-footer">
    <button class="remove" onclick="removeExtension(${index})">Remove</button>
    <button class="toggle"></button>
  </div>
`;

    const toggleBtn = card.querySelector(".toggle");

    toggleBtn.addEventListener("click", () => {
      card.classList.toggle("active");
    });

    container.appendChild(card);
  });
}

function removeExtension(index) {
  extensions.splice(index, 1);
  renderExtensions();
}

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    extensions = data;
    renderExtensions();
  });

const filters = document.querySelectorAll(".filter a");

filters.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    filters.forEach((l) => l.classList.remove("selected"));
    link.classList.add("selected");

    const filter = link.dataset.filter;
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      if (
        filter === "all" ||
        (filter === "active" && card.classList.contains("active")) ||
        (filter === "inactive" && !card.classList.contains("active"))
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
const themeBtn = document.querySelector(".dark-mode-toggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeBtn.src = "./assets/images/icon-sun.svg";
  } else {
    themeBtn.src = "./assets/images/icon-moon.svg";
  }
});
