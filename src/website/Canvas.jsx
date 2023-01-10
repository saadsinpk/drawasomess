import React, { useRef, useState } from 'react'
import { ReactSketchCanvas } from "react-sketch-canvas";

function Canvas() {
  const [canvasdata, setCanvasdata] = useState({
    some: " ",
    color: "#000"
  })
  const refcanvas = useRef();
  return (
    <div className='canvasc'>
          <ReactSketchCanvas
            style={{
              border: "0.0625rem solid #fff"
            }}
            ref={refcanvas}
            strokeWidth={4}
            strokeColor={canvasdata.color}
            canvasColor="#fff"
          />
          </div>
  )
}

export default Canvas