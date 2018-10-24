import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
declare interface RouteInfo2 {
    path: string;
    title: string;
    icon: string;
    class: string;
}


export const ROUTES: RouteInfo[] = [
    { path: 'user-profile', title: 'Mi perfil',  icon:'users_circle-08', class: '' },
    { path: 'usuarios', title: 'Mi equipo',  icon:'users_single-02', class: '' },
    { path: 'proyectos', title: 'Mis proyectos',  icon:'files_single-copy-04', class: '' },
 ];

export const ROUTES2: RouteInfo2[] = [
   { path: 'certificaciones', title: 'Certificaciones',  icon:'education_agenda-bookmark', class: '' },
];



@Component({
  selector: 'app-sidebar-projectmanager',
  templateUrl: './sidebarProjectManager.component.html',
  styleUrls: ['./sidebarProjectManager.component.css']
})
export class SidebarProjectManagerComponent implements OnInit {
  menuItems: any[];
  menuItems2: any[];
  
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);    
    this.menuItems2 = ROUTES2.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
