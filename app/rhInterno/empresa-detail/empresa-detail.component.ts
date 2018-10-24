import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { LoginResp } from "../../interfaces/int.LoginResp";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

export class Password
{
  constructor(
    public password1: string, 
    public npassword: string, 

    ) {  }

}

@Component({
  selector: 'app-empresa-detail',
  templateUrl: './empresa-detail.component.html',
  styleUrls: ['./empresa-detail.component.css','../../loadingArrows.css']
})
export class EmpresaDetailComponent implements OnInit {
  foto: string;

  empresaForm: FormGroup;

  Empresa = {
   id_empresa:'',
   rfc:'',
   razonSocial:'',
   nombre:'',
   calle:'',
   noExt:'',
   noInt:'',
   col:'',
   municipio:'',
   estado:'',
   email:'' ,
   telefonoDeContacto:'',
   registroPatronal: ''
  }

  cargandoMessage: string= "";
  actualizarMessageCargando: string= "";

  submitted = false;
  hidden = true;
  cargando= 3;
  imgUrl = "";
  estatus: string;
  onSubmit() { this.submitted = true; }

  loginMessage: string= "";
  loginresp: LoginResp;
  global: Global;
  
  active;
  id: string;
    
  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    this.cargando=1;

    let url = `${this.global.apiRoot}/empresa/get/endpoint.php`;
	  let search = new URLSearchParams();
	  search.set('function',            'getByIDAdmin');
    search.set('token',               this.global.token);
    search.set('rol_usuario_id',      this.global.rol);
    search.set('id_empresa',             this.id);
	  this.http.get(url, {search}).subscribe(res => {this.llenado(res.json()); 
      this.llenadoValidator(res.json());
    });

