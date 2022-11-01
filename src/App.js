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
    setMovies([...movies, e]);
    setMovieDataStore(true);
  }

  const filterMovie = (e) => {
    
console.log(e.length );
    // At least 2 words must  be inputed
    if (e.length > 1) {
// console.log('hey')  
      // setMovies(
     const result = movies.filter(
          // (movie) => movie._name_.match(new RegExp(e, "i"))
          (movie) => movie._name_.startsWith(e) 
          )

      console.log(result)
      
      if (result.length > 0 ) {
        setMovies(result);

      } else {
        
        setNoMovieSearchResult(true);
        setMovieDataStore(false);

      }

      // );

      // setNoMovieSearchResult(true);

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
