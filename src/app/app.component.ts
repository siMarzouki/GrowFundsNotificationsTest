import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

import { WebSocketAPI } from './websocketapi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'websocketFronTest';
  webSocketAPI!: WebSocketAPI;
  publicNotifications: string[]=[];
  privateNotifications: string[]=[];


  showNotification = false;
  notificationMessage = '';
  notificationTitle = "";
  notificationColor = ""


  name!: string;
  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.webSocketAPI = new WebSocketAPI(this);
    this.connect()
  }

  connect(){
    this.webSocketAPI._connect();
  }
  handlePublicMessage(message:any){
    this.publicNotifications.push(message);
    this.notificationMessage = message;
    this.notificationTitle="Notification Publique!"
    this.showNotification = true;
    this.notificationColor="#D9E7E2"
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.showNotification = false;
      this.notificationMessage = '';
      this.cdRef.detectChanges();
    }, 5000);


    this.cdRef.detectChanges();

  }
  handlePrivateMessage(message:any){
    this.privateNotifications.push(message);
    this.notificationMessage = message;
    this.notificationTitle="Notification Privé!"
    this.notificationColor="#AAD1E7"
    this.showNotification = true;
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.showNotification = false;
      this.notificationMessage = '';
      this.cdRef.detectChanges();
    }, 5000);


    this.cdRef.detectChanges();

  }
}
