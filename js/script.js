const API_KEY = '0a951f7339926b0d5f3b76d7e60a7dc0'
const API_LANGUAGE = 'pt-br'
const LIST_MOVIES = ['tt12801262', 'tt7146812', 'tt5109280', 'tt3521164', 'tt2380307', 'tt2948372', 'tt8097030']
const BASE_URL_IMAGE = 'http://image.tmdb.org/t/p/original'

const moviesList = document.getElementById('movies_list')

function getUrlMovie(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${API_LANGUAGE}`
}


function setMainMovie(movieId) {
    fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => {
        const title = document.querySelector('.movie h1')
        const description = document.querySelector('.movie p')
        const rating = document.querySelector('.rating strong')
        const info = document.querySelector('.movie span')
        const app = document.getElementById('app')
    
        const yearRelease = data.release_date.split('-')[0]
        const image = BASE_URL_IMAGE.concat(data.backdrop_path)
    
        title.innerHTML = data.title
        description.innerHTML = data.overview
        rating.innerHTML = data.vote_average
        info.innerHTML = yearRelease + ' - ' + data.genres[2].name + ' - ' + 'Filme'
        app.style.backgroundImage = `linear-gradient(rgba(13, 22, 46, 0.7) 23.21%, rgba(13, 22, 46, 0.0001) 96.69%), url('${image}')`
    })
}

function createButtonMovie(movieId) {
    const button = document.createElement('button')
    button.setAttribute(`onclick`, `setMainMovie('${movieId}')`)
    button.innerHTML = '<img src="./images/icon-play-button.png">'

    return button
}

function createMovie(movieId) {
    fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => {
        const movie = document.createElement('li')
        const genre = `<span>${data.genres[2].name}</span>`
        const title = `<strong>${data.title}</strong>`
        const image = BASE_URL_IMAGE.concat(data.backdrop_path)

        movie.innerHTML = genre + title
        movie.appendChild(createButtonMovie(movieId))

        movie.style.backgroundImage = `linear-gradient(180deg, rgba(14, 23, 47, 0.0001) 11.72%, #0E172F 100%), url('${image}')`

        moviesList.appendChild(movie)
    })
}

function loadListMovies() {
    LIST_MOVIES.map(createMovie)
}

loadListMovies()
setMainMovie(LIST_MOVIES[0])