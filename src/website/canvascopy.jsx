import React from 'react'
import { ReactSketchCanvas } from "react-sketch-canvas";


  const Canvas = class extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        some: " ",
        color: "#000"
      };
  
      this.canvas = React.createRef();
      let canvas = this;
      console.log(canvas)
    }
  
    selectPenColor = (colors) => {
      this.setState({
        color: colors
      });
      console.log(this.state.color);
    };
  
    render() {
      return (
        <div className='canvasc'>
          <ReactSketchCanvas
            style={{
              border: "0.0625rem solid #fff"
            }}
            ref={this.canvas}
            strokeWidth={4}
            strokeColor={this.state.color}
            canvasColor="#fff"
          />
          <div className='gap-2 flex canvasbtn'>
          <button
            onClick={() => {
              this.canvas.current
                .exportImage("png")
                .then((data) => {
                  console.log(data);
                  this.setState({
                    some: data
                  });
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
            className="btn btn-primary"
          >
            Get Image
          </button>
          <button
            onClick={() => {
              this.canvas.current.eraseMode(false);
            }}
            className="btn btn-primary"
          >
            Pen
          </button>
          <button
            onClick={() => {
              this.canvas.current.eraseMode(true);
            }}
            className="btn btn-primary"
          >
            Eraser
          </button>
          <button
            onClick={() => {
              this.canvas.current.resetCanvas();
            }}
            className="btn btn-primary"
          >
            Reset
          </button>
  
          <button
            onClick={() => {
              this.canvas.current.redo();
            }}
            className="btn btn-primary"
          >
            Redo
          </button>
          <button
            onClick={() => {
              this.canvas.current.undo();
            }}
            className="btn btn-primary"
          >
            Undo
          </button>
          </div>
          <div data-v-2d5e4991="" class="color-picker">
            <input type="color" onChange={(e) => this.selectPenColor(e.target.value)}  />
            <button
              data-v-2d5e4991=""
              class="active"
             
            >
              <div data-v-2d5e4991="" style={{ background: "white" }}></div>
            </button>
         
          </div>
          {this.state.some !== "" && <img src={this.state.some} />}
        </div>
      );
    }
}

export default Canvas