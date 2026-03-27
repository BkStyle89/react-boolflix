import { useState,useEffect } from "react";
function App() {

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


  return (
    <>
    <div className="container">
      <div className="row">
          <div className="input-group">
            <div className="form-outline" data-mdb-input-init>
              <form onSubmit={handleSubmit}>
                <input id="search-focus" type="text" value={searchFilm} onChange={e=> setSearchFilm(e.target.value)} className="form-control" />
                <label className="form-label">Search</label>
              </form>
            </div>
            </div>
            <button onClick={onSearch} type="button" className="btn btn-primary" data-mdb-ripple-init>
              <i className="fas fa-search"> cerca</i>
            </button>
          <div className="container ">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
              <div className="card bg-danger">
                { films.map(film=>(
                  <ul className="bg-light">
                    <li key={film.id} className="bg-light">
                      <div className="text-center bg-light">{film.title}</div>
                      <br />
                      <div className="text-center bg-light">{film.original_title}</div>
                      <br />
                      <img className="poster bg-light" src={`https://image.tmdb.org/t/p/w400/${film.poster_path}`} alt="Poster" />
                      <br />
                      <div className="text-center bg-light">
                        <div className={`fi fi-${film.original_language}`}></ div>
                      </div>
                      <br />
                      <div className="d-flex justify-content-between bg-light">
                        <div className="bg-light">
                          {film.vote_average.toFixed()}
                        </div>
                        <div className="bg-light">
                          {film.vote_count}
                        </div>
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
              <div className="card gy-5 bg-danger">
                { tvSeries.map(tv=>(
                  <ul className="bg-light">
                    <li className="bg-light" key={tv.id}>
                      <div className="text-center bg-light">{tv.name}</div>
                      <br />
                      <div className="text-center bg-light">{tv.original_name
}</div>
                      <br />
                      <img className="poster bg-light" src={`https://image.tmdb.org/t/p/w400/${tv.poster_path}`} alt="Poster" />
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
                    </li>
                  </ul>
                )) }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
