import { Component } from '@angular/core';
import fontawesome from '@fortawesome/fontawesome';
import faFacebook from '@fortawesome/fontawesome-free-brands/';
import * as smoothscroll from 'smoothscroll-polyfill';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      location.href = 'http://localhost:4200/#/home';
    }
    fontawesome.library.add(faFacebook);
    smoothscroll.polyfill();
  }
}
