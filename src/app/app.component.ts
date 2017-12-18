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
  isAdmin:boolean;
  constructor(public auth: AuthService, private router: Router, private mainAppService: MainAppService) {  }

  ngOnInit(): any {
    var lastVisitedRoute = JSON.parse(sessionStorage.getItem('lastVisitedRoute'));
    this.router.navigate(['/home']);
    this.auth.handleAuthentication((err, profile) => {
        this.profile = profile;

        if(this.profile) {
        this.isAdmin = this.profile['https://Lims/isAdmin'];
        this.auth.getApiToken().subscribe(
          data => {
            this.tokenDetails = data;
            this.mainAppService.setApiToken(this.tokenDetails)

            this.mainAppService.setUserInfo(this.profile);
            if(lastVisitedRoute.params)
              this.router.navigate(['/'+lastVisitedRoute.url,lastVisitedRoute.params]);
            else
              this.router.navigate(['/'+lastVisitedRoute.url]);
            }
          )
        }
        else{
          if(lastVisitedRoute.params)
              this.router.navigate(['/'+lastVisitedRoute.url,lastVisitedRoute.params]);
            else
              this.router.navigate(['/'+lastVisitedRoute.url]);
        }

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
