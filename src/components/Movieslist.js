import React from 'react'

function Movieslist({movies}) {
  console.log(movies);
  return (
    
    <div>
    {movies.map((movie, key) => (

      <section key={key}>
      <ul 
        className='styled w-100 pl-0' 
        data-testid='moviesList'
      >
      <li 
        className='flex slide-up-fade-in justify-content-between'
        style={{borderBottom: '2px solid var(--primary-color)'}}
      >
        <div className='layout-column w-40'>
          {/* use this header for movie name */}
          
          <h3 className='my-3'>{movie._name_}</h3>
          {/* use this paragraph for movie ratings, for example: 'Ratings: 88/100' */}
          <p className='my-0'>Ratings: {movie._rating_}/100</p>
        </div>
        <div className='layout-row my-auto mr-20'>
          {/* use this paragraph for movie duration, for example: '2.5 Hrs' */}
          <p className='justify-content-end'>{movie._duration_} Hrs</p>
        </div>
      </li>
      </ul>
    </section>

  ))}
      </div>

  )
}

export default Movieslist;
