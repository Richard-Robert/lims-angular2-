import {Routes} from '@angular/router';
import {HomeComponent} from './homeComponent/home.component';
import { FavouritesComponent } from './favouritesComponent/fav.component';

export const appRoutes: Routes = [
  { path: '**', redirectTo: 'home'  },
  {path: 'home', component: HomeComponent},
  {path: 'favourties', component: FavouritesComponent},
];
