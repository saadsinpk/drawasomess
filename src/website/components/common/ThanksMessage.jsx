import React from 'react'
import Social from './Social'

function ThanksMessage({handles}) {
  return (
    <div className='thanksMessage my-5 p-3'>
        <h2>Thank You for Submitting</h2>
        <p>Please check back to see if your photo will be chosen. Remember your email will not be shared with the public. Only the Username will be shared for game results to show if you selected Yes.</p>
        <button className='my-2 mx-auto block btn btn-primary' onClick={handles}>back</button>
        <div className='flowBox mt-5 text-center'>
                <h2 className='mb-2'>Follow us below</h2>
                <Social data={"f"} />
            </div>
    </div>
  )
}

export default ThanksMessage