import { Injectable } from '@angular/core';

import { Book } from './../bookClass';

@Injectable()
export class AdminService {
  books: any = {
  bookList: []
}

constructor(){}

addBook(value):any {
  this.books = JSON.parse(localStorage.getItem('booksData'));
  for(var book of  this.books.bookList)
    {
      if(book.ISBN == value.ISBN)
          {
            alert("Book already exists");
            return;
          }
    }
  this.books.bookList.push(value);
  localStorage.setItem('booksData', JSON.stringify(this.books));
}
updateBook(value, index):any {
  this.books = JSON.parse(localStorage.getItem('booksData'));
  this.books.bookList.splice(index, 1, value);
  localStorage.setItem('booksData', JSON.stringify(this.books));
}
}
