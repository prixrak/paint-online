import Tool from "./Tool";


export default class Line extends Tool {
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

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.ctx.moveTo(this.startX, this.startY);
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.x = e.pageX - e.target.offsetLeft;
      this.y = e.pageY - e.target.offsetTop;
      this.draw(this.x, this.y);
    }
  }
  
  mouseUpHandler(e) {
    this.mouseDown = false;
    this.socketDraw.drawFigure({ // send message to draw rect
      type: 'line', 
      startX: this.startX,
      startY: this.startY,
      endX: this.x,
      endY: this.y,
      strokeStyle: this.ctx.strokeStyle,
      lineWidth: this.ctx.lineWidth
    });
    this.socketDraw.finishDrawFigure();
  }

  draw(x, y) {
    const img = new Image()
    img.src = this.saved
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  }

  // is to use, when u get message from server to 
  // draw circle with static value
  static drawStatic(ctx, startX, startY, endX, endY, strokeStyle, lineWidth) { 
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
}