import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationRoutes } from './authentication.routing';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { NotFoundComponent } from './404/not-found.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(AuthenticationRoutes)
  ],
  declarations: [
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
  ]
})
export class AuthenticationModule {}
