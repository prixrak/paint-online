import toolState from "../store/toolState";
import Brush from "./Brush";

export default class Eraser extends Brush {
  constructor(canvas, socketDraw) {
    super(canvas, socketDraw);
    this.listen();
  }

  mouseMoveHandler(e) {
    if(this.mouseDown) {
      // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
      this.socketDraw.drawFigure({
        type: 'eraser',
        x: e.pageX - e.target.offsetLeft,
        y: e.pageY - e.target.offsetTop,
        lineWidth: this.ctx.lineWidth
      });
    }
  }
  
  static drawStatic(ctx, x, y, lineWidth) {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.strokeStyle = toolState.strokeColor;
  }
}