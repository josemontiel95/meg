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


@Component({
  selector: 'app-equipoSeguridadDetail',
  templateUrl: './equipoSeguridadDetail.component.html',
  styleUrls: ['./equipoSeguridadDetail.component.css','../../loadingArrows.css']
})
export class EquipoSeguridadDetailComponent implements OnInit {

  
    cargando;
    active: any;
    submitted = false;
    hidden = true;
    imgUrl = "";
    onSubmit() { this.submitted = true; }

    loginMessage: string= "";
    loginresp: LoginResp;
    global: Global;
    desBut=true;
    actBut=false;
    resppass= false;
    exitoCon = false;
    password1: string;
    npassword: string;
    id;

  equipoForm: FormGroup;
  equipo= {
    id_equipoDeSeguridad:'',
    nombre: '',
    noDeSerie: '',
    fechaDeFrabricacion: '',
    costo: '',
    diasValidos: '',
    diasAmarillos: '',
    diasRojos: '',
    aprobable: ''
  }

    
    
  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    
    this.cargando=1;

    let url = `${this.global.apiRoot}/equipo/get/endpoint.php`;
	  let search = new URLSearchParams();
	  search.set('function',            'getEquiopoCalidadByIdCalidad');
    search.set('token',               this.global.token);
    search.set('rol_usuario_id',      "1004");
    search.set('id_equipoDeSeguridad',  this.id);
	  this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );

    this.equipoForm = new FormGroup({
      'nombre':                   new FormControl( { value: this.equipo.nombre,              disabled: this.hidden },  [ Validators.required]),
      'noDeSerie':                new FormControl( { value: this.equipo.noDeSerie,           disabled: this.hidden },  [ Validators.required]), 
      'fechaDeFrabricacion':      new FormControl( { value: this.equipo.fechaDeFrabricacion, disabled: this.hidden },  [ Validators.required]),
      'costo':                    new FormControl( { value: this.equipo.costo,               disabled: this.hidden },  [ Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]),
      'diasValidos':              new FormControl( { value: this.equipo.diasValidos,         disabled: this.hidden },  [ Validators.required, Validators.pattern("[-]?[0-9]*")]), 
      'diasAmarillos':            new FormControl( { value: this.equipo.diasAmarillos,       disabled: this.hidden },  [ Validators.required, Validators.pattern("[0-9]*")]),
      'diasRojos':                new FormControl( { value: this.equipo.diasRojos,           disabled: this.hidden },  [ Validators.required, Validators.pattern("[0-9]*")]),
      'aprobable':                new FormControl( { value: this.equipo.aprobable,           disabled: this.hidden },  [ Validators.required]),
      'id_equipoDeSeguridad':     new FormControl( { value: this.equipo.id_equipoDeSeguridad,disabled: this.hidden },  [ Validators.required]),
     
     });
  }

  get id_equipoDeSeguridad() { return this.equipoForm.get('id_equipoDeSeguridad'  );}
  get nombre()               { return this.equipoForm.get('nombre'        );}
  get noDeSerie()            { return this.equipoForm.get('noDeSerie'     );}
  get fechaDeFrabricacion()  { return this.equipoForm.get('fechaDeFrabricacion' );}
  get costo()                { return this.equipoForm.get('costo'         );}
  get diasValidos()          { return this.equipoForm.get('diasValidos'   );}
  get diasAmarillos()        { return this.equipoForm.get('diasAmarillos' );}
  get diasRojos()            { return this.equipoForm.get('diasRojos'     );}
  get aprobable()            { return this.equipoForm.get('aprobable'     );}
   

  reloadData(){
    this.cargando=1;
    let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function',            'getByIDCalidad');
    search.set('token',               this.global.token);
    search.set('rol_usuario_id',      "1004");
    search.set('id_certificaciones',  this.id);
    this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );
  }

  switchAlerta(exitoCon: any){
    this.exitoCon = false;
  }

  regresaHerramientas(){
    this.router.navigate(['calidad/equipoSeguridad']);
  }
  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.equipoForm.controls).forEach((controlName) => {
        this.equipoForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    this.equipoForm.controls['id_equipoDeSeguridad']['disable']();
    if(this.equipoForm.getRawValue().aprobable==0){
      this.equipoForm.controls['diasValidos']['disable']();
      this.equipoForm.controls['diasAmarillos']['disable']();
      this.equipoForm.controls['diasRojos']['disable']();
    }
  }


  actualizarCertificacion(){
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/equipo/post/endpoint.php`;
    let formData:FormData = new FormData();
    //let search = new URLSearchParams();
    formData.append('function',        'upDateEquipoCalidad');
    formData.append('token',           this.global.token);
    formData.append('rol_usuario_id',  '1004');

    formData.append('id_equipoDeSeguridad',     this.id);
    formData.append('nombre',                   this.equipoForm.value.nombre);
    formData.append('noDeSerie',                this.equipoForm.value.noDeSerie);
    formData.append('fechaDeFrabricacion',      this.equipoForm.getRawValue().fechaDeFrabricacion);
    formData.append('costo',                    this.equipoForm.value.costo);
    formData.append('diasValidos',              this.equipoForm.getRawValue().diasValidos);
    formData.append('diasAmarillos',            this.equipoForm.getRawValue().diasAmarillos);
    formData.append('diasRojos',                this.equipoForm.getRawValue().diasRojos);

    this.http.post(url, formData).subscribe(res =>  {
                                              this.respuestaError(res.json());
                                            } );

  }


  respuestaError(resp: any){
    this.cargando=this.cargando-1;
    console.log(resp);
    if(resp.error!=0){
      window.alert(resp.estatus);
      location.reload();
    }else{
      this.mostrar()
    }
  }


  llenado(respuesta: any){
    console.log(respuesta);
     this.equipoForm.patchValue({
      id_equipoDeSeguridad:   respuesta.id_equipoDeSeguridad,
      nombre:                 respuesta.nombre,
      noDeSerie:              respuesta.noDeSerie,
      fechaDeFrabricacion:    respuesta.fechaDeFrabricacion,
      costo:                  respuesta.costo,
      diasValidos:            respuesta.diasValidos,
      diasAmarillos:          respuesta.diasAmarillos,
      diasRojos:              respuesta.diasRojos,
    });
     if(this.equipoForm.getRawValue().diasValidos=="-1"){
       this.equipoForm.patchValue({
        aprobable:          0
       });
     }else{
       this.equipoForm.patchValue({
        aprobable:          1
       });
     }
    this.desBut=(respuesta.active ? true : false);
    this.actBut=(respuesta.active ? false : true);

    setTimeout(()=>{ 
      this.active= respuesta.active;
      this.status(this.active);
      this.cargando=this.cargando-1;
      console.log("llenado this.cargando: "+this.cargando);
    }, 0);  
  }


  

  status(active: any)
  {
    if (active == 1) {
     this.actBut = false;
     this.desBut = true;
          }
     else
     {
     this.actBut= true;
     this.desBut= false;
     }     

  }

  desactivarHerramienta(){
     this.actBut= true;
     this.desBut= false;
     this.switchActive(0);
  }

   activarHerramienta(){
     this.actBut = false;
     this.desBut = true;
     this.switchActive(1);
   }

  switchActive(active: number){
    this.cargando=1;
    let url = `${this.global.apiRoot}/equipo/post/endpoint.php`;
    let formData:FormData = new FormData();
    let status=(this.active == 0 ? '1' : '0');
    formData.append('function',             'toogleActive');
    formData.append('id_equipoDeSeguridad',   this.id);
    formData.append('rol_usuario_id',       "1004");
    formData.append('token',                this.global.token);
    formData.append('status',               status);
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitch(res.json());
    });
       
   }
   respuestaSwitch(res: any){
     this.cargando=this.cargando-1;
     console.log(res);
     if(res.error!= 0){
       window.alert("Intentalo otra vez");
       location.reload();
     }
     else{
       this.reloadData();
     }
   }
   onChangeAprobable(){
    if(this.equipoForm.value.aprobable==0){
      this.equipoForm.patchValue({
         diasValidos:  -1,
         diasAmarillos:  0,
         diasRojos:  0
      });
      this.equipoForm.controls['diasValidos']['disable']();
      this.equipoForm.controls['diasAmarillos']['disable']();
      this.equipoForm.controls['diasRojos']['disable']();
    }else{
      this.equipoForm.patchValue({
         diasValidos:  365,
         diasAmarillos:  60,
         diasRojos:  30
      });
      this.equipoForm.controls['diasValidos']['enable']();
      this.equipoForm.controls['diasAmarillos']['enable']();
      this.equipoForm.controls['diasRojos']['enable']();
    }
  }

}
