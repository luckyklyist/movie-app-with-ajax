let movieNotFound = document.querySelector("#movieNotFound")
const errorRender = () => {
    console.log("hey");
    movieNotFound.innerHTML = `<div class="text-center">
    <h2 class="text-3xl font-bold mb-4">Movie Not Found</h2>
    <p class="text-gray-500">Sorry, the movie you are looking for could not be found.</p>
  </div>`
}

function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

const fetchMovie = async (movieName) => {
    try {
        const data = await fetch(`http://www.omdbapi.com/?apikey=24d8caa8&s=${movieName}`);
        const movieData = await data.json();
        return movieData;
    }
    catch (err) {
        console.log(err)
    }
}

const clearMovieNotFound = () => {
    while (movieNotFound.firstChild) {
        movieNotFound.firstChild.remove();
    }
};

const clearMovies = () => {
    while (movieMainElement.firstChild) {
        movieMainElement.removeChild(movieMainElement.firstChild);
    }
};

const movieMainElement = document.querySelector('.movie_main');

const movie = async (movieName) => {
    const fetchData = await fetchMovie(movieName);
    console.log(fetchData)
    if (fetchData.Response === "False") {
        console.log("err")
        errorRender();
        return;
    }
    clearMovieNotFound();
    const { Search } = fetchData;
    clearMovies();


    Search.forEach((movie) => {
        const movieElem = document.createElement('div');
        movieElem.className = 'rounded-md border overflow-hidden shadow-lg hover:shadow-xl p-4 bg-gray-200 hover:scale-110 duration-300 ';

        const imageElem = document.createElement('img');
        imageElem.src = movie.Poster;
        imageElem.alt = 'Movie Poster';
        imageElem.className = 'object-contain h-40 w-full';
        movieElem.appendChild(imageElem);

        const infoElem = document.createElement('div');
        infoElem.className = 'p-4';

        const titleElem = document.createElement('h2');
        titleElem.textContent = movie.Title;
        titleElem.className = 'text-xl font-semibold text-black mb-2';
        infoElem.appendChild(titleElem);

        const yearElem = document.createElement('p');
        yearElem.textContent = `Release Year: ${movie.Year}`;
        yearElem.className = 'text-black';
        infoElem.appendChild(yearElem);

        movieElem.appendChild(infoElem);

        movieMainElement?.appendChild(movieElem);
    });
};


const searchMovie = () => {
    const movieName = document.querySelector("#movieName").value;
    console.log(movieName)
    movie(movieName);
}

const searchButton = document.querySelector(".searchButton");
// searchButton.addEventListener("click", searchMovie);

const searchMenu = document.querySelector("#moviename");

searchMenu.addEventListener("input", () => {
    const movieName = searchMenu.value;
    if (movieName.length > 1) {
        movie(movieName);
    }
});





