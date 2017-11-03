import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './homeComponent/home.component';
import { FavouritesComponent } from './favouritesComponent/fav.component';
import { BookDetailsComponent } from './bookDetailsComponent/bookDetailsComponent';

import { HomeComponentService } from './homeComponent/home.component.service';
import { BookDetailsService } from './bookDetailsComponent/bookDetailsComponent.service';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, FavouritesComponent, BookDetailsComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(
      appRoutes, {enableTracing: true}
    ), HttpClientModule
  ],
  providers: [ HomeComponentService, BookDetailsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
