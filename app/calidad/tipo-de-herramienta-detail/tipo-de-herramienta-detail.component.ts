import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { LoginResp } from "../../interfaces/int.LoginResp";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import { Herramienta }    from './herramienta';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';


@Component({
  selector: 'app-tipo-de-herramienta-detail',
  templateUrl: './tipo-de-herramienta-detail.component.html',
  styleUrls: ['./tipo-de-herramienta-detail.component.css','../../loadingArrows.css']
})
export class TipoHerramientaDetailComponent implements OnInit {

  
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

    certificacionesForm: FormGroup;
    certificaciones= {
      id_certificaciones: '',
      certificacion: '',
      descripcion: '',
      diasValidos: '',
      aprobable: '',
      diasAmarillos: '',
      diasRojos: '',
      ocupacion: '',
      puesto: '',
      hrs: '',
      areaTematica: '',
      prefijo: '',
      consecutivo: ''
    }

    model: Herramienta= new Herramienta("","","");
    
  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    
    this.cargando=1;

    let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
	  let search = new URLSearchParams();
	  search.set('function',            'getByIDCalidad');
    search.set('token',               this.global.token);
    search.set('rol_usuario_id',      "1004");
    search.set('id_certificaciones',  this.id);
	  this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );

     this.certificacionesForm = new FormGroup({
      'id_certificaciones':           new FormControl( { value: this.certificaciones.id_certificaciones,   disabled: true },  [ Validators.required]), 
      'certificacion':                new FormControl( { value: this.certificaciones.certificacion,        disabled: this.hidden },  [ Validators.required]),
      'descripcion':                  new FormControl( { value: this.certificaciones.descripcion,          disabled: this.hidden },  [ Validators.required]), 
      'diasValidos':                  new FormControl( { value: this.certificaciones.diasValidos,          disabled: this.hidden },  [ Validators.required, Validators.pattern("[0-9]*")]),
      'aprobable':                    new FormControl( { value: this.certificaciones.aprobable,            disabled: this.hidden },  [ Validators.required]),
      'diasAmarillos':                new FormControl( { value: this.certificaciones.diasAmarillos,        disabled: this.hidden },  [ Validators.required, Validators.pattern("[0-9]*")]), 
      'diasRojos':                    new FormControl( { value: this.certificaciones.diasRojos,            disabled: this.hidden },  [ Validators.required, Validators.pattern("[0-9]*")]),
      'ocupacion':                    new FormControl( { value: this.certificaciones.ocupacion,            disabled: this.hidden },  [ Validators.required]),
      'puesto':                       new FormControl( { value: this.certificaciones.puesto,               disabled: this.hidden },  [ Validators.required]),
      'hrs':                          new FormControl( { value: this.certificaciones.hrs,                  disabled: this.hidden },  [ Validators.required, Validators.pattern("[0-9]*")]),
      'areaTematica':                 new FormControl( { value: this.certificaciones.areaTematica,         disabled: this.hidden },  [ Validators.required]),
      'prefijo':                      new FormControl( { value: this.certificaciones.prefijo,              disabled: this.hidden },  [ Validators.required]),
      'consecutivo':                  new FormControl( { value: this.certificaciones.consecutivo,          disabled: this.hidden },  [ Validators.required]),
     });
  }

  get id_certificaciones() { return this.certificacionesForm.get('id_certificaciones');}
  get certificacion()      { return this.certificacionesForm.get('certificacion'     );}
  get descripcion()        { return this.certificacionesForm.get('descripcion'       );}
  get diasValidos()        { return this.certificacionesForm.get('diasValidos'       );}
  get aprobable()          { return this.certificacionesForm.get('aprobable'         );}
  get diasAmarillos()      { return this.certificacionesForm.get('diasAmarillos'     );}
  get diasRojos()          { return this.certificacionesForm.get('diasRojos'         );}
  get ocupacion()          { return this.certificacionesForm.get('ocupacion'         );}
  get puesto()             { return this.certificacionesForm.get('puesto'            );}
  get hrs()                { return this.certificacionesForm.get('hrs'               );}
  get areaTematica()       { return this.certificacionesForm.get('areaTematica'      );}
  get prefijo()            { return this.certificacionesForm.get('prefijo'           );}
  get consecutivo()        { return this.certificacionesForm.get('consecutivo'       );}

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
    this.router.navigate(['calidad/certificaciones']);
  }
  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.certificacionesForm.controls).forEach((controlName) => {
        this.certificacionesForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    this.certificacionesForm.controls['id_certificaciones']['disable']();
    this.certificacionesForm.controls['consecutivo']['disable']();
  }


  actualizarCertificacion(){
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/certificaciones/post/endpoint.php`;
    let formData:FormData = new FormData();
    //let search = new URLSearchParams();
    formData.append('function',        'upDateCalidad');
    formData.append('token',           this.global.token);
    formData.append('rol_usuario_id',  '1004');

    formData.append('id_certificaciones',       this.id);
    formData.append('certificacion',            this.certificacionesForm.value.certificacion);
    formData.append('descripcion',              this.certificacionesForm.value.descripcion);
    formData.append('diasValidos',              this.certificacionesForm.value.diasValidos);
    formData.append('aprobable',                this.certificacionesForm.value.aprobable);
    formData.append('diasAmarillos',            this.certificacionesForm.value.diasAmarillos);
    formData.append('diasRojos',                this.certificacionesForm.value.diasRojos);
    formData.append('ocupacion',                this.certificacionesForm.value.ocupacion);
    formData.append('puesto',                   this.certificacionesForm.value.puesto);
    formData.append('hrs',                      this.certificacionesForm.value.hrs);
    formData.append('areaTematica',             this.certificacionesForm.value.areaTematica);
    formData.append('prefijo',                  this.certificacionesForm.value.prefijo);
    formData.append('consecutivo',              this.certificacionesForm.getRawValue().consecutivo);

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
     this.certificacionesForm.patchValue({
      id_certificaciones: respuesta.id_certificaciones,
      certificacion:      respuesta.certificacion,
      descripcion:        respuesta.descripcion,
      diasValidos:        respuesta.diasValidos,
      aprobable:          respuesta.aprobable,
      diasAmarillos:      respuesta.diasAmarillos,
      diasRojos:          respuesta.diasRojos,
      ocupacion:          respuesta.ocupacion,
      puesto:             respuesta.puesto,
      hrs:                respuesta.hrs,
      areaTematica:       respuesta.areaTematica,
      prefijo:            respuesta.prefijo,
      consecutivo:        respuesta.consecutivo,
    });

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
    let url = `${this.global.apiRoot}/certificaciones/post/endpoint.php`;
    let formData:FormData = new FormData();
    let status=(this.active == 0 ? '1' : '0');
    formData.append('function',             'toogleActive');
    formData.append('id_certificaciones',   this.id);
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

}
