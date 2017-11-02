import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomeComponentService {
  constructor(private http: HttpClient) { }
getBookList() {
  return this.http.get('./../data.json');
}
}
