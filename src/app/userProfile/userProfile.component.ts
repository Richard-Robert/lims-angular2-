import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MainAppService } from './../app.component.service';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./../../assets/css/global.css','./userProfile.component.css']
})
export class UserProfileComponent  implements OnInit{
route = {
  url:'profile',
  params: null
}
profile:any;
sub:any;

constructor(private router: Router, private mainAppService: MainAppService, private auth: AuthService) { }

ngOnInit():any {
sessionStorage.setItem('lastVisitedRoute',JSON.stringify(this.route));
this.profile = this.mainAppService.getProfile();
// setTimeout(function() {

// }, 0);
this.auth.getUser(this.profile.user_id).subscribe(
              data => {
                      this.profile = data;
                      this.mainAppService.setUserInfo(this.profile);
                    }
              );

this.auth.updateUser(this.profile.user_id);
}
ngOnDestroy():any { }
}
