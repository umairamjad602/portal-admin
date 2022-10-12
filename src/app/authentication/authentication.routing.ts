import { Routes } from '@angular/router';

import { NotFoundComponent } from '@app/authentication/404/not-found.component';
import { SignupComponent } from './signup/signup.component';

export const AuthenticationRoutes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'signup',
        component: SignupComponent
      }
    ]
  }
];
