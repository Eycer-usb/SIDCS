import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RecoverComponent } from './recover/recover.component';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { AuthRootComponent } from './auth-root.component';

const routes: Routes = [
  { path: '', component: AuthRootComponent, 
    children: [
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'signup', component: SignupComponent, pathMatch: 'full' },
      { path: 'recovery', component: RecoverComponent, pathMatch: 'full' },
      { path: 'page-not-found', component: PageNotFoundComponent, pathMatch: 'full' },
      { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
