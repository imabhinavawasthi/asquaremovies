import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function Home() {


    const [searchtxt, funsearch] = useState('');  //Text on search bar
    const [movielist, showmovies] = useState([]); //Movie list to be diplayed
    const [nomovielist, noshowmovies] = useState(false);  //if no movie

    useEffect(() => {
        let term = localStorage.getItem("searchItem");
        if (term) {
            fetchmovies(term)
        }
    }, [])

    const setsearch = (e) => {
        funsearch(e.target.value)   // set string search
    }
    const fetchmovies = (searcht) => {
        const searchurl = `https://www.omdbapi.com/?s=${searcht}&page=2&apikey=e98286fa`

        localStorage.setItem("searchItem", searcht);

        fetch(searchurl).then(response => response.json()).then(result => {
            if (result.Error) {
                showmovies([])
                noshowmovies(true)
            }
            else {
                showmovies(result.Search)
                noshowmovies(false)
            }
        })


        // console.log(searcht);
    }

    const movieitems = movielist.map(movie => {
        return (
            <div key={`${movie.imdbID}`}>
                <div class="col">
                    <div class="card shadow-sm">
                        <img alt="poster" width="100%" height="225" class="bd-placeholder-img card-img-top" src={movie.Poster}></img>
                        <div class="card-body">
                            <h2>{movie.Title}</h2>
                            <h6 class="card-text">Year Released: {movie.Year}</h6>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <NavLink to={`/movie/detail/${movie.imdbID}`}><button type="button" class="btn btn-sm btn-outline-secondary">More Details</button></NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    function clearresult() {
        funsearch('')
        showmovies([])
        localStorage.removeItem("searchItem")
    }
    return (
        <div>
            <section class="py-5 text-center container">
                <div class="row py-lg-5">
                    <div class="col-lg-6 col-md-8 mx-auto">
                        <h1 class="fw-light">Asquare Movies</h1>
                        <p class="lead text-muted">Your Place To Chill!</p>

                        <p>
                            <div class="form-outline">
                                <input type="text" onChange={setsearch} id="form1" class="form-control" placeholder="Enter Movie Name    ex. Batman" aria-label="Search" />
                            </div>
                        </p>
                        <p>
                            <button class="btn btn-primary my-2 me-2" onClick={() => fetchmovies(searchtxt)}>Search</button>
                            <button class="btn btn-secondary my-2" onClick={clearresult}>Clear Results</button>
                        </p>
                    </div>
                </div>
            </section>
            {nomovielist ? <h6 >No Movie Found</h6> : <h6> </h6>}
            <section>
                <div class="album py-5 bg-light">
                    <div class="container">
                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                            {movieitems}
                        </div>
                    </div>
                </div>
            </section>

        </div>


    );

}

export default Home;