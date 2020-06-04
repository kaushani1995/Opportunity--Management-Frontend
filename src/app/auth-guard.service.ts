import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public router: Router) { }

  canActivate(): boolean {
    if (!localStorage.getItem("APP_TOKEN")) {
      this.router.navigate(['/login'])  
      return false;
    }
    return true;
  }

}
