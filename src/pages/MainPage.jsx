import { useState,useEffect } from "react"
import AppHeader from "../components/AppHeader";

export default function MainPage(){

const api_key=import.meta.env.VITE_API_KEY
  
  const[search,setSearch] = useState("")
  const [searchFilm,setSearchFilm] = useState("")
  const [films,setFilms] = useState([])
  const[tvSeries, setTvSeries] = useState([])
  const api_url=`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchFilm}`
  const api_tv_series=`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${searchFilm}` 
  
  
  function findSeries(){
    fetch(api_tv_series)
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      
      setTvSeries(data.results)
    })}
    useEffect(()=>{
      findSeries()
    },[search]) 

  function findFilm(){
  fetch(api_url)
  .then(res=>res.json())
  .then(data=>{
     console.log(data); 
    
    setFilms(data.results)
  }


  )}
  useEffect(()=>{
    findFilm()
  },[search])

  function onSearch(){
    setSearch(films?.find(e => e.original_title?.includes(searchFilm)))
    console.log(search); 
    setSearch(tvSeries?.find(e=> e.original_title.includes(searchFilm))) 
  }
  

function handleSubmit(e){
  e.preventDefault()
}


/* Stars From Boostrap

FullStar <i class="bi bi-star-fill"></i>
Half star <i class="bi bi-star-half"></i> 
empty Star <i class="bi bi-star"></i>

*/



    return(
        <>
            <AppHeader/>
            <main>
                <div className="input-group d-flex justify-content-center">
                    <div className="form-outline" data-mdb-input-init>
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex ">
                                <input id="search-focus" type="text" value={searchFilm} onChange={e=> setSearchFilm(e.target.value)}className="form-control" placeholder="Inserisci titolo" />
                                <label className="form-label text-dark"></label>
                            </div>
                            <div className="d-flex justify-content-center mt-2 mb-2">
                                <button onClick={onSearch} type="button" className="searchFilm btn btn-primary" data-mdb-ripple-init>
                                    <i className="fas fa-search bg-primary"> cerca</i>
                                </button>
                            </div>  
                        </form>
                    </div>
                </div>

{/* Container Ambe Le Card */}

<div className="container">
    <div className="row">

{/* Card Dei Film */}

        <div className="container ">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
                { films.map(film=>(
                    <div >
                        <div className="col">
                            <div className="card bg-dark d-flex p-3 mt-3">
                                <div key={film.id} className="bg-light p-3">
                                    <div className="text-center bg-light fw-bolder">{film.title}</div>
                                    <br />
                                    <div className="text-center bg-light fw-bold">{film.original_title}</div>
                                    <br />
                                    <div className="d-flex justify-content-center">
                                        <img className="poster bg-light border border-dark" src={`https://image.tmdb.org/t/p/w400/${film.poster_path}`} alt="Poster" />
                                    </div>
                                    <br />
                                    <div className="text-center bg-light">
                                        <div className={`fi fi-${film.original_language}`}></ div>
                                    </div>
                                    <br />
                                    <div className="d-flex justify-content-between bg-light">
                                        
                                        <div className="bg-light">{ film.vote_average.toFixed()}</div>
                                        <div className="bg-light">{film.vote_count}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            
{/*  Card Delle Serie TV */}

                {tvSeries.map(tv=>(
                    <div>
                        <div className="col">
                            <div className="card bg-dark d-flex p-3 mt-3">
                                <div className="bg-light p-3" key={tv.id}>
                                    <div className="text-center bg-light fw-bolder">{tv.name}</div>
                                    <br />
                                    <div className="text-center bg-light fw-bold">{tv.original_name}</div>
                                    <br />
                                    <div className="d-flex justify-content-center">
                                        <img className="poster bg-light border border-dark" src={`https://image.tmdb.org/t/p/w400/${tv.poster_path}`} alt="Poster" />
                                    </div>
                                    <br />
                                    <div className="text-center bg-light">
                                        <div className={`fi fi-${tv.original_language}`}></div>
                                    </div>
                                    <br />
                                    <div className="d-flex justify-content-between bg-light">
                                        <div className="bg-light">
                                            {tv.vote_average}
                                        </div>
                                        <div className="bg-light">
                                            {tv.vote_count}
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
</div>
</main>
</>
    )
}