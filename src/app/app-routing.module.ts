import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthenticationGuard } from './services/canactivate.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AuthenticationGuard],
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
    path: 'reset',
    loadChildren: () => import('./pages/autenticate/authentication.module').then((m) => m.AuthenticationPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/autenticate/authentication.module').then(
        (m) => m.AuthenticationPageModule
      ),
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
