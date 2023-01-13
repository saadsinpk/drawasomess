import React from 'react'

function Time({datas}) {
  return (
    <div className='timeMian my-4 text-center'>
        <h4 >Your Time Today</h4>
        <h2 className=''>{eval(datas.statistics.game_complete_time)} secs</h2>
    </div>
  )
}

export default Time