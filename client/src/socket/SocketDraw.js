export default class SocketDraw {
  constructor(socket, sessionId) {
    this.socket = socket;
    this.sessionId = sessionId;
  }

  finishDrawFigure() {
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.sessionId,
      figure: {
        type: 'finish',
      }
    }));
  }

  drawFigure(figure) {
    this.socket.send(JSON.stringify({ // when mouse move send x and y coordinate for all users in this session to draw
      method: 'draw',
      id: this.sessionId,
      figure
    }));
  }
}