import { useState,useEffect } from "react";
function App() {

  const api_key=import.meta.env.VITE_API_KEY
  
  const[search,setSearch] = useState("")
  const [searchFilm,setSearchFilm] = useState("")
  const [films,setFilms] = useState([])
  const api_url=`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${search}`
  

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
    setSearch(films.find(e => e.original_title.includes(searchFilm)))
    console.log(search);
    
    /*   setFilms()
      console.log(setFilms); */
      
    
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

      </div>
    </>
  )
}

export default App
