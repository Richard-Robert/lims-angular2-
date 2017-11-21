import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/auth.service';
import { MainAppService } from './app.component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./../assets/css/global.css','./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  profile: any;
  tokenDetails: any;
  constructor(public auth: AuthService, private router: Router, private mainAppService: MainAppService) {  }

  ngOnInit(): any {
    this.auth.handleAuthentication((err, profile) => {
        this.profile = profile;
        this.router.navigate(['/home']);
        this.auth.getApiToken().subscribe(
          data => {
            this.tokenDetails = data;
            this.mainAppService.setUserInfo(this.profile, this.tokenDetails);
            this.auth.getUser(this.profile.sub);
          }
        )

      });

    // if(this.auth.userProfile) {
    //   this.profile = this.auth.userProfile
    // }
    // else
    // {
    //   this.auth.getProfile((err, profile) => {
    //     this.profile = profile;
    //     console.log(profile);
    //   })
    // }
  }
}
