🎬 CineMap – Explore Countries Through Cinema (With a Taste!)

👥 Group Members

   - Aziza Abed – 1211577
   - Fatema Ireqat – 1212950

______________________________________________________

📝 Project Overview

   CineMap is a culturally immersive movie discovery web application designed to bridge entertainment and education. The app allows users to select a country and a movie genre to instantly explore curated film recommendations from that region — accompanied by insightful country data and traditional cultural elements.

   The experience blends factual information with interactive content, making learning about a country’s identity as fun as watching one of its most popular films.

   CineMap is built using HTML, CSS, and vanilla JavaScript, with no frontend frameworks. For API interactions, the app uses the lightweight axios library via CDN to handle HTTP requests to external APIs like REST Countries and TMDB.
______________________________________________________

🔌 APIs Integrated

   1. 🌍 REST Countries API

      Used to retrieve real-time country data, including:
      🇺🇳 National flag
      🏙️ Capital city
      🗣️ Languages spoken
      💰 Currency
      👥 Population
      🕒 Timezones
      🌍 Continent
      📍 Coordinates
      🧭 Border countries
      🗺️ Landmark suggestions (custom-mapped)

   2. 🎥 The Movie Database (TMDB) API

      Needed API KEY: e1dcf2c8c50d189f07ffbb9dc1f0d85a
      Used to discover and filter movie content based on:
      🌐 Country (region or language)
      🎭 Genre
      🔥 Popularity
      📅 Release date range


      2.1 Returns key movie details such as:

         🎞️ Title and poster
         📆 Release year
         ⭐ Rating
         📝 Overview
         🎭 Cast members
______________________________________________________

⚙️ How to Run the Project
   No backend setup or package installation is required. CineMap is a purely client-side project that runs in the browser.
______________________________________________________

🖥️ Requirements

  -  Any modern web browser (Chrome, Firefox, Edge, Safari)
  - Internet connection (for API access)
  - Code editor (e.g., Visual Studio Code)

______________________________________________________

🚀 Launch Instructions

   Open the project folder in your preferred code editor.

   Ensure the following files are included:
    - index.html
    - style.css
    - script.js
    - README.md

To run the app:

   - Open index.html in your browser

   - Or, right-click and select “Open with Live Server” (if using VS Code)
      ==> Make sure to install the Live Server extension!
______________________________________________________

✨ Key Features

   1. 🗺️ Country Data Display: 
       Shows population, capital, continent, coordinates, timezone, border countries, and national flag.

   2. 🍽️ Cultural Touches: 
       Suggests a traditional dish and a landmark for each country.

  3. 🎬 Movie Discovery: 
       Fetches and displays movie data filtered by genre and country.

  4. 🔃 Dynamic Sorting: 
       Sort movies by rating or release year.

  5. 🎲 Surprise Me Button: 
       Randomly selects a country and genre for quick exploration.

 6.  🔍 Movie Details Modal: 
       Pop-up with full details like poster, cast, runtime, and overview.

______________________________________________________

🌍🎞️ That’s CineMap — travel the world, one movie at a time.