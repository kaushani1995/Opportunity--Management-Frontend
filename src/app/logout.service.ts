import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) { }

  logout(): void {
    localStorage.removeItem("APP_TOKEN");
    localStorage.removeItem("EMAIL");
    this.router.navigate(['\login']);
  }
}
