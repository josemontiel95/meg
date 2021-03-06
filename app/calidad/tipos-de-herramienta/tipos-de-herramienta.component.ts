import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipos-de-herramienta',
  templateUrl: './tipos-de-herramienta.component.html',
  styleUrls: ['./tipos-de-herramienta.component.scss','../../loadingArrows.css']
})
export class TiposDeHerramientaComponent implements OnInit{
  title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;
  cargando;
  historico= false;
  rowClassRules;

  constructor(private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
    this.columnDefs = [
    {headerName: 'Ctrl', field: 'id_certificaciones' },
    {headerName: 'Certificaci&oacute;n', field: 'certificacion' },
    {headerName: 'Placas', field: 'diasValidos' },
    {headerName: 'Aprobable', field: 'aprobable'},
    {headerName: 'D&iacute;as Amarillos', field: 'diasAmarillos' },
    {headerName: 'D&iacute;as Rojos', field: 'diasRojos' },
  ];
    this.rowSelection = "single";
    this.rowClassRules = {
      "row-red-warning": function(params) {
        var color = params.data.color;
        return color == 0;
      },
      "row-green-warning": function(params) {
        var color = params.data.color;
        return color == 1;
      }
    };
  }
	  
  ngOnInit() {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.cargando=1;
  }

  rowData: any;

  crearTipoHerramienta(){
    this.router.navigate(['calidad/certificaciones/crea-certificacion/']);
  }

  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdmin');
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
    let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdmin');
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
    let url = `${this.global.apiRoot}/certificaciones/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdmin');
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

    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_certificaciones;
      
    });
    this.router.navigate(['calidad/certificaciones/certificacion-detail/'+id]);
  }

}
