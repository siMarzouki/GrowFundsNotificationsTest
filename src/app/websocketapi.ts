import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AppComponent } from './app.component';

export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:1004/our-websocket';
    topic: string = "/user/topic/private-messages";
    stompClient: any;
    appComponent: AppComponent;


    constructor(appComponent: AppComponent){
        this.appComponent = appComponent;
    }
    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame: any) {
            _this.stompClient.subscribe("/topic/messages", function (sdkEvent: any) {
                _this.onPublicMessageReceived(sdkEvent);
            });
            _this.stompClient.subscribe("/user/topic/private-messages", function (sdkEvent: any) {
                _this.onPrivateMessageReceived(sdkEvent);
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);
    };

    _disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
        console.log("Disconnected");
    }

    // on error, schedule a reconnection attempt
    errorCallBack(error: any) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this._connect();
        }, 5000);
    }

 /**
  * Send message to sever via web socket
  * @param {*} message 
  */
    _send(message: any) {
        console.log("calling logout api via web socket");
        this.stompClient.send("/app/hello", {}, JSON.stringify(message));
    }

    onPublicMessageReceived(message: any) {
        console.log("Message Recieved from Server :: " + JSON.parse(message.body).content);
        this.appComponent.handlePublicMessage(JSON.parse(message.body).content);
    }
    onPrivateMessageReceived(message: any) {
        console.log("Message Recieved from Server :: " + JSON.parse(message.body).content);
        this.appComponent.handlePrivateMessage(JSON.parse(message.body).content);
    }
}