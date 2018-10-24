import { Component, OnInit,  Output, EventEmitter,Input} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../../data.service";
import { Global } from "../../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';


@Component({
  selector: 'app-equipo-grid',
  templateUrl: './equipo-grid.component.html',
  styleUrls: ['./equipo-grid.component.css']
})
export class EquipoGridComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  id: any;
  historial=false;
  asignar=false;
  rowClassRules;

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
    {headerName: 'Ctrl', field: 'id_equipoDeSeguridad' }, 
    {headerName: 'N.D.S.', field: 'noDeSerie' },
    {headerName: 'Nombre', field: 'nombre' },
    {headerName: 'Equipo', field: 'estadoE' },
    {headerName: 'Asignacion', field: 'estadoEsE' },
    {headerName: 'Fecha de Fab.', field: 'fechaDeFrabricacion' },
    {headerName: 'Fecha de Vigencia', field: 'fechaVigencia' },
    {headerName: 'Estado', field: 'estado'},
      
    ];
    this.rowSelection = "single";
    this.rowClassRules = {
      "row-green-warning": function(params) {
        var color = params.data.color;
        return color == 0;
      },
      "row-yelloy-warning": function(params) {
        var color = params.data.color;
        return color == 1;
      },
      "row-orange-warning": function(params) {
        var color = params.data.color;
        return color == 2;
      },
      "row-red-warning": function(params) {
        var color = params.data.color;
        return color == 3;
      }
    };
  }

  rowData: any;

  ngOnInit() {
        this.data.currentGlobal.subscribe(global => this.global = global);

  }

 

  onGridReady(params) {
    this.cambiaCargando(1);
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let url = `${this.global.apiRoot}/equipo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getEquipoByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_usuario', this.id);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());

                                            this.llenaTabla(res.json());
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }

  @Output() cargando = new EventEmitter<any>();

  cambiaCargando(cantidad: any) {
    this.cargando.emit(cantidad);
  }

  historialCompleto(){
    this.historial=true;
    this.cambiaCargando(1);
    let url = `${this.global.apiRoot}/equipo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getFullEquipoByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_usuario', this.id);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }
  disponibleCompleto(){
    this.asignar=true;
    this.cambiaCargando(1);
    let url = `${this.global.apiRoot}/equipo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllEquipoDisponibleCalidad');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_usuario', this.id);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                            this.gridApi.sizeColumnsToFit();
                                          });
  }

  historialActual(){
    this.historial=false;
    this.asignar=false;
    this.cambiaCargando(1);
    let url = `${this.global.apiRoot}/equipo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getEquipoByID');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('id_usuario', this.id);
    console.log(search);
    this.http.get(url, {search}).subscribe(res => {
                                            console.log(res.json());
                                            this.llenaTabla(res.json());
                                          });
  }



  llenaTabla(repuesta: any){
    this.cambiaCargando(-1);
    console.log(repuesta)

    if(repuesta.registros==0){
        this.rowData="";
    }else{
      this.rowData= repuesta;
      this.gridApi.sizeColumnsToFit();
    }
  }

   
 onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id =""; //array
    var estadoEsEnum ="";
    selectedRows.forEach(function(selectedRow, index) {
      id= selectedRow.id_equipoDeSeguridad;
      estadoEsEnum= selectedRow.estadoEsEnum;
    });
    if(this.asignar){
      switch(estadoEsEnum){
        case "1":
          if(window.confirm("¿Estas seguro que quieres desasignar esta herramienta?")){
            this.cambiarAsignacion(id,0);
          }else{

          }
        break;
        case "0":
          if(window.confirm("¿Estas seguro que quieres volver a asignar esta herramienta?")){
            this.cambiarAsignacion(id,1);
          }else{

          }
        break;
        case "-1":
          if(window.confirm("¿Estas seguro que quieres asignar esta herramienta?")){
            this.cambiarAsignacion(id,2);
          }else{

          }
        break;
        default:
          window.alert("Error, por favor contacta a soporte");
        break;
      }
    }

  }
  cambiarAsignacion(id, status){
    this.cambiaCargando(1);
    let url = `${this.global.apiRoot}/equipo/post/endpoint.php`;
    let formData:FormData = new FormData();
    formData.append('function',          'cambiarAsignacion');
    formData.append('token',             this.global.token);
    formData.append('rol_usuario_id',    this.global.rol);

    formData.append('status',                 status);
    formData.append('id_equipoDeSeguridad',   id);
    formData.append('id_usuario',             this.id);

    this.http.post(url, formData).subscribe(res =>  {
      this.respuestaCalificar(res.json());
    });

  }
  respuestaCalificar(res){
    this.cambiaCargando(-1);
    if(res.error!=0){
      window.alert(res.estatus);
      location.reload();
    }else{
      //reloadGrid
     this.disponibleCompleto();
    }
  }


}
