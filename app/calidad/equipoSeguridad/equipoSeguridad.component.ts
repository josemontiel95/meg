import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equipoSeguridad',
  templateUrl: './equipoSeguridad.component.html',
  styleUrls: ['./equipoSeguridad.component.scss','../../loadingArrows.css']
})
export class EquipoSeguridadComponent implements OnInit{
  title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  cargando;
  historico= false;
  hidden=false;
  rowClassRules;
  nombreResponsable;
  nombre;
  noDeEmpleado;
  id;
  imgUrl;
  id_usuario;
  noDeSerie;
  viewProfile= false;

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: 'Ctrl', field: 'id_equipoDeSeguridad' },
    {headerName: 'Nombre', field: 'nombre' },
    {headerName: 'No. Serie', field: 'noDeSerie' },
    {headerName: 'Fecha Fabricaci&oacute;n', field: 'fechaDeFrabricacion'},
    {headerName: 'Fecha Vigencia', field: 'fechaVigencia' },
    {headerName: 'Costo', field: 'costo' },
    {headerName: 'Estado', field: 'estado' },
    {headerName: 'N.D.E', field: 'noDeEmpleado' },
    {headerName: 'Asignaci&oacute;n', field: 'estadoEsE'},
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
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=1;
  }

  rowData: any;

  crearEquipoSeguridad(){
    this.router.navigate(['calidad/equipoSeguridad/creaEquipoSeguridad/']);
  }
  crearLoteEquipoSeguridad(){
    this.router.navigate(['calidad/equipoSeguridad/creaEquipoSeguridadLote/']);
  }

  menosDetalles(){
    this.hidden=false;
  }

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/equipo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllEquiopoCalidad');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', '1004');
    search.set('status', '0');
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.rowData= res.json();
      this.gridApi.sizeColumnsToFit();
      this.cargando=this.cargando-1;
    });
  }
  historicoMostrar(){
    this.cargando=1;
    this.historico=true;
    let url = `${this.global.apiRoot}/equipo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllEquiopoCalidad');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('status', '-1');
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.rowData= res.json();
      this.gridApi.sizeColumnsToFit();
      this.cargando=this.cargando-1;
    });
  }
  historicoDesaparecer(){
    this.cargando=1;
    this.historico=false;
    let url = `${this.global.apiRoot}/equipo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllEquiopoCalidad');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
    search.set('status', '0');
    this.http.get(url, {search}).subscribe(res => {
      console.log(res.json());
      this.rowData= res.json();
      this.gridApi.sizeColumnsToFit();
      this.cargando=this.cargando-1;
    });
  }

  onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id = "";
    var id_usuario = "";
    var nombreResponsable = "";
    var nombre ="";
    var noDeEmpleado ="";
    var isAssigned="";
    var noDeSerie="";

    selectedRows.forEach(function(selectedRow, index) {
      id =                 selectedRow.id_equipoDeSeguridad;
      id_usuario =         selectedRow.id_usuario;
      nombreResponsable =  selectedRow.nombreResponsable;
      nombre =             selectedRow.nombre;
      noDeEmpleado =       selectedRow.noDeEmpleado;
      isAssigned =         selectedRow.isAssigned;
      noDeSerie =          selectedRow.noDeSerie;
       
    });
    this.displayShortDescription(id, nombre, nombreResponsable, noDeEmpleado, isAssigned,id_usuario, noDeSerie );
    //this.router.navigate(['calidad/equipoSeguridad/equipoSeguridadDetail/'+id]);

  }

  displayShortDescription(id, nombre, nombreResponsable, noDeEmpleado, isAssigned, id_usuario, noDeSerie){
    this.hidden=true;
    //activar 
    this.id=id;
    this.nombreResponsable=nombreResponsable;
    this.nombre=nombre;
    this.noDeEmpleado=noDeEmpleado;
    this.id_usuario=id_usuario;
    this.imgUrl="../assets/img/gabino.jpg";
    this.noDeSerie=noDeSerie;

    if(isAssigned == 1){
      this.viewProfile=true;
    }
    else{
      if (isAssigned == 0) {
        this.viewProfile=false;
      }
    }
  }
  verPerfil(){
    this.router.navigate(['calidad/usuarios/user-detail/'+this.id_usuario]);
  }
  detalleUsuario(){
    this.router.navigate(['calidad/equipoSeguridad/equipoSeguridadDetail/'+this.id]);
  }

}
