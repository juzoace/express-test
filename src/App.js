import React, {useState} from 'react'
import './App.css'
import 'h8k-components'

import { Movieform, Movieslist, Search } from './components'


const title = 'Favorite Movie Directory'

function App() {

  const [movies, setMovies] = useState([]);
  const [movieDataStore, setMovieDataStore ] = useState(false);
  const [noMovieSearchResult, setNoMovieSearchResult ] = useState(false)


  const addMovie = (e) => {
    setMovies(   [...movies, e].sort((a, b) => {
      return b._duration_.substring(0, e._duration_.indexOf(' ')) - a._duration_.substring(0, e._duration_.indexOf(' '));
    })   );
    setMovieDataStore(true);
  }

  const filterMovie = (e) => {
    
    if (Number(e.length) >= 2 ) {
        
          const result = movies.filter(o =>
            Object.keys(o).some(k => o[k].toLowerCase().includes(e.toLowerCase()))
            );
          console.log(result);
        // Result greater than 0
          if (result.length > 0 ) {
            setMovies(result);

          } 

          // Result is zero
          if (result.length == 0) {
            
            setNoMovieSearchResult(true);
            setMovieDataStore(false);

          } 
        
    } else {
      setMovies(movies);
      setMovieDataStore(true);
    }

   
  }


  return (
    <div>
      <h8k-navbar header={ title } />
      <div className='layout-row justify-content-center mt-100'>
        <div className='w-30 mr-75'>
          <Movieform addMovie={addMovie}/>
        </div>
        <div className='layout-column w-30'>
          <Search filterMovie = {filterMovie}/>

       {movieDataStore ? <div>
          <Movieslist movies={movies} /> 
             
        </div> : null}
          

        {noMovieSearchResult  ?
          <div data-testid='noResult'>
            <h3 className='text-center'>No Results Found</h3>
          </div> : null
      }
        </div>
      </div> 
    </div>
  )
}

export default App;
