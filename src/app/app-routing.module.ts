import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthenticationGuard } from './services/canactivate.guard';

const routes: Routes = [
  { path: '', redirectTo: 'push', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
   
  
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/autenticate/authentication.module').then((m) => m.AuthenticationPageModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/autenticate/authentication.module').then((m) => m.AuthenticationPageModule),
  },
  {
    path: 'google',
    loadChildren: () => import('./pages/autenticate/authentication.module').then((m) => m.AuthenticationPageModule),
  },
  {
    path: 'reset',
    loadChildren: () => import('./pages/autenticate/authentication.module').then((m) => m.AuthenticationPageModule),
  },
  { path: '**', redirectTo: 'login' },
  {
    path: 'users',
    loadChildren: () => import('./pages/modal/users/users.module').then( m => m.UsersPageModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'push',
    loadChildren: () => import('./pages/push/push/push.module').then( m => m.PushPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
