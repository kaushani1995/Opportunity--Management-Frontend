import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth-guard.service'
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { TrendsComponent } from './trends/trends.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuardService]},
  { path: 'home', component: HomeComponent , canActivate: [AuthGuardService]},
  { path: 'add', component: AddComponent, canActivate: [AuthGuardService]},
  { path: 'trends', component: TrendsComponent, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: '/home' , canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
