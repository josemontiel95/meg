import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { LoginResp } from "../../interfaces/int.LoginResp";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario }    from './Usuario';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css','../../loadingArrows.css']
})
export class UserProfileComponent implements OnInit {


    private gridApi;
    private gridColumnApi;
    rowSelection;
    columnDefs;
    rowData: any;
    mis_emp: Array<any>;
    mis_roles: Array<any>;
    hiddenMedica = true;

    foto: string;
    estatus: string;
    submitted = false;
    hidden = true;
    llenadoDone = false;
    mis_rolesActivos: Array<any>;
    mis_lab: Array<any>;
    mis_pm: Array<any>;
    imgUrl = "";
    cargando;
    onSubmit() { this.submitted = true; }
    ine;
    licencia;
    curp;
    rfc;
    imss;
    contrato;
    ineIcon;
    licenciaIcon;
    curpIcon;
    rfcIcon;
    imssIcon;
    contratoIcon;

    userForm: FormGroup;


    historial=false;

    Usuario= {
              id_usuario: '',
              rol_usuario_id: '',
              nombre: '',
              apellido: '',
              emailPersonal: '',
              emailCorporativo: '',
              curpNo: '',
              rfcNo: '',
              imssNo: '',
              pm_id: '',
              empresa_id: '',
              tipo: ''
            };

  passwordForm: FormGroup;

  Password={
    password1: '',
    npassword: ''
  };

  tipos = [{"tipo":"Externo", "id":"0"},{"tipo":"Interno", "id":"1"}];

  sangres = [{"tipo":"O−", "id":"0"},{"tipo":"O+", "id":"1"},{"tipo":"A−", "id":"3"},{"tipo":"A+", "id":"4"},{"tipo":"B−", "id":"5"},{"tipo":"B+", "id":"6"},{"tipo":"AB−", "id":"7"},{"tipo":"AB+", "id":"8"},{"tipo":"otra..", "id":"9"}];


    loginMessage: string= "";
    loginresp: LoginResp;
    global: Global;
    desBut=true;
    actBut=false;
    resppass= false;
    exitoCon = false;
    id: string;
    size: number;
    rowClassRules;

  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { 

   }



  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=2;

    let url = `${this.global.apiRoot}/rol/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1004");
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {this.llenaRoles(res.json());
                                                 this.rolValidator(res.json());
                                                });

 
    url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getIDByToken');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', "1004");
    this.http.get(url, {search}).subscribe(res => {
                                                 this.llenado(res.json()); 
                                                 this.llenadoValidator(res.json());
                                               });

    this.userForm = new FormGroup({
      'id_usuario':          new FormControl( { value:this.Usuario.id_usuario,       disabled: true },         [Validators.required]), 
      'rol_usuario_id':      new FormControl( { value:this.Usuario.rol_usuario_id,   disabled: this.hidden },  [Validators.required]), 
      'nombre':              new FormControl( { value:this.Usuario.nombre,           disabled: this.hidden },  [Validators.required]), 
      'apellido':            new FormControl( { value:this.Usuario.apellido,         disabled: this.hidden },  [Validators.required]), 
      'emailCorporativo':    new FormControl( { value:this.Usuario.emailCorporativo, disabled: this.hidden },  [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]), 
    });

    this.passwordForm = new FormGroup({
      'password1':          new FormControl( { value:this.Password.password1,    disabled: false },  [Validators.required]), 
      'npassword':          new FormControl( { value:this.Password.npassword,    disabled: false },  [Validators.required]), 
    });
  }

  get password1()       { return this.passwordForm.get('password1'); }
  get npassword()       { return this.passwordForm.get('npassword'); }

  //userForm
  get id_usuario()       { return this.userForm.get('id_usuario'); }
  get rol_usuario_id()   { return this.userForm.get('rol_usuario_id'); }
  get nombre()           { return this.userForm.get('nombre'); }
  get apellido()         { return this.userForm.get('apellido'); }
  get emailCorporativo() { return this.userForm.get('emailCorporativo'); }


  llenadoValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }

  rolValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==5 || repuesta.error==6){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }

  llenaRoles(resp: any){
        console.log(resp);
      this.mis_roles= new Array(resp.length);
      var j=resp.length-1;
      for (var _i = 0; _i < resp.length; _i++ )
      {
        this.mis_roles[_i]=resp[j];
        j--;
      }
      this.cargando=this.cargando-1;
      console.log("llenaTipos this.cargando: "+this.cargando);
    }


  regresaUsuario(){
    this.router.navigate(['administrador/usuarios']);
  }





  llenado(respuesta: any){
    console.log(respuesta);
    this.id=respuesta.id_usuario;
    this.userForm.patchValue({
      id_usuario:        respuesta.id_usuario,
      rol_usuario_id:    respuesta.rol_usuario_id,
      nombre:            respuesta.nombre,
      apellido:          respuesta.apellido,
      emailCorporativo:  respuesta.emailCorporativo

    });

    if(respuesta.isRolActive==0){
      this.addRol(respuesta.rol_usuario_id,respuesta.rol);
    }

    this.id = respuesta.id_usuario; //De aqui sacamos id para parametrisarlo en el método subirFoto.
    console.log(respuesta.foto);
    if(respuesta.foto == "null"){
      this.imgUrl= "../assets/img/gabino.jpg";
    }
    else{
      this.imgUrl= this.global.assetsRoot+respuesta.foto;
    }
    this.cargando=this.cargando-1;
    this.llenadoDone=true;
  }
  cambiarContrasena(){
     this.actBut= true;
     this.desBut= false;
     this.resppass = false;
     this.exitoCon = false;
  }
  guardarContrasena(){
    this.actBut = false;
    this.desBut = true;
    if(this.passwordForm.value.password1 == this.passwordForm.value.npassword && this.passwordForm.value.password1 != null){
      this.postContrasena();
      this.exitoCon = true;
      //setTimeout(this.switchAlerta(this.exitoCon), 8000);
    }
    else{
      this.resppass = true;
    }
  }

  subirFoto(){
      window.open(this.imgUrl, "_blank");
  }

  postContrasena(){
    this.cargando= this.cargando + 1;
    let url = `${this.global.apiRoot}/usuario/post/endpoint.php`;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let formData:FormData = new FormData();
    formData.append('function', 'upDateMyContrasena');
    formData.append('constrasena', this.passwordForm.value.password1);
    formData.append('id_usuario', this.id);

    formData.append('rol_usuario_id', "1004");
    formData.append('token', this.global.token);
    this.http.post(url, formData).subscribe(res => {
      res.json();
      this.upContValidator(res.json());
    });
   }
  upContValidator(respuesta: any){
    this.cargando= this.cargando - 1;
    console.log(respuesta)
    if(respuesta.error==1 || respuesta.error==2 || respuesta.error==3){
      window.alert(respuesta.estatus);
    }
    else{
    }
  }

  addRol(rol_usuario_id: any,rol: any){
    let aux= new Array(this.mis_roles.length+1);

    let index=0;
    for (var _i = 0; _i < aux.length; _i++ ){
       if(_i < aux.length-1){
        aux[_i]=this.mis_roles[_i];
      }else if(_i == aux.length-1){
        aux[_i]={'id_rol_usuario':rol_usuario_id,'rol':"*Desactivado*"+rol+"*Desactivado*"};
      }
    }
    this.mis_roles= new Array(aux.length);
    for (var _i = 0; _i < aux.length; _i++ ){
      this.mis_roles[_i]=aux[_i];
    }
  }
}
