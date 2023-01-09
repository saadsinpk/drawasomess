import { data } from 'jquery';
import React, { useState } from 'react'

function Result({datas}) {
  return (
   <>
   <div className="result grid grid-cols-4 gap-2  px-5">
    <div className="resultBox text-center">
        <div className="resultBox__top">{datas && datas.statistics.games_played}</div>
        <div className="resultBox__bottom">Played</div>
    </div>
    <div className="resultBox text-center">
        <div className="resultBox__top">{datas && datas.statistics.games_win}</div>
        <div className="resultBox__bottom">Win %</div>
    </div>
    <div className="resultBox text-center">
        <div className="resultBox__top">{datas && datas.statistics.current_streak}</div>
        <div className="resultBox__bottom">Current Streak</div>
    </div>
    <div className="resultBox text-center">
        <div className="resultBox__top">{datas && datas.statistics.max_streak}</div>
        <div className="resultBox__bottom">Max Streak</div>
    </div>
   </div>
   </>
  )
}

export default Result