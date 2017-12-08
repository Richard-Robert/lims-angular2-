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
editAccountFlag:boolean = false;
editPersonalFlag:boolean = false;
editFavouritesFlag:boolean = false;
// editEmail:string;
// editUsername:string;
// editPhone:string;
tempAccDetails:any = {
  email:"",
  username:"",
  phone:null
};
tempPerDetails:any = {
  firstName:"",
  lastName:"",
  age:null,
  profession:"",
  address:"",
  interests:""
};
tempFavDetails:any = {
  genre:"",
  author:"",
  book:""
};

constructor(private router: Router, private mainAppService: MainAppService, private auth: AuthService) { }

ngOnInit():any {
sessionStorage.setItem('lastVisitedRoute',JSON.stringify(this.route));
this.profile = this.mainAppService.getProfile();
// setTimeout(function() {

// }, 0);
this.auth.getUser(this.profile.sub).subscribe(
              data => {
                      this.profile = data;
                    }
              );

// this.auth.updateUser(this.profile.sub);
}
ngOnDestroy():any { }

editAccDetails():any {
this.editAccountFlag=true;
this.tempAccDetails.email = this.profile.email;
this.tempAccDetails.username = this.profile.username;
this.tempAccDetails.phone = this.profile.user_metadata.phone_number;
}
saveAccDetails(flag):any {

  if(flag){

    var body = {
          connection:"Username-Password-Authentication",
          username:this.profile.username,
          user_metadata:{
            phone_number:this.profile.user_metadata.phone_number,
            nickname: this.profile.username
          }
  };
  this.auth.updateUser(this.profile.user_id, body).subscribe(
        data => {
          this.auth.getUser(this.profile.user_id).subscribe(
              data => {
                      this.profile = data;
                      this.editAccountFlag=false;
                    }
              );},
        err => {alert(err.error.message);}
      );
  if(this.profile.email!== this.tempAccDetails.email)
      {
        var emailBody = {
          connection:"Username-Password-Authentication",
          verify_email:true,
          email:this.profile.email
        }

      this.auth.updateUser(this.profile.user_id, emailBody).subscribe(
        data => {
          this.auth.getUser(this.profile.user_id).subscribe(
              data => {
                      this.profile = data;
                      this.editAccountFlag=false;
                    }
              );},
        err => {alert(err.error.message);}
      );
    }
    this.auth.getUser(this.profile.user_id).subscribe(
              data => {
                      this.profile = data;
                    }
              );

  }
  else{
    this.profile.email = this.tempAccDetails.email;
    this.profile.username = this.tempAccDetails.username;
    this.profile.user_metadata.phone_number = this.tempAccDetails.phone;
    this.editAccountFlag=false;
  }
}

editPerDetails():any {
  this.editPersonalFlag=true;
  this.tempPerDetails.firstName = this.profile.user_metadata.first_name;
  this.tempAccDetails.lastName = this.profile.user_metadata.last_name;
  this.tempAccDetails.age = this.profile.user_metadata.age;
  this.tempPerDetails.profession = this.profile.user_metadata.profession;
  this.tempAccDetails.address = this.profile.user_metadata.address;
  this.tempAccDetails.interests = this.profile.user_metadata.interests;
}
savePerDetails(flag):any {
  if(flag){

    var body = {
          connection:"Username-Password-Authentication",
          user_metadata:{
            first_name:this.profile.user_metadata.first_name,
            last_name:this.profile.user_metadata.last_name,
            age:this.profile.user_metadata.age,
            profession:this.profile.user_metadata.profession,
            address:this.profile.user_metadata.address,
            interests:this.profile.user_metadata.interests
          }
  };
    this.auth.updateUser(this.profile.user_id, body).subscribe(
        data => {
          this.auth.getUser(this.profile.user_id).subscribe(
              data => {
                      this.profile = data;
                      this.editPersonalFlag=false;;
                    }
              );},
            err => {alert(err.error.message);}
        );
  }
  else
  {
    this.profile.user_metadata.first_name = this.tempPerDetails.firstName;
    this.profile.user_metadata.last_name = this.tempAccDetails.lastName;
    this.profile.user_metadata.age = this.tempAccDetails.age;
    this.profile.user_metadata.profession = this.tempPerDetails.profession;
    this.profile.user_metadata.address = this.tempAccDetails.address;
    this.profile.user_metadata.interests = this.tempAccDetails.interests;
    this.editPersonalFlag=false;
  }
}

editFavDetails():any {
  this.editFavouritesFlag=true;
  this.tempFavDetails.genre = this.profile.user_metadata.fav_genre;
  this.tempFavDetails.author = this.profile.user_metadata.fav_author;
  this.tempFavDetails.book = this.profile.user_metadata.fav_book;
}
saveFavDetails(flag):any {
  if(flag){
    this.editFavouritesFlag=false;
    var body = {
          connection:"Username-Password-Authentication",
          user_metadata:{
            fav_genre:this.profile.user_metadata.fav_genre,
            fav_author:this.profile.user_metadata.fav_author,
            fav_book:this.profile.user_metadata.fav_book,
          }
    };
    this.auth.updateUser(this.profile.user_id,body).subscribe(
        data => {
          this.auth.getUser(this.profile.user_id).subscribe(
              data => {
                      this.profile = data;
                      this.editPersonalFlag=false;;
                    }
              );},
            err => {alert(err.error.message);}
        );
  }
  else{
    this.profile.user_metadata.fav_genre = this.tempFavDetails.genre;
    this.profile.user_metadata.fav_author = this.tempFavDetails.author;
    this.profile.user_metadata.fav_book = this.tempFavDetails.book;
    this.editFavouritesFlag=false;
  }
}
}
