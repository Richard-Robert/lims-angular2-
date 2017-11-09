import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Book } from './../bookClass';
@Injectable()
export class BookDetailsService {
books: any;
bookIndex: number;
  constructor(private http: HttpClient) { }

  getBookDetails(isbn) {
    return this.http.get('./../../assets/data.json')
      .map((response: Response) => {
        this.books = response;
          for (const book of this.books.bookList) {
            if (book.ISBN === isbn) {
              this.bookIndex = this.books.bookList.indexOf(book);
              return response = book;
            }
            }
        });
  }

  insertReview(value) {
    this.books.bookList[this.bookIndex].comments.push(value);

    let newReview= JSON.stringify(this.books);
    this.http.post('./../../assets/data.json', newReview);
  }
}
