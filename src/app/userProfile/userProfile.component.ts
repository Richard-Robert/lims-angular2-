import { Component, OnInit, OnDestroy } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { MainAppService } from './../app.component.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './userProfile.component.html',
  styleUrls: ['./../../assets/css/global.css','./userProfile.component.css']
})
export class UserProfileComponent  implements OnInit{
profile:any;
sub:any;

constructor(private mainAppService: MainAppService) {}

ngOnInit():any {
this.profile = this.mainAppService.getProfile();
  console.log(this.profile);
}
ngOnDestroy():any { }
}
