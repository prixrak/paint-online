import { makeAutoObservable } from "mobx";

class SessionState {
  username = '';
  socket = null;
  sessionId = null
  constructor() {
    makeAutoObservable(this);
  }

  setSocket(socket) {
    this.socket = socket
  }
  
  setSessionId(id) {
    this.sessionId = id
  }

  setUsername(name) {
    this.username = name
  }

}

export default new SessionState();