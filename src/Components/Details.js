
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Details(props) { 
    const params = useParams();

    const [moviedetail, setmoviedetail] = useState({})

    useEffect(() => {

        const imdbId = params.imdbId
        fetchmoviedetails(imdbId)
    }, [])


    const fetchmoviedetails = (id) => {
        const moviedetailsurl = `https://www.omdbapi.com/?i=${id}&apikey=e98286fa`

        fetch(moviedetailsurl).then(response => response.json()).then(result => {
            setmoviedetail(result)
        })
    }

    return (
        <div className="container text-center">
            <div className="row">
                <div className="col mt-5">

                    <img alt="poster" src={moviedetail.Poster}></img>
                    <h1 class="mt-3 mb-3 ">{moviedetail.Title}</h1>
                    <h6 class=" mb-5">{moviedetail.Plot}</h6>
                    <table class="table">
                        <tbody>
                            <tr>
                                <th scope="row">Year Released:</th>
                                <td>{moviedetail.Released}</td>
                            </tr>
                            <tr>
                                <th scope="row">Genre:</th>
                                <td>{moviedetail.Genre}</td>
                            </tr>
                            <tr>
                                <th scope="row">Director:</th>
                                <td>{moviedetail.Director}</td>
                            </tr>
                            <tr>
                                <th scope="row">Writer:</th>
                                <td>{moviedetail.Writer}</td>
                            </tr>
                            <tr>
                                <th scope="row">Actors:</th>
                                <td>{moviedetail.Actors}</td>
                            </tr>
                            <tr>
                                <th scope="row">Language:</th>
                                <td>{moviedetail.Language}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Details;