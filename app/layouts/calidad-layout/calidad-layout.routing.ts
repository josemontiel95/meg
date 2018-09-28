import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../calidad/user-profile/user-profile.component';
import { UserDetailComponent } from '../../calidad/user-detail/user-detail.component';
import { ObraDetailComponent } from '../../calidad/obra-detail/obra-detail.component';
import { CrearUsuarioComponent } from '../../calidad/crear-usuario/crear-usuario.component';
import { CrearObraComponent } from '../../calidad/crear-obra/crear-obra.component';
import { InsertarFotoComponent } from '../../calidad/insertar-foto/insertar-foto.component';
import { IconsComponent } from '../../calidad/icons/icons.component';
import { ObrasComponent } from '../../calidad/obras/obras.component';
import { HerramientasComponent } from '../../calidad/herramientas/herramientas.component';
import { CrearHerramientasComponent } from '../../calidad/crear-herramientas/crear-herramientas.component';
import { HerramientaDetailComponent } from '../../calidad/herramienta-detail/herramienta-detail.component';
import { SalonUsuarioDetailComponent } from '../../calidad/salon-user-detail/salon-user-detail.component';


import { TiposDeHerramientaComponent } from '../../calidad/tipos-de-herramienta/tipos-de-herramienta.component';
import { CrearTipoHerramientasComponent } from '../../calidad/crear-tipo-de-herramienta/crear-tipo-de-herramienta.component';
import { TipoHerramientaDetailComponent } from '../../calidad/tipo-de-herramienta-detail/tipo-de-herramienta-detail.component';
import { InsertarDocumentoComponent } from '../../calidad/insertar-documento/insertar-documento.component';


export const CalidadLayoutRoutes: Routes = [
    { path: '',      		  redirectTo: 'user-profile', pathMatch: 'full' },
    { path: 'user-profile',   component: UserProfileComponent },
    
    { path: 'usuarios',           component: IconsComponent },
    { path: 'usuarios/user-detail/:id',   component: UserDetailComponent },
    { path: 'usuarios/crear-usuario',   component: CrearUsuarioComponent },

    { path: 'proyectos',          component: ObrasComponent },
    { path: 'proyectos/proyecto-detail/:id',   component: ObraDetailComponent },
    { path: 'proyectos/crear-proyecto',  component: CrearObraComponent },

    { path: 'salones',  component: HerramientasComponent },
    { path: 'salones/salon-detail/:id',   component: HerramientaDetailComponent },
    { path: 'salones/salon-user-detail/:id',   component: SalonUsuarioDetailComponent },
    { path: 'salones/crear-salon',  component: CrearHerramientasComponent },

    { path: 'insertar-documento/:id/:id2',   component: InsertarDocumentoComponent },

    { path: 'insertar-foto/:id',   component: InsertarFotoComponent },


    { path: 'certificaciones',  component: TiposDeHerramientaComponent },
    { path: 'certificaciones/crea-certificacion',  component: CrearTipoHerramientasComponent },
    { path: 'certificaciones/certificacion-detail/:id',  component: TipoHerramientaDetailComponent },

];
