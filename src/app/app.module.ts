import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {HomePageComponent} from './home-page/home-page.component';
import {FormsModule} from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import {RouterModule, Routes} from '@angular/router';
import { AddTrackPageComponent } from './add-track-page/add-track-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import {CookieService} from 'ngx-cookie-service';
import {TrackService} from './track.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OwnMaterialModule} from './ownMaterial.module';
import {MatSnackBar} from '@angular/material';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'addtrack', component: AddTrackPageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    AddTrackPageComponent,
    SignupPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    OwnMaterialModule
  ],
  providers: [TrackService, AuthService, AuthGuard, CookieService, MatSnackBar ],
  bootstrap: [AppComponent]
})
export class AppModule { }
