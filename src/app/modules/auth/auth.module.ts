import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule { 
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
       providers: [],
    };
  }
}
