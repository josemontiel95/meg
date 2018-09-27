import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CalidadLayoutComponent } from './layouts/calidad-layout/calidad-layout.component';
import { RhInternoLayoutComponent } from './layouts/rhInterno-layout/rhInterno-layout.component';

import { LoginComponent } from './login/login.component';
import { AppGuard } from './app.guard';
const routes: Routes =[

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
   {
    path: 'administrador',
    component: AdminLayoutComponent,
    canActivateChild: [AppGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'

  }]},
   {
    path: 'recursosHumanos',
    component: RhInternoLayoutComponent,
    canActivateChild: [AppGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/rhInterno-layout/rhInterno-layout.module#RhInternoLayoutModule'

  }]},
   {
    path: 'calidad',
    component: CalidadLayoutComponent,
    canActivateChild: [AppGuard],
    children: [
        {
      path: '',
      loadChildren: './layouts/calidad-layout/calidad-layout.module#CalidadLayoutModule'

  }]},
 /* {
    path: '**',
    redirectTo: 'table-list'
  },*/
 
 {
    path: 'login',
    component: LoginComponent
  },
 


];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
