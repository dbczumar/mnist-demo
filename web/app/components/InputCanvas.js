//Copyright (c) 2016-2017 Shafeen Tejani. Released under GPLv3.
import React from "react";
import { findDOMNode } from 'react-dom';

function toPixelIntensities(imageData) {
  const pixelIntensities = Array(imageData.length / 4); //RGBA

  for (let i=0; i < imageData.length; i=i+4) {
    pixelIntensities[i/4] = imageData[i+3];
  }
  return pixelIntensities
}

class InputCanvas extends React.Component {

  componentDidMount() {
    this.canvas = findDOMNode(this.refs.inputCanvas);
    this.ctx = this.canvas.getContext('2d');

    this.canvas.addEventListener("touchstart", this.onMouseDown, false);
    this.canvas.addEventListener("touchend", this.onMouseUp, false);
    this.canvas.addEventListener("touchmove", this.onMouseMove, false);

    // Prevent scrolling when touching the canvas
    document.body.addEventListener("touchstart", function (e) {
      if (e.target.id == "input-canvas") {
        e.preventDefault();
      }
    }, false);
    document.body.addEventListener("touchend", function (e) {
      if (e.target.id == "input-canvas") {
        e.preventDefault();
      }
    }, false);
    document.body.addEventListener("touchmove", function (e) {
      if (e.target.id == "input-canvas") {
        e.preventDefault();
      }
    }, false);
  }

  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.getCursorPosition = this.getCursorPosition.bind(this);
    this.drawLine = this.drawLine.bind(this);
    this.clear = this.clear.bind(this);
    this.state = {
      currentPosition: null,
      drawing: false
    };
  }

  onMouseDown(e) {
    this.setState({drawing: true});
    this.setState({currentPosition: this.getCursorPosition(e)});
  }

  onMouseMove(e) {
    if (!this.state.drawing) return;

    const previousPosition = this.state.currentPosition;
    const currentPosition = this.getCursorPosition(e);

    this.drawLine(previousPosition, currentPosition);

    // const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    // this.props.onInputUpdated(toPixelIntensities(imageData), 448);
    console.log("AHHHHHHHH")
    this.setState({currentPosition: currentPosition});
  }

  onMouseUp(e) {
    if (this.state.drawing) {
      this.setState({drawing: false});
      this.props.onInputReady();
    }
  }

  drawLine(start, end) {
    this.ctx.save();
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.beginPath();
    this.ctx.lineWidth = 16;
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.restore();
  }

  getCursorPosition(e) {
    let xPos, yPos;
    if (e.touches !== undefined) {
      xPos = e.touches[0].clientX;
      yPos = e.touches[0].clientY
    } else {
      xPos = e.clientX;
      yPos = e.clientY;
    }
    const {top, left} = this.canvas.getBoundingClientRect();
    return {
      x: xPos - left,
      y: yPos - top
    };
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.props.onInputCleared();
  }

  render() {
    return <div className="input-canvas-container">
            <div style={{marginBottom: "10px"}}>
              <i className="fa fa-pencil" aria-hidden="true"></i>
              <span style={{marginLeft: "0.5em"}}>Draw a digit</span>
            </div>
            <canvas id="input-canvas"
                    className="input-canvas"
                    ref="inputCanvas"
                    width={448} height={448}
                    onMouseDown={this.onMouseDown}
                    onMouseMove={this.onMouseMove}
                    onMouseOut={this.onMouseUp}
                    onMouseUp={this.onMouseUp}
                    />
              <span className="clear-canvas" onClick={this.clear}>
                <span style={{marginLeft: "0.5em"}}>reset</span>
              </span>
          </div>
  }
};

export default InputCanvas;
