import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { MainAppService } from './../app.component.service';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./../../assets/css/global.css','./userProfile.component.css']
})
export class UserProfileComponent  implements OnInit{
profile:any;
sub:any;

constructor(private mainAppService: MainAppService, private auth: AuthService) { }

ngOnInit():any {
this.profile = this.mainAppService.getProfile();
}
ngOnDestroy():any { }
}
