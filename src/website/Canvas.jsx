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
          <video controls></video>
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
          >
            Get Image
          </button>
          <button
            onClick={() => {
              this.canvas.current.eraseMode(false);
            }}
          >
            Pen
          </button>
          <button
            onClick={() => {
              this.canvas.current.eraseMode(true);
            }}
          >
            Eraser
          </button>
          <button
            onClick={() => {
              this.canvas.current.resetCanvas();
            }}
          >
            Reset
          </button>
  
          <button
            onClick={() => {
              this.canvas.current.redo();
            }}
          >
            Redo
          </button>
          <button
            onClick={() => {
              this.canvas.current.undo();
            }}
          >
            Undo
          </button>
          <div data-v-2d5e4991="" class="color-picker">
            <button
              data-v-2d5e4991=""
              class="active"
              onClick={() => this.selectPenColor("white")}
            >
              <div data-v-2d5e4991="" style={{ background: "white" }}></div>
            </button>
            <button
              data-v-2d5e4991=""
              className="canvasbutton"
              onClick={() => this.selectPenColor("rgb(250, 49, 66)")}
            >
              <div
                data-v-2d5e4991=""
                style={{ background: " rgb(250, 49, 66)" }}
              ></div>
            </button>
            <button
              data-v-2d5e4991=""
              className="canvasbutton"
              onClick={() => this.selectPenColor("rgb(21, 127, 251)")}
            >
              <div
                data-v-2d5e4991=""
                style={{ background: "rgb(21, 127, 251)" }}
              ></div>
            </button>
            <button
              data-v-2d5e4991=""
              className="canvasbutton"
              onClick={() => this.selectPenColor("rgb(253, 210, 48)")}
            >
              <div
                data-v-2d5e4991=""
                style={{ background: "rgb(253, 210, 48)" }}
              ></div>
            </button>
            <button
              data-v-2d5e4991=""
              className="canvasbutton"
              onClick={() => this.selectPenColor("rgb(81, 215, 39)")}
            >
              <div
                data-v-2d5e4991=""
                style={{ background: "rgb(81, 215, 39)" }}
              ></div>
            </button>
            <button
              data-v-2d5e4991=""
              className="canvasbutton"
              onClick={() => this.selectPenColor("rgb(241, 124, 252)")}
            >
              <div
                data-v-2d5e4991=""
                style={{ background: "rgb(241, 124, 252)" }}
              ></div>
            </button>
            <button
              data-v-2d5e4991=""
              className="canvasbutton"
              onClick={() => this.selectPenColor("rgb(131, 95, 244)")}
            >
              <div
                data-v-2d5e4991=""
                style={{ background: "rgb(131, 95, 244)" }}
              ></div>
            </button>
            <button
              data-v-2d5e4991=""
              className="canvasbutton"
              onClick={() => this.selectPenColor("rgb(114, 225, 253)")}
            >
              <div
                data-v-2d5e4991=""
                style={{ background: "rgb(114, 225, 253)" }}
              ></div>
            </button>
            <button
              data-v-2d5e4991=""
              className="canvasbutton"
              onClick={() => this.selectPenColor("rgb(255, 152, 0)")}
            >
              <div
                data-v-2d5e4991=""
                style={{ background: "rgb(255, 152, 0)" }}
              ></div>
            </button>
            <button
              data-v-2d5e4991=""
              className="canvasbutton"
              onClick={() => this.selectPenColor("rgb(152, 82, 19)")}
            >
              <div
                data-v-2d5e4991=""
                style={{ background: "rgb(152, 82, 19)" }}
              ></div>
            </button>
          </div>
          {this.state.some !== "" && <img src={this.state.some} />}
        </div>
      );
    }
}

export default Canvas