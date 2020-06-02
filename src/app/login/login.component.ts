import { Component, OnInit  } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  public user: SocialUser;
  public loggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  googleSignIn(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) =>{
      this.user = userData;
      console.log(this.user.name);
      this.router.navigate(['\home']);
    })
  }

  ngOnInit(): void {
  }

}