import { Component,OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { AdminService } from './admin.component.service';
@Component({
  selector:'app-admin-component',
  templateUrl:'./admin.component.html',
  styleUrls:['./../../assets/css/global.css','./admin.component.css']
})
export class AdminComponent implements OnInit,OnDestroy {

route = {
  url:'admin',
  params: null
}
bookData: any = {
  bookList: []
};
bookIndex: number;
addForm:FormGroup;
showAddForm:boolean = false;
editForm:FormGroup;
showEditForm:boolean = false;

constructor(private _formBuidler: FormBuilder, private _adminService:AdminService){}

ngOnInit() :any  {
    sessionStorage.setItem('lastVisitedRoute',JSON.stringify(this.route));
    this.bookData = JSON.parse(localStorage.getItem('booksData'));

    this.addForm = this._formBuidler.group({
      'title':['',Validators.compose([Validators.required, Validators.minLength(3)])],
      'author': ['',Validators.compose([Validators.required, Validators.minLength(3)])],
      'imgSrc': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'shortSummary': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'ISBN':[null, Validators.compose([Validators.required, Validators.min(1000000000)])],
      'published':['', Validators.compose([Validators.required, Validators.minLength(0)])],
      'qtyAvailable':[null],
      'totalQty':[null, Validators.compose([Validators.required, Validators.min(0)])],
      'totalRating':[null, Validators.compose([Validators.min(0),Validators.max(5)])],
      'prologue':['', Validators.compose([Validators.required, Validators.minLength(10)])],
      'genres':[[],Validators.compose([Validators.required, Validators.minLength(3)])],
      'comments':[[]],
    });
    this.editForm = this._formBuidler.group({
      'title':['',Validators.compose([Validators.required, Validators.minLength(3)])],
      'author': ['',Validators.compose([Validators.required, Validators.minLength(3)])],
      'imgSrc': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'shortSummary': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'ISBN':[null, Validators.compose([Validators.required, Validators.min(1000000000)])],
      'published':['', Validators.compose([Validators.required, Validators.minLength(0)])],
      'qtyAvailable':[null,Validators.compose([Validators.required, Validators.min(0)])],
      'totalQty':[null, Validators.compose([Validators.required, Validators.min(0)])],
      'totalRating':[null, Validators.compose([Validators.min(0),Validators.max(5)])],
      'prologue':['', Validators.compose([Validators.required, Validators.minLength(10)])],
      'genres':[[],Validators.compose([Validators.required, Validators.minLength(3)])],
      'comments':[[]]
    });
}
ngOnDestroy() :any {

}
openAddForm():any {
  this.showAddForm = true;
}
cancelAddForm():any {
  this.addForm.reset();
  this.showAddForm = false;
}
validateAddForm():any {
this.addForm.controls['qtyAvailable'].setValue(this.addForm.value.totalQty);
this.addForm.value.genres = this.addForm.value.genres.split(',');
this._adminService.addBook(this.addForm.value);
this.bookData = JSON.parse(localStorage.getItem('booksData'));
this.addForm.reset();
this.showAddForm = false;
}
getBookDetails(isbn){
for (const book of this.bookData.bookList) {
                      if (book.ISBN === isbn) {
                        this.bookIndex = this.bookData.bookList.indexOf(book);
                        return book;
                      }
                  }
}
openEditForm(isbn):any {
  var selectedBook = this.getBookDetails(isbn);
  this.editForm.setValue(selectedBook);
  // var tempGenres = '';
  // for(var genre of this.editForm.value.genres)
  //       tempGenres+=''
  this.editForm.controls['genres'].setValue(this.editForm.value.genres.join());
  this.showEditForm = true;
}
cancelEditForm():any {
  this.editForm.reset();
  this.showEditForm = false;
}
validateEditForm():any {
  if(this.editForm.value.qtyAvailable > this.editForm.value.totalQty)
    {
      alert("Quantity available cannot be greater than the Total Quantity");
      return;
    }
  this.editForm.controls['qtyAvailable'].setValue(this.editForm.value.totalQty);
  this.editForm.value.genres = this.editForm.value.genres.split(',');
  this._adminService.updateBook(this.editForm.value, this.bookIndex);
  this.bookData = JSON.parse(localStorage.getItem('booksData'));
  this.editForm.reset();
  this.showEditForm = false;
}
deleteBook(isbn):any {
  for (const book of this.bookData.bookList) {
                      if (book.ISBN === isbn) {
                        this.bookIndex = this.bookData.bookList.indexOf(book);
                      }
                  };
  this.bookData.bookList.splice(this.bookIndex,1);
  localStorage.setItem('booksData', JSON.stringify(this.bookData));
}
}
