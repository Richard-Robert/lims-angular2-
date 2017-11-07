import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute  } from '@angular/router';
import { NgModel } from '@angular/forms';

import { BookDetailsService } from './../bookDetailsComponent/bookDetailsComponent.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './bookDetailsComponent.html',
  styleUrls: ['./../../assets/css/global.css', './bookDetailsComponent.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
isbn: number;
bookDetails: any = {};
sub: any;
starValue: number;
constructor(private activatedRoute: ActivatedRoute , private _bookDetailsService: BookDetailsService) {

}
ngOnInit() {
this.sub = this.activatedRoute.params.subscribe(params => {
       this.isbn = +params['isbn']; // (+) converts string 'id' to a number
        this._bookDetailsService.getBookDetails(this.isbn)
        .subscribe  (
          data => this.bookDetails = data,
          err => alert(err.statusText)
        );
       // In a real app: dispatch action to load the details here.
    });
}
ngOnDestroy () {
  this.sub.unsubscribe();
}
test() {
  console.log(this.starValue);
}
}
