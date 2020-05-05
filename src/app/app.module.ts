import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ShowAlbunsComponent } from './components/show-albuns/show-albuns.component';
import { SearchComponent } from './components/search/search.component';
import { AlbumComponent } from './components/album/album.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptorService} from './services/interceptors/jwtInterceptor.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ShowAlbumComponent } from './pages/show-album/show-album.component';
import {AuthenticationService} from './services/authentication.service';
import {LoggedInGuard} from './services/guards/loggedIn.guard';
import {AuthGuard} from './services/guards/auth.guard';
import {ErrorInterceptor} from './services/interceptors/ErrorInterceptor.service';
import {LoaderInterceptorService} from './services/interceptors/loader-interceptor.service';
import {LoaderService} from './services/loader.service';
import { MyLoaderComponent } from './layout/my-loader/my-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShowAlbunsComponent,
    SearchComponent,
    AlbumComponent,
    LoginComponent,
    HomeComponent,
    ShowAlbumComponent,
    MyLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    LoggedInGuard,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
