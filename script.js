function fetchData(URL, key, event, responseFunction) {
  fetch(URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      responseFunction(data);
    });
}

function responseFunction(data) {
  const newsArray = data.response.docs;

  for (let i = 0; i < newsArray.length; i++) {
    const newsitem = newsArray[i];
   
    if (!newsitem.multimedia[0]) {
      continue;
    }

    const newElement = document.createElement("li");
    newElement.innerHTML = newsitem.headline.main;
 
    const newsLink = document.createElement("a");
    newsLink.setAttribute('target', '_blank');
    
    const theurl = newsitem.web_url;
    newsLink.href = theurl;
    newsLink.text = " Read more";

    const abstract = document.createElement('div')
    abstract.innerHTML = newsitem.abstract
    const newspic = document.createElement("img");
    newspic.className = "picstyle";
    newspic.src = `https://nytimes.com/${newsitem.multimedia[0].url}`;

    newElement.appendChild(abstract)
    newElement.appendChild(newsLink);
    newElement.appendChild(newspic);
    document.querySelector(".articles").appendChild(newElement);
    document.querySelector(".articles").classList.remove("hide");
  }
}
function responseFunction2(data) {
  const newsArray = data.results;

  for (let i = 0; i < newsArray.length; i++) {
    const newsitem = newsArray[i];
    if (!newsitem.multimedia[0]) {
      continue;
    }
    const newElement = document.createElement("li");
    newElement.innerHTML = newsitem.title;

    const newsLink = document.createElement("a");
    newsLink.setAttribute('target', '_blank');
    newsLink.href = newsitem.url;
    newsLink.text = " Read more";

    const abstract = document.createElement('div')
    abstract.innerHTML = newsitem.abstract

    const newspic = document.createElement("img");
    newspic.className = "picstyle";
    newspic.src = newsArray[i].multimedia[0].url;
  
    newElement.appendChild(abstract)
    newElement.appendChild(newspic);
    newElement.appendChild(newsLink);
    document.querySelector(".articles").appendChild(newElement);
  }
}

function start() {
  document.querySelector(".articles").classList.add("hide");
  document.getElementById("loadspinner").classList.remove("hide");

  const q = document.getElementById("searchBar").value;
  const URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${q}&api-key=${API_KEY}`;
  fetchData(URL, API_KEY, null, responseFunction);
}

function getNewsBySection(event) {
  const secTion = event.target.value;
  const URL2 = `https://api.nytimes.com/svc/topstories/v2/${secTion}.json?api-key=${API_KEY}`;

  fetchData(URL2, API_KEY, null, responseFunction2);
}

const dropdownOptions = () => {
  let dropdown = document.getElementById("dropdown");
  let options = [
    "arts",
    "automobiles",
    "books",
    "business",
    "fashion",
    "food",
    "health",
    "home",
    "insider",
    "magazine",
    "movies",
    "national",
    "nyregion",
    "obituaries",
    "opinion",
    "politics",
    "realestate",
    "science",
    "sports",
    "sundayreview",
    "technology",
    "theater",
    "tmagazine",
    "travel",
    "upshot",
    "world"
  ];

  for (let i = 0; i < options.length; i++) {
    var newOption = document.createElement("option");
    newOption.text = options[i];
    newOption.value = options[i];
    dropdown.appendChild(newOption);
  }
};


const removeItems = () => {
  const ul = document.querySelector(".articles");
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.firstChild);
  }
};

var API_KEY = "Enter your API key here";

const init = () => {
  const search = document.getElementById("searchbutton");
  search.addEventListener("click", removeItems);
  search.addEventListener("click", start);

  dropdownOptions();

  const dropdown = document.getElementById("dropdown");
  dropdown.addEventListener("change", removeItems);
  dropdown.addEventListener("change", getNewsBySection, event);
};

init();
