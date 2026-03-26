import { useState,useEffect } from "react";
function App() {

  const api_key=import.meta.env.VITE_API_KEY
  
  const[search,setSearch] = useState("")
  const [searchFilm,setSearchFilm] = useState("")
  const [films,setFilms] = useState([])
  const[flag,setFlag] = useState ()
  const[tvSeries, setTvSeries] = useState([])
  const api_url=`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchFilm}`
  const api_tv_series=`https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${searchFilm}` 
  
  function findSeries(){
    fetch(api_tv_series)
    .then(res=>res.json())
    .then(data=>{
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
      <div className="input-group">
        <div className="form-outline" data-mdb-input-init>
          <form onSubmit={handleSubmit}>
          <input id="search-focus" type="text" value={searchFilm} onChange={e=> setSearchFilm(e.target.value)} className="form-control" />
          <label className="form-label">Search</label>
          </form>
        </div>
        <button onClick={onSearch} type="button" className="btn btn-primary" data-mdb-ripple-init>
        <i className="fas fa-search"> cerca</i>
        </button>
        { films.map(film=>(
          
          <ul key={film.id}>
          <li>{film.title}</li>
          <li>{film.original_title}</li>
          <li>{film.original_language}</li>
          <li>{film.vote_average}</li>
          <li>{film.vote_count}</li>
        </ul>
        )) }

      </div>
    </>
  )
}

export default App
