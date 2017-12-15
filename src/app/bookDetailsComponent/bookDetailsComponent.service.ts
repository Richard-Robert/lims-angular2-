import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Book } from './../bookClass';
@Injectable()
export class BookDetailsService {
books: any = {
  bookList: []
}
bookIndex: number;
  constructor(private http: HttpClient) { }

  getBookDetails(isbn) {

    this.books = JSON.parse(localStorage.getItem('booksData'));
    // if(this.books === null){
    //     return this.http.get('./../../assets/data.json')
    //         .map((response: Response) => {
    //             this.books = response;
    //                 for (const book of this.books.bookList) {
    //                     if (book.ISBN === isbn) {
    //                       this.bookIndex = this.books.bookList.indexOf(book);
    //                       sessionStorage.setItem('booksData', JSON.stringify(this.books));
    //                       // sessionStorage.setItem('bookDetailsIndex', JSON.stringify(this.bookIndex));
    //                       return response = book;
    //                     }
    //                 }
    //           });
    //   }
      // else
      {
        for (const book of this.books.bookList) {
                      if (book.ISBN === isbn) {
                        this.bookIndex = this.books.bookList.indexOf(book);
                        // localStorage.setItem('booksData', JSON.stringify(this.books));
                        return Observable.of(book);
                      }
                  }
      }
  }

  insertReview(value) {
    var totalRating = 0;

    this.books = JSON.parse(localStorage.getItem('booksData'));
    this.books.bookList[this.bookIndex].comments.push(value);

    for(const comment of this.books.bookList[this.bookIndex].comments)
        {
          totalRating+= comment.rating;
        }
    totalRating/=this.books.bookList[this.bookIndex].comments.length;
    this.books.bookList[this.bookIndex].totalRating = totalRating;
    localStorage.setItem('booksData', JSON.stringify(this.books));
    // let newReview= JSON.stringify(this.books);
    // this.http.post('./../../assets/data.json', newReview);
  }
  updateQty(qty):any {
    this.books = JSON.parse(localStorage.getItem('booksData'));
    this.books.bookList[this.bookIndex].qtyAvailable = qty;
    localStorage.setItem('booksData', JSON.stringify(this.books));
  }
}
