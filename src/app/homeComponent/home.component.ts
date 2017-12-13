import {Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';

import { HomeComponentService } from './home.component.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./../../assets/css/global.css', './home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  // title= 'The Tethered Mage';
route = {
  url:'home',
  params: null
}
bookData: any = {
  bookList: []
};
searchText:string;
constructor(private router: Router , private _homeComponentService: HomeComponentService) {

}
ngOnInit(): any {
  sessionStorage.setItem('lastVisitedRoute',JSON.stringify(this.route));
  if(!localStorage['booksData'])
      this._homeComponentService.getBookList()
        .subscribe(
          data => {
              this.bookData = data;
              localStorage.setItem('booksData', JSON.stringify(this.bookData)); },
          err => alert(err.statusText),
          () => console.log('finish')
        );
  else {
    this.bookData = JSON.parse(localStorage.getItem('booksData'));
  }
}
ngOnDestroy(): any {

}
bookDetailsNavigate(isbn) {
this.router.navigate(['/details', isbn]);

}

}
