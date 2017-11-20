import { Routes} from '@angular/router';
import { HomeComponent} from './homeComponent/home.component';
import { FavouritesComponent } from './favouritesComponent/fav.component';
import { BookDetailsComponent  } from './bookDetailsComponent/bookDetailsComponent';
import { UserProfileComponent } from './userProfile/userProfile.component';

export const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'details/:isbn', component: BookDetailsComponent},
  {path: 'favourties', component: FavouritesComponent},
  {path: 'profile', component: UserProfileComponent}
  // { path: '**', component: PageNotFoundComponent }
];
