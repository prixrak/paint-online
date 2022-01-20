import { makeAutoObservable } from "mobx";
import { postCanvas } from "../API/canvasAPI";

class CanvasState {
  canvas = null;
  undoList = [];
  redoList = [];
  canvasId = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  setCanvasId(id) {
    this.canvasId = id;
  }

  pushToUndo(data) {
    this.undoList.push(data);
  }

  undo()  {
    let ctx = this.canvas.getContext('2d');
    if (this.undoList.length > 0) {
      let dataUrl = this.undoList.pop();
      this.redoList.push(this.canvas.toDataURL());
      let img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      }
      postCanvas(dataUrl, this.canvasId); // post canvas to server and then get it by another user on canvas by specific id
    }
  }

  redo() {
    let ctx = this.canvas.getContext('2d');
    if (this.redoList.length > 0) {
      this.undoList.push(this.canvas.toDataURL());
      let dataUrl = this.redoList.pop();
      let img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      }
      postCanvas(dataUrl, this.canvasId); // post canvas to server and then get it by another user on canvas by specific id
    }
  }
}

export default new CanvasState();