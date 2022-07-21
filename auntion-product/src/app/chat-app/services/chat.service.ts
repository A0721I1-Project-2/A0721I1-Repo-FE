import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList, snapshotChanges} from '@angular/fire/database';
import {AngularFireStorage} from '@angular/fire/storage';
import {ApiService} from './api.service';
import {Member} from '../../model/Member';
import {finalize} from 'rxjs/operators';
import {FileUpload} from '../models/FileUpload';
import {Observable} from 'rxjs';
import {Account} from '../../model/Account';
import {ConnectFirebaseService} from './connect-firebase.service';
import {ChatMessage} from '../models/ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  /* To store account after login */
  account: any;

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
  sendMessage(message: any, fileUpload: any, accountId: any) {
    const timeStamp = this.getTimeStamp();

    /* Create new path for admin and user */
    let path = `messages/${accountId}`;

    this.chatMessages = this.getMessages(accountId);

    if (fileUpload == null) {
      fileUpload = null;
      this.isFile = null;
    }

    console.log(message);
    console.log(this.isFile);

    /* Get username by account Id */
    this.chatMessages.push({
      message: message,
      username: this.account.username,
      fileUpload: fileUpload,
      timeSent: timeStamp,
      isFile: this.isFile,
      isOwn: this.account.roles
    });

    /* To hidden quantity when its role admin */
    let breakProgram = this.connectFirebaseService.getStatusMsg(this.account.id).subscribe(data => {
      if (this.account.id === 1) {
        this.connectFirebaseService.setStatusMsg(accountId, false, 0, message);
      } else {
        if (data == null) {
          this.connectFirebaseService.setStatusMsg(accountId, true, 0, message);
        } else {
          this.connectFirebaseService.setStatusMsg(accountId, true, data.quantity, message);
        }
      }
      /* To break for loop when sent */
      breakProgram.unsubscribe();
    });

    /* Ignore error socket and save with id user */
    // this.getMessages(accountId).snapshotChanges().subscribe(key => {
    //   path = `messages/${accountId}/${key[key.length - 1].key}`;
    //   this.db.object(path).update(this.chatMessages).catch(error => console.log(error));
    // });
  }

  /* Get messages */
  getMessages(accountId: any): AngularFireList<ChatMessage[]> {
    return this.db.list(`messages/${accountId}`, ref => ref.orderByKey().limitToLast(400));
  }

  /* Delete message */
  deleteMessage(accountId: any): void {
    /* Get key in message to delete */
    this.getMessages(accountId).snapshotChanges().subscribe(key => {
      const path = `messages/${accountId}`;

      console.log(key);
      // return this.db.list(path).remove(key[key.length - 1].key);
    });
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
  pushFileToStorage(message: any, fileUpload: FileUpload, accountId: any): Observable<any> {
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
          } else {
            this.saveImg(uploadTask, storageRef);
          }

          /* Fix there */
          this.sendMessage(message, fileUpload, accountId);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  /* To check url or img */
  checkFileOrImg(file: File): boolean {
    const fileCheck = file.type;
    const checkImg = fileCheck.substr(0, fileCheck.indexOf('/'));
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
    const date = now.getDate() + '/' +
      (now.getMonth() + 1) + '/' + now.getFullYear();

    const time = now.getHours() + ':' +
      (now.getMinutes() > 10 ? '' + now.getMinutes() : '0' + now.getMinutes());

    const timeShow = now.getHours() > 12 ? 'PM' : 'AM';
    return date + ' ' + time + ' ' + timeShow;
  }

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage
    , private apiService: ApiService, private connectFirebaseService: ConnectFirebaseService) {
    this.account = JSON.parse(window.localStorage.getItem('user'));
    if (this.account == null) {
      this.account = JSON.parse(window.localStorage.getItem('admin'));
    }
  }
}