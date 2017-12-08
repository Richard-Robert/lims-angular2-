import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MainAppService } from './../app.component.service';

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

  constructor(public router: Router, private http: HttpClient, private mainService: MainAppService) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(cb): void {
    this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          this.setSession(authResult);
          // if(this.userProfile)
          //     cb(err,this.userProfile);
          // else
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

    sessionStorage.removeItem('lastVisitedRoute');
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
      console.log(profile);
    }
    console.log(profile);
    cb(err, profile);
  });
}
public getApiToken() {
  var body = {
    client_id: 'oQWobs5nB061aIISN8MLeuBMurTFbdbk',
    client_secret: '7j78m-tlu5ZfccjTivNptjb9yVsAz6Cxg6cdHdcA5HrFziWgxXHAjnpItn0WI5Ct',
    audience: 'https://apostle.auth0.com/api/v2/',
    grant_type: 'client_credentials',
    scope: 'read:users read:user_idp_tokens update:users'
  }
  // var response;
  return this.http.post('https://apostle.auth0.com/oauth/token', body);
}
public getUser(id) {
  var apiToken = this.mainService.getApiToken();
  var headers = new HttpHeaders().set('authorization','Bearer '+apiToken);
  return this.http.get('https://apostle.auth0.com/api/v2/users/'+id,{headers: headers});
}
public updateUser(id, body) {
  var apiToken = this.mainService.getApiToken();
  var headers = new HttpHeaders().set('authorization','Bearer '+apiToken);
  // var body = {
  //   //  "username": "Richard_Robert",
  //   // "email_verified": true,
  //   "user_metadata" :{
  //     "first_name" : "Richard"
  //   },
  //   // "email":"richard28.2008@gmail.com",
  //   // "verify_email":true,
  //   "connection": "Username-Password-Authentication",
  // }
  return this.http.patch('https://apostle.auth0.com/api/v2/users/'+id,body,{headers: headers});
}
}
