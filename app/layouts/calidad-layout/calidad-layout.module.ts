import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalidadLayoutRoutes } from './calidad-layout.routing';
import { DashboardComponent } from '../../calidad/dashboard/dashboard.component';
import { UserProfileComponent } from '../../calidad/user-profile/user-profile.component';
import { UserDetailComponent } from '../../calidad/user-detail/user-detail.component';
import { ObraDetailComponent } from '../../calidad/obra-detail/obra-detail.component';
import { HerramientaDetailComponent } from '../../calidad/herramienta-detail/herramienta-detail.component';
import { IconsComponent } from '../../calidad/icons/icons.component';
import { ObrasComponent } from '../../calidad/obras/obras.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { CrearUsuarioComponent } from '../../calidad/crear-usuario/crear-usuario.component';
import { CrearObraComponent } from '../../calidad/crear-obra/crear-obra.component';
import { InsertarFotoComponent } from '../../calidad/insertar-foto/insertar-foto.component';
import { HerramientasComponent } from '../../calidad/herramientas/herramientas.component';
import { CrearHerramientasComponent } from '../../calidad/crear-herramientas/crear-herramientas.component';
import { MatProgressBarModule } from '@angular/material';
import { TiposDeHerramientaComponent } from '../../calidad/tipos-de-herramienta/tipos-de-herramienta.component';
import { CrearTipoHerramientasComponent } from '../../calidad/crear-tipo-de-herramienta/crear-tipo-de-herramienta.component';
import { TipoHerramientaDetailComponent } from '../../calidad/tipo-de-herramienta-detail/tipo-de-herramienta-detail.component';
import { ProyectosGridComponent } from '../../calidad/gridsUserDatail/proyectos-grid/proyectos-grid.component';
import { EquipoGridComponent } from '../../calidad/gridsUserDatail/equipo-grid/equipo-grid.component';
import { InsertarDocumentoComponent } from '../../calidad/insertar-documento/insertar-documento.component';
import { CertificacionesGridComponent } from '../../calidad/gridsUsersList/certificaciones-grid/certificaciones-grid.component';
import { ProyectosGridComponentP } from '../../calidad/gridsUserProfile/proyectos-grid/proyectos-grid.component';
import { EquipoGridComponentP } from '../../calidad/gridsUserProfile/equipo-grid/equipo-grid.component';
import { SalonUsuarioDetailComponent } from '../../calidad/salon-user-detail/salon-user-detail.component';
import { EquipoSeguridadComponent } from '../../calidad/equipoSeguridad/equipoSeguridad.component';
import { CrearEquipoSeguridadComponent } from '../../calidad/crearEquipoSeguridad/crearEquipoSeguridad.component';
import { EquipoSeguridadDetailComponent } from '../../calidad/equipoSeguridadDetail/equipoSeguridadDetail.component';
import { InsertaComprobanteQRComponent } from '../../calidad/insertar-comprobanteQR/insertar-comprobanteQR.component';
import { CertificacionesPorUsuarioComponent } from '../../calidad/certificacionesPorUsuario/certificacionesPorUsuario.component';
import { CrearEquipoSeguridadLoteComponent } from '../../calidad/crearEquipoSeguridadLote/crearEquipoSeguridadLote.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CalidadLayoutRoutes),
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
    EquipoGridComponentP,
    SalonUsuarioDetailComponent,
    EquipoSeguridadComponent,
    CrearEquipoSeguridadComponent,
    EquipoSeguridadDetailComponent,
    InsertaComprobanteQRComponent,
    CertificacionesPorUsuarioComponent,
    CrearEquipoSeguridadLoteComponent

  ]
})

export class CalidadLayoutModule {}
