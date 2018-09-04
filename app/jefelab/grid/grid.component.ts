import { Component, OnInit} from '@angular/core';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import { DataService } from "../../data.service";
import { Global } from "../../interfaces/int.Global";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit  {
	title = 'app';
  global: Global;
  private gridApi;
  private gridColumnApi;
  rowSelection;
  columnDefs;

  constructor( private http: Http, private router: Router, private data: DataService, private route: ActivatedRoute){
	  this.columnDefs = [
      {headerName: 'ID', field: 'id_cliente'},
      {headerName: 'Razón social.', field: 'razonSocial' },
      {headerName: 'Nombre de la empresa.', field: 'nombre' },
      {headerName: 'Direccion', field: 'direccion'},
      {headerName: 'RFC', field: 'rfc' },      
      {headerName: 'Email', field: 'email' },
      {headerName: 'Nombre de contacto', field: 'nombreContacto' },
      {headerName: 'Telefono de Contacto', field: 'telefonoDeContacto' },
      {headerName: 'Telefono de la Empresa', field: 'telefono' },
      {headerName: 'Activo', field: 'active' },

      
    ];
    this.rowSelection = "single";
  }

  rowData: any;

  ngOnInit() {
  }


  onGridReady(params) {
    this.data.currentGlobal.subscribe(global => this.global = global);

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    let url = `${this.global.apiRoot}/ordenDeTrabajo/get/endpoint.php`;
    let search = new URLSearchParams();
    search.set('function', 'getAllAdmin');
    search.set('token', this.global.token);
    search.set('rol_usuario_id', this.global.rol);
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
    var id = "";

    selectedRows.forEach(function(selectedRow, index) {
      id += selectedRow.id_herramienta;
      
    });
    //this.router.navigate(['jefeb/herramientas/herramienta-detail/'+id]);
  }


}
