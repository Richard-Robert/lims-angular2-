import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { HomeComponent } from './homeComponent/home.component';
// import { appRoutes} from './app.routes';

import {Routes, Router, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RatingModule } from 'ng2-rating';

import { AuthService } from './auth/auth.service';
import { MainAppService } from './app.component.service';
import { HomeComponentService } from './homeComponent/home.component.service';


import { FilterPipe } from './pipes/filter.pipe';

class MockRouter { public navigate() {}; }

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent}
];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, HomeComponent, FilterPipe
      ],
      providers:[
        AuthService, MainAppService, HomeComponentService,
        // {provide: Router,  useClass: MockRouter },
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
      imports:[
        RouterModule.forRoot(appRoutes), HttpClientModule, RatingModule, FormsModule
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));
  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));
});
