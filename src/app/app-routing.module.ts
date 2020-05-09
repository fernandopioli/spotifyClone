import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {LoggedInGuard} from './services/guards/loggedIn.guard';
import {AuthGuard} from './services/guards/auth.guard';
import {ShowAlbumComponent} from './pages/show-album/show-album.component';
import {AlbumResolve} from './services/resolves/album.resolve';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'album/:id',
    canActivate: [AuthGuard],
    resolve: {
      album: AlbumResolve
    },
    component: ShowAlbumComponent,
  },
  {
    path: 'login',
    canActivate: [LoggedInGuard],
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
