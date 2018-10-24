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

@Component({
  selector: 'app-crear-herramientas',
  templateUrl: './crear-herramientas.component.html',
  styleUrls: ['./crear-herramientas.component.scss','../../loadingArrows.css']
})
export class CrearHerramientasComponent implements OnInit {
  global: Global;
  cargando= 1;
  mis_certif: Array<any>;
  mis_lab: Array<any>;
  hidden=false;
  constructor(private router: Router, private data: DataService, private http: Http) { }
  
  salonForm: FormGroup;
  salon = {
    certificacion_id: '',
    fecha:'',
    lugar:'',
    capacidad:''
  }
  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=1;

    let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function',         'getAllForDropdown');
    search.set('token',            this.global.token);
    search.set('rol_usuario_id',   '1004');
    this.http.get(url, {search}).subscribe(res => this.llenaCertificaciones(res.json()) );

    this.salonForm = new FormGroup({
      'certificacion_id':    new FormControl({ value:this.salon.certificacion_id,  disabled: this.hidden },  [Validators.required]),         
      'fecha':               new FormControl({ value:this.salon.fecha,             disabled: this.hidden },  [Validators.required]), 
      'lugar':               new FormControl({ value:this.salon.lugar,             disabled: this.hidden },  [Validators.required]), 
      'capacidad':           new FormControl({ value:this.salon.capacidad,         disabled: this.hidden },  [Validators.required, Validators.pattern("^([0-9])*")])
    });
  }
  get certificacion_id() { return this.salonForm.get('certificacion_id'); }
  get fecha()            { return this.salonForm.get('fecha'); }
  get lugar()            { return this.salonForm.get('lugar'); }
  get capacidad()        { return this.salonForm.get('capacidad'); }


  crearSalon(){
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/certificaciones/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',          'insertSalonCalidad');
    formData.append('token',             this.global.token);
    formData.append('rol_usuario_id',    this.global.rol);

    formData.append('certificacion_id',  this.salonForm.value.certificacion_id);
    formData.append('fecha',             this.salonForm.value.fecha);  
    formData.append('lugar',             this.salonForm.value.lugar);
    formData.append('capacidad',         this.salonForm.value.capacidad);
    this.http.post(url, formData).subscribe(res => {
      this.respuestaSwitch(res.json());
    });

  }


  respuestaSwitch(res: any){
    console.log(res);
    if(res.error!= 0){
     window.alert("Intentalo otra vez");
     location.reload();
    }
    else{
      this.router.navigate(['calidad/salones']);
    }
  }

  submitted = false;

  regresaUsuario(){
    this.router.navigate(['calidad/salones']);
  }

  onSubmit() { this.submitted = true; }

  llenaCertificaciones(resp: any){
    console.log(resp);
    this.mis_certif= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_certif[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaTipos this.cargando: "+this.cargando);
  }


}




