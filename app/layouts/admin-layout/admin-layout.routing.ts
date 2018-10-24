import { Routes } from '@angular/router';

import { DashboardComponent } from '../../admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../admin/user-profile/user-profile.component';
import { UserDetailComponent } from '../../admin/user-detail/user-detail.component';
import { ObraDetailComponent } from '../../admin/obra-detail/obra-detail.component';
import { CrearUsuarioComponent } from '../../admin/crear-usuario/crear-usuario.component';
import { CrearObraComponent } from '../../admin/crear-obra/crear-obra.component';
import { InsertarFotoComponent } from '../../admin/insertar-foto/insertar-foto.component';
import { IconsComponent } from '../../admin/icons/icons.component';
import { ObrasComponent } from '../../admin/obras/obras.component';
import { HerramientasComponent } from '../../admin/herramientas/herramientas.component';
import { CrearHerramientasComponent } from '../../admin/crear-herramientas/crear-herramientas.component';
import { HerramientaDetailComponent } from '../../admin/herramienta-detail/herramienta-detail.component';


import { TiposDeHerramientaComponent } from '../../admin/tipos-de-herramienta/tipos-de-herramienta.component';
import { CrearTipoHerramientasComponent } from '../../admin/crear-tipo-de-herramienta/crear-tipo-de-herramienta.component';
import { TipoHerramientaDetailComponent } from '../../admin/tipo-de-herramienta-detail/tipo-de-herramienta-detail.component';
import { InsertarDocumentoComponent } from '../../admin/insertar-documento/insertar-documento.component';


export const AdminLayoutRoutes: Routes = [
    { path: '',                redirectTo: 'user-profile', pathMatch: 'full' },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    
    { path: 'usuarios',          component: IconsComponent },
    { path: 'usuarios/user-detail/:id',   component: UserDetailComponent },
    { path: 'usuarios/crear-usuario',   component: CrearUsuarioComponent },

    { path: 'proyectos',          component: ObrasComponent },
    { path: 'proyectos/proyecto-detail/:id',   component: ObraDetailComponent },
    { path: 'proyectos/crear-proyecto',   component: CrearObraComponent },

    { path: 'herramientas',  component: HerramientasComponent },
    { path: 'herramientas/herramienta-detail/:id',   component: HerramientaDetailComponent },
    { path: 'herramientas/crear-herramientas',  component: CrearHerramientasComponent },

    { path: 'insertar-documento/:id/:id2',   component: InsertarDocumentoComponent },

    { path: 'insertar-foto/:id',   component: InsertarFotoComponent },

    { path: 'tipos-de-herramienta',  component: TiposDeHerramientaComponent },
    { path: 'crear-tipo-de-herramienta',  component: CrearTipoHerramientasComponent },
    { path: 'tipo-de-herramienta-detail/:id',  component: TipoHerramientaDetailComponent },

];
