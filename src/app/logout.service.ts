import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) { }

  logout(): void {
    localStorage.removeItem("APP_TOKEN");
    this.router.navigate(['\login']);
  }
}
