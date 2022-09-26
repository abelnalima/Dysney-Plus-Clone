const API_KEY = '0a951f7339926b0d5f3b76d7e60a7dc0'
const API_LANGUAGE = 'pt-br'
const BASE_URL_IMAGE = {
    original: 'http://image.tmdb.org/t/p/original',
    small: 'http://image.tmdb.org/t/p/w500'
}

const movies = []
let movieActive = ''
const moviesElement = document.getElementById('movies')

function getUrlMovie(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${API_LANGUAGE}`
}

function changeButtonMenu() {
    const button = document.querySelector('.button_menu')
    const navigation = document.querySelector('.navigation')

    button.classList.toggle('active')
    navigation.classList.toggle('active')
}

function setMainMovie(movie) {
    const title = document.querySelector('.movie_feature h1')
    const description = document.querySelector('.movie_feature p')
    const rating = document.querySelector('.rating strong')
    const info = document.querySelector('.movie_feature span')
    const appImage = document.querySelector('.app_image img')

    title.innerHTML = movie.title
    description.innerHTML = movie.overview
    rating.innerHTML = movie.vote_average
    info.innerHTML = movie.release + ' - ' + movie.genre + ' - ' + 'Filme'
    appImage.setAttribute('src', movie.image.original)
}

function changeMovieActiveInList(newMovieActive) {
    const movieActiveCurrent = document.getElementById(movieActive)
    movieActiveCurrent.classList.remove('active-movie')
    
    const movieActiveNew = document.getElementById(newMovieActive)
    movieActiveNew.classList.add('active-movie')

    movieActive = newMovieActive
}

function changeMainMovie(movieId) {
    changeMovieActiveInList(movieId)

    const movie = movies.find(movie => movie.id === movieId)

    setMainMovie(movie)
    changeButtonMenu()        

}

function createButtonMovie(movieId) {
    const button = document.createElement('button')
    button.setAttribute(`onclick`, `changeMainMovie('${movieId}')`)
    button.innerHTML = '<img src="./images/icon-play-button.png">'

    return button
}

function createImageMovie(movieImage, movieTitle) {
    const divImageMovie = document.createElement('div')
    divImageMovie.classList.add('movie_image')

    const image = document.createElement('img')
    image.setAttribute('src', movieImage)
    image.setAttribute('alt', `Imagem do filme ${movieTitle}`)
    image.setAttribute('loading', 'lazy')

    divImageMovie.appendChild(image)

    return divImageMovie
}

function addMovieInList(movie) {
    const movieElement = document.createElement('li')
    movieElement.classList.add('movie')
    movieElement.setAttribute('id', movie.id)

    const genre = `<span>${movie.genre}</span>`
    const title = `<strong>${movie.title}</strong>`

    movieElement.innerHTML = genre + title
    movieElement.appendChild(createButtonMovie(movie.id))
    movieElement.appendChild(createImageMovie(movie.image.small, movie.title))

    moviesElement.appendChild(movieElement)     
}

function loadMovies() {
    const LIST_MOVIES = ['tt12801262', 'tt7146812', 'tt5109280', 'tt3521164', 'tt2380307', 'tt2948372', 'tt8097030'] 
    
    LIST_MOVIES.map((movie, index) => {
        fetch(getUrlMovie(movie)).then(response => response.json()).then(data => {
            const movieData = {
                id: movie,
                title: data.title,
                overview: data.overview,
                vote_average: data.vote_average,
                genre: data.genres[2].name,
                release: data.release_date.split('-')[0],
                image: {
                    original: BASE_URL_IMAGE.original.concat(data.backdrop_path),
                    small: BASE_URL_IMAGE.small.concat(data.backdrop_path)
                }
            }    

            movies.push(movieData)

            addMovieInList(movieData)

            if (index === 0) {
                setMainMovie(movieData)

                movieActive = movieData.id

                const movieActiveNew = document.getElementById(movieData.id)
                movieActiveNew.classList.add('active-movie')  
            }
        })
    })
}

loadMovies()