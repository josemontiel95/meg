import { Routes } from '@angular/router';

import { DashboardComponent } from '../../rhInterno/dashboard/dashboard.component';
import { UserProfileComponent } from '../../rhInterno/user-profile/user-profile.component';
import { UserDetailComponent } from '../../rhInterno/user-detail/user-detail.component';
import { ObraDetailComponent } from '../../rhInterno/obra-detail/obra-detail.component';
import { CrearUsuarioComponent } from '../../rhInterno/crear-usuario/crear-usuario.component';
import { CrearObraComponent } from '../../rhInterno/crear-obra/crear-obra.component';
import { InsertarFotoComponent } from '../../rhInterno/insertar-foto/insertar-foto.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../rhInterno/icons/icons.component';
import { ObrasComponent } from '../../rhInterno/obras/obras.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { HerramientasComponent } from '../../rhInterno/herramientas/herramientas.component';
import { CrearHerramientasComponent } from '../../rhInterno/crear-herramientas/crear-herramientas.component';
import { HerramientaDetailComponent } from '../../rhInterno/herramienta-detail/herramienta-detail.component';


import { TiposDeHerramientaComponent } from '../../rhInterno/tipos-de-herramienta/tipos-de-herramienta.component';
import { CrearTipoHerramientasComponent } from '../../rhInterno/crear-tipo-de-herramienta/crear-tipo-de-herramienta.component';
import { TipoHerramientaDetailComponent } from '../../rhInterno/tipo-de-herramienta-detail/tipo-de-herramienta-detail.component';
import { InsertarDocumentoComponent } from '../../rhInterno/insertar-documento/insertar-documento.component';


export const RhInternoLayoutRoutes: Routes = [
    { path: '',      		  redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    
    { path: 'usuarios',          component: IconsComponent },
    { path: 'usuarios/user-detail/:id',   component: UserDetailComponent },
    { path: 'usuarios/crear-usuario',   component: CrearUsuarioComponent },

    { path: 'obras',          component: ObrasComponent },
    { path: 'obras/obra-detail/:id',   component: ObraDetailComponent },
    { path: 'obras/crear-obra',   component: CrearObraComponent },

    { path: 'herramientas',  component: HerramientasComponent },
    { path: 'herramientas/herramienta-detail/:id',   component: HerramientaDetailComponent },
    { path: 'herramientas/crear-herramientas',  component: CrearHerramientasComponent },

    { path: 'insertar-documento/:id/:id2',   component: InsertarDocumentoComponent },

    { path: 'insertar-foto/:id',   component: InsertarFotoComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },


    { path: 'tipos-de-herramienta',  component: TiposDeHerramientaComponent },
    { path: 'crear-tipo-de-herramienta',  component: CrearTipoHerramientasComponent },
    { path: 'tipo-de-herramienta-detail/:id',  component: TipoHerramientaDetailComponent },

];
