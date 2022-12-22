import React, { useState } from 'react';

function Switch() {
    const [enabled, setEnabled] = useState(false);
    const settingSwitch = (e) => {
        setEnabled(!enabled);
        if(!enabled) {
            localStorage.setItem('theme', "dark")
            localStorage.setItem('switch', true)
        }
        else {
            localStorage.setItem('theme', "light")
            localStorage.setItem('switch', false);
        }
    }
    var switchget = localStorage.getItem("switch");
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
    <div className="flex">
        <label className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" checked={switchget == "true" ? switchget : enabled} readOnly />
            <div onClick={settingSwitch} className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
            ></div>
        </label>
    </div>
</div>
  )
}

export default Switch