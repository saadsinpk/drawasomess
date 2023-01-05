import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

function Table({data,itemsPerPage,tableheader}) {
    // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (               
    <>
     <div className="tableScroll">
           <table className="table">
            <thead>
                <tr>
                    
                    <th></th>
                  {  
                  tableheader.map(({name},index) =>{
                    return (
                        <th key={index}>{name}</th>

                    )

                    })}
                </tr>
            </thead>
            <tbody>       
    {
      currentItems.map((item,index) => {
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
        }
         

</tbody>

</table>
</div>
<ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
              containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
 previousLinkClassName={'page-link'}
 nextClassName={'page-item'}
 nextLinkClassName={'page-link'}
 activeClassName={'active'}
                />
          </>
            
  )
}

export default Table