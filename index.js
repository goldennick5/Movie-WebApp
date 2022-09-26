const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getFilms(APIURL);

async function getFilms(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  showFilms(data.results);
}

function showFilms(films) {
  main.innerHTML = "";

  films.forEach((film) => {
    const { poster_path, title, vote_average, overview } = film;

    const filmsEl = document.createElement("div");
    filmsEl.classList.add("film");

    filmsEl.innerHTML = `
      <img
        src="${IMGPATH + poster_path}"
        alt="${title}"
      />
      <div class="film-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview:</h3>
        ${overview}
      </div>
    `;

    main.appendChild(filmsEl);
  })
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = search.value;

  if (searchTerm) {
    getFilms(SEARCHAPI + searchTerm);

    search.value = "";
  }
});


