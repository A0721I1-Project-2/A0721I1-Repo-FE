import {Component, Input, OnInit} from '@angular/core';
import {FileUpload} from "../../../chat-app/models/FileUpload";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../../../chat-app/services/chat.service";

@Component({
  selector: 'app-chat-form-admin',
  templateUrl: './chat-form-admin.component.html',
  styleUrls: ['./chat-form-admin.component.css']
})
export class ChatFormAdminComponent implements OnInit {

  /* To select file */
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;

  /* Check img and url */
  isFile: boolean;
  uploadSrc: any;

  /* Hidden after upload */
  hidden: boolean = true;

  /* Form Chat */
  formChat: FormGroup;

  /* Get user id from parent component */
  @Input() userIdChild;

  /* To show error message */
  showNotiError = false;

  constructor(private chatService: ChatService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    /* Form Chat */
    this.formChat = this.fb.group({
      message: ['', Validators.required]
    });
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;

    /* Check file or img to show */
    this.checkFileAndImg(this.selectedFiles.item(0));

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      console.log(file);

      const reader = new FileReader();
      if (!this.isFile) {
        reader.onload = e => this.uploadSrc = reader.result;
      } else {
        this.uploadSrc = file;
      }

      reader.readAsDataURL(file);
    }
  }

  /* Send with role admin */
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
        this.chatService.sendMessage(message, null, this.userIdChild);
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

        this.chatService.pushFileToStorage(message, this.currentFileUpload , this.userIdChild).subscribe(percentage => {
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

  checkFileAndImg(file: File) {
    this.isFile = this.chatService.checkFileOrImg(file);
  }

  closeFile() {
    this.uploadSrc = null;
  }
}
