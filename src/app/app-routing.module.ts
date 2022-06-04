import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationPage } from './pages/autenticate/authentication.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
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
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
