import { makeAutoObservable } from "mobx";

class SessionState {
  username = '';
  socketDraw = null;
  alert = {
    show: false,
    message: ''
  };

  constructor() {
    makeAutoObservable(this);
  }

  setSocketDraw(socket) {
    this.socketDraw = socket;
  }

  setUsername(name) {
    this.username = name;
  }

  setAlert(alert) {
    this.alert = alert;
    setTimeout(() => this.alert = { show: false, message: ''}, 2000);
  }

}

export default new SessionState();