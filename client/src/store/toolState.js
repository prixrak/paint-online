import { makeAutoObservable } from "mobx";

class ToolState {
  tool = null;

  // save the stroke color, because when we change the tool to an eraser,
  // the stroke color will be set to white, so save it to restore
  strokeStyle = 'black'; 
  fillStyle = 'black'; 
  lineWidth = 1; 

  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool) {
    this.tool = tool;
  }

  setFillColor(color) {
    this.fillStyle = color;
    this.tool.fillColor = color;
  }

  setStrokeColor(color) {
    this.strokeStyle = color;
    this.tool.strokeColor = color;
  }

  setLineWidth(width) {
    this.lineWidth = width;
    this.tool.lineWidth = width;
  }
}

export default new ToolState();