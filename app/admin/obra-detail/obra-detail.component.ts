import { Component, OnInit } from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { LoginResp } from "../../interfaces/int.LoginResp";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import { Obra }    from './Obra';
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
  selector: 'app-obra-detail',
  templateUrl: './obra-detail.component.html',
  styleUrls: ['./obra-detail.component.css','../../loadingArrows.css']
})
export class ObraDetailComponent implements OnInit {
  foto: string;
  private gridApi;
  private gridColumnApi;
  rowClassRules;
  rowSelection;
  columnDefs;
  rowData;
  proyectoForm: FormGroup;

  Proyecto = {
   id_proyecto:'',
   proyecto:'',
   nombreContable:'',
   cliente:'',
   pm_id:''
  }

  cargandoMessage: string= "";
  actualizarMessageCargando: string= "";

  formatoActive;
  submitted = false;
  hidden = true;
  historico = false;
  cargando;
  imgUrl = "";
  mis_con: Array<any>;
  mis_pm: Array<any>;
  mis_concreterasActivas: Array<any>;
  mis_clientesActivos: Array<any>;
  estatus: string;
  formatoStatus;
  onSubmit() { this.submitted = true; }

  loginMessage: string= "";
  loginresp: LoginResp;
  global: Global;
  
  
  id: string;
    
  constructor(private router: Router, private http: Http, private data: DataService, private route: ActivatedRoute) { 
    this.columnDefs = [
      {headerName: 'Ctrl', field: 'id_usuario' },
      {headerName: 'N.D.E.', field: 'noDeEmpleado' },
      {headerName: 'Empleado', field: 'empleado' },
      {headerName: 'Proyecto', field: 'estadoPM' },
      {headerName: 'Asignacion', field: 'estadoPEM' },


    ];
    this.rowSelection = "single";
    this.rowClassRules = {
      "row-red-warning": function(params) {
        var active = params.data.estadoPE;
        return active == 0;
      },
      "row-green-warning": function(params) {
        var active = params.data.estadoPE;
        return active == 1;
      },
      "row-blue-warning": function(params) {
        var active = params.data.estadoPE;
        return active == null || active == "";
      }
    };
  }

  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    this.cargando=3;
   

    let url = `${this.global.apiRoot}/usuario/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function',          'getProjectManagersForDroptdown');
    search.set('token',             this.global.token);
    search.set('rol_usuario_id',    this.global.rol);
    this.http.get(url, {search}).subscribe(res => {this.llenaPM(res.json());
                                                 });

    url = `${this.global.apiRoot}/proyectos/get/endpoint.php`;
	  search = new URLSearchParams();
	  search.set('function',            'getByIDAdmin');
    search.set('token',               this.global.token);
    search.set('rol_usuario_id',      this.global.rol);
    search.set('id_proyecto',             this.id);
	  this.http.get(url, {search}).subscribe(res => {this.llenado(res.json()); 
      this.llenadoValidator(res.json());
    });

    this.proyectoForm = new FormGroup({
      'id_proyecto':        new FormControl({ value:this.Proyecto.id_proyecto,       disabled: true },         [Validators.required]),         
      'proyecto':           new FormControl({ value:this.Proyecto.proyecto,          disabled: this.hidden },  [Validators.required]), 
      'nombreContable':     new FormControl({ value:this.Proyecto.nombreContable,    disabled: this.hidden },  [Validators.required]), 
      'cliente':            new FormControl({ value:this.Proyecto.cliente,           disabled: this.hidden },  [Validators.required]), 
      'pm_id':              new FormControl({ value:this.Proyecto.pm_id,             disabled: this.hidden },  [Validators.required])
      
    });
  }

  get id_proyecto()           { return this.proyectoForm.get('id_proyecto'); }
  get proyecto()              { return this.proyectoForm.get('proyecto'); }
  get nombreContable()        { return this.proyectoForm.get('nombreContable'); }
  get cliente()               { return this.proyectoForm.get('cliente'); }
  get pm_id()                 { return this.proyectoForm.get('pm_id'); }



  llenadoValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==1 || respuesta.error==2 || respuesta.error==3){
      window.alert(respuesta.estatus);
    }
    else{
      
    }
  }

  rolValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==5 || respuesta.error==6){
      window.alert(respuesta.estatus);
    }
    else{
      
    }
  }

  labValidator(respuesta: any){
    console.log(respuesta)
    if(respuesta.error==5 || respuesta.error==6){
      window.alert(respuesta.estatus);
    }
    else{
      
    }
  }

  regresaProyecto(){
    this.router.navigate(['administrador/proyectos']);
  }

  llenaPM(resp: any){
    this.mis_pm= new Array(resp.length);
    for (var _i = 0; _i < resp.length; _i++ )
    {
      this.mis_pm[_i]=resp[_i];

    }
    console.log(this.mis_pm);
    this.cargando=this.cargando-1;
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let url = `${this.global.apiRoot}/proyectos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function',          'getEmpleadosByID');
    search.set('token',             this.global.token);
    search.set('rol_usuario_id',    this.global.rol);

