import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './gaurds/auth.guard';
import { UnathorizedComponent } from './components/unathorized/unathorized.component';

const routes: Routes = [
  {
    path: 'login',	
    component: LoginComponent,
  },
  {
    path: 'add-employee',	
    component: RegisterComponent,
    canActivate:[authGuard],
    data: { role: ['ADMIN']  } 
   },
  {
    path: 'admin',	
    component: AdminComponent,
    canActivate:[authGuard],
    data: { role: ['ADMIN','HR'] } 
   
  },
  {
    path: 'profile',	
    component: ProfileComponent,
    canActivate:[authGuard],
    data: { role: ['ADMIN','EMPLOYEE','HR'] } 
  },
  {
    path: 'profile/:id',	
    component: ProfileComponent,
    canActivate:[authGuard],
    data: { role: ['ADMIN','EMPLOYEE','HR'] } 
  },
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'unauthorized',
    component:UnathorizedComponent
  },
  {
    path: '**',
    component:HomeComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
