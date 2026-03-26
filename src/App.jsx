
function App() {

  const api_key=import.meta.env.VITE_API_KEY
  const api_url=`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=ritorno+al+fut`
  console.log(api_url);
  

  return (
    <>
     
     


    </>
  )
}

export default App
