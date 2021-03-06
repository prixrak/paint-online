import Tool from "./Tool";

export default class Brush extends Tool {
  constructor(canvas, socketDraw) {
    super(canvas, socketDraw);
    this.listen();
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    this.canvas.onmouseleave = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e) {
    if(this.mouseDown) {
      this.mouseDown = false;
      this.socketDraw.finishDrawFigure();
    }
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
  }

  mouseMoveHandler(e) {
    if(this.mouseDown) {
      // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
      this.socketDraw.drawFigure({
        type: 'brush',
        x: e.pageX - e.target.offsetLeft,
        y: e.pageY - e.target.offsetTop,
        strokeStyle: this.ctx.strokeStyle,
        lineWidth: this.ctx.lineWidth
      });
    }
  }

  static drawStatic(ctx, x, y, strokeStyle, lineWidth) {
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
  }

}