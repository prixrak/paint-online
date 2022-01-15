import { makeAutoObservable } from "mobx";

class ToolState {
  tool = null;

  // save the stroke color, because when we change the tool to an eraser,
  // the stroke color will be set to white, so save it to restore
  strokeColor = 'black'; 
  constructor() {
    makeAutoObservable(this);
  }

  setTool(tool) {
    this.tool = tool;
  }

  setFillColor(color) {
    this.tool.fillColor = color;
  }

  setStrokeColor(color) {
    this.strokeColor = color;
    this.tool.strokeColor = color;
  }

  setLineWidth(width) {
    this.tool.lineWidth = width;
  }
}

export default new ToolState();