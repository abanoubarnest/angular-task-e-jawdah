import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoggedInGuard } from './core/guards/logged-in.guard';
import {AngularFireAuthGuard, canActivate, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard';
import {
  AuthGuard,
} from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth']);
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    //  canActivate: [LoggedInGuard],
    // canActivate: [AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}

  },
  {
    path: '',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
     canActivate: [AuthGuard],
    ...canActivate(redirectUnauthorizedToLogin),
  },

  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
