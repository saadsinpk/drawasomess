import React from 'react'
import Social from './Social'

function ThanksMessage() {
  return (
    <div className='thanksMessage my-5 p-3'>
        <h2>Thank You for Submitting</h2>
        <p>Please check back to see if your photo will be chosen. Remember your email will not be shared with the public. Only the Username will be shared for game results to show if you selected Yes.</p>
        {/* <div className='flowBox mt-5 text-center'>
                <h2 className='mb-2'>Follow us below</h2>
                <Social />
            </div> */}
    </div>
  )
}

export default ThanksMessage