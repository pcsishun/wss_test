import { io } from 'socket.io-client'; 

class SocketioService {
    
    constructor() {
        this.socket;
        this.messageOut;
    }

    socketConnection(){
        this.socket = io("http://localhost:3040");
        return this.socket
    }
 

    disconnect(){
        if(this.socket){
            this.socket.disconnect();
        }
    }

    sentMessage(type,massage){
        this.socket.emit("receive-message", massage)
    }
 
}

export default new SocketioService();

