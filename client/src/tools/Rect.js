import Tool from "./Tool";

export default class Rect extends Tool {
  constructor(canvas, socketDraw) {
    super(canvas, socketDraw);
    this.listen();
  }

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
    this.socketDraw.drawFigure({
      type: 'rect', 
      x: this.startX,
      y: this.startY,
      width: this.width,
      height: this.height
    });
    this.socketDraw.finishDrawFigure();
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    // save start position for calculate width and height of rect when rerending
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;

    // save canvas state for drawing rect
    this.savedCanvas = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    if(this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;
      this.draw(this.startX, this.startY, this.width, this.height);
    }
  }

  draw(x, y, w, h) {
    const img = new Image();
    img.src = this.savedCanvas;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h);
      this.ctx.fill();
      this.ctx.stroke();
    }
  }

  static drawStatic(ctx, x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.stroke();
  }

}