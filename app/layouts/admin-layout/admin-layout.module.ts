import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../admin/user-profile/user-profile.component';
import { UserDetailComponent } from '../../admin/user-detail/user-detail.component';
import { ObraDetailComponent } from '../../admin/obra-detail/obra-detail.component';
import { HerramientaDetailComponent } from '../../admin/herramienta-detail/herramienta-detail.component';
import { IconsComponent } from '../../admin/icons/icons.component';
import { ObrasComponent } from '../../admin/obras/obras.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { CrearUsuarioComponent } from '../../admin/crear-usuario/crear-usuario.component';
import { CrearObraComponent } from '../../admin/crear-obra/crear-obra.component';
import { InsertarFotoComponent } from '../../admin/insertar-foto/insertar-foto.component';
import { HerramientasComponent } from '../../admin/herramientas/herramientas.component';
import { CrearHerramientasComponent } from '../../admin/crear-herramientas/crear-herramientas.component';
import { MatProgressBarModule } from '@angular/material';
import { TiposDeHerramientaComponent } from '../../admin/tipos-de-herramienta/tipos-de-herramienta.component';
import { CrearTipoHerramientasComponent } from '../../admin/crear-tipo-de-herramienta/crear-tipo-de-herramienta.component';
import { TipoHerramientaDetailComponent } from '../../admin/tipo-de-herramienta-detail/tipo-de-herramienta-detail.component';
import { ProyectosGridComponent } from '../../admin/gridsUserDatail/proyectos-grid/proyectos-grid.component';
import { EquipoGridComponent } from '../../admin/gridsUserDatail/equipo-grid/equipo-grid.component';
import { InsertarDocumentoComponent } from '../../admin/insertar-documento/insertar-documento.component';
import { CertificacionesGridComponent } from '../../admin/gridsUsersList/certificaciones-grid/certificaciones-grid.component';
import { ProyectosGridComponentP } from '../../admin/gridsUserProfile/proyectos-grid/proyectos-grid.component';
import { EquipoGridComponentP } from '../../admin/gridsUserProfile/equipo-grid/equipo-grid.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
     ReactiveFormsModule,
    ChartsModule,
    MatProgressBarModule,
    NgbModule,
    ToastrModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    UserDetailComponent,
    ObraDetailComponent,
    HerramientaDetailComponent,
    IconsComponent,
    ObrasComponent,
    CrearUsuarioComponent,
    CrearObraComponent,
    InsertarFotoComponent,
    CrearHerramientasComponent,
    HerramientasComponent,
    TiposDeHerramientaComponent,
    CrearTipoHerramientasComponent,
    TipoHerramientaDetailComponent,
    ProyectosGridComponent,
    EquipoGridComponent,
    InsertarDocumentoComponent,
    CertificacionesGridComponent,
    ProyectosGridComponentP,
    EquipoGridComponentP

  ]
})

export class AdminLayoutModule {}
