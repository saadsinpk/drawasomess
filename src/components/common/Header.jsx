import React from 'react';
import { AiOutlineSetting } from "react-icons/ai";
import { FaBars,FaQuestion,FaRegSun,FaAlignLeft } from "react-icons/fa";

function Header() {
  return (
    <div className="header py-2">
        <div className="container flex justify-between items-center gap-1 mx-auto px-4">
            <div className="header__left flex  items-center gap-2">
                <div className="header__leftnavber">
                    <FaBars />
                </div>
                <div className="header__lefttext">
                    Drawesome
                </div>
            </div>
            <div className="header__right">
                    <ul className='list flex justify-center gap-2'>
                        <li><a href="#"><FaQuestion /></a></li>
                        <li><a href="#"><FaAlignLeft /></a></li>
                        <li><a href="#"><AiOutlineSetting /></a></li>
                    </ul>
            </div>
        </div>
    </div>
  )
}

export default Header;