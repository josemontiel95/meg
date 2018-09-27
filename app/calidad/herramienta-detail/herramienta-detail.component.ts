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
  selector: 'app-herramienta-detail',
  templateUrl: './herramienta-detail.component.html',
  styleUrls: ['./herramienta-detail.component.css','../../loadingArrows.css']
})
export class HerramientaDetailComponent implements OnInit {

    estatus: string;
    error: string;
    historico= false;
    cargando= 2;
    active: any;
    submitted = false;
    hidden = true;
    mis_certif: Array<any>;
    mis_lab: Array<any>;
    imgUrl = "";
    condi= [{"condicion":"Muy Dañado", "id":"Muy Dañado"},{"condicion":"Dañado", "id":"Dañado"},{"condicion":"Regular", "id":"Regular"},{"condicion":"Buena", "id":"Buena"},{"condicion":"Muy Buena", "id":"Muy Buena"}];
    onSubmit() { this.submitted = true; }

  salonForm: FormGroup;
  salon = {
    certificacion_id: '',
    fecha:'',
    lugar:'',
    capacidad:''
  }


    loginMessage: string= "";
    loginresp: LoginResp;
    global: Global;
    desBut=true;
    actBut=false;
    His=true;
    
    resppass= false;
    exitoCon = false;
    password1: string;
    npassword: string;
    id: string;
  
    private gridApi;
    private gridColumnApi;
    rowSelection;
    columnDefs;
    statusSalon;

