import { GridComponent } from '../grid/grid.component';
import { Component, OnInit,  Output, EventEmitter, Input } from '@angular/core';
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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] 
})
export class DashboardComponent implements OnInit {

  apiRoot: string = "http://lacocs.montielpalacios.com/usuario";
  global: Global;
  cargando= 1;
  areas= [{"are":"CONCRETO", "id":"CONCRETO"},{"are":"GEOTECNIA", "id":"GEOTECNIA"},{"are":"ASFALTOS", "id":"ASFALTOS"}];

    mis_lab: Array<any>;
  constructor(private router: Router, private data: DataService, private http: Http,private route: ActivatedRoute) { }
  
 condi= [{"condicion":"Muy Dañado", "id":"Muy Dañado"},{"condicion":"Dañado", "id":"Dañado"},{"condicion":"Regular", "id":"Regular"},{"condicion":"Buena", "id":"Buena"},{"condicion":"Muy Buena", "id":"Muy Buena"}];
   aux= 1;  
   auxx: any;   
  ordenForm: FormGroup; //se crea un formulario de tipo form group
  tipoForm: FormGroup;
   id: string;
   id_herra: string;
   id_tec: string;
   aux2: Array<any>;

   aux3: Array<any>;
   mis_cli: Array<any>;
   mis_obras: Array<any>;
   mis_jefes: Array<any>;
   mis_tipos: Array<any>;
   hidden = true;
   hiddenDetail = true;
   hiddenHerramienta= true;
   hiddenTecnicos= true;
   hiddenHerramientaDispo= true;
   hiddenTecnicosDispo= true;   
   herra = {

     herramienta_tipo_id: ''
   }
   Orden = {
     area: '',
     id_ordenDeTrabajo: '',
     cotizacion_id: '',
     id_cliente: '',
     obra_id: '',
     lugar: '',
     nombreContacto: '',
     telefonoDeContacto: '',
     actividades: '',
     condicionesTrabajo: '',
     jefe_brigada_id: '',
     fechaInicio: '',
     fechaFin: '',
     horaInicio: '',
     horaFin: '',
     laboratorio_id: '',
     observaciones: ''

        //se creo un arreglo llamado cliente con los campos del form
        };  
  

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    this.cargando=2;


