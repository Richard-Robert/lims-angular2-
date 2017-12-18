import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute  } from '@angular/router';
import { NgModel, NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { BookDetailsService } from './../bookDetailsComponent/bookDetailsComponent.service';
import { MainAppService } from './../app.component.service';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './bookDetailsComponent.html',
  styleUrls: ['./../../assets/css/global.css', './bookDetailsComponent.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  route = {
  url:'details',
  params: null
}
isbn: number;
bookDetails: any = {};
sub: any;
// starValue: number;
profile:any;
reviewForm: FormGroup;
issuedFlag:boolean;
returnDate:Date;
constructor(private activatedRoute: ActivatedRoute ,public auth: AuthService, private mainAppService: MainAppService, private _bookDetailsService: BookDetailsService, private _formBuidler: FormBuilder) {

}
getBookDetails() {
  this._bookDetailsService.getBookDetails(this.isbn)
        .subscribe  (
          data => this.bookDetails = data,
          err => alert(err.statusText)
        );
}
ngOnInit() {
this.issuedFlag = false;
this.sub = this.activatedRoute.params.subscribe(params => {
       this.isbn = +params['isbn']; // (+) converts string 'id' to a number
       this.route.params = this.isbn;
       sessionStorage.setItem('lastVisitedRoute',JSON.stringify(this.route));
        this.getBookDetails();
       // In a real app: dispatch action to load the details here.
    });
this.profile = this.mainAppService.getProfile();
if(this.profile && this.auth.isAuthenticated())
{
      this.auth.getUser(this.profile.sub).subscribe(
              data => {
                      this.profile = data;
                      if(this.profile.user_metadata && this.profile.user_metadata.booksIssued)
                        {
                          for(let book of  this.profile.user_metadata.booksIssued)
                            {
                              if(book.isbn == this.bookDetails.ISBN)
                                  {
                                    this.issuedFlag = true;
                                    this.returnDate = book.returnDate;
                                  }
                            }
                        }
                      }
              );
this.reviewForm = this._formBuidler.group({
  'name':this.profile.nickname,
  'date': [null],
  'rating': [null, Validators.compose([Validators.required, Validators.min(0)])],
  'content': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
})
}
else {
  this.reviewForm = this._formBuidler.group({
  'name':'',
  'date': [null],
  'rating': [null, Validators.compose([Validators.required, Validators.min(0)])],
  'content': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
})
}
}
ngOnDestroy () {
  this.sub.unsubscribe();
}
// test() {
//   console.log(this.starValue);
// }
validateReviewForm() {
  if(this.auth.isAuthenticated()){
    this.reviewForm.controls['date'].setValue(new Date());
    this._bookDetailsService.insertReview(this.reviewForm.value);
    this.getBookDetails();
    this.reviewForm.reset();
  }
  else alert("You need to be logged in to leave a review");
}
issueBook():any {
  var returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + 7);
  //If the user already has books issued
  var body = {};
  if(this.profile.user_metadata && this.profile.user_metadata.booksIssued)
  {
    var tempbooksIssued = this.profile.user_metadata.booksIssued;
    tempbooksIssued.push({isbn:this.bookDetails.ISBN,returnDate: returnDate});
    body = {
              connection:"Username-Password-Authentication",
              user_metadata:{
                booksIssued:tempbooksIssued
              }
      };
  }

  //If this is the first book the user is going to issue
  else  {
        body = {
              connection:"Username-Password-Authentication",
              user_metadata:{
                booksIssued:[
                  {
                    isbn:this.bookDetails.ISBN,
                    returnDate: returnDate
                  }
                ]
              }
      };
  }

  this.auth.updateUser(this.profile.user_id, body).subscribe(
        data => {
            this.bookDetails.qtyAvailable--;
            this._bookDetailsService.updateQty(this.bookDetails.qtyAvailable);
            this.ngOnInit();
            },
        err => {
            alert(err.error.message);
            }
      );
}

returnBook():any {

var body = {} , index;
var tempbooksIssued = this.profile.user_metadata.booksIssued;
for(let book of  tempbooksIssued)
          {
            if(book.isbn == this.bookDetails.ISBN)
                    {
                      index = tempbooksIssued.indexOf(book);
                      this.profile.user_metadata.booksIssued.splice(index,1);
                      break;
                    }
          };

body = {
         connection:"Username-Password-Authentication",
         user_metadata:{
                booksIssued:this.profile.user_metadata.booksIssued
              }
      };

this.auth.updateUser(this.profile.user_id, body).subscribe(
        data => {
            this.bookDetails.qtyAvailable++;
            this._bookDetailsService.updateQty(this.bookDetails.qtyAvailable);
            this.ngOnInit();
            },
        err => {
            alert(err.error.message);
            }
      );
};

renewBook():any {
  var body = {};
  var returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + 7);
  var tempbooksIssued = this.profile.user_metadata.booksIssued;
  for(let book of  tempbooksIssued)
      {
        if(book.isbn == this.bookDetails.ISBN)
            {
              // index = tempbooksIssued.indexOf(book);
              // this.profile.user_metadata.booksIssued.splice(index,1);
              book.returnDate = returnDate;
              break;
            }
          };
  body = {
         connection:"Username-Password-Authentication",
         user_metadata:{
                booksIssued:tempbooksIssued
              }
      };
  this.auth.updateUser(this.profile.user_id, body).subscribe(
        data => {
            this.ngOnInit();
            },
        err => {
            alert(err.error.message);
            }
      );
};
}
