import { Injectable } from '@angular/core';

@Injectable()
export class MainAppService {
profile:any;
APIToken:any;
setUserInfo(profile, token):any {
  this.profile = profile;
  this.APIToken = token.access_token;
}
getProfile():any {
  return this.profile;
}
getApiToken():any {
  return this.APIToken;
}
}
