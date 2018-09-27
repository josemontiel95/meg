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
    hidden = true;
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
    this.cargando=3;
    let url = `${this.global.apiRoot}/rol/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1001");
    this.http.get(url, {search}).subscribe(res => {this.llenaRoles(res.json());
                                                 this.rolValidator(res.json());
                                                });


    url = `${this.global.apiRoot}/empresa/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function',          'getForDroptdownAdmin');
    search.set('token',             this.global.token);
    search.set('rol_usuario_id',    this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaEmpresas(res.json());
                                                 });

    url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function',          'getProjectManagersForDroptdown');
    search.set('token',             this.global.token);
    search.set('rol_usuario_id',    this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaPM(res.json());
                                                 });

    this.userForm = new FormGroup({
      'rol_usuario_id':      new FormControl( { value:this.Usuario.rol_usuario_id,   disabled: this.hidden },  [Validators.required]), 
      'nombre':              new FormControl( { value:this.Usuario.nombre,           disabled: this.hidden },  [Validators.required]), 
      'apellido':            new FormControl( { value:this.Usuario.apellido,         disabled: this.hidden },  [Validators.required]), 
      'emailPersonal':       new FormControl( { value:this.Usuario.emailPersonal,    disabled: this.hidden },  [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]), 
      'emailCorporativo':    new FormControl( { value:this.Usuario.emailCorporativo, disabled: this.hidden },  [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]), 
      'curpNo':              new FormControl( { value:this.Usuario.curpNo,           disabled: !this.hidden},  [Validators.required, Validators.pattern("[A-Z][AEIOUX][A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[HM](AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}([A-Z]|[0-9])[0-9]")]), 
      'rfcNo':               new FormControl( { value:this.Usuario.rfcNo,            disabled: this.hidden },  [Validators.required, Validators.pattern("([A-ZÑ&]{3,4})([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01]))(([A-Z]|[0-9]){2})([A]|[0-9])")]),
      'imssNo':              new FormControl( { value:this.Usuario.imssNo,           disabled: this.hidden },  [Validators.required]), 
      'pm_id':               new FormControl( { value:this.Usuario.pm_id,            disabled: this.hidden },  [Validators.required]), 
      'empresa_id':          new FormControl( { value:this.Usuario.empresa_id,       disabled: this.hidden },  [Validators.required]), 
      'tipo':                new FormControl( { value:this.Usuario.tipo,             disabled: this.hidden },  [Validators.required]),
      'contrasena':          new FormControl( { value:this.Usuario.contrasena,       disabled: this.hidden },  [Validators.required])
    });

  }

  //userForm
  get rol_usuario_id()   { return this.userForm.get('rol_usuario_id'); }
  get nombre()           { return this.userForm.get('nombre'); }
  get apellido()         { return this.userForm.get('apellido'); }
  get emailPersonal()    { return this.userForm.get('emailPersonal'); }
  get emailCorporativo() { return this.userForm.get('emailCorporativo'); }
  get curpNo()           { return this.userForm.get('curpNo'); }
  get rfcNo()            { return this.userForm.get('rfcNo'); }
  get imssNo()           { return this.userForm.get('imssNo'); }
  get pm_id()            { return this.userForm.get('pm_id'); }
  get empresa_id()       { return this.userForm.get('empresa_id'); }
  get tipo()             { return this.userForm.get('tipo'); }
  get contrasena()       { return this.userForm.get('contrasena'); }

  llenaEmpresas(resp: any){
    this.mis_emp= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_emp[_i]=resp[_i];

    }
    console.log(this.mis_emp);
    this.cargando=this.cargando-1;
  }

  llenaPM(resp: any){
    this.mis_pm= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_pm[_i]=resp[_i];

    }
    console.log(this.mis_pm);
    this.cargando=this.cargando-1;
  }
  rolValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==5 || repuesta.error==6){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }

  labValidator(repuesta: any){
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

  validaCURP(){
    let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function',          'getByCURPAdmin');
    search.set('token',             this.global.token);
    search.set('rol_usuario_id',    this.global.rol);
    search.set('curp',              this.userForm.value.curpNo);

    this.http.get(url, {search}).subscribe(res => {
      this.respuestaValidaCurp(res.json());
    });
  }
  respuestaValidaCurp(res: any){
    console.log(res);
    if(res.error!=0){
      window.alert(res.estatus);
       location.reload();
    }
    else{
      if(res.existe==1){
        if(Number(res.rol_usuario_id)<1005){
          if(Number(res.active) == 1){
            window.alert("existe un registro para este usuario. Te redireccionaremos");
            this.router.navigate(['administrador/usuarios/user-detail/'+res.id_usuario]);
          }else{
            if(window.confirm("Existe un registro para este usuario pero se encuentra desactivado. Deseas activarlo?")){
              let url = `${this.global.apiRoot}/usuario/post/endpoint.php`;
              let formData:FormData = new FormData();
              
              formData.append('function', 'activate');
              formData.append('id_usuario', res.id_usuario);
              formData.append('rol_usuario_id', "1001");
              formData.append('token', this.global.token);

              this.http.post(url, formData).subscribe(resp => {
                this.respuestaSwitch(resp.json(),res.id_usuario);
              });
            }else{

            }
          }
        }else{
            window.alert("Existe un registro para este usuario. No tienes el rol correcto para editar este registro");
        }
      }else{
        window.alert("No existe registro para este CURP, por favor completa todos los datos.");
        this.mostrar();
      }
    }
  }
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
  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.userForm.controls).forEach((controlName) => {
        this.userForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    this.userForm.controls['curpNo']['disable']();
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
    formData.append('emailPersonal',     this.userForm.value.emailPersonal);
    formData.append('emailCorporativo',  this.userForm.value.emailCorporativo);
    formData.append('curpNo',            this.userForm.getRawValue().curpNo);
    formData.append('rfcNo',             this.userForm.value.rfcNo);
    formData.append('imssNo',            this.userForm.value.imssNo);
    formData.append('pm_id',             this.userForm.value.pm_id);
    formData.append('empresa_id',        this.userForm.value.empresa_id);
    formData.append('tipo',              this.userForm.value.tipo);
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