import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-chat-user',
  templateUrl: './room-chat-user.component.html',
  styleUrls: ['./room-chat-user.component.css']
})
export class RoomChatUserComponent implements OnInit {

  /* Check hidden screen chat */
  hiddenScreen = true;

  constructor() { }

  ngOnInit(): void {
  }

  /* Close box chat */
  closeBoxChat() {
    const screenChat = document.getElementById('screenChat');
    this.hiddenScreen = true;
    screenChat.classList.add('hidden');
  }

  /* Show screen chat */
  showScreenChat() {
    const screenChat = document.getElementById('screenChat');
    this.hiddenScreen = !this.hiddenScreen;
    if (this.hiddenScreen) {
      screenChat.classList.add('hidden');
    } else {
      screenChat.classList.remove('hidden');
    }
  }

}
