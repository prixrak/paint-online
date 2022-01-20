import Tool from "./Tool";


export default class Circle extends Tool {
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
    this.savedCanvas = this.canvas.toDataURL();
  }

  mouseUpHandler(e) {
    if(this.mouseDown) {
      this.mouseDown = false;
      this.socketDraw.drawFigure({ // send message to draw rect
        type: 'circle', 
        x: this.startX,
        y: this.startY,
        r: this.r,
        fillStyle: this.ctx.fillStyle,
        strokeStyle: this.ctx.strokeStyle,
        lineWidth: this.ctx.lineWidth
      });
      this.socketDraw.finishDrawFigure();
    }
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let curentX = e.pageX - e.target.offsetLeft;
      let curentY = e.pageY - e.target.offsetTop;
      let width = curentX - this.startX;
      let height = curentY - this.startY;
      this.r = Math.sqrt(width ** 2 + height ** 2);
      this.draw(this.startX, this.startY, this.r);
    }
  }

  draw(x, y, r) {
    const img = new Image();
    img.src = this.savedCanvas;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    }
  }


  // is to use, when u get message from server to 
  // draw circle with static value
  static drawStatic(ctx, x, y, r, fillStyle, strokeStyle, lineWidth) { 
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}