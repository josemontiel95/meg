import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectManagerLayoutRoutes } from './projectManager-layout.routing';
import { UserProfileComponent } from '../../projectManager/user-profile/user-profile.component';
import { UserDetailComponent } from '../../projectManager/user-detail/user-detail.component';
import { ObraDetailComponent } from '../../projectManager/obra-detail/obra-detail.component';
import { IconsComponent } from '../../projectManager/icons/icons.component';
import { ObrasComponent } from '../../projectManager/obras/obras.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { MatProgressBarModule } from '@angular/material';
import { TiposDeHerramientaComponent } from '../../projectManager/tipos-de-herramienta/tipos-de-herramienta.component';
import { TipoHerramientaDetailComponent } from '../../projectManager/tipo-de-herramienta-detail/tipo-de-herramienta-detail.component';
import { ProyectosGridComponent } from '../../projectManager/gridsUserDatail/proyectos-grid/proyectos-grid.component';
import { EquipoGridComponent } from '../../projectManager/gridsUserDatail/equipo-grid/equipo-grid.component';
import { CertificacionesGridComponent } from '../../projectManager/gridsUsersList/certificaciones-grid/certificaciones-grid.component';
import { ProyectosGridComponentP } from '../../projectManager/gridsUserProfile/proyectos-grid/proyectos-grid.component';
import { EquipoGridComponentP } from '../../projectManager/gridsUserProfile/equipo-grid/equipo-grid.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProjectManagerLayoutRoutes),
    FormsModule,
     ReactiveFormsModule,
    ChartsModule,
    MatProgressBarModule,
    NgbModule,
    ToastrModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  declarations: [
    UserProfileComponent,
    UserDetailComponent,
    ObraDetailComponent,
    IconsComponent,
    ObrasComponent,
    TiposDeHerramientaComponent,
    TipoHerramientaDetailComponent,
    ProyectosGridComponent,
    EquipoGridComponent,
    CertificacionesGridComponent,
    ProyectosGridComponentP,
    EquipoGridComponentP
  ]
})

export class ProjectManagerModule {}