    this.empresaForm = new FormGroup({
      'id_empresa':         new FormControl({ value:this.Empresa.id_empresa,        disabled: true },         [Validators.required]),         
      'rfc':                new FormControl({ value:this.Empresa.rfc,               disabled: this.hidden },  [Validators.required, Validators.pattern("([A-ZÑ&]{3,4})([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01]))(([A-Z]|[0-9]){2})([A]|[0-9])")]), 
      'razonSocial':        new FormControl({ value:this.Empresa.razonSocial,       disabled: this.hidden },  [Validators.required]),
      'nombre':             new FormControl({ value:this.Empresa.nombre,            disabled: this.hidden },  [Validators.required]), 
      'calle':              new FormControl({ value:this.Empresa.calle,             disabled: this.hidden },  [Validators.required]), 
      'noExt':              new FormControl({ value:this.Empresa.noExt,             disabled: this.hidden },  [Validators.required]), 
      'noInt':              new FormControl({ value:this.Empresa.noInt,             disabled: this.hidden }), 
      'col':                new FormControl({ value:this.Empresa.col,               disabled: this.hidden },  [Validators.required]), 
      'municipio':          new FormControl({ value:this.Empresa.municipio,         disabled: this.hidden },  [Validators.required]), 
      'estado':             new FormControl({ value:this.Empresa.estado,            disabled: this.hidden },  [Validators.required]), 
      'email':              new FormControl({ value:this.Empresa.email,             disabled: this.hidden },  [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]), 
      'telefonoDeContacto': new FormControl({ value:this.Empresa.telefonoDeContacto,disabled: this.hidden },  [Validators.required, Validators.pattern("^([0-9])*")]), 
      'registroPatronal':   new FormControl({ value:this.Empresa.registroPatronal,  disabled: this.hidden }),  
    });
  }

  get id_empresa()            { return this.empresaForm.get('id_empresa'); }
  get rfc()                   { return this.empresaForm.get('rfc'); }
  get razonSocial()           { return this.empresaForm.get('razonSocial'); }
  get nombre()                { return this.empresaForm.get('nombre'); }
  get calle()                 { return this.empresaForm.get('calle'); }
  get noExt()                 { return this.empresaForm.get('noExt'); }
  get noInt()                 { return this.empresaForm.get('noInt'); }
  get col()                   { return this.empresaForm.get('col'); }
  get municipio()             { return this.empresaForm.get('municipio'); }
  get estado()                { return this.empresaForm.get('estado'); }
  get email()                 { return this.empresaForm.get('email'); }
  get telefonoDeContacto()    { return this.empresaForm.get('telefonoDeContacto'); }
  get registroPatronal()      { return this.empresaForm.get('registroPatronal'); }


  llenadoValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==1 || respuesta.error==2 || respuesta.error==3){
      window.alert(respuesta.estatus);
    }
    else{
      
    }
  }



  regresaObra(){
    this.router.navigate(['recursosHumanos/empresas']);
  }

    toogleActive(){
    if(this.active){
      if(window.confirm("¿Seguro que deseas desactivar la empresa?")){
        this.toogleActiveCall("0");
      }else{
        
      }
    }else{
      if(window.confirm("¿Seguro que deseas activar la empresa?")){
        this.toogleActiveCall("1");
      }else{

      }
    }
  }
  toogleActiveCall(status){
    this.cargando= this.cargando + 1;
    let url = `${this.global.apiRoot}/empresa/post/endpoint.php`;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let formData:FormData = new FormData();
    formData.append('function',       'toogleActive');
    formData.append('rol_usuario_id', "1002");
    formData.append('token',          this.global.token);

    formData.append('id_empresa',     this.id);
    formData.append('status',         status);
    this.http.post(url, formData).subscribe(res => {
      this.toogleActiveCallValidator(res.json());
    });
  }
  toogleActiveCallValidator(respuesta: any){
    this.cargando= this.cargando - 1;
    console.log(respuesta)
    if(respuesta.error==1 || respuesta.error==2 || respuesta.error==3){
      window.alert(respuesta.estatus);
    }
    else{
      this.active=!this.active;
    }
  }

  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.empresaForm.controls).forEach((controlName) => {
        this.empresaForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    this.empresaForm.controls['id_empresa']['disable']();
  }


  actualizarObra(){
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/empresa/post/endpoint.php`;
    let formData:FormData = new FormData();

    formData.append('function',           'upDateAdmin');
    formData.append('token',              this.global.token);
    formData.append('rol_usuario_id',     this.global.rol);
    
    formData.append('id_empresa',         this.id);
    formData.append('rfc',                this.empresaForm.value.rfc );
    formData.append('razonSocial',        this.empresaForm.value.razonSocial);
    formData.append('nombre',             this.empresaForm.value.nombre);
    formData.append('calle',              this.empresaForm.value.calle);
    formData.append('noExt',              this.empresaForm.value.noExt);
    formData.append('noInt',              this.empresaForm.value.noInt);
    formData.append('col',                this.empresaForm.value.col);
    formData.append('municipio',          this.empresaForm.value.municipio  );
    formData.append('estado',             this.empresaForm.value.estado );
    formData.append('email',              this.empresaForm.value.email );
    formData.append('telefonoDeContacto', this.empresaForm.value.telefonoDeContacto );
    formData.append('registroPatronal',   this.empresaForm.value.registroPatronal );
    
    this.http.post(url, formData).subscribe(res => this.respuestaError(res.json()) );


  }


  respuestaError(resp: any){
    this.cargando=this.cargando-1;
    if(resp.error!=0){
      window.alert(resp.estatus);
      location.reload();
    }else{
      this.mostrar();
    }
    this.cargandoMessage="";
    this.actualizarMessageCargando=resp.estatus;
     setTimeout(()=>{ 
                     this.actualizarMessageCargando="";
                     }, 3500); 
  }


  llenado(respuesta: any){
    console.log("llenado :: respuesta:");
    console.log(respuesta);
    
    this.empresaForm.patchValue({
      id_empresa:          respuesta.id_empresa,
      rfc:                 respuesta.rfc,
      razonSocial:         respuesta.razonSocial,
      nombre:              respuesta.nombre,
      calle:               respuesta.calle,
      noExt:               respuesta.noExt,
      noInt:               respuesta.noInt,
      col:                 respuesta.col,
      municipio:           respuesta.municipio,
      estado:              respuesta.estado,
      email:               respuesta.email,
      telefonoDeContacto:  respuesta.telefonoDeContacto,
      registroPatronal:    respuesta.registroPatronal,
    });

    if(respuesta.active==1){
      this.active=true;
    }else if(respuesta.active==0){
      this.active=false;
    }

    if(respuesta.foto == "null"){
      this.imgUrl= "../assets/img/gabino.jpg";
    }else{
      this.imgUrl= this.global.assetsRoot+respuesta.foto;
    }
    setTimeout(()=>{  
      this.cargando=this.cargando-1;
      console.log("llenado this.cargando: "+this.cargando);
    }, 0);
  }
  


}
