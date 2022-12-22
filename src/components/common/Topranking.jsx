import React from 'react'
import { AiOutlineArrowLeft } from "react-icons/ai";
import Social from './Social';

function Topranking({popuptext}) {
  return (
    <div  className={'StatisticsMain Topranking'}>
     <div className="StatisticsMain-top p-2 flex items-center">
         <div className="StatisticsMain-top-left">
             <AiOutlineArrowLeft />
         </div>
         <h2 className="heading-right mx-auto my-0">{popuptext}</h2>
     </div>
     <div className='section1'>
   
            <div className="section1__list mt-5">
                <ul className='list'>
                    <li className='flex justify-between items-center'>
                        <div className="section1__list-left">
                            <span>1.</span>Muzzammil
                        </div>
                        <div className="section1__list-right">
                            5.32
                        </div>
                        </li>
                    <li className='flex justify-between items-center'>
                        <div className="section1__list-left">
                            <span>1.</span>Muzzammil
                        </div>
                        <div className="section1__list-right">
                            5.32
                        </div>
                        </li>
                    <li className='flex justify-between items-center'>
                        <div className="section1__list-left">
                            <span>1.</span>Muzzammil
                        </div>
                        <div className="section1__list-right">
                            5.32
                        </div>
                        </li>
                    <li className='flex justify-between items-center'>
                        <div className="section1__list-left">
                            <span>1.</span>Muzzammil
                        </div>
                        <div className="section1__list-right">
                            5.32
                        </div>
                        </li>
                    <li className='flex justify-between items-center'>
                        <div className="section1__list-left">
                            <span>1.</span>Muzzammil
                        </div>
                        <div className="section1__list-right">
                            5.32
                        </div>
                        </li>
                    <li className='flex justify-between items-center'>
                        <div className="section1__list-left">
                            <span>1.</span>Muzzammil
                        </div>
                        <div className="section1__list-right">
                            5.32
                        </div>
                        </li>
                </ul>
            </div>
            <div className="section1Box section1Box3 my-2">
            <div className='flowBox text-center'>
                <h2 className='mb-2'>Follow us below</h2>
                <Social />
            </div>
            </div>
     </div>
     </div>
  )
}

export default Topranking