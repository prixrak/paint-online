import { makeAutoObservable } from "mobx";

class SessionState {
  username = '';
  socketDraw = null;

  constructor() {
    makeAutoObservable(this);
  }

  setSocketDraw(socket) {
    this.socketDraw = socket;
  }

  setUsername(name) {
    this.username = name;
  }

}

export default new SessionState();