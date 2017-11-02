import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './bookDetailsComponent.html',
  styleUrls: ['./../../assets/css/global.css', './bookDetailsComponent.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
isbn: number;
sub: any;
constructor(private activatedRoute: ActivatedRoute) {

}
ngOnInit() {
this.sub = this.activatedRoute.params.subscribe(params => {
       this.isbn = +params['isbn']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });
}
ngOnDestroy () {
  this.sub.unsubscribe();
}
}
