import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import * as moment from 'moment';
import { Usuario }    from './Usuario';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

  //Esto es un dummy, borralo despues.

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss','../../loadingArrows.css']
})
export class CrearUsuarioComponent implements OnInit
  {
  global: Global;
  constructor(private router: Router, 
              private data: DataService, 
              private http: Http) { }
 
    foto: string;
    laboratorio: string;
    nss: string;
    rol: string;
    submitted = false;
    hidden = false;
    mis_roles: Array<any>;
    mis_lab: Array<any>;
    cargando;
    mis_emp;
    mis_pm;
    
    userForm: FormGroup;

  Usuario= {
            email: '',
            nombre: '',
            apellido: '',
            fechaDeNac: '',
            contrasena: '',
            rol_usuario_id: '',
            nss: '',
            id_usuario: '',
            emailPersonal: '',
            emailCorporativo: '',
            curpNo: '',
            rfcNo: '',
            imssNo: '',
            pm_id: '',
            empresa_id: '',
            tipo: '',
          };


  crearMessage: string= "";
  crearMessageCargando: string= "";

  tipos = [{"tipo":"Externo", "id":"0"},{"tipo":"Interno", "id":"1"}];

    //inicio y llenados
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=1;
    let url = `${this.global.apiRoot}/rol/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    this.http.get(url, {search}).subscribe(res => {this.llenaRoles(res.json());
                                                 this.rolValidator(res.json());
                                                });


    this.userForm = new FormGroup({
      'rol_usuario_id':      new FormControl( { value:this.Usuario.rol_usuario_id,   disabled: this.hidden },  [Validators.required]), 
      'nombre':              new FormControl( { value:this.Usuario.nombre,           disabled: this.hidden },  [Validators.required]), 
      'apellido':            new FormControl( { value:this.Usuario.apellido,         disabled: this.hidden },  [Validators.required]), 
      'emailCorporativo':    new FormControl( { value:this.Usuario.emailCorporativo, disabled: this.hidden },  [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]), 
      'contrasena':          new FormControl( { value:this.Usuario.contrasena,       disabled: this.hidden },  [Validators.required])
    });

  }

  //userForm
  get rol_usuario_id()   { return this.userForm.get('rol_usuario_id'); }
  get nombre()           { return this.userForm.get('nombre'); }
  get apellido()         { return this.userForm.get('apellido'); }
  get emailCorporativo() { return this.userForm.get('emailCorporativo'); }
  get contrasena()       { return this.userForm.get('contrasena'); }


  rolValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==5 || repuesta.error==6){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }



  llenaRoles(resp: any){
    this.cargando=this.cargando-1;
    this.mis_roles= new Array(resp.length);
    var j=resp.length-1;
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_roles[_i]=resp[j];
      j--;

    }
  }



  regresaUsuario(){
    this.router.navigate(['administrador/usuarios']);
  }


  onSubmit() { this.submitted = true; }


  respuestaSwitch(res,id_usuario){
    console.log(res)
    if(res.error!=0){
      window.alert(res.estatus);
      location.reload();
    }
    else{
      this.router.navigate(['administrador/usuarios/user-detail/'+id_usuario]);
    }
  }




  crearUsuario( ){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/usuario/post/endpoint.php`;
    let formData:FormData = new FormData();

    formData.append('function', 'insertAdmin');
    formData.append('token', this.global.token);
    formData.append('rol_usuario_id', '1001');

    formData.append('new_rol_usuario_id',this.userForm.value.rol_usuario_id);
    formData.append('nombre',            this.userForm.value.nombre);
    formData.append('apellido',          this.userForm.value.apellido);
    formData.append('emailCorporativo',  this.userForm.value.emailCorporativo);
    formData.append('contrasena',        this.userForm.value.contrasena);

    this.crearMessageCargando="Cargando...";
    this.http.post(url, formData).subscribe(res => this.diplay(res.json()) );

  }

  diplay(crearResp: CrearResp){
    console.log(crearResp);
    if(crearResp.error==0){
      this.crearMessage="";
      this.crearMessageCargando=crearResp.estatus;
      console.log(crearResp);
      setTimeout(()=>{ this.router.navigate(['administrador/insertar-foto/'+crearResp.id_usuario])}, 1500);
       
    }else{
      this.crearMessageCargando="";
      switch (crearResp.error) {
        case 1:
          
          this.crearMessage=crearResp.estatus;
          window.alert(this.crearMessage);
          console.log(crearResp);
          let token: string;
          token= localStorage.getItem("token");
          let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
          let search = new URLSearchParams();
          search.set('function', 'cerrarSesion');
          search.set('token', token);
          this.http.get(url, {search}).subscribe(res => {
                                                      console.log(res.json().estatus);
                                                      this.router.navigate(['login']); 
                                                    });
          break;
        case 2:
          this.crearMessage=crearResp.estatus;
          window.alert(this.crearMessage);
          break;

        case 3:
          this.crearMessage=crearResp.estatus;
          window.alert(this.crearMessage);
          console.log(crearResp);
           token= "";
          token= localStorage.getItem("token");
           url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
           search = new URLSearchParams();
          search.set('function', 'cerrarSesion');
          search.set('token', token);
          this.http.get(url, {search}).subscribe(res => {
                                                      console.log(res.json().estatus);
                                                      this.router.navigate(['login']); 
                                                    });
          break;

        case 4:
          this.crearMessage=crearResp.estatus;
          window.alert(this.crearMessage);
          break;
      }
      
    }
  }


}