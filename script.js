const API_KEY = 'e1dcf2c8c50d189f07ffbb9dc1f0d85a';
const BASE_URL = 'https://api.themoviedb.org/3';

// Country data
const countryDishes = {
  "Japan": "Sushi 🍣",
  "France": "Croissant 🥐",
  "India": "Biryani 🍛",
  "Mexico": "Tacos 🌮",
  "South Korea": "Bibimbap 🍚",
  "Italy": "Pizza 🍕",
  "Egypt": "Koshari 🥘",
  "Brazil": "Feijoada 🍲",
  "Germany": "Bratwurst 🌭",
  "China": "Dumplings 🥟",
  "Russia": "Borscht 🍵",
  "Spain": "Paella 🥘",
  "Thailand": "Pad Thai 🍜",
  "Nigeria": "Jollof Rice 🍛",
  "Iran": "Kebab 🍢",
  "Turkey": "Baklava 🍮",
  "United States of America": "Hamburger 🍔",
  "Palestine": "Musakhan 🍗"
};

const famousLandmarks = {
  "Japan": "Mount Fuji 🗻",
  "France": "Eiffel Tower 🗼",
  "India": "Taj Mahal 🕌",
  "Mexico": "Chichen Itza 🏛️",
  "South Korea": "Gyeongbokgung Palace 🏯️",
  "Italy": "Colosseum 🏟️",
  "Egypt": "Great Pyramid of Giza 🔺",
  "Brazil": "Christ the Redeemer 🗽",
  "Germany": "Brandenburg Gate 🏛️",
  "China": "Great Wall of China 🧱",
  "Russia": "Saint Basil's Cathedral ⛪",
  "Spain": "Sagrada Familia ⛪",
  "Thailand": "Wat Arun 🏯",
  "Nigeria": "Zuma Rock 🪨",
  "Iran": "Persepolis 🏛️",
  "Turkey": "Hagia Sophia 🕌",
  "United States of America": "Statue of Liberty 🗽",
  "Palestine": "Dome of the Rock 🕌"
};

const languageCodes = {
  jpn: "ja", fra: "fr", hin: "hi", ara: "ar", ita: "it",
  kor: "ko", spa: "es", eng: "en", por: "pt", deu: "de",
  zho: "zh", rus: "ru", tha: "th", hau: "ha", fas: "fa", tur: "tr"
};

const availableCountries = [
  "Japan", "France", "India", "Mexico", "South Korea", 
  "Italy", "Egypt", "Brazil", "Germany", "China",
  "Russia", "Spain", "Thailand", "Nigeria", "Iran", 
  "Turkey", "United States of America", "Palestine"
];

const availableGenres = [
  "28", "12", "16", "35", "80", "18", "14", 
  "27", "10402", "9648", "10749", "878", "53", 
  "10752", "37"
];

const countryDataCache = {};
let allCountriesCache = [];

//fetch all countries once
async function getAllCountries() {
  if (allCountriesCache.length) return allCountriesCache;
  const res = await axios.get('https://restcountries.com/v3.1/all');
  allCountriesCache = res.data;
  return allCountriesCache;
}

// Country data
async function getCountryData(name) {
  if (countryDataCache[name]) return countryDataCache[name];
  const { data } = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
  const country = data[0];
  countryDataCache[name] = country;
  return country;
}

// DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  const countryDropdown = document.getElementById('countryDropdown');
  const genreDropdown = document.getElementById('genreDropdown');

  document.getElementById('randomButton').addEventListener('click', () => {
    countryDropdown.value = getRandom(availableCountries);
    genreDropdown.value = getRandom(availableGenres);
    document.getElementById('searchButton').click();
  });

  document.getElementById('searchButton').addEventListener('click', searchMovies);
});

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Main search function
async function searchMovies() {
  const country = document.getElementById('countryDropdown').value;
  const genre = document.getElementById('genreDropdown').value;
  const results = document.getElementById('resultsContainer');

  results.innerHTML = '';
  if (!country || !genre) {
    results.innerHTML = '<div class="error-message">Please select both a country and a genre.</div>';
    return;
  }

  try {
    const countryInfo = await getCountryData(country);
    results.innerHTML = await generateCountryHTML(country, countryInfo);

    const movies = await getMoviesForCountry(country, genre, countryInfo);
    results.innerHTML += generateMoviesHTML(movies, country, genre);

    if (movies.length) {
      document.getElementById('sortDropdown').addEventListener('change', sortMovieResults);
    }

    results.scrollIntoView({ behavior: 'smooth' });
  } catch (err) {
    results.innerHTML = `<div class="error-message">Something went wrong: ${err.message}</div>`;
  }
}

