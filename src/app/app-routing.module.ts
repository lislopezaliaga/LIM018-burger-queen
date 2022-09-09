import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { ViewAdminComponent } from './components/view-admin/view-admin.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
/*   {
    path: 'login',
    component: LoginComponent,
    ...canActivate(() => redirectUnauthorizedTo(['/register']))
  }, */
  { path: 'register', component: RegisterUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: ViewAdminComponent ,
  /* ...canActivate(() => redirectUnauthorizedTo(['/login'])) */
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
