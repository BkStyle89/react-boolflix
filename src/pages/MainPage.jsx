import { useState,useEffect } from "react"
import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";

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
    setSearch(tvSeries?.find(e=> e.original_title?.includes(searchFilm))) 
  }
  

function handleSubmit(e){
  e.preventDefault()
}




function ratingStars(vote){

    const stars = []    
    const ratingCeil = Math.ceil(vote/2)

/*     for(let i=0; i<ratingCeil; i++){
        stars.push(<i class="bi bi-star-fill"></i>)
    }
    for(let i=ratingCeil; i<5; i++){
        stars.push(<i class="bi bi-star"></i>)
    } */
    
    for(let i=0; i<5;i++){
        if(i<ratingCeil){
            stars.push(<i class="bi bi-star-fill"></i>)
        }else{
            stars.push(<i class="bi bi-star"></i>)
        }
    }


    return stars
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
                    <div className="col">
                        <div className="wrap">
                            <div className="card bg-dark d-flex mt-3 h-auto">
                                <div key={film.id} className="text-light p-3">
                                    <div className="d-flex justify-content-center">
                                        <img className="poster bg-light border border-dark" src={`https://image.tmdb.org/t/p/w342/${film.poster_path}`} alt="Poster" />
                                    </div>
                                    <div className="content">
                                        <div className="text-center text-light fw-bolder">{film.title}</div>
                                        <br />
                                        <div className="text-center text-light fw-bold">{film.original_title}</div>
                                        <br />
                                        <br />
                                        <div className="text-center ">
                                            <div className={`fi fi-${film.original_language}`}></ div>
                                        </div>
                                        <p className="text-center">{film.overview}</p>
                                        <br />
                                        <div className="d-flex justify-content-between text-light">
                                            
                                            <div className="text-light">{ ratingStars(film.vote_average)}</div>
                                            <div className="text-light">{film.vote_count}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            
{/*  Card Delle Serie TV */}

                {tvSeries.map(tv=>(
                    <div className="col">
                        <div className="wrap">
                            <div className="card bg-dark d-flex p-3 mt-3 h-auto">
                                <div className="bg-light p-3" key={tv.id}>
                                    <div className="d-flex justify-content-center">
                                        <img className="poster bg-light border border-dark" src={`https://image.tmdb.org/t/p/w342/${tv.poster_path}`} alt="Poster" />
                                    </div>
                                    <div className="content">
                                        <div className="text-center text-light fw-bolder">{tv.name}</div>
                                        <br />
                                        <div className="text-center text-light fw-bold">{tv.original_name}</div>
                                        <br />
                                        <br />
                                        <div className="text-center ">
                                            <div className={`fi fi-${tv.original_language}`}></div>
                                        </div>
                                        <p className="text-light text-center">{tv.overview} </p>
                                        <br />
                                        <div className="d-flex justify-content-between text-light">
                                            <div className="text-light">
                                                {ratingStars(tv.vote_average)}
                                            </div>
                                            <div className="text-light">
                                                {tv.vote_count}
                                            </div>
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
<AppFooter/>
</>
    )
}