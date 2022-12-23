import React from 'react'

function UserModal() {
  return (
    <div  className="Modal">
    <div className="Modal__heading p-2 flex items-center">
    <div className="Modal__heading--left" onClick={removeModal}><AiOutlineArrowLeft /></div>
    <h2 className="Modal__heading-right mx-auto my-0">{popuptext}</h2>
    </div>
    <div className="Modal__body p-3">
        <input type="text"  />

        <button className='btn btn-primary'>Submit</button>

        <p>Please enter your game username to see if you ranked top 30 today.</p>
        <p>if you do not wish to enter a username , please click <a href="#">here</a> to see result without your ranking</p>
    </div>
    </div>
  )
}

export default UserModal