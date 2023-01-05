import React,{useState, useCallback,useRef } from 'react';
import $ from "jquery";
import ReactPaginate from 'react-paginate';

function Table2({data,switches,saved,itemsPerPage}) {
    const ref = useRef(null);
    const Switchtoggle = useCallback((e) => {
        switches(e.target.checked);
    }, []);
    const savedbtn = (item,e) => {
        item.is_active = $(e.target).closest("tr").find(".sr-only").is(":checked");
        saved(item)
    }
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % data.length;
      // console.log( `User requested page number ${event.selected}, which is offset ${newOffset}` );
      setItemOffset(newOffset);
    }
    return (
          <>
        <div className="tableScroll">
                <table className="table">
                     <thead>
        <tr>
             <th></th>
             <th>Username</th>
             <th> Email</th>
             <th>TikTok</th>
             <th>Twitter</th>
             <th>Instagram</th>
             <th>Facebook</th>
             <th>Share User</th>
             <th>Share Social</th>
             <th>Creation Date</th>
             <th>Active</th>
             <th>IP Address</th>
             <th></th>
         </tr>
     </thead>
     <tbody>
         {
        data.map((item,index) => {
          const {email,username,tiktok_link,twitter_link,instagram_link,share_user,share_social,created_at,is_active,id,ip_address} = item
            return(
                <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>{username}</td>
                <td>{email}</td>
                <td>{tiktok_link}</td>
                <td>{twitter_link}</td>
                <td>{instagram_link}</td>
                <td></td>
                <td>{share_user}</td>
                <td>{share_social}</td>
                <td>{created_at}</td>
                <td>
                <div className="relative flex flex-col items-center justify-center overflow-hidden">
       <div className="flex">
           <label className="inline-flex relative items-center cursor-pointer">
               <input name='checkbox' ref={ref} type="checkbox" readOnly defaultChecked={is_active == 1 ?true:false}   onClick={Switchtoggle} className="sr-only peer"  />
               <div  className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
               ></div>
           </label>
       </div>
   </div>
                </td>
                <td>{ip_address}</td>
                <td></td>
                <td> <button className='btn btn-primary' onClick={(e) => savedbtn(item,e)}>Save</button></td>
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

export default Table2