import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Book } from './../bookClass';
@Injectable()
export class BookDetailsService {

  constructor(private http: HttpClient) { }

  getBookDetails(isbn) {
return this.http.get('./../../assets/data.json')
.map((response) => {
const booksArray: any = response;
  for (const book of booksArray.bookList) {
    if (book.ISBN === isbn) {
      return response = book;
    }
    }
  });
}

}
