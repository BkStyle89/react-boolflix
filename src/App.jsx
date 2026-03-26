
function App() {

  const api_key=import.meta.env.VITE_API_KEY
  
  const api_url=`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=ritorno+al+fut`
  console.log(api_url);
  

  return (
    <>
      <div className="input-group">
        <div className="form-outline" data-mdb-input-init>
          <input id="search-focus" type="search" className="form-control" />
          <label className="form-label">Search</label>
        </div>
        <button type="button" className="btn btn-primary" data-mdb-ripple-init>
        <i className="fas fa-search"> cerca</i>
        </button>
      </div>
    </>
  )
}

export default App
