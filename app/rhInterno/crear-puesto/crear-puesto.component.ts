import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import * as moment from 'moment';
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
  selector: 'app-crear-puesto',
  templateUrl: './crear-puesto.component.html',
  styleUrls: ['./crear-puesto.component.scss','../../loadingArrows.css']
})
export class CrearPuestoComponent implements OnInit
  {
  global: Global;
  constructor(private router: Router, 
              private data: DataService, 
              private http: Http) { }
    foto: string;

    submitted = false;
    hidden = false;
    cargando= 2;

  
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

  //inicio y llenados
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=0;

    this.empresaForm = new FormGroup({
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



  regresaEmpresa(){
    this.router.navigate(['recursosHumanos/empresas']);
  }

//insertar-foto


  onSubmit() { this.submitted = true; }


  crearEmpresa(){
    this.cargando=1;
    this.cargandoMessage="Guardando...";
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/empresa/post/endpoint.php`;
    let formData:FormData = new FormData();

    formData.append('function',           'insertAdmin');
    formData.append('token',              this.global.token);
    formData.append('rol_usuario_id',     this.global.rol);
    
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
    this.cargandoMessage="Cargando...";
    this.http.post(url, formData).subscribe(res => this.diplay(res.json()) );
    

  }

  diplay(crearResp: CrearResp){
    this.cargando=this.cargando-1;
    if(crearResp.error==0){
      this.cargandoMessage="";
      this.actualizarMessageCargando=crearResp.estatus;
      console.log(crearResp);       
    }else{
      this.actualizarMessageCargando="";
      switch (crearResp.error) {
        case 1:
          
          this.cargandoMessage=crearResp.estatus;
          window.alert(this.cargandoMessage);
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
          this.cargandoMessage=crearResp.estatus;
          window.alert(this.cargandoMessage);
          break;
      }
      
    }
    setTimeout(()=>{ 
      this.router.navigate(['recursosHumanos/empresas']);
    }, 1800);

  }


}