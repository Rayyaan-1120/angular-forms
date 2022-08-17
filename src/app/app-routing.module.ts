import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupformComponent } from './signupform/signupform.component';
import { ReactivesignupComponent } from './reactivesignup/reactivesignup.component';
import { HomeComponent } from './home/home.component';
import { AuthguardService } from './authguard.service';
import { LoginformComponent } from './loginform/loginform.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent,canActivate:[AuthguardService] },
  { path: 'login', component: LoginformComponent },
  { path: 'reactivesignupform', component: ReactivesignupComponent }
];
LoginformComponent
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingcomponents = [
  SignupformComponent,
  ReactivesignupComponent,
  LoginformComponent,
  HomeComponent
]
