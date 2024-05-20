// webSocket.service.ts
import {Injectable} from '@angular/core';
import {Stomp} from "@stomp/stompjs";
import * as SocketJS from 'sockjs-client';
import * as SockJS from 'sockjs-client';
import {BehaviorSubject} from "rxjs";

import {SocketMessage} from "../../apis/dtos/socket-message";
import {TYPESOCKET} from "../../constanst/TypeSocket";
import {ExportingBillFullModel} from "../../apis/dtos/Exporting-bill-full.model";

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private stompClient: any;
  private messageSubject: BehaviorSubject<String[]> = new BehaviorSubject<String[]>([]);

  constructor() {
    this.initConnectionSocket();
  }

  initConnectionSocket() {
    const url = '//localhost:5555/ws';
    const socket = new SocketJS(url);
    this.stompClient = Stomp.over(socket);
    console.log(this.stompClient);
  }

  joinSocket(idSocket: string) {
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/' + idSocket, (messages: any) => {
        const messageContent = JSON.parse(messages.body);
        this.messageSubject.next(messageContent);
      })
    })
  }

  sendMessage(idSocket: string, message: SocketMessage<ExportingBillFullModel>) {
    this.stompClient.send(`/app/${TYPESOCKET.BILL_REAL_TIME}/` + idSocket, {}, JSON.stringify(message))
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }
}
