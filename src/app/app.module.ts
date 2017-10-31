import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {appRoutes} from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './homeComponent/home.component';
import { FavouritesComponent } from './favouritesComponent/fav.component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, FavouritesComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(
      appRoutes, {enableTracing: true}
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
