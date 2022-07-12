import {FileUpload} from './FileUpload';

export class ChatMessage {
  $key?: string;
  message?: string;
  timeSent?: Date = new Date();
  fileUpload?: FileUpload;
  isOwn: boolean;
}