    let url = `${this.global.apiRoot}/herramienta_tipo/get/endpoint.php`;
    let search = new URLSearchParams();
    
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenaTipos(res.json()) );

    url = `${this.global.apiRoot}/cliente/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaClientes(res.json());
                                                   this.labValidator(res.json());
                                                 });


    url = `${this.global.apiRoot}/obra/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaObra(res.json());
                                                   this.labValidator(res.json());
                                                 });

    url = `${this.global.apiRoot}/laboratorio/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getForDroptdownAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaLaboratorio(res.json());
                                                   this.labValidator(res.json());
                                                 });

    url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
    search = new URLSearchParams();
    search.set('function', 'getJefesBrigadaForDroptdown');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaJefe(res.json());
                                                   this.labValidator(res.json());
                                                 });

    url = `${this.global.apiRoot}/herramienta/get/endpoint.php`;
    search = new URLSearchParams();
    
    search.set('function', 'getForDroptdownTipo');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    this.http.get(url, {search}).subscribe(res => this.llenaTipos(res.json()) );


    url = `${this.global.apiRoot}/ordenDeTrabajo/get/endpoint.php`;
	  search = new URLSearchParams();
	  search.set('function', 'getByIDAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id',  this.global.rol);
    search.set('id_ordenDeTrabajo', this.id);
	  this.http.get(url, {search}).subscribe(res => this.llenado(res.json()) );


    

    this.ordenForm = new FormGroup({
      'area': new FormControl( {value: this.Orden.area, disabled: this.hidden },  [Validators.required]), 
      'id_ordenDeTrabajo': new FormControl({value: this.Orden.id_ordenDeTrabajo , disabled: this.hidden },  [ Validators.required]),
      'cotizacion_id': new FormControl({value: this.Orden.cotizacion_id, disabled: this.hidden },  [  Validators.required]),
      'id_cliente': new FormControl({value: this.Orden.id_cliente, disabled: this.hidden },  [  Validators.required]), 
      'obra_id': new FormControl({value: this.Orden.obra_id, disabled: this.hidden },  [  Validators.required]),
      'lugar': new FormControl({value: this.Orden.lugar, disabled: this.hidden },  [  Validators.required]), 
      'telefonoDeContacto': new FormControl( {value: this.Orden.telefonoDeContacto, disabled: this.hidden },  [  Validators.required,Validators.pattern("^([0-9])*$")]),
      'nombreContacto': new FormControl({value: this.Orden.nombreContacto, disabled: this.hidden },  [  Validators.required]), 
      'actividades': new FormControl({value: this.Orden.actividades, disabled: this.hidden },  [  Validators.required]), 
      'condicionesTrabajo': new FormControl({value: this.Orden.condicionesTrabajo, disabled: this.hidden },  [  Validators.required]), 
      'jefe_brigada_id': new FormControl({value: this.Orden.jefe_brigada_id, disabled: this.hidden },  [  Validators.required]), 
      'fechaInicio': new FormControl({value: this.Orden.fechaInicio, disabled: this.hidden },  [  Validators.required]), 
      'fechaFin': new FormControl({value: this.Orden.fechaFin, disabled: this.hidden },  [  Validators.required]), 
      'horaInicio': new FormControl({value: this.Orden.horaInicio, disabled: this.hidden },  [  Validators.required]), 
      'horaFin': new FormControl({value: this.Orden.horaFin, disabled: this.hidden },  [  Validators.required]), 
      'observaciones': new FormControl({value: this.Orden.observaciones, disabled: this.hidden }),       
      'laboratorio_id': new FormControl({value: this.Orden.laboratorio_id, disabled: this.hidden }, [  Validators.required]), 
          });
  

  this.tipoForm = new FormGroup({
    'herramienta_tipo_id': new FormControl(  this.herra.herramienta_tipo_id, [  Validators.required])
    });
  }

   get area() { return this.ordenForm.get('area'); }

   get id_ordenDeTrabajo() { return this.ordenForm.get('id_ordenDeTrabajo'); }
  
   get cotizacion_id() { return this.ordenForm.get('cotizacion_id'); }

   get id_cliente() { return this.ordenForm.get('id_cliente'); }
   
   get obra_id() { return this.ordenForm.get('obra_id'); }
  
   get lugar() { return this.ordenForm.get('lugar'); }

   get telefonoDeContacto() { return this.ordenForm.get('telefonoDeContacto'); }
   
   get nombreContacto() { return this.ordenForm.get('nombreContacto'); }
   
   get actividades() { return this.ordenForm.get('actividades'); }
   
   get condicionesTrabajo() { return this.ordenForm.get('condicionesTrabajo'); }
   
   get jefe_brigada_id() { return this.ordenForm.get('jefe_brigada_id'); } 

   get fechaInicio() { return this.ordenForm.get('fechaInicio'); } 

   get fechaFin() { return this.ordenForm.get('fechaFin'); } 

   get horaInicio() { return this.ordenForm.get('horaInicio'); } 

   get horaFin() { return this.ordenForm.get('horaFin'); } 

   get observaciones() { return this.ordenForm.get('observaciones'); } 

   get laboratorio_id() { return this.ordenForm.get('laboratorio_id'); } 

   get herramienta_tipo_id() { return this.tipoForm.get('herramienta_tipo_id'); }


   crearFormato(){
        this.router.navigate(['jefeBrigada/orden-trabajo/dashboard/crear-llenaFormatoCCH/'+this.id]);
    }

      
   
      mostrarDetalles()
  {
     this.hiddenDetail = !this.hiddenDetail;
     if(this.hiddenDetail == true)
     {
       this.hiddenDetail = false;
     }
  }
  
    mostrar()
  {
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.ordenForm.controls).forEach((controlName) => {
        this.ordenForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
  }

  mostrarHerramienta()
  {
    this.hiddenHerramienta = !this.hiddenHerramienta;

  }

     respuestaSwitchE(res: any){
     console.log(res);
     
     if(window.confirm("Estas seguro de la eliminación.") == true)
       {
     if(res.error!= 0){
       window.alert("Intentalo otra vez");
       location.reload();
     }
     else{
       console.log("holaa");
         location.reload();
       }
     }
       else{
         window.alert("Acción Cancelada.");
     }
   
 }
        respuestaSwitch(res: any){
     console.log(res);
     if(res.error!= 0){
       window.alert("Intentalo otra vez");
       location.reload();
     }
     else{
       window.alert("Insertado con exito.");
     }
   }

   //@Output() agregaHerraid = new EventEmitter<any>();  =this.tipoForm.value.herramienta_tipo_id
   
 
   eliminaHerra(aux3: any)
   {
     this.aux3=aux3;

   }

   eliminaTec(aux2: any)
   {
     this.aux2=aux2;
     console.log(this.aux2);
    
   }


    addHerra(aux3: any)
     {
   
    this.aux3=aux3;
  

  }

     addTec(aux2: any) 
     {
        console.log(aux2);
    this.aux2=aux2;
    console.log(this.aux2);

  }
  
  mostrarHerramientaDisponible()
  {

    //this.agregaHerrid(this.tipoForm.value.herramienta_tipo_id);

    if(this.hiddenHerramientaDispo == true){
   this.hiddenHerramientaDispo = !this.hiddenHerramientaDispo;
  }
  else{
    this.hiddenHerramientaDispo = true;
     setTimeout(() =>{this.hiddenHerramientaDispo = false},1000);
   }


  }

  eliminarHerramienta()
  {

     let url = `${this.global.apiRoot}/Herramienta_ordenDeTrabajo/post/endpoint.php`;
     let formData:FormData = new FormData();
        formData.append('function', 'deleteHerra');
        formData.append('ordenDeTrabajo_id', this.id);
        formData.append('rol_usuario_id', this.global.rol);
        formData.append('token', this.global.token);
        formData.append('herramientasArray', JSON.stringify(this.aux3));
    
        
        this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitchE(res.json());
                                            });

  }

   eliminarTecni()
  {

    let url = `${this.global.apiRoot}/Tecnicos_ordenDeTrabajo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'deleteTec');
    formData.append('token', this.global.token);           
    formData.append('ordenDeTrabajo_id', this.id);
    formData.append('rol_usuario_id',  this.global.rol);
    formData.append('tecnicosArray',  JSON.stringify(this.aux2));
    this.http.post(url, formData).subscribe(res =>  {
                                              this.respuestaSwitchE(res.json());
                                            } );
  }

  actualizarOrden()
  {
    let url = `${this.global.apiRoot}/ordenDeTrabajo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'upDateAdmin');
    formData.append('token', this.global.token);           
    formData.append('id_ordenDeTrabajo', this.id);
    formData.append('cotizacion_id',  this.ordenForm.value.cotizacion_id);
    formData.append('area', this.ordenForm.value.area);           
    formData.append('obra_id', this.ordenForm.value.obra_id);
    formData.append('actividades',  this.ordenForm.value.actividades);
    formData.append('condicionesTrabajo', this.ordenForm.value.condicionesTrabajo);
    formData.append('fechaInicio', this.ordenForm.value.fechaInicio);           
    formData.append('fechaFin', this.ordenForm.value.fechaFin);
    formData.append('horaInicio',  this.ordenForm.value.horaInicio);
    formData.append('horaFin', this.ordenForm.value.horaFin);           
    formData.append('observaciones',this.ordenForm.value.observaciones);
    formData.append('lugar',  this.ordenForm.value.lugar);
    formData.append('jefe_brigada_id', this.ordenForm.value.jefe_brigada_id);
    formData.append('laboratorio_id',  this.ordenForm.value.laboratorio_id);
    this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            });
  }
 

  actualizarHerramienta()
  {


      console.log(typeof this.aux3);
    
     let url = `${this.global.apiRoot}/Herramienta_ordenDeTrabajo/post/endpoint.php`;
     let formData:FormData = new FormData();
        formData.append('function', 'insertAdmin');
        formData.append('ordenDeTrabajo_id', this.id);
        formData.append('rol_usuario_id', this.global.rol);
        formData.append('token', this.global.token);
        formData.append('herramientasArray', JSON.stringify(this.aux3));
    
        
        this.http.post(url, formData).subscribe(res => {
                                              this.respuestaSwitch(res.json());
                                            });
        this.hiddenHerramientaDispo = true;

       
  }


     actualizarTecnicos()
  {
    
    let url = `${this.global.apiRoot}/Tecnicos_ordenDeTrabajo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function', 'insertAdmin');
    formData.append('token', this.global.token);           
    formData.append('ordenDeTrabajo_id', this.id);
    formData.append('rol_usuario_id',  this.global.rol);
    formData.append('tecnicosArray',  JSON.stringify(this.aux2));
    this.http.post(url, formData).subscribe(res =>  {
                                              this.respuestaSwitch(res.json());
                                            } );
    this.hiddenTecnicos = true;
  }
  
  

    mostrarTecnicos()
  {
    this.hiddenTecnicos = !this.hiddenTecnicos;

  }




   submitted = false;

   regresaOrdenTrabajo(){
    this.router.navigate(['jefeBrigada/orden-trabajo']);
  }

  onSubmit() { this.submitted = true; }

 
  llenaTipos(resp: any)
  {
    console.log(resp);
    this.mis_tipos= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_tipos[_i]=resp[_i];
    }
    this.cargando=this.cargando-1;
    console.log("llenaTipos this.cargando: "+this.cargando);
  }

    labValidator(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==5 || repuesta.error==6){
      window.alert(repuesta.estatus);
    }
    else{
      
    }
  }

  llenaClientes(resp: any)
  {
    this.mis_cli= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_cli[_i]=resp[_i];

    }
    console.log(this.mis_cli);
    this.cargando=this.cargando-1;
  }

    llenaObra(resp: any)
  {
    this.mis_obras= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_obras[_i]=resp[_i];

    }
    console.log(this.mis_obras);
    this.cargando=this.cargando-1;
  }

  llenaJefe(resp: any)
  {
    this.mis_jefes= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_jefes[_i]=resp[_i];

    }
    console.log(this.mis_jefes);
    this.cargando=this.cargando-1;
  }

    llenado(respuesta: any){
    console.log(respuesta);

    this.ordenForm.patchValue({
     area: respuesta.area,
     id_ordenDeTrabajo: respuesta.id_ordenDeTrabajo,
     cotizacion_id:  respuesta.cotizacion_id,
     id_cliente:  respuesta.id_cliente,
     obra_id:  respuesta.obra_id,
     lugar:  respuesta.lugar,
     nombreContacto: respuesta.nombreContacto,
     telefonoDeContacto:  respuesta.telefonoDeContacto,
     actividades:  respuesta.actividades,
     condicionesTrabajo:  respuesta.condicionesTrabajo,
     jefe_brigada_id:  respuesta.jefe_brigada_id,
     fechaInicio:   respuesta.fechaInicio,
     fechaFin:  respuesta.fechaFin,
     horaInicio:  respuesta.horaInicio,
     horaFin:  respuesta.horaFin,
     observaciones: respuesta.observaciones,
     laboratorio_id: respuesta.laboratorio_id

    });

    if(respuesta.isClienteActive==0)
    {
      this.addCliente(respuesta.id_cliente,respuesta.nombre);
    }

     
  }

    addCliente(id_cliente: any,cliente: any){
    let aux= new Array(this.mis_cli.length+1);
    let index=0;
    for (var _i = 0; _i < aux.length; _i++ ){
       if(_i < aux.length-1){
        aux[_i]=this.mis_cli[_i];
      }else if(_i == aux.length-1){
        aux[_i]={'id_cliente':id_cliente,'nombre':"*Desactivado*"+cliente+"*Desactivado*"};
      }
    }
    this.mis_cli= new Array(aux.length);
    for (var _i = 0; _i < aux.length; _i++ ){
      this.mis_cli[_i]=aux[_i];
    }
  }

    llenaLaboratorio(resp: any)
  {
        console.log(resp);
    this.mis_lab= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_lab[_i]=resp[_i];

    }
    this.cargando=this.cargando-1;
    console.log("llenaTipos this.cargando: "+this.cargando);
  }

  
}
