import React from 'react'
import Header from '../website/components/common/Header';
import Keyboard from '../website/components/common/Keyboard';
import img1 from '../dist/webImages/1.png';
import { FaPlay } from "react-icons/fa";
import Social from '../website/components/common/Social';

function PlayBy() {
  return (
    <>
    <Header  />
    <div className='my-2'>
    <Social />
    </div>
    <div className="diagramMain">
    <p><span id="more-1072"></span></p>
<div id="drawingDiv" >
	<canvas id="canvas1" className='mx-auto block' style={{"width":"90%", "height":"280px",  "border":"1px solid #000"}}></canvas>
<div id="colorsDiv" className='flex p-2 justify-between'>
  <div className="left">
		<span>Colors :</span>
    <div className='flex gap-2'>
<div className="colorbox selectedColor" id="blackbox" style={{"backgroundColor":"black"}} ></div>
<div className="colorbox" id="redbox" style={{"backgroundColor":"red"}}></div>
<div className="colorbox" id="bluebox" style={{"backgroundColor":"blue"}}></div>
<div className="colorbox" id="whitebox" style={{"backgroundColor":"white"}}></div>
<div className="colorbox" id="greenbox" style={{"backgroundColor":"green"}}></div>
</div>
</div>
<div className="right">
	<span>	Stoke Size :</span>
  <div className='flex items-center gap-2'>
<div className="stroke stroke_selected" style={{"borderRadius":"3px","borderWidth":"3px"}}></div>
<div className="stroke" style={{"borderRadius":"6px","borderWidth":"5px"}}></div>
<div className="stroke" style={{"borderRadius":"8px","borderWidth":"7px"}}></div>
<div className="stroke" style={{"borderRadius":"12px","borderWidth":"10px"}}></div>
<div className="stroke" style={{"borderRadius":"16px","borderWidth":"13px"}}></div>
<div className="stroke" style={{"borderRadius":"18px","borderWidth":"15px"}}></div>
</div>
</div>
</div>

<div id="canvasBtnsDiv " className='flex gap-2 flex_wrap p-3'>
<input type="button" className='btn btn-primary' id="recordBtn" value="Record" />
<input type="button" className='btn btn-primary' id="playBtn" value="Play" />
<input type="button" className='btn btn-primary' id="pauseBtn" value="Pause" />
  <input type="button" className='btn btn-primary' id="clearBtn" value="Clear" />
    <input type="button" className='btn btn-primary' id="serializeBtn" value="Serialize" />
    <input type="button" className='btn btn-primary' id="deserializeBtn" value="Deserialize" />
</div>
<div id="serializerDiv" style={{"display":"none"}}>
<textarea rows="8" cols="60" id="serDataTxt"></textarea>
<br />
<input type="button" id="cancelBtn" value="Close" />
<input type="submit" id="okBtn" value="Submit" />
</div>

   
   </div>
   </div>
   <Keyboard />
    </>  )
}

export default PlayBy