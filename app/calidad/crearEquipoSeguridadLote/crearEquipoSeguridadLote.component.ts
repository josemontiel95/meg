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
  selector: 'app-crearEquipoSeguridadLote',
  templateUrl: './crearEquipoSeguridadLote.component.html',
  styleUrls: ['./crearEquipoSeguridadLote.component.scss']
})
export class CrearEquipoSeguridadLoteComponent implements OnInit {


  apiRoot: string = "http://lacocs.montielpalacios.com/usuario";
  global: Global;
  cargando;
  hidden=false;

  constructor(private router: Router, private data: DataService, private http: Http) { }
  

  equipoForm: FormGroup;
  equipo= {
    nombre: '',
    noDeSerie: '',
    fechaDeFrabricacion: '',
    costo: '',
    diasValidos: '',
    diasAmarillos: '',
    diasRojos: '',
    aprobable: '',
    cantidad:''
  }

  crearCertificacion(){
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/equipo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',                 'insertLoteEquipoCalidad');
    formData.append('token',                    this.global.token);
    formData.append('rol_usuario_id',           "1004");

    formData.append('nombre',                   this.equipoForm.value.nombre);
    formData.append('noDeSerie',                this.equipoForm.value.noDeSerie);
    formData.append('fechaDeFrabricacion',      this.equipoForm.getRawValue().fechaDeFrabricacion);
    formData.append('costo',                    this.equipoForm.value.costo);
    formData.append('diasValidos',              this.equipoForm.getRawValue().diasValidos);
    formData.append('diasAmarillos',            this.equipoForm.getRawValue().diasAmarillos);
    formData.append('diasRojos',                this.equipoForm.getRawValue().diasRojos);
    formData.append('cantidad',                this.equipoForm.getRawValue().cantidad);
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
      this.router.navigate(['calidad/equipoSeguridad']);
    }
  }


  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=0;

    this.equipoForm = new FormGroup({
      'nombre':                   new FormControl( { value: this.equipo.nombre,              disabled: this.hidden },  [ Validators.required]),
      'noDeSerie':                new FormControl( { value: this.equipo.noDeSerie,           disabled: this.hidden },  [ Validators.required, Validators.pattern("(A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z){4}")]), 
      'fechaDeFrabricacion':      new FormControl( { value: this.equipo.fechaDeFrabricacion, disabled: this.hidden },  [ Validators.required]),
      'costo':                    new FormControl( { value: this.equipo.costo,               disabled: this.hidden },  [ Validators.required, Validators.pattern("[0-9]+(\.[0-9][0-9]?)?")]),
      'diasValidos':              new FormControl( { value: this.equipo.diasValidos,         disabled: this.hidden },  [ Validators.required, Validators.pattern("[-]?[0-9]*")]), 
      'diasAmarillos':            new FormControl( { value: this.equipo.diasAmarillos,       disabled: this.hidden },  [ Validators.required, Validators.pattern("[0-9]*")]),
      'diasRojos':                new FormControl( { value: this.equipo.diasRojos,           disabled: this.hidden },  [ Validators.required, Validators.pattern("[0-9]*")]),
      'aprobable':                new FormControl( { value: this.equipo.aprobable,           disabled: this.hidden },  [ Validators.required]),
      'cantidad':                 new FormControl( { value: this.equipo.cantidad,           disabled: this.hidden },  [ Validators.required, Validators.pattern("[0-9]*")]),
     });
  }

  get nombre()               { return this.equipoForm.get('nombre'        );}
  get noDeSerie()            { return this.equipoForm.get('noDeSerie'     );}
  get fechaDeFrabricacion()  { return this.equipoForm.get('fechaDeFrabricacion' );}
  get costo()                { return this.equipoForm.get('costo'         );}
  get diasValidos()          { return this.equipoForm.get('diasValidos'   );}
  get diasAmarillos()        { return this.equipoForm.get('diasAmarillos' );}
  get diasRojos()            { return this.equipoForm.get('diasRojos'     );}
  get aprobable()            { return this.equipoForm.get('aprobable'     );}
  get cantidad()             { return this.equipoForm.get('cantidad'      );}
   
   submitted = false;

  regresaUsuario(){
    this.router.navigate(['calidad/equipoSeguridad']);
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
  onSubmit() { this.submitted = true; }



}