    abiertos= false;
    cerrados= false;
    calificando= false;
    completados= false;
    falta= false;
    statusTitle="";
    
  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) {
    this.columnDefs = [
    {headerName: 'Ctrl', field: 'id_usuario' },
    {headerName: 'Nombre', field: 'nombre' },
    {headerName: 'Rol', field: 'rol' },
    {headerName: 'Fecha CP', field: 'aprobadaFecha' },
    {headerName: 'Ctrl Salon CP', field: 'id_salonCP' },
    {headerName: 'Inscrito', field: 'Inscrito' },
    {headerName: 'Aprobada', field: 'aprobada' },
    {headerName: 'Asistencia', field: 'asistencia' },



  ];
    this.rowSelection = "single";
   }

   rowData: any;

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    
    this.cargando=2;

    let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function',         'getAllForDropdown');
    search.set('token',            this.global.token);
    search.set('rol_usuario_id',   '1004');
    this.http.get(url, {search}).subscribe(res => this.llenaCertificaciones(res.json()) );

    url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
	  search = new URLSearchParams();
	  search.set('function',       'getSalonesByIDCalidad');
    search.set('token',          this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_salon', this.id);
	  this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );

    this.salonForm = new FormGroup({
      'id_salon':            new FormControl({ value:this.salon.certificacion_id,  disabled: true },  [Validators.required]),         
      'certificacion_id':    new FormControl({ value:this.salon.certificacion_id,  disabled: this.hidden },  [Validators.required]),         
      'fecha':               new FormControl({ value:this.salon.fecha,             disabled: this.hidden },  [Validators.required]), 
      'lugar':               new FormControl({ value:this.salon.lugar,             disabled: this.hidden },  [Validators.required]), 
      'capacidad':           new FormControl({ value:this.salon.capacidad,         disabled: this.hidden },  [Validators.required, Validators.pattern("^([0-9])*")])
    });
  }
  get id_salon() { return this.salonForm.get('certificacion_id'); }
  get certificacion_id() { return this.salonForm.get('certificacion_id'); }
  get fecha()            { return this.salonForm.get('fecha'); }
  get lugar()            { return this.salonForm.get('lugar'); }
  get capacidad()        { return this.salonForm.get('capacidad'); }

  switchAlerta(exitoCon: any){
    this.exitoCon = false;
  }

  regresaSalones(){
    this.router.navigate(['calidad/salones/']);
  }
 toogleFalta(){
   this.falta=!this.falta;
 }
 mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.salonForm.controls).forEach((controlName) => {
        this.salonForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    this.salonForm.controls['id_salon']['disable']();
  }

  actualizarSalon(){
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/certificaciones/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',          'upDateSalonCalidad');
    formData.append('token',             this.global.token);
    formData.append('rol_usuario_id',    this.global.rol);

    formData.append('id_salon',          this.id);
    formData.append('certificacion_id',  this.salonForm.value.certificacion_id);
    formData.append('fecha',             this.salonForm.value.fecha);  
    formData.append('lugar',             this.salonForm.value.lugar);
    formData.append('capacidad',         this.salonForm.value.capacidad);
    //post  formData
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
      this.mostrar();
      //this.router.navigate(['calidad/salones/']);
    }
  }


  llenado(respuesta: any){
    console.log(respuesta);

    this.salonForm.patchValue({
      id_salon: respuesta.id_salon,
      certificacion_id: respuesta.certificacion_id,
      fecha: respuesta.fecha,
      lugar: respuesta.lugar,
      capacidad: respuesta.capacidad
    });
    this.statusSalon=respuesta.status;
    switch(respuesta.status){
      case '0':
        this.abiertos=true;
        this.statusTitle="Salon abierto, puedes inscribir o eliminar empleados"
      break;
      case '1':
        this.cerrados=true;
        this.statusTitle="Salon cerrado, puedes ver pero ya no modificar. Da click en habilitar el calificador"

      break;
      case '2':
        this.calificando=true;
        this.statusTitle="Puedes ahora completar el salon"

      break;
      case '3':
        this.completados=true;
        this.statusTitle="Salon completado, puedes ver pero ya no modificar"
      break;
      default:
        window.alert(respuesta.status);
      break;
    }

   this.active= respuesta.active;
   this.status(this.active);
   this.cargando=this.cargando-1;
   console.log("llenado this.cargando: "+this.cargando);
             
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

   verHistorial(){
  this.His=!this.His;
  }

   switchHistorial(active: number){
     let url = `${this.global.apiRoot}/herramienta/post/endpoint.php`;
     let formData:FormData = new FormData();
      
      if(active == 0){
        formData.append('function', 'deactivate');
      }
      else{
       formData.append('function', 'activate');
      }
        formData.append('id_herramienta', this.id);
        formData.append('rol_usuario_id', this.global.rol);
        formData.append('token', this.global.token);
        this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            });
       
   }

   switchActive(active: number){
     let url = `${this.global.apiRoot}/herramienta/post/endpoint.php`;
     let formData:FormData = new FormData();
      
      if(active == 0){
        formData.append('function', 'deactivate');
      }
      else{
       formData.append('function', 'activate');
      }
        formData.append('id_herramienta', this.id);
        formData.append('rol_usuario_id', this.global.rol);
        formData.append('token', this.global.token);
        this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            });
       
   }
   respuestaSwitch(res: any){
     console.log(res);
     if(res.error!= 0){
       window.alert(res.estatus);
       location.reload();
     }
     else{
       //location.reload();
     }
   }
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


   onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function',           'getInscritosPorSalon');
    search.set('token',              this.global.token);
    search.set('rol_usuario_id',     this.global.rol);
    search.set('id_salon',           this.id);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.rowData= res.json();
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }
  mostrarInscritos(){
    this.historico=false;
    this.cargando=this.cargando+1
    let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function',           'getInscritosPorSalon');
    search.set('token',              this.global.token);
    search.set('rol_usuario_id',     this.global.rol);
    search.set('id_salon',           this.id);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.respRelodMainGrid(res.json());

                                          });
  }
  mostrarTodos(){
    this.historico=true;
    this.cargando=1
    let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function',           'getFullPorSalon');
    search.set('token',              this.global.token);
    search.set('rol_usuario_id',     this.global.rol);
    search.set('id_salon',           this.id);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.respRelodMainGrid(res.json());
                                          });
  }
  respRelodMainGrid(res: any){
    this.cargando=this.cargando-1;
    console.log(res);
    if(res.registros==0){
        this.rowData="";
    }else{
      this.gridApi.sizeColumnsToFit();
      this.rowData= res;
    }
  }
  onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";
    var inscrito = "";
    var id_usuario_salon = "";

    selectedRows.forEach(function(selectedRow, index) {
      id = selectedRow.id_usuario;
      inscrito = selectedRow.Inscrito;
      id_usuario_salon = selectedRow.id_usuario_salon;
    });

    if(this.historico){
      if(inscrito == "Si"){
        if(window.confirm("¿Estas seguro que quieres desasignar a este empleado de este salon?")){
          this.eliminarInscripcion(id_usuario_salon);
        }else{
        }
      }else{
        if(window.confirm("¿Estas seguro que quieres inscribir a este empleado a este salon?")){
          this.inscribir(id);
        }else{
        }
      }
    }else{
      switch(this.statusSalon){
        case '0':
        break;
        case '1':
          this.paseLista(id_usuario_salon);
        break;
        case '2':
          // Calificar
          this.calificar(id_usuario_salon);
          window.alert("En este momento podrias hacer multiseleccion y marcar los aprovados");
        break;
        case '3':
          window.alert("En este momento podrias ver la tarjeta de la certificacion individual, subir foto/PDF del docuemnto que respalda.");
          // Visualizar Certificacion 
        break;
        default:
          window.alert("Error");
        break;
      }

      //this.router.navigate(['calidad/salones/salon-detail/'+id]);
    }
  }
  calificar(id_usuario_salon){
    let asistencia=this.falta ? '0' : '1';
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/certificaciones/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',          'calificar');
    formData.append('token',             this.global.token);
    formData.append('rol_usuario_id',    this.global.rol);
    formData.append('asistencia',        asistencia);
    formData.append('id_usuario_salon',  id_usuario_salon);

    this.http.post(url, formData).subscribe(res =>  {
      this.respuestaCalificar(res.json());
    } );
  }
  respuestaCalificar(res){
    this.cargando=this.cargando-1;
    if(res.error!=0){
      window.alert(res.estatus);
      location.reload();
    }else{
      //reloadGrid
     this.mostrarInscritos();
    }
  }
  paseLista(id_usuario_salon){
    let asistencia=this.falta ? '0' : '1';
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/certificaciones/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',          'paseLista');
    formData.append('token',             this.global.token);
    formData.append('rol_usuario_id',    this.global.rol);

    formData.append('asistencia',        asistencia);
    formData.append('id_usuario_salon',  id_usuario_salon);

    this.http.post(url, formData).subscribe(res =>  {
      this.respuestaPaseLista(res.json());
    } );
  }
  respuestaPaseLista(res){
    this.cargando=this.cargando-1;
    if(res.error!=0){
      window.alert(res.estatus);
      location.reload();
    }else{
      //reloadGrid
     this.mostrarInscritos();
    }
  }

  eliminarInscripcion(id_usuario_salon){
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/certificaciones/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',          'eliminarInscripcion');
    formData.append('token',             this.global.token);
    formData.append('rol_usuario_id',    this.global.rol);

    formData.append('id_usuario_salon',  id_usuario_salon);

    this.http.post(url, formData).subscribe(res =>  {
      this.respuestaEliminarInscripcion(res.json());
    } );
  }
  inscribir(id_usuario){
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/certificaciones/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',          'inscribir');
    formData.append('token',             this.global.token);
    formData.append('rol_usuario_id',    this.global.rol);

    formData.append('id_usuario',        id_usuario);
    formData.append('id_salon',          this.id);
    this.http.post(url, formData).subscribe(res =>  {
      this.respuestaInscribir(res.json());
    } );

  }

  respuestaEliminarInscripcion(res){
    this.cargando=this.cargando-1;
    if(res.error!=0){
      window.alert(res.estatus);
      location.reload();
    }else{
      //reloadGrid
     this.mostrarInscritos();
    }
  }
  respuestaInscribir(res){
    this.cargando=this.cargando-1;
    if(res.error!=0){
      window.alert(res.estatus);
      location.reload();
    }else{
      //reloadGrid
     this.mostrarInscritos();
    }
  }

  moveUp(){
    var selectedRows = this.gridApi.getSelectedRows();
    var flag=false;
    switch(this.statusSalon){
      case '0':
          this.mostrarInscritos();
      break;
      case '1':
        selectedRows.forEach(function(selectedRow, index) {
          if(!(selectedRow.asistenciaNo==1 || selectedRow.asistenciaNo==0)){
            flag=true;
          }
        });
      break;
      case '2':
      break;
    }
    if(flag){
      window.alert("Todos deben pasar lista.");
      return;
    }
    this.cargando=this.cargando+1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/certificaciones/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',          'moveUp');
    formData.append('token',             this.global.token);
    formData.append('rol_usuario_id',    this.global.rol);

    formData.append('id_salon',          this.id);
    this.http.post(url, formData).subscribe(res =>  {
      this.respuestaMoveUp(res.json());
    } );
  }
  respuestaMoveUp(res){
    this.cargando=this.cargando-1;
    if(res.error!=0){
      window.alert(res.estatus);
      location.reload();
    }else{
      //reloadGrid
     this.reloadData();
    }  
  }
  reloadData(){
    this.cargando=this.cargando+1;
    let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function',       'getSalonesByIDCalidad');
    search.set('token',          this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_salon', this.id);
    this.http.get(url, {search}).subscribe(res => {
      this.llenado(res.json()); 
    });
    this.niegaTodo();
  }
   niegaTodo(){
    this.abiertos = false;
    this.cerrados = false;
    this.calificando = false;
    this.completados = false;
  }

  completeSalon(){
    window.alert("Aquí se marcaria completado el Salon");
  }


}
