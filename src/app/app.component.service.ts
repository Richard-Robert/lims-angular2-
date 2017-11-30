import { Injectable } from '@angular/core';

@Injectable()
export class MainAppService {
  profile:any;
  private APIToken:any;
  setApiToken(token):any {
    this.APIToken = token.access_token;
  }
  setUserInfo(profile):any {
    this.profile = profile;
    localStorage.setItem('user_profile', JSON.stringify(this.profile));
  }
  getProfile():any {
    if(this.profile)
      return this.profile;
    else
      return JSON.parse(localStorage.getItem('user_profile'));
  }
  getApiToken():any {
    return this.APIToken;
  }
}
