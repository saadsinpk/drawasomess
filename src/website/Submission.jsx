import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header2 from '../website/components/common/Header2';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import img1 from '../dist/webImages/1.png';
import { FaPlay } from "react-icons/fa";
import ThanksMessage from '../website/components/common/ThanksMessage';
import { ReactSketchCanvas } from "react-sketch-canvas";


  const Submission = class extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        some: " ",
        color: "white"
      };
  
      this.canvas = React.createRef();
    }
  
    selectPenColor = (colors) => {
      this.setState({
        color: colors
      });
      console.log(this.state.color);
    };
  
    render() {
      return (
        <div>
          <ReactSketchCanvas
            style={{
              border: "0.0625rem solid #fff"
            }}
            ref={this.canvas}
            strokeWidth={4}
            strokeColor={this.state.color}
            canvasColor="black"
          />
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
              class=""
              onClick={() => this.selectPenColor("rgb(250, 49, 66)")}
            >
              <div
                data-v-2d5e4991=""
                style={{ background: " rgb(250, 49, 66)" }}
              ></div>
            </button>
            <button
              data-v-2d5e4991=""
              class=""
              onClick={() => this.selectPenColor("rgb(21, 127, 251)")}
            >
              <div
                data-v-2d5e4991=""
                style={{ background: "rgb(21, 127, 251)" }}
              ></div>
            </button>
            <button
              data-v-2d5e4991=""
              class=""
              onClick={() => this.selectPenColor("rgb(253, 210, 48)")}
            >
              <div
                data-v-2d5e4991=""
                style={{ background: "rgb(253, 210, 48)" }}
              ></div>
            </button>
            <button
              data-v-2d5e4991=""
              class=""
              onClick={() => this.selectPenColor("rgb(81, 215, 39)")}
            >
              <div
                data-v-2d5e4991=""
                style={{ background: "rgb(81, 215, 39)" }}
              ></div>
            </button>
            <button
              data-v-2d5e4991=""
              class=""
              onClick={() => this.selectPenColor("rgb(241, 124, 252)")}
            >
              <div
                data-v-2d5e4991=""
                style={{ background: "rgb(241, 124, 252)" }}
              ></div>
            </button>
            <button
              data-v-2d5e4991=""
              class=""
              onClick={() => this.selectPenColor("rgb(131, 95, 244)")}
            >
              <div
                data-v-2d5e4991=""
                style={{ background: "rgb(131, 95, 244)" }}
              ></div>
            </button>
            <button
              data-v-2d5e4991=""
              class=""
              onClick={() => this.selectPenColor("rgb(114, 225, 253)")}
            >
              <div
                data-v-2d5e4991=""
                style={{ background: "rgb(114, 225, 253)" }}
              ></div>
            </button>
            <button
              data-v-2d5e4991=""
              class=""
              onClick={() => this.selectPenColor("rgb(255, 152, 0)")}
            >
              <div
                data-v-2d5e4991=""
                style={{ background: "rgb(255, 152, 0)" }}
              ></div>
            </button>
            <button
              data-v-2d5e4991=""
              class=""
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

export default Submission