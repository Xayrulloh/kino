// let API_KEY = 'b971c2f0de8767f08d2bb84160ba24b7'
// poster_path vote_average title release_date
// movieName min max score

let API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'
let tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1` 
let tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`
let tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1`
let local = JSON.parse(window.localStorage.getItem('last')) || 'popular'

start()

search.onclick = async() => {
    if (movieName.value || min.value || max.value || score.value) {
        let filtered = []
        let movies = await fetch(`https://api.themoviedb.org/3/movie/${local}?api_key=${API_KEY}&page=${title.textContent}`)
        movies = await movies.json()

        if (movieName.value) {
            for (let b = 0; b < movies.results.length; b++) {
                if (movies.results[b].title.toLowerCase().includes(movieName.value.toLowerCase())) {
                        filtered.push(movies.results[b])
                }
            }
        }

        if (min.value || max.value) {
            if (filtered.length) {
                let copy = []
                if (min.value && max.value) {
                    for (let a of filtered) {
                        if (+a.release_date.slice(0, 4) >= min.value && +a.release_date.slice(0, 4) <= max.value) {
                            copy.push(a)
                        }
                    }
                    filtered = copy
                } else if (min.value) {
                    for (let a of filtered) {
                        if (+a.release_date.slice(0, 4) >= min.value) {
                            copy.push(a)
                        }
                    }
                    filtered = copy
                } else if (max.value) {
                    for (let a of filtered) {
                        if (+a.release_date.slice(0, 4) <= max.value) {
                            copy.push(a)
                        }
                    }
                    filtered = copy
                }
            } else {
                if (min.value && max.value) {
                    for (let b = 0; b < movies.results.length; b++) {
                        if (+movies.results[b].release_date.slice(0, 4) >= min.value && +movies.results[b].release_date.slice(0, 4) <= max.value) {
                            filtered.push(movies.results[b])
                        }
                    }
                } else if (min.value) {
                    for (let b = 0; b < movies.results.length; b++) {
                            if (+movies.results[b].release_date.slice(0, 4) >= min.value) {
                                filtered.push(movies.results[b])
                        }
                    }
                } else if (max.value) {
                    for (let b = 0; b < movies.results.length; b++) {
                        if (+movies.results[b].release_date.slice(0, 4) <= max.value) {
                            filtered.push(movies.results[b])
                        }
                    }
                }
            }
        }

        if (score.value) {
            if (filtered.length) {
                let copy = []
                for (let a of filtered) {
                    if (a.vote_average >= score.value) {
                        copy.push(a)
                    }
                }
                filtered = copy
            } else {
                for (let b = 0; b < movies.results.length; b++) {
                    if (+movies.results[b].vote_average >= score.value) {
                        filtered.push(movies.results[b])
                    }
                }
            }
        }
        if (!filtered.length) {alert('not found please search from next page')}
        else {
            placeMovies.innerHTML = null
            for (let movie of filtered) {
                placeMovies.innerHTML += `<div class="movie">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
                <div class="movie-info">
                <h3>${movie.title}</h3>
                <span class="orange">${movie.vote_average}</span>
                </div>
                <span class="date">${movie.release_date}</span>
                </div>`
            }
        }
        [movieName.value, min.value, max.value, score.value] = [null, null, null, null]
    } else alert('Nothing to search')
}

topk.onclick = async() => {
    [movieName.value, min.value, max.value, score.value] = [null, null, null, null]
    title.textContent = '1'
    local = 'top_rated'
    window.localStorage.setItem('last', JSON.stringify(local))
    let movies = await data()
    await replace(movies)
}

pop.onclick = async() => {
    [movieName.value, min.value, max.value, score.value] = [null, null, null, null]
    title.textContent = '1'
    local = 'popular'
    window.localStorage.setItem('last', JSON.stringify(local))
    let movies = await data()
    await replace(movies)
}

upcom.onclick = async() => {
    [movieName.value, min.value, max.value, score.value] = [null, null, null, null]
    title.textContent = '1'
    local = 'upcoming'
    window.localStorage.setItem('last', JSON.stringify(local))
    let movies = await data()
    await replace(movies)
}

prev.onclick = async() => {
    if (title.textContent == 1) return
    let num = title.textContent
    title.textContent = (+num - 1).toString()
    let movies = await data(title.textContent)
    await replace(movies)
    
}

next.onclick = async() => {
    let num = title.textContent
    title.textContent = (+num + 1).toString()
    let movies = await data(title.textContent)
    await replace(movies)
    
}


async function data(page = 1) {
    let movies = await fetch(`https://api.themoviedb.org/3/movie/${local}?api_key=${API_KEY}&page=${page}`)
    movies = await movies.json()
    return movies
}

async function start() {
    let movies = await data()
    for (let movie of movies.results) {
        placeMovies.innerHTML += `<div class="movie">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">

       <div class="movie-info">
           <h3>${movie.title}</h3>
           <span class="orange">${movie.vote_average}</span>
        </div>
        <span class="date">${movie.release_date}</span>
    </div>`
    }
}

async function replace(which = local) {
    placeMovies.innerHTML = null
    let movies = which
    for (let movie of movies.results) {
        placeMovies.innerHTML += `<div class="movie">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">

       <div class="movie-info">
           <h3>${movie.title}</h3>
           <span class="orange">${movie.vote_average}</span>
        </div>
        <span class="date">${movie.release_date}</span>
    </div>`
    }
}

























