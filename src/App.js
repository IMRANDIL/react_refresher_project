import React, { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';
import SearchIcon from './search.svg'


// 5c80d000

const API_URL = `http://www.omdbapi.com/?apikey=5c80d000`




const App = () => {

  const [movies, setMovies] = useState([]);

  const [serachTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true)



  const searchMovies = async (title) => {
    setLoading(true)
    const response = await fetch(`${API_URL}&s=${title}`);
    const { Search } = await response.json();
    setLoading(false)
    setMovies(Search)
  }





  useEffect(() => {

    searchMovies('Love')



  }, [])








  return (
    <div className="app">
      <h1>MovieArena</h1>



      <div className="search">
        <input placeholder='Search for movies...' value={serachTerm} onChange={(e) => { setSearchTerm(e.target.value) }} />
        <img src={SearchIcon} alt="search-img" onClick={() => searchMovies(serachTerm)} />
      </div>
      {loading && <h2 style={{ textAlign: 'center', color: 'pink', marginTop: '15px' }}>Loading...</h2>}
      {movies?.length > 0 ? (
        <div className="container">

          {movies.map((movie, i) => (
            <MovieCard key={movie.imdbID} {...movie} />
          ))}

        </div>
      ) : (
        <div className='empty'>
          <h2>No Movies Found!</h2>
        </div>
      )}



    </div>
  );
}

export default App;
