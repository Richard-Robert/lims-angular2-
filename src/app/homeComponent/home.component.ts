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
bookData: any = {
  bookList: []
};
constructor(private router: Router , private _homeComponentService: HomeComponentService) {

}
ngOnInit(): any {
  this._homeComponentService.getBookList()
  .subscribe(
    data => {this.bookData = data; },
    err => alert(err.statusText),
    () => console.log('finish')
  );
}
ngOnDestroy(): any {

}
bookDetailsNavigate(isbn) {
this.router.navigate(['/details', isbn]);

}

}
