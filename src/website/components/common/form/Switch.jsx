import React, { useState } from 'react';
function Switch() {
    const [enabled, setEnabled] = useState  (( eval( localStorage.getItem("switch"))));

    const settingSwitch = (e) => {
        setEnabled(!enabled);
        const body = document.body;
        if(!enabled) {
            localStorage.setItem('theme', "dark")
            localStorage.setItem('switch', true)
            body.classList.add("active")
        }
        else {
            localStorage.setItem('theme', "ligth")
            localStorage.setItem('switch', false);
            body.classList.remove("active")
        }
    }

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
    <div className="flex">
        <label className="inline-flex relative items-center cursor-pointer">
            {console.log(enabled)}
            <input type="checkbox" className="sr-only peer" checked={enabled  ? true : false} readOnly />
            <div onClick={settingSwitch} className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
            ></div>
        </label>
    </div>
</div>
  )
}

export default Switch