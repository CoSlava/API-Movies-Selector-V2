const searchInput = document.getElementById("search-bar")
const searchResults = document.getElementById("movies")
const searchBtn = document.getElementById("search-btn")
const watchlistResults = document.getElementById("my-watchlist")

let myWatchList = []

if(searchBtn){
    searchBtn.addEventListener('click', () => {
        fetch(`https://www.omdbapi.com/?apikey=997d332e&t=${searchInput.value}`)
            .then(res => res.json())
            .then(data => {
                    renderSearchResults(data.Poster, data.Title, 
                    data.imdbRating, data.Runtime, data.Genre, data.Plot)
                
                document.getElementById("add-to-watchlist-btn").addEventListener('click', () =>{
                    myWatchList = JSON.parse(localStorage.getItem("myWatchList"))
                    myWatchList === null ? myWatchList = [] : myWatchList = JSON.parse(localStorage.getItem("myWatchList"))
                    
                    let currentMovie = data
                    myWatchList.push(currentMovie)
                    
                    localStorage.setItem("myWatchList", JSON.stringify(myWatchList))
                })
            })
        })
}

function renderSearchResults(poster, title, rating, runtime, genre, description){
    searchResults.innerHTML = 
        `<div class="search-results">
            <img src="${poster}">
            <div class="movie-text-container">
                <div class="title-rating">
                    <h4>${title}</h4>
                    <i class="fa-solid fa-star"></i>
                    <p>${rating}</p>
                </div>
                <div class="movie-details">
                    <p class="runtime-txt">${runtime}</p>
                    <p>${genre}</p>
                    <i class="fa-solid fa-plus" id="add-to-watchlist-btn"></i>
                    <p>Watchlist</p>
                </div>
                <div>
                    <p class="movie-description">${description}</p>
                </div>
            </div>
        </div>`
}

if(window.location.href.includes("watchlist")){
    let storedMovies = JSON.parse(localStorage.getItem("myWatchList"))
    
    if(storedMovies){
        storedMovies.map(movie =>{
            renderMyWatchlist(movie.Poster, movie.Title, 
            movie.imdbRating, movie.Runtime, movie.Genre, movie.Plot, movie.imdbID)
            
            document.getElementById("empty-watchlist").classList.add("hidden")
            document.getElementById("empty-watchlist2").classList.add("hidden")
        })
    } else {
        storedMovies = []
    }
    
        document.addEventListener('click', e =>{
            if(e.target.dataset.rmv){
                const filteredMoviesArray = storedMovies.filter((movie) =>{
                    return movie.imdbID != e.target.dataset.rmv
                })
                localStorage.setItem("myWatchList", JSON.stringify(filteredMoviesArray))
                storedMovies = filteredMoviesArray
                watchlistResults.innerHTML = ``
                
                if(storedMovies){
                    storedMovies.map(movie =>{
                        renderMyWatchlist(movie.Poster, movie.Title, 
                        movie.imdbRating, movie.Runtime, movie.Genre, movie.Plot, movie.imdbID)
                    })
                }
            }
        })
}

function renderMyWatchlist(poster, title, rating, runtime, genre, description, imdbID){
    watchlistResults.innerHTML +=
        `<div class="search-results">
                <img src="${poster}">
                <div class="movie-text-container">
                    <div class="title-rating">
                        <h4>${title}</h4>
                        <i class="fa-solid fa-star"></i>
                        <p>${rating}</p>
                    </div>
                    <div class="movie-details">
                        <p class="runtime-txt">${runtime}</p>
                        <p>${genre}</p>
                        <i class="fa-solid fa-minus" data-rmv=${imdbID}></i>
                        <p>Remove</p>
                    </div>
                    <div>
                        <p class="movie-description">${description}</p>
                    </div>
                </div>
            </div>`
}