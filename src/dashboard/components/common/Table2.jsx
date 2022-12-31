import React,{useState, useCallback,useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";

function Table2({data,switches,saved}) {
    const [toggleval, settoggleval] = useState("")
    const ref = useRef(null);
    const Switchtoggle = useCallback((e) => {
        switches(e.target.getAttribute('checked'));
        if(e.target.value == "true") {
            e.target.value = "false"
        }
        else {
            e.target.value = "false"
        }
      
    }, []);
    const savedbtn = (item,e) => {
        saved(item)
    }
    const initialValues = {
        username: "",
          password: "",
        };
    return (
          
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
               <input name='checkbox' ref={ref} type="checkbox" readOnly defaultChecked={is_active == 1 ?true:false} value={is_active == 1 ?true:false}  onClick={Switchtoggle} className="sr-only peer"  />
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
            
  )
}

export default Table2