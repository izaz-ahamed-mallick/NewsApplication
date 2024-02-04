const API_KEY = "fdd290b6fbb74167a99a1bf6339dba04";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("india"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();

  getInfo(data.articles);
}

function getInfo(article) {
  const cardContainer = document.querySelector(".card-section");
  const templateArea = document.querySelector("#template-area");

  cardContainer.innerHTML = "";
  article.forEach((info) => {
    if (!info.urlToImage) return;
    const cardClone = templateArea.content.cloneNode(true);

    fillDatainCards(cardClone, info);
    cardContainer.appendChild(cardClone);
  });
}
function fillDatainCards(cardClone, article) {
  let newsImg = cardClone.querySelector("#news-img");
  let newsTitle = cardClone.querySelector("#nws-title");
  let newsSrc = cardClone.querySelector("#news-src");
  let newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;
  let date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSrc.innerHTML = `${article.source.name} • ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let currentValue = null;
function navigationPage(id) {
  fetchNews(id);
  let navItem = document.getElementById(id);
  currentValue?.classList.remove("active");
  currentValue = navItem;
  currentValue.classList.add("active");
}

let searchBtn = document.querySelector("#search-btn");
let searchBoxValue = document.querySelector("#search-box");

searchBtn.addEventListener("click", () => {
  const searchValue = searchBoxValue.value;
  if (!searchValue) return;
  fetchNews(searchValue);
  currentValue?.classList.remove("active");
  currentValue = null;
});
