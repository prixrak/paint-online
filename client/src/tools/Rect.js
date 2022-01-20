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
    this.canvas.onmouseleave = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e) {
    if(this.mouseDown) {
      this.mouseDown = false;
      this.socketDraw.drawFigure({ // send message to draw rect
        type: 'rect', 
        x: this.startX,
        y: this.startY,
        width: this.width,
        height: this.height,
        fillStyle: this.ctx.fillStyle,
        strokeStyle: this.ctx.strokeStyle,
        lineWidth: this.ctx.lineWidth
      });
      this.socketDraw.finishDrawFigure();
    }
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

  draw(x, y, w, h) { // is to use, when you draw on canvas and want to see, change rect live
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

  // is to use, when u get message from server to 
  // draw rect with static value
  static drawStatic(ctx, x, y, w, h, fillStyle, strokeStyle, lineWidth) { 
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.stroke();
  }

}