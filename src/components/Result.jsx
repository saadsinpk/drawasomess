import React from 'react'

function Result() {
  return (
   <>
   <div className="result grid grid-cols-4 gap-2  px-5">
    <div className="resultBox text-center">
        <div className="resultBox__top">0</div>
        <div className="resultBox__bottom">Played</div>
    </div>
    <div className="resultBox text-center">
        <div className="resultBox__top">0</div>
        <div className="resultBox__bottom">Win %</div>
    </div>
    <div className="resultBox text-center">
        <div className="resultBox__top">0</div>
        <div className="resultBox__bottom">Current Streak</div>
    </div>
    <div className="resultBox text-center">
        <div className="resultBox__top">0</div>
        <div className="resultBox__bottom">Max Streak</div>
    </div>
   </div>
   </>
  )
}

export default Result