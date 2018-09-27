import { Component, OnInit,  Output, EventEmitter,Input} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../../data.service";
import { Global } from "../../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';


@Component({
  selector: 'app-proyectos-grid',
  templateUrl: './proyectos-grid.component.html',
  styleUrls: ['./proyectos-grid.component.css']
})
export class ProyectosGridComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  id: any;
  historial=false;

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
    {headerName: 'Ctrl', field: 'id_proyecto' },    
    {headerName: 'Proyecto', field: 'proyecto' },
    {headerName: 'Nombre Contable', field: 'nombreContable' },
    {headerName: 'Proyecto', field: 'estadoP' },
    {headerName: 'Asignacion', field: 'estadoPE' },
    {headerName: 'PM', field: 'pm'},

      
    ];
    this.rowSelection = "multiple";
  }

  rowData: any;

  ngOnInit() {
        this.data.currentGlobal.subscribe(global => this.global = global);

  }

 

  onGridReady(params) {

    this.data.currentGlobal.subscribe(global => this.global = global);
    this.route.params.subscribe( params => this.id=params.id);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let url = `${this.global.apiRoot}/proyectos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getProyectosByID');
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
    @Input( ) idh: any;

    @Output() agregaHerra = new EventEmitter<any>();

  agregaHerr(ids: any) {
    this.agregaHerra.emit(ids);
    //this.id= h
    console.log(ids);

  }

  historialCompleto(){
    this.historial=true;
    let url = `${this.global.apiRoot}/proyectos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getFullProyectosByID');
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
    let url = `${this.global.apiRoot}/proyectos/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getProyectosByID');
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



  llenaTabla(repuesta: any){
    console.log(repuesta)

    if(repuesta.error==1 || repuesta.error==2 || repuesta.error==3){
      window.alert(repuesta.estatus);
      this.router.navigate(['login']);
    }else{
      this.rowData =repuesta;
    }
  }

   
 onSelectionChanged(event: EventListenerObject){
    var selectedRows = this.gridApi.getSelectedRows();
    var id = []; //array
    var i =0 ;
    selectedRows.forEach(function(selectedRow, index) {
      id.push(selectedRow.id_herramienta);
      
    });
      this.agregaHerr(id);
  }


}
