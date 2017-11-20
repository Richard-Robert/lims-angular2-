import { Injectable } from '@angular/core';

@Injectable()
export class MainAppService {
profile:any;

setProfile(profile):any {
  this.profile = profile;
}
getProfile():any {
  return this.profile;
}
}
