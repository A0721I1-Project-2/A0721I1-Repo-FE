import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/storage";
import {ApiService} from "./api.service";
import {Member} from '../../model/Member';
import {finalize} from "rxjs/operators";
import {FileUpload} from "../models/FileUpload";
import {Observable} from "rxjs";
import {ChatMessage} from "../models/ChatMessage";
import {Account} from "../../model/Account";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  /* To get user */
  member: Member;
  account: Account;

  /* To store url download */
  downloadURL: any;

  /* To store message */
  chatMessages: AngularFireList<any>;

  /* Check file or img */
  isFile: boolean;

  /* Get url -> push */
  saveFileData(fileUpload: FileUpload): void {
    this.db.list('/uploads').push(fileUpload);
  }

  /* Send message */
  sendMessage(message: any , fileUpload: any) {
    const timeStamp = this.getTimeStamp();
    this.chatMessages = this.getMessages();
    console.log(message);
    if(fileUpload == null) {
      fileUpload = null;
      this.isFile = null;
    }
    this.chatMessages.push({
      message: message,
      fileUpload: fileUpload ,
      timeSent: timeStamp ,
      isFile: this.isFile,
      isOwn: this.account.roles
    })
  }

  /* Get messages */
  getMessages(): AngularFireList<ChatMessage[]> {
    /* messages must be correct because it is name url to contain database */
    return this.db.list('messages', ref => ref.orderByKey().limitToLast(400));
  }

  /* Save img */
  private saveImg(uploadTask: any, fileRef: any): void {
    window.XMLHttpRequest = XMLHttpRequest;
    window.Blob = Blob;
    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.db.list('/uploads').push(url);
            }
          });
        })
      )
      .subscribe(url => {
      });
  }

  /* Push file to storage */
  pushFileToStorage(message: any , fileUpload: FileUpload): Observable<any> {
    const filePath = `uploads/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.checkFileOrImg(fileUpload.file);

          if (this.isFile) {
            this.saveFileData(fileUpload);
            this.sendMessage(message , fileUpload);
          } else {
            this.saveImg(uploadTask, storageRef);
            this.sendMessage(message , fileUpload);
          }
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  /* To check url or img */
  checkFileOrImg(file: File): boolean {
    let fileCheck = file.type;
    let checkImg = fileCheck.substr(0, fileCheck.indexOf('/'));
    if (checkImg === 'image') {
      this.isFile = false;
      return false;
    } else {
      this.isFile = true;
      return true;
    }
  }

  /* Get and format time */
  getTimeStamp(): any {
    const now = new Date();
    const date = now.getFullYear() + '/' +
      (now.getMonth() + 1) + '/' + now.getDate();

    const time = now.getHours() + ':' +
      (now.getMinutes() + 1) + ':' + now.getSeconds();
    return date + ' ' + time;
  }

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage
  , private apiService: ApiService) {
    // Get user with current data
    this.apiService.getMemberByAccountId(1).subscribe(member => {
      this.member = member;
    });

    /* Get account with username */
    this.apiService.getAccountByUsername("anhtuan").subscribe(account => {
      this.account = account;
    });

    // this.user = JSON.parse(window.localStorage.getItem('user'));
  }
}
