import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FileUpload} from "../../models/FileUpload";

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

  /* Check img and url */
  isFile: boolean;
  imageSrc: any;

  /* Form Chat */
  formChat: FormGroup;

  constructor(private chatService: ChatService , private fb: FormBuilder) { }

  ngOnInit(): void {
    /* Form Chat */
    this.formChat = this.fb.group({
      message: ['']
    });
  }

  /* Send message */
  send() {
    /* Send message */
    let message = this.formChat.get('message').value;

    if (this.formChat.value && this.selectedFiles == null) {
      this.chatService.sendMessage(message , null);
    }
    this.formChat.reset();
    /* To send file */
    if (this.selectedFiles) {
      const file = this.selectedFiles.item(0);
      this.selectedFiles = undefined;
      this.currentFileUpload = new FileUpload(file);
      this.checkFileAndImg(file);

      if (message == null) {
        message = null;
      }

      this.chatService.pushFileToStorage(message , this.currentFileUpload).subscribe(
        percentage => {
          this.percentage = Math.round(percentage);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }

  checkFileAndImg(file: File) {
    this.isFile = this.chatService.checkFileOrImg(file);
  }
}
