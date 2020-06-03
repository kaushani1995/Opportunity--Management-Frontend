import { Component, OnInit } from '@angular/core';
import {LogoutService} from '../logout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private logoutService : LogoutService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.logoutService.logout();
  }

  checkLogin(): boolean {
    if (localStorage.getItem("APP_TOKEN")) {
      return true;
    }
    return false;
  }

}
