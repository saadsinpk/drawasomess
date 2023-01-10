import { useState } from "react";
import React from 'react';
import $ from "jquery";


function Keyboard({keyboa,submitenter}) {
  const [value, setValue] = useState("");
  const keyboardClick = (e) => {
     $(".typeval").val($(".typeval").val() +  e.target.getAttribute("data-key"));
    }
    const keyboardClickback = () => {
      let val = $(".typeval").val();
      let val2 = val.split("");
      val2.pop();
      $(".typeval").val(val2.join(""));
    }

  return (
    <> <div className="typeKeyboard px-5"> 
    <input type="text"  className='typeval'   value={value} readOnly   placeholder='Ice Skating' />
   </div>
   <div className="Keyboard-module" role="group" aria-label="Keyboard">
       <div className="container mx-auto px-4">
    <div className="Keyboard-module_row my-2 flex items-center gap-2">
        <button type="button"onClick={keyboardClick}  data-key="q" className="Key-module_row-button flex items-center justify-center">q</button>
        <button type="button" onClick={keyboardClick} data-key="w" className="Key-module_row-button flex items-center justify-center">w</button>
        <button type="button" onClick={keyboardClick} data-key="e" className="Key-module_row-button flex items-center justify-center">e</button>
        <button type="button" onClick={keyboardClick} data-key="r" className="Key-module_row-button flex items-center justify-center">r</button>
        <button type="button" onClick={keyboardClick} data-key="t" className="Key-module_row-button flex items-center justify-center">t</button>
        <button type="button" onClick={keyboardClick} data-key="y" className="Key-module_row-button flex items-center justify-center">y</button>
        <button type="button" onClick={keyboardClick} data-key="u" className="Key-module_row-button flex items-center justify-center">u</button>
        <button type="button" onClick={keyboardClick} data-key="i" className="Key-module_row-button flex items-center justify-center">i</button>
        <button type="button" onClick={keyboardClick} data-key="o" className="Key-module_row-button flex items-center justify-center">o</button>
        <button type="button" onClick={keyboardClick} data-key="p" className="Key-module_row-button flex items-center justify-center">p</button></div>
        <div className="Keyboard-module_row my-2 flex items-center gap-2">
            <div data-testid="spacer" className="keygap"></div>
            <button type="button" onClick={keyboardClick} data-key="a" className="Key-module_row-button flex items-center justify-center">a</button>
            <button type="button" onClick={keyboardClick} data-key="s" className="Key-module_row-button flex items-center justify-center">s</button>
            <button type="button" onClick={keyboardClick} data-key="d" className="Key-module_row-button flex items-center justify-center">d</button>
            <button type="button" onClick={keyboardClick} data-key="f" className="Key-module_row-button flex items-center justify-center">f</button>
            <button type="button" onClick={keyboardClick} data-key="g" className="Key-module_row-button flex items-center justify-center">g</button>
            <button type="button" onClick={keyboardClick} data-key="h" className="Key-module_row-button flex items-center justify-center">h</button>
            <button type="button" onClick={keyboardClick} data-key="j" className="Key-module_row-button flex items-center justify-center">j</button>
            <button type="button" onClick={keyboardClick} data-key="k" className="Key-module_row-button flex items-center justify-center">k</button>
            <button type="button" onClick={keyboardClick} data-key="l" className="Key-module_row-button flex items-center justify-center">l</button>
            <div data-testid="spacer" className="keygap"></div>
            </div>
            <div className="Keyboard-module_row my-2 flex items-center gap-2">
                <button type="button" onClick={submitenter && submitenter} data-key="↵" className="Key-module_row-button flex items-center justify-center Key-module_oneAndAHalf__K6JBY">enter</button>
            <button type="button" onClick={keyboardClick} data-key="z" className="Key-module_row-button flex items-center justify-center">z</button>
            <button type="button" onClick={keyboardClick} data-key="x" className="Key-module_row-button flex items-center justify-center">x</button>
            <button type="button" onClick={keyboardClick} data-key="c" className="Key-module_row-button flex items-center justify-center">c</button>
            <button type="button" onClick={keyboardClick} data-key="v" className="Key-module_row-button flex items-center justify-center">v</button>
            <button type="button" onClick={keyboardClick} data-key="b" className="Key-module_row-button flex items-center justify-center">b</button>
            <button type="button" onClick={keyboardClick} data-key="n" className="Key-module_row-button flex items-center justify-center">n</button>
            <button type="button" onClick={keyboardClick} data-key="m" className="Key-module_row-button flex items-center justify-center">m</button>
            <button type="button" onClick={keyboardClickback} data-key="←" aria-label="backspace" className="Key-module_row-button flex items-center justify-center Key-module_oneAndAHalf__K6JBY"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="game-icon" data-testid="icon-backspace"><path fill="var(--color-tone-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path></svg></button>
            </div>
            <div className="Keyboard-module_row my-2 flex items-center gap-2">
            <div data-testid="spacer" className="keygap"></div>
            <button type="button" onClick={keyboardClick} data-key=" " className="Key-module_row-button flex items-center justify-center">Space</button>
            <div data-testid="spacer" className="keygap"></div>
            </div>
            </div>
            </div></>
     
  )
}

export default Keyboard