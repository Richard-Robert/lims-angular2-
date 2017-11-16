import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

userProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: 'txefN5R8xbsBSlwIz85IE2o2ZG29Qfw7',
    domain: 'apostle.auth0.com',
    responseType: 'token id_token',
    audience: 'https://apostle.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(cb): void {
    this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          this.setSession(authResult);
          if(this.userProfile)
              cb(err,this.userProfile);
          else
              this.getProfile((err, profile) => {
                this.userProfile = profile;
                cb(err,this.userProfile);
                localStorage.setItem('user_profile', JSON.stringify(this.userProfile));
            })
        // this.router.navigate(['/home']);
      } else if (err) {
        // this.router.navigate(['/home']);
        console.log(err);
      }
      if(this.userProfile)
        cb(err,this.userProfile);
      else{
        cb(err, JSON.parse(localStorage.getItem('user_profile')));
      }

    });

  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user_profile');

    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

//...User Profile code
public getProfile(cb): void {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('Access token must exist to fetch profile');
  }

  const self = this;
  this.auth0.client.userInfo(accessToken, (err, profile) => {
    if (profile) {
      self.userProfile = profile;
    }
    cb(err, profile);
  });
}
}