    search.set('id_proyecto',       this.id);
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.llenaTabla(res.json());
      this.gridApi.sizeColumnsToFit();
    });
  }
  mostrarTodos(){
    this.cargando=1;
    this.historico=!this.historico;
    let url = `${this.global.apiRoot}/proyectos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function',          'getAllEmpleadosByID');
    search.set('token',             this.global.token);
    search.set('rol_usuario_id',    this.global.rol);

    search.set('id_proyecto',       this.id);
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.llenaTabla(res.json());
      this.gridApi.sizeColumnsToFit();
    });
    console.log("mostrarTodos :: "+this.historico);
  }
  mostrarMenos(){
    this.cargando=1;
    this.historico=!this.historico;
    let url = `${this.global.apiRoot}/proyectos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function',          'getEmpleadosByID');
    search.set('token',             this.global.token);
    search.set('rol_usuario_id',    this.global.rol);

    search.set('id_proyecto',       this.id);
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.llenaTabla(res.json());
      this.gridApi.sizeColumnsToFit();
    });
    console.log("mostrarMenos :: "+this.historico);
  }
  llenaTabla(repuesta: any){
    console.log(repuesta)
    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else{
      if(repuesta.registros==0){
        this.rowData="";
      }else{
        this.rowData =repuesta;
      }
    }
    this.cargando=this.cargando-1;
  }

  mostrar(){
    this.hidden = !this.hidden;
    const state = this.hidden ? 'disable' : 'enable';

    Object.keys(this.proyectoForm.controls).forEach((controlName) => {
        this.proyectoForm.controls[controlName][state](); // disables/enables each form control based on 'this.formDisabled'
    });
    this.proyectoForm.controls['id_proyecto']['disable']();
  }


  actualizarProyecto(){
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/proyectos/post/endpoint.php`;
    let formData:FormData = new FormData();

    formData.append('function',               'upDateAdmin');
    formData.append('token',                  this.global.token);
    formData.append('rol_usuario_id',         this.global.rol);
    
    formData.append('id_proyecto',            this.id);
    formData.append('proyecto',               this.proyectoForm.value.proyecto);
    formData.append('nombreContable',         this.proyectoForm.value.nombreContable );
    formData.append('cliente',                this.proyectoForm.value.cliente);
    formData.append('pm_id',                  this.proyectoForm.value.pm_id);
    
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
    console.log(respuesta);
    
    this.proyectoForm.patchValue({
      id_proyecto:        respuesta.id_proyecto,
      proyecto:           respuesta.proyecto,
      nombreContable:     respuesta.nombreContable,
      cliente:            respuesta.cliente,
      pm_id:              respuesta.pm_id
    });
    this.formatoStatus=(respuesta.active == 1 ? true : false);
    this.formatoActive=respuesta.active;

    this.cargando=this.cargando-1;
  }
  
  addConcretera(id_concretera: any,concretera: any){
    let aux= new Array(this.mis_con.length+1);

    let index=0;
    for (var _i = 0; _i < aux.length; _i++ ){
       if(_i < aux.length-1){
        aux[_i]=this.mis_con[_i];
      }else if(_i == aux.length-1){
        aux[_i]={'id_concretera':id_concretera,'concretera':"*Desactivado*"+concretera+"*Desactivado*"};
      }
    }
    this.mis_con= new Array(aux.length);
    for (var _i = 0; _i < aux.length; _i++ ){
      this.mis_con[_i]=aux[_i];
    }
  }

  onSelectionChanged(event: EventListenerObject) {
    var selectedRows = this.gridApi.getSelectedRows();
    var id_usuario = "";
    var estadoPE = "";
    var empleado = "";

    selectedRows.forEach(function(selectedRow, index) {
      id_usuario = selectedRow.id_usuario;
      estadoPE = selectedRow.estadoPE;
      empleado = selectedRow.empleado;

    });
    if(this.formatoStatus){
      if(Number(estadoPE)==1){
        if(window.confirm("¿Estas seguro que quieres desasignar a "+empleado+" de este proyecto?")){
          this.toogleStatus(id_usuario, estadoPE);
        }else{

        }
      }else{
        if(window.confirm("¿Estas seguro que quieres asignar a "+empleado+" a este proyecto?")){
          this.toogleStatus(id_usuario, estadoPE);
        }else{
          
        }
      }
    }
  }
  toogleStatus(id_usuario, estadoPE){
    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/proyectos/post/endpoint.php`;
    let formData:FormData = new FormData();

    formData.append('function',               'toogleStatus');
    formData.append('token',                  this.global.token);
    formData.append('rol_usuario_id',         this.global.rol);
    
    formData.append('id_proyecto',            this.id);
    formData.append('id_usuario',             id_usuario);
    formData.append('estadoPE',               estadoPE);
    
    this.http.post(url, formData).subscribe(res => this.respuesToogle(res.json()) );
  }
  proyectoCompletado(){
    let active=(this.formatoActive == 1 ? '0' : '1');

    this.cargando=1;
    this.data.currentGlobal.subscribe(global => this.global = global);
    let url = `${this.global.apiRoot}/proyectos/post/endpoint.php`;
    let formData:FormData = new FormData();

    formData.append('function',               'toogleStatusProyecto');
    formData.append('token',                  this.global.token);
    formData.append('rol_usuario_id',         this.global.rol);
    
    formData.append('id_proyecto',            this.id);
    formData.append('active',                 active);

    this.http.post(url, formData).subscribe(res => {
      this.formatoActive=(this.formatoActive == 1 ? '0' : '1');
      this.formatoStatus=!this.formatoStatus;
      this.respuesToogle(res.json());
    } );
  }
  respuesToogle(resp){
    console.log(resp);
    this.cargando=this.cargando-1;
    if(resp.error!=0){
      window.alert(resp.estatus);
      location.reload();
    }else{
      if(this.historico){
        this.cargando=1;
        let url = `${this.global.apiRoot}/proyectos/get/endpoint.php`;
        let search = new URLSearchParams();
        search.set('function',          'getAllEmpleadosByID');
        search.set('token',             this.global.token);
        search.set('rol_usuario_id',    this.global.rol);

        search.set('id_proyecto',       this.id);
        this.http.get(url, {search}).subscribe(res => {
          console.log(res.json());
          this.llenaTabla(res.json());
          this.gridApi.sizeColumnsToFit();
        });
      }else{
        this.cargando=1;
        let url = `${this.global.apiRoot}/proyectos/get/endpoint.php`;
        let search = new URLSearchParams();
        search.set('function',          'getEmpleadosByID');
        search.set('token',             this.global.token);
        search.set('rol_usuario_id',    this.global.rol);

        search.set('id_proyecto',       this.id);
        this.http.get(url, {search}).subscribe(res => {
          console.log(res.json());
          this.llenaTabla(res.json());
          this.gridApi.sizeColumnsToFit();
        });
      }
    }
    
  }
}




