const fetchMovie = async (movieName) => {
    console.log("movie name",movieName);
    const data = await fetch(`http://www.omdbapi.com/?apikey=24d8caa8&s=${movieName}`);
    const movieData=await data.json();
    const {Search}=movieData;
    return Search;
}

const clearMovies = () => {
    while (movieMainElement.firstChild) {
      movieMainElement.removeChild(movieMainElement.firstChild);
    }
  };

const movieMainElement = document.querySelector('.movie_main');

const movie = async (movieName) => {
    const fetchData = await fetchMovie(movieName);
    clearMovies();
    

    fetchData.forEach((movie) => {
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
searchButton.addEventListener("click", searchMovie);





