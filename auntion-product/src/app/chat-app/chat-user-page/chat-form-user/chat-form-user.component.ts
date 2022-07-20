import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileUpload} from "../../models/FileUpload";
import {Account} from "../../../model/Account";

@Component({
  selector: 'app-chat-form-user',
  templateUrl: './chat-form-user.component.html',
  styleUrls: ['./chat-form-user.component.css']
})
export class ChatFormUserComponent implements OnInit {

  /* To select file */
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;

  /* Get data user */
  user: any;

  /* Check img and url */
  isFile: boolean;
  uploadSrc: any;

  /* Hidden after upload */
  hidden: boolean = true;

  /* Form Chat */
  formChat: FormGroup;

  /* To show error message */
  showNotiError = false;

  constructor(private chatService: ChatService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    /* Get data user */
    this.user = JSON.parse(window.localStorage.getItem('user'));

    /* Form Chat */
    this.formChat = this.fb.group({
      message: ['', Validators.required]
    });
  }

  /* Send message */
  send() {
    /* Send message */
    let message = this.formChat.get('message').value;

    /* Check empty message */
    if ((message === '' || message == null) && this.selectedFiles == null) {
      this.showNotiError = true;
      setTimeout(() => {
        this.showNotiError = false;
      }, 3000);
    } else {
      if (this.formChat.value && this.selectedFiles == null) {
        this.chatService.sendMessage(message, null, this.user.id);
      }

      /* To send file */
      if (this.selectedFiles) {
        const file = this.selectedFiles.item(0);
        this.selectedFiles = undefined;
        this.currentFileUpload = new FileUpload(file);
        this.checkFileAndImg(file);

        if (message == null) {
          message = null;
        }

        this.chatService.pushFileToStorage(message, this.currentFileUpload, this.user.id).subscribe(percentage => {
            this.percentage = Math.round(percentage);
          },
          error => {
            console.log(error);
          }, () => {
            setTimeout(() => {
              this.uploadSrc = null;
            }, 1000);
          });
      }
    }
    this.formChat.reset();
  }

  selectFile(event: any) {
    /* To get info files selected */
    this.selectedFiles = event.target.files;

    /* Check file or img to show */
    this.checkFileAndImg(this.selectedFiles.item(0));

    /* To show images */
    // this.uploadSrc = [];
    //
    // let files = event.target.files;
    // if (files) {
    //   for (let file of files) {
    //     let reader = new FileReader();
    //     /* Check file or image */
    //     if (!this.isFile) {
    //       reader.onload = (e: any) => {
    //         this.uploadSrc.push(e.target.result);
    //       }
    //     } else {
    //       this.uploadSrc.push(file);
    //       reader.readAsDataURL(file);
    //     }
    //     reader.readAsDataURL(file);
    //   }
    // }

    // Single img
    this.selectedFiles = event.target.files;

    /* Check file or img to show */
    this.checkFileAndImg(this.selectedFiles.item(0));

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      if (!this.isFile) {
        reader.onload = e => this.uploadSrc = reader.result;
      } else {
        this.uploadSrc = file;
      }

      reader.readAsDataURL(file);
    }
  }

  checkFileAndImg(file: File) {
    this.isFile = this.chatService.checkFileOrImg(file);
  }

  /* Close file */
  closeFile() {
    this.uploadSrc = null;
  }
}
