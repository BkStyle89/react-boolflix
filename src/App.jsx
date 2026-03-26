import { useState,useEffect } from "react";
function App() {

  const api_key=import.meta.env.VITE_API_KEY
  
  const api_url=`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${onSearch}`
  
  const [searchFilm, setSearchFilm]=("")
  const [films,setFilms]=useState([])

  function findFilm(){
  fetch(api_url)
  .then(res=>res.json())
  .then(data=>setFilms(data)
  
  
)}
useEffect(findFilm)


function onSearch(){
  if(films.find(item=>item.title)){
    setFilms(onSearch)
    console.log(setFilms);
    
  }
}


  return (
    <>
      <div className="input-group">
        <div className="form-outline" data-mdb-input-init>
          <input id="search-focus" type="search" className="form-control" />
          <label className="form-label">Search</label>
        </div>
        <button onClick={onSearch} type="button" className="btn btn-primary" data-mdb-ripple-init>
        <i className="fas fa-search"> cerca</i>
        </button>

      </div>
    </>
  )
}

export default App
