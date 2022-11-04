import React, {useEffect, useState } from 'react'

function Search({filterMovie}) {

  const [entry, setEntry] = useState('')

  useEffect(() => {

    // if (entry.length >= 2) {
      filterMovie(entry);
    // }
    
    
  }, [entry])

  return (
    <section className='layout-row justify-content-center mb-40'>
      <input 
        type='text'
        placeholder='Search for movie by name' 
        className='w-75 py-2'
        data-testid='search'
        onChange={(e) => {
          setEntry(e.target.value)
        }}
      />
    </section>
  )
}

export default Search
