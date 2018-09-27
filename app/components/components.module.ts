import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebars/sidebar/sidebar.component';
import { SidebarCalidadComponent } from './sidebars/sidebarCalidad/sidebarCalidad.component';
import { SidebarRhInternoComponent } from './sidebars/sidebarRhInterno/sidebarRhInterno.component';
import { SidebarJefeLab } from './sidebars/sidebarJefeLab/sidebarjefelab.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarRhInternoComponent,
    SidebarComponent,
    SidebarCalidadComponent,
    SidebarJefeLab,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarRhInternoComponent,
    SidebarComponent,
    SidebarCalidadComponent,
    SidebarJefeLab,
  ]
})
export class ComponentsModule { }
