import React from 'react'
import Header from './components/common/Header';
import Keyboard from './components/common/Keyboard';
import Setting from './components/common/Setting';
import Typekeyboard from './components/common/Typekeyboard';

function Home() {
  return (
   <>
   <Header />
   <Setting />
   <div className="jeff text-center flex justify-end p-4 ml-auto">
    Today's submission by JEFF
   </div>
   <Keyboard />
   </>
  )
}

export default Home;