import React from 'react'

function Table({data}) {
  return (
    
                    
        data.map((item,index) => {
          const {word_phrase,
              day_of_week,
              date_today,
              view_count,
              games_completed,
              fastest_time,
              average_time,
              link_to_photo} = item
            return(
             <tr key={index}>
              <td><input type="checkbox" /></td>
              <td>{word_phrase}</td>
              <td>{day_of_week}</td>
              <td>{date_today}</td>
              <td>{view_count}</td>
              <td>{games_completed}</td>
              <td>{fastest_time}</td>
              <td>{average_time}</td>
              <td><a href={link_to_photo}><img className='block mx-auto' style={{width:"50px",height:"50px",borderRadius:"50%"}} src={link_to_photo} target="_blank" alt="" /></a></td>
              </tr>
             );
            
          })
            
  )
}

export default Table