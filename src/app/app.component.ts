import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  profile: any;
  constructor(public auth: AuthService) {  }

  ngOnInit(): any {
      this.auth.handleAuthentication();
      if(this.auth.userProfile) {
        this.profile = this.auth.userProfile
      }
      else
      {
        this.auth.getProfile((err, profile) => {
          this.profile = profile;
          console.log(profile);
        })
      }
    }
}
