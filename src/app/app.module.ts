import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RatingModule } from 'ng2-rating';

import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './homeComponent/home.component';
import { FavouritesComponent } from './favouritesComponent/fav.component';
import { BookDetailsComponent } from './bookDetailsComponent/bookDetailsComponent';
import { UserProfileComponent } from './userProfile/userProfile.component';
import { AdminComponent } from './adminComponent/admin.component';

import { AuthService } from './auth/auth.service';
import { HomeComponentService } from './homeComponent/home.component.service';
import { BookDetailsService } from './bookDetailsComponent/bookDetailsComponent.service';
import { MainAppService } from './app.component.service';
import { AdminService } from './adminComponent/admin.component.service';

import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, FavouritesComponent, BookDetailsComponent, UserProfileComponent, AdminComponent, FilterPipe
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(
      appRoutes, {enableTracing: true}
    ), HttpClientModule, FormsModule, ReactiveFormsModule, RatingModule
  ],
  providers: [ HomeComponentService, BookDetailsService, AuthService, MainAppService, AdminService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
