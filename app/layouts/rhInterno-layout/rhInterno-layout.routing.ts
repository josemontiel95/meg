import { Routes } from '@angular/router';

import { DashboardComponent } from '../../rhInterno/dashboard/dashboard.component';
import { UserProfileComponent } from '../../rhInterno/user-profile/user-profile.component';
import { UserDetailComponent } from '../../rhInterno/user-detail/user-detail.component';
import { CrearUsuarioComponent } from '../../rhInterno/crear-usuario/crear-usuario.component';
import { InsertarFotoComponent } from '../../rhInterno/insertar-foto/insertar-foto.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../rhInterno/icons/icons.component';

import { EmpresasComponent } from '../../rhInterno/empresas/empresas.component';
import { CrearEmpresaComponent } from '../../rhInterno/crear-empresa/crear-empresa.component';
import { EmpresaDetailComponent } from '../../rhInterno/empresa-detail/empresa-detail.component';

import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { PuestosComponent } from '../../rhInterno/puestos/puestos.component';
import { CrearPuestoComponent} from '../../rhInterno/crear-puesto/crear-puesto.component';
import { PuestoDetailComponent } from '../../rhInterno/puesto-detail/puesto-detail.component';


import { TiposDeHerramientaComponent } from '../../rhInterno/tipos-de-herramienta/tipos-de-herramienta.component';
import { CrearTipoHerramientasComponent } from '../../rhInterno/crear-tipo-de-herramienta/crear-tipo-de-herramienta.component';
import { TipoHerramientaDetailComponent } from '../../rhInterno/tipo-de-herramienta-detail/tipo-de-herramienta-detail.component';
import { InsertarDocumentoComponent } from '../../rhInterno/insertar-documento/insertar-documento.component';


export const RhInternoLayoutRoutes: Routes = [
    { path: '',      		  redirectTo: 'user-profile', pathMatch: 'full' },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    
    { path: 'usuarios',          component: IconsComponent },
    { path: 'usuarios/user-detail/:id',   component: UserDetailComponent },
    { path: 'usuarios/crear-usuario',   component: CrearUsuarioComponent },

    { path: 'empresas',          component: EmpresasComponent },
    { path: 'empresas/empresa-detail/:id',   component: EmpresaDetailComponent },
    { path: 'empresas/crear-empresa',   component: CrearEmpresaComponent },

    { path: 'puestos',  component: PuestosComponent },
    { path: 'puestos/puesto-detail/:id',   component: PuestoDetailComponent },
    { path: 'puestos/crear-puesto',  component: CrearPuestoComponent },

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