async function generateCountryHTML(name, info) {
  const borders = info.borders?.length ? (await getAllCountries()).filter(c => info.borders.includes(c.cca3)).map(c => c.name.common).join(', ') : 'No land borders';

  return `
  <div class="country-section">
    <h2>${name} <span class="country-code">${info.cca2}</span></h2>
    <div class="country-header">
      <img class="country-flag" src="${info.flags.svg}" alt="${name} flag">
      <div class="country-details">
        <p><strong>🏰 Landmark:</strong> ${famousLandmarks[name] || '—'}</p>
        <p><strong>🏙️ Capital:</strong> ${info.capital?.[0] || 'N/A'}</p>
        <p><strong>🧍 Population:</strong> ${info.population.toLocaleString()}</p>
        <p><strong>🗣️ Languages:</strong> ${info.languages ? Object.values(info.languages).join(', ') : 'N/A'}</p>
        <p><strong>💰 Currencies:</strong> ${info.currencies ? Object.values(info.currencies).map(c => `${c.name} (${c.symbol || '?'})`).join(', ') : 'N/A'}</p>
        <p><strong>🌍 Continent:</strong> ${info.continents?.[0] || 'N/A'}</p>
        <p><strong>⏰ Timezones:</strong> ${info.timezones?.join(', ') || 'N/A'}</p>
        <p><strong>📍 Coordinates:</strong> ${info.latlng?.map(x => x.toFixed(2)).join('°, ')}°</p>
        <p><strong>🛣️ Borders:</strong> ${borders}</p>
        <p class="dish-suggestion"><strong>🍽️ Try this food:</strong> ${countryDishes[name] || 'Local cuisine'}</p>
      </div>
    </div>
  </div>`;
}

async function getMoviesForCountry(name, genre, info) {
  const code = info.cca2;
  const lang = languageCodes[Object.keys(info.languages || {})[0]] || 'en';
  const dateRange = 'primary_release_date.gte=2000-01-01&primary_release_date.lte=2025-12-31';

  const query1 = `with_original_language=${lang}&with_genres=${genre}&region=${code}&${dateRange}`;
  const query2 = `with_origin_country=${code}&with_genres=${genre}&${dateRange}`;

  let movies = await getMovies(query1);
  if (!movies.length) movies = await getMovies(query2);

  return movies.slice(0, 15);
}

async function getMovies(query) {
  try {
    const { data } = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&${query}`);
    return data.results || [];
  } catch {
    return [];
  }
}

function generateMoviesHTML(movies, country, genre) {
  if (!movies.length) return `<div class="movies-section"><h3>${genre} Movies from ${country}</h3><div class="no-results">No movies found.</div></div>`;

  let html = `
    <div class="movies-section">
      <h3>${document.getElementById('genreDropdown').selectedOptions[0].text} Movies from ${country}</h3>
      <div class="sort-options">
        <label>Sort by: 
          <select id="sortDropdown" class="styled-select">
            <option value="rating">⭐ Rating</option>
            <option value="date">🗓️ Release Date</option>
          </select>
        </label>
      </div>
      <div class="movies-grid">`;

  for (const movie of movies) {
    const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Poster';
    html += `
      <div class="movie-item" data-id="${movie.id}" data-rating="${movie.vote_average}" data-date="${movie.release_date}">
        <div class="movie-poster"><img src="${poster}" alt="${movie.title}"></div>
        <div class="movie-info">
          <h4 class="movie-title">${movie.title}</h4>
          <div class="movie-stats">
            <span>⭐ ${movie.vote_average.toFixed(1)}</span>
            <span>🗓️ ${movie.release_date?.split('-')[0] || 'N/A'}</span>
          </div>
        </div>
      </div>`;
  }

  return html + '</div></div>';
}

function sortMovieResults() {
  const method = document.getElementById('sortDropdown').value;
  const movies = [...document.querySelectorAll('.movie-item')];
  movies.sort((a, b) => {
    if (method === 'rating') return b.dataset.rating - a.dataset.rating;
    if (method === 'date') return new Date(b.dataset.date) - new Date(a.dataset.date);
  });
  const grid = document.querySelector('.movies-grid');
  movies.forEach(m => grid.appendChild(m));
}

document.addEventListener('click', (e) => {
  const card = e.target.closest('.movie-item');
  if (card) showMovieDetails(card.dataset.id);
});

async function showMovieDetails(id) {
  const modal = document.createElement('div');
  modal.className = 'movie-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-modal">&times;</button>
      <div class="modal-body">Loading...</div>
    </div>`;
  document.body.appendChild(modal);
  modal.classList.add('active');

  modal.querySelector('.close-modal').addEventListener('click', () => closeModal(modal));
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); });

  try {
    const [details, credits] = await Promise.all([
      axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`),
      axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)
    ]);

    const movie = details.data;
    const cast = credits.data.cast.slice(0, 5).map(c => c.name).join(', ');

    modal.querySelector('.modal-body').innerHTML = `
      <div class="modal-poster">
        <img src="${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster'}" alt="${movie.title}">
      </div>
      <div class="modal-details">
        <h2>${movie.title}</h2>
        <div class="movie-meta">⭐ ${movie.vote_average.toFixed(1)} • 🗓️ ${movie.release_date?.split('-')[0]} • ⏱️ ${movie.runtime || '?'} min</div>
        <div class="movie-overview"><h3>Overview</h3><p>${movie.overview || 'No overview available.'}</p></div>
        <div class="movie-cast"><h3>Cast</h3><p>${cast || 'N/A'}</p></div>
      </div>`;
  } catch {
    modal.querySelector('.modal-body').innerHTML = '<p>Could not load movie details.</p>';
  }
}

function closeModal(modal) {
  modal.classList.remove('active');
  setTimeout(() => modal.remove(), 300);
}
