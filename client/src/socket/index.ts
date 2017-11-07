import * as socketIo from 'socket.io-client';

export default class Emiter { 

  private socket: SocketIOClient.Socket;
  static instance: Emiter = null;

  constructor() { 
    this.socket = socketIo("http://192.168.150.64:3000");
  }

  static getEmiter(): Emiter { 
    if (this.instance === null)
      return this.instance = new Emiter;
    return this.instance;
  }

  public getIO(): SocketIOClient.Socket { 
    return this.socket;
  }

}