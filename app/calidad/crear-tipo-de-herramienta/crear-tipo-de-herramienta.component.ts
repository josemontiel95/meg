import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { CrearResp } from "../../interfaces/int.CrearResp";
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { Herramienta }    from './Herramienta';
import * as moment from 'moment';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-crear-tipo-de-herramienta',
  templateUrl: './crear-tipo-de-herramienta.component.html',
  styleUrls: ['./crear-tipo-de-herramienta.component.scss']
})
export class CrearTipoHerramientasComponent implements OnInit {


  apiRoot: string = "http://lacocs.montielpalacios.com/usuario";
  global: Global;
  cargando;
  hidden=false;

  constructor(private router: Router, private data: DataService, private http: Http) { }
  

  certificacionesForm: FormGroup;
  certificaciones= {
    certificacion: '',
    descripcion: '',
    diasValidos: '',
    aprobable: '',
    diasAmarillos: '',
    diasRojos: '',
    ocupacion: '',
    puesto: 'Tecnico',
    hrs: '16',
    areaTematica: '6000 Seguridad',
    prefijo: '',
    consecutivo: '0' 
   }

  crearCertificacion(){
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/certificaciones/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',                 'insertCalidad');
    formData.append('token',                    this.global.token);
    formData.append('rol_usuario_id',           "1004");

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

    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitch(res.json());
    } ); 

  }


  respuestaSwitch(res: any){
    this.cargando=this.cargando-1;
    console.log(res);
    if(res.error!= 0){
     window.alert(res.estatus);
     location.reload();
    }
    else{
      this.router.navigate(['calidad/certificaciones']);
    }
  }


  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=0;

    this.certificacionesForm = new FormGroup({
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
      'consecutivo':                  new FormControl( { value: this.certificaciones.consecutivo,          disabled: true        },  [ Validators.required]),

     });
  }

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

   submitted = false;

  regresaUsuario(){
    this.router.navigate(['calidad/certificaciones']);
  }

  onSubmit() { this.submitted = true; }



}




