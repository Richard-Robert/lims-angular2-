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

    this.books = JSON.parse(sessionStorage.getItem('booksData'));
    if(this.books === null){
        return this.http.get('./../../assets/data.json')
            .map((response: Response) => {
                this.books = response;
                    for (const book of this.books.bookList) {
                        if (book.ISBN === isbn) {
                          this.bookIndex = this.books.bookList.indexOf(book);
                          sessionStorage.setItem('booksData', JSON.stringify(this.books));
                          // sessionStorage.setItem('bookDetailsIndex', JSON.stringify(this.bookIndex));
                          return response = book;
                        }
                    }
              });
      }
      else
      {
        for (const book of this.books.bookList) {
                      if (book.ISBN === isbn) {
                        this.bookIndex = this.books.bookList.indexOf(book);
                        sessionStorage.setItem('booksData', JSON.stringify(this.books));
                        // sessionStorage.setItem('bookDetailsIndex', JSON.stringify(this.bookIndex));
                        return Observable.of(book);
                      }
                  }
      }
  }

  insertReview(value) {
    this.books.bookList[this.bookIndex].comments.push(value);
    sessionStorage.setItem('booksData', JSON.stringify(this.books));
    // let newReview= JSON.stringify(this.books);
    // this.http.post('./../../assets/data.json', newReview);
  }
}
