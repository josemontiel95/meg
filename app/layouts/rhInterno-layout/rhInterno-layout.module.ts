import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RhInternoLayoutRoutes } from './rhInterno-layout.routing';
import { DashboardComponent } from '../../rhInterno/dashboard/dashboard.component';
import { UserProfileComponent } from '../../rhInterno/user-profile/user-profile.component';
import { UserDetailComponent } from '../../rhInterno/user-detail/user-detail.component';
import { ObraDetailComponent } from '../../rhInterno/obra-detail/obra-detail.component';
import { HerramientaDetailComponent } from '../../rhInterno/herramienta-detail/herramienta-detail.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../rhInterno/icons/icons.component';
import { ObrasComponent } from '../../rhInterno/obras/obras.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AgGridModule } from 'ag-grid-angular';
import { CrearUsuarioComponent } from '../../rhInterno/crear-usuario/crear-usuario.component';
import { CrearObraComponent } from '../../rhInterno/crear-obra/crear-obra.component';
import { InsertarFotoComponent } from '../../rhInterno/insertar-foto/insertar-foto.component';
import { HerramientasComponent } from '../../rhInterno/herramientas/herramientas.component';
import { CrearHerramientasComponent } from '../../rhInterno/crear-herramientas/crear-herramientas.component';
import { MatProgressBarModule } from '@angular/material';
import { TiposDeHerramientaComponent } from '../../rhInterno/tipos-de-herramienta/tipos-de-herramienta.component';
import { CrearTipoHerramientasComponent } from '../../rhInterno/crear-tipo-de-herramienta/crear-tipo-de-herramienta.component';
import { TipoHerramientaDetailComponent } from '../../rhInterno/tipo-de-herramienta-detail/tipo-de-herramienta-detail.component';
import { ProyectosGridComponent } from '../../rhInterno/gridsUserDatail/proyectos-grid/proyectos-grid.component';
import { EquipoGridComponent } from '../../rhInterno/gridsUserDatail/equipo-grid/equipo-grid.component';
import { InsertarDocumentoComponent } from '../../rhInterno/insertar-documento/insertar-documento.component';
import { CertificacionesGridComponent } from '../../rhInterno/gridsUsersList/certificaciones-grid/certificaciones-grid.component';
import { ProyectosGridComponentP } from '../../rhInterno/gridsUserProfile/proyectos-grid/proyectos-grid.component';
import { EquipoGridComponentP } from '../../rhInterno/gridsUserProfile/equipo-grid/equipo-grid.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RhInternoLayoutRoutes),
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
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    ObrasComponent,
    MapsComponent,
    CrearUsuarioComponent,
    CrearObraComponent,
    InsertarFotoComponent,
    NotificationsComponent,
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

export class RhInternoLayoutModule {}
