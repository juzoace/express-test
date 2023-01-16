import React, { useState } from 'react'

function Movieform( {addMovie} ) {

  const [ name, setMovieName] = useState('');
  const [ rating, setMovieRating ] = useState(0);
  const [ duration, setMovieDuration ] = useState('');
  const [ dataInvalid, setDataInValid ] = useState(false);
  const [ invalidRating, setRatingInvalid ] = useState(false);

  const handleClick = () => {

    // Movie duration check
    var durationDataCopy1;
    var durationDataCopy2; 

    durationDataCopy1 = duration;
    durationDataCopy2 = duration;

    // check length if string
    const lengthOfString = durationDataCopy1.length;

    //slice string 
    const integerValString = durationDataCopy1.slice(0, lengthOfString - 1);

    // Convert to integer
    const integerVal = parseInt(integerValString);

    // finalIntegerVal integer
    const finalCheckForInteger = Number.isInteger(integerVal);

    // last value check
    const lastValOfUserInput = durationDataCopy2.slice(-1);

    const lastValOfUserInputIntegerCheck = Number.isInteger( parseInt(lastValOfUserInput ) );

    if( (rating < '0') || (rating < '10') ) {
      setRatingInvalid(true);
    } else if (lastValOfUserInput !== 'h' && lastValOfUserInput !== 'm' || duration.length == 1 ) {
      setDataInValid(true);
    } else if ( (lastValOfUserInputIntegerCheck === false) && ( lastValOfUserInput === 'h' || 'm' ) && (finalCheckForInteger === true) ) {

      if (lastValOfUserInput === 'm') {
      
      const convertedVal = integerVal / 60;
      
      const roundedOffVal = convertedVal.toFixed(1)

        addMovie(
          // {_name_: name, _rating_: rating, _duration_: roundedOffVal}
          {_name_: name, _rating_: rating, _duration_: roundedOffVal < 2 ? `${roundedOffVal}`:  `${roundedOffVal}` }
          // {_name_: name, _rating_: rating, _duration_: `${roundedOffVal} Hrs`}
          )

          // Reset form value
          setMovieRating(0);
          setMovieDuration('');
          setMovieName('');

      } else {
        console.log(duration);
        addMovie(
          {_name_: name, _rating_: rating, _duration_: duration.slice(0, lengthOfString - 1)  < 2 ?`${duration.slice(0, lengthOfString - 1)}`: `${duration.slice(0, lengthOfString - 1)}` }
        )

        // Reset form value
        setMovieRating(0);
        setMovieDuration('');
        setMovieName('');

      }
      
    
    } 

  }

  return (
    <section>
      <div className='card pa-30'>
        <form onSubmit={ e => e.preventDefault() }>
          <div className='layout-column mb-15'>
            <label htmlFor='name' className='mb-3'>Movie Name</label>
            <input 
            onChange={(e) => {
              setMovieName(e.target.value)
              setDataInValid(false);
              setRatingInvalid(false);
            }} 
            value = {name}
              type='text' 
              id='name'
              placeholder='Enter Movie Name'
              data-testid='nameInput'
            />
          </div>
          <div className='layout-column mb-15'>
            <label htmlFor='ratings' className='mb-3'>Ratings</label>
            <input
            type="number"
            onChange={(e) => {
              setMovieRating(e.target.value)
              setDataInValid(false);
              setRatingInvalid(false);
            }} 
            value = {rating}
              id='ratings'
              placeholder='Enter Rating on a scale of 1 to 100'
              data-testid='ratingsInput'
            />
          </div>
          <div className='layout-column mb-30'>
            <label htmlFor='duration' className='mb-3'>Duration</label>
            <input 
            onChange={(e) =>{
              setMovieDuration(e.target.value);
              setDataInValid(false);
              setRatingInvalid(false);
            }}  
              value = {duration}
              type='text' 
              id='duration'
              placeholder='Enter duration in hours or minutes'
              data-testid='durationInput'
            />
          </div>
          {/* Use this div when time format is invalid */}
        {dataInvalid ? <div 
            className='alert error mb-30'
            data-testid='alert'
          >
            Please specify time in hours or minutes (e.g. 2.5h or 150m)
          </div>
          : null  

        } 


        {invalidRating ? <div 
            className='alert error mb-30'
            data-testid='alert'
          >
           Rating must be greater than 0 but less than 100 
          </div>
          : null 

        } 


          <div className='layout-row justify-content-end'>
            <button 
              type='submit'
              className='mx-0'
              data-testid='addButton'
              onClick = {(e) => {
                handleClick();
              }}
            >
              Add Movie
            </button>
          </div>
          </form>
      </div> 
    </section>
  )
}

export default Movieform
