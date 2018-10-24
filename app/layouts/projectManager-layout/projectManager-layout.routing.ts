import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../projectManager/user-profile/user-profile.component';
import { UserDetailComponent } from '../../projectManager/user-detail/user-detail.component';
import { ObraDetailComponent } from '../../projectManager/obra-detail/obra-detail.component';
import { IconsComponent } from '../../projectManager/icons/icons.component';
import { ObrasComponent } from '../../projectManager/obras/obras.component';


import { TiposDeHerramientaComponent } from '../../projectManager/tipos-de-herramienta/tipos-de-herramienta.component';
import { TipoHerramientaDetailComponent } from '../../projectManager/tipo-de-herramienta-detail/tipo-de-herramienta-detail.component';



export const ProjectManagerLayoutRoutes: Routes = [
    { path: '',      		  redirectTo: 'user-profile', pathMatch: 'full' },
    { path: 'user-profile',   component: UserProfileComponent },
    

    { path: 'usuarios',           component: IconsComponent },
    { path: 'usuarios/user-detail/:id',   component: UserDetailComponent },

    { path: 'proyectos',          component: ObrasComponent },
    { path: 'proyectos/proyecto-detail/:id',   component: ObraDetailComponent },


    { path: 'certificaciones',  component: TiposDeHerramientaComponent },
    { path: 'certificaciones/certificacion-detail/:id',  component: TipoHerramientaDetailComponent },



];
